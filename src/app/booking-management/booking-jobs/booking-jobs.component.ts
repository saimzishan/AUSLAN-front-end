import {Component, OnInit, Input, ViewContainerRef, AfterViewChecked, OnDestroy} from '@angular/core';
import {BookingService} from '../../api/booking.service';
import {Booking} from '../../shared/model/booking.entity';
import {BookingInterpreter} from '../../shared/model/contact.entity';
import {UserService} from '../../api/user.service';
import {
    Administrator, BookingOfficer, IndividualClient, Interpreter, OrganisationalRepresentative,
    User
} from '../../shared/model/user.entity';
import {ROLE} from '../../shared/model/role.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {ActivatedRoute} from '@angular/router';
import {Router, NavigationExtras} from '@angular/router';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {PopupComponent} from '../../shared/popup/popup.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PrettyIDPipe} from '../../shared/pipe/pretty-id.pipe';
import {GLOBAL} from '../../shared/global';
import {BookingHeaderService} from '../booking-header/booking-header.service';

@Component({
    selector: 'app-booking-jobs',
    templateUrl: './booking-jobs.component.html',
    styleUrls: ['./booking-jobs.component.css']
})

export class BookingJobsComponent implements OnInit, OnDestroy {
    selectedBookingModel: Booking = new Booking();
    invitePressed = false;
    unAssignPressed = false;
    reAssignPressed = false;
    isCancelledOrUnableToServe = false;
    selectedActionableInterpreterID = -1;
    interpreterList: User[] = [];
    selectedInterpreterIDs: number[] = [];
    private sub: any;
    private dialogSub: any;
    dialogRef: MdDialogRef<any>;
    checkList = {};
    private headerSubscription;
    jobAccessError = false;
    disableAccept = false;
    disableReject = false;
    private currentStatus = 'Invited';
    stateStr = '';

    constructor(public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef, public spinnerService: SpinnerService,
                public notificationServiceBus: NotificationServiceBus,
                public userDataService: UserService, public bookingService: BookingService, public bookingHeaderService: BookingHeaderService,
                private router: Router, private route: ActivatedRoute) {

        /** http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription */
        this.sub = this.route.params.subscribe(params => {
            let param_id = params['id'] || '';
            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                this.fetchBookingInterpreters(param_id);
            }
        });

    }

    ngOnInit() {
        this.headerSubscription = this.bookingHeaderService.notifyObservable$.subscribe((res) => {
            this.callRelatedFunctions(res);
        });
    }

    callRelatedFunctions(res) {
        if (res.hasOwnProperty('option')) {
            switch (res.option) {
                case 'showDialogBox':
                    this.showDialogBox(res.value);
                    break;
                case 'showDialogBoxInterpreter':
                    this.showDialogBoxInterpreter(res.value);
                    break;
                case 'editBooking':
                    this.editBooking();
                    break;
                case 'duplicateBooking':
                    this.duplicateBooking();
                    break;
                case 'saveChanges':
                    this.saveChanges();
                    break;
            }
        }
    }

    counter(length) {
        return new Array(length);
    }

    getSpecialInstruction() {
        return (GLOBAL.currentUser instanceof OrganisationalRepresentative)
            ? GLOBAL.currentUser.special_instructions : '';

    }

    anyInterpreterAccepted() {
        return this.selectedBookingModel.interpreters.filter(i => i.state === 'Accepted').length > 0;
    }

    ngOnDestroy() {
        let sub = this.sub && this.sub.unsubscribe();
        let headerSub = this.headerSubscription && this.headerSubscription.unsubscribe();
        let dialSub = this.dialogSub && this.dialogSub.unsubscribe();
        return sub && headerSub && dialSub;
    }

    isActiveState(bookingStatus: string) {
        return BOOKING_STATE[this.selectedBookingModel.state].toLowerCase() === bookingStatus.toLowerCase();
    }

    isPassedState(bookingStatus: string) {
        return parseInt(this.selectedBookingModel.state.toString(), 10) >
            parseInt(BOOKING_STATE[bookingStatus].toString(), 10);
    }

    public showDialogBox(isCancel: Boolean) {
        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }

        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = isCancel ? 'Cancel Booking' : 'Unable To Service';
        this.dialogRef.componentInstance.cancelTitle = isCancel ? `Back to job` : 'Back to job';
        this.dialogRef.componentInstance.okTitle = isCancel ? `Cancel this job` : 'Unable to service this job';
        this.dialogRef.componentInstance.popupMessage =
            isCancel ? `Are you sure you want to cancel the booking?
          The client will be notified of this. This is a permanent action.` :
                `Are you sure you want to mark this booking as unable to service?
          The client will be notified of this. This is a permanent action.`;

        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
            if (result && !isCancel) {
                this.unableToServiceBooking();
            } else if (result && isCancel) {
                this.cancelBooking();
            }
        });
    }

    isCurrentUserInterpreter() {
        return GLOBAL.currentUser instanceof Interpreter;
    }

    unableToServiceBooking() {
        this.spinnerService.requestInProcess(true);
        this.bookingService.updateBookingByTransitioning(this.selectedBookingModel.id, 'unable_to_service')
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.selectedBookingModel.state = BOOKING_STATE.Unable_to_service;
                        this.isCancelledOrUnableToServe = true;
                        this.notificationServiceBus.launchNotification(false, 'The booking has been transitioned to \"Unable to Service\" state');
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    cancelBooking() {
        this.spinnerService.requestInProcess(true);
        this.bookingService.updateBookingByTransitioning(this.selectedBookingModel.id, 'cancelled')
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.selectedBookingModel.state = BOOKING_STATE.Cancelled;
                        this.isCancelledOrUnableToServe = true;
                        this.notificationServiceBus.launchNotification(false, 'The booking has been transitioned to \"Cancelled\" state');
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    duplicateBooking() {
        let navigationExtras: NavigationExtras = {
            queryParams: {bookingModel: JSON.stringify(this.selectedBookingModel)}
        };
        this.router.navigate(['/booking-management', 'create-booking'], navigationExtras);
    }

    editBooking() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                bookingModel: JSON.stringify(this.selectedBookingModel),
                shouldEdit: 'edit', assignedInterpreter: this.selectedBookingModel.interpreters.filter(i => i.state === 'Accepted').length
            }
        };
        this.router.navigate(['/booking-management', 'edit-booking'], navigationExtras);
    }

    onChange($event, user, ind) {
        let index = this.selectedInterpreterIDs.indexOf(user.id);
        if (index < 0) {
            this.selectedInterpreterIDs.push(user.id);
            this.checkList[ind] = true;
        } else {
            // delete this.selectedInterpreterIDs[user.id];
            this.selectedInterpreterIDs.splice(index, 1);
            this.checkList[ind] = false;

        }
    }

    fetchAllInterpreters() {
        // this.spinnerService.requestInProcess(true);
        this.userDataService.fetchUsersOfType('interpreters')
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.interpreterList = res.data.users.filter(i => i.verified === true);
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    fetchBookingInterpreters(param_id) {
        this.spinnerService.requestInProcess(true);
        this.bookingService.getBooking(param_id)
            .subscribe((res: any) => {
                    if (res.status === 404) {
                        this.jobAccessError = true;
                    } else if (res.status === 200) {
                        this.jobAccessError = false;
                        let data = res.data;
                        console.log("booking model "+JSON.stringify(data));
                        this.selectedBookingModel.fromJSON(data);
                        this.selectedBookingModel.interpreters.sort((i, j) =>
                            i.state === 'Accepted' ? -1 : j.state === 'Accepted' ? 1 : 0
                        );

                        this.fetchAllInterpreters();
                        this.isCancelledOrUnableToServe = this.isActiveState('Cancelled')
                            || this.isActiveState('Unable_to_service');

                        if (this.isCurrentUserInterpreter()) {
                            this.selectedBookingModel.interpreters.filter(i => i.id === GLOBAL.currentUser.id)
                                .map(i => this.currentStatus = i.state || 'Invited');

                            if (this.currentStatus === 'Accepted' && this.isCurrentUserInterpreter() &&
                                this.selectedBookingModel.state === BOOKING_STATE.In_progress) {
                                this.disableReject = false;
                                this.disableAccept = true;
                            } else if (this.currentStatus === 'Accepted' && this.isCurrentUserInterpreter() &&
                                this.selectedBookingModel.state === BOOKING_STATE.Allocated) {
                                this.disableReject = true;
                                this.disableAccept = true;
                            } else if (this.currentStatus === 'Rejected' && this.isCurrentUserInterpreter() &&
                                this.selectedBookingModel.state === BOOKING_STATE.In_progress) {
                                this.disableReject = true;
                                this.disableAccept = false;
                            } else if (this.currentStatus !== 'Accepted' && this.isCurrentUserInterpreter() &&
                                this.selectedBookingModel.state === BOOKING_STATE.Allocated) {
                                this.disableReject = true;
                                this.disableAccept = true;
                                /* Also Redirects */
                                this.router.navigate(['/booking-management']);
                            }

                            this.getStateString();
                        }
                    }
                    // this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.jobAccessError = true;
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    inviteInterpreters() {
        this.unAssignPressed = this.reAssignPressed = false;
        this.invitePressed = this.selectedInterpreterIDs.length > 0;
    }

    unAssignInterpreters(int_id: number) {
        this.invitePressed = this.reAssignPressed = false;
        this.unAssignPressed = true;
        this.selectedActionableInterpreterID = int_id;
    }

    reAssignInterpreters() {
        this.invitePressed = this.reAssignPressed = false;
        this.reAssignPressed = this.selectedInterpreterIDs.length > 0;
    }

    sendInvite(interpreters) {
        this.bookingService.inviteInterpreters(this.selectedBookingModel.id, interpreters)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.notificationServiceBus.launchNotification(false, 'The interpreters have been invited');
                        this.selectedBookingModel.state = BOOKING_STATE.In_progress;
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    sendReAssign(interpreters) {
        this.bookingService.reAssignInterpreter(this.selectedBookingModel.id, interpreters)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.notificationServiceBus.launchNotification(false, 'The interpreter have been assigned');
                    }
                    this.fetchBookingInterpreters(this.selectedBookingModel.id);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    sendUnAssign() {
        this.bookingService.unAssignInterpreter(this.selectedBookingModel.id, this.selectedActionableInterpreterID)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.notificationServiceBus.launchNotification(false, 'The interpreter have been unassigned');
                        this.selectedBookingModel.state = BOOKING_STATE.In_progress;
                    }
                    this.fetchBookingInterpreters(this.selectedBookingModel.id);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    saveChanges() {
        let selectedInt = [];
        this.checkList = {};
        this.spinnerService.requestInProcess(true);
        if (this.invitePressed) {
            for (let _id of this.selectedInterpreterIDs) {
                selectedInt.push(new Object({
                    id: _id
                }));
            }
            this.selectedInterpreterIDs = [];
            this.invitePressed = false;
            this.sendInvite(selectedInt);
        } else if (this.unAssignPressed) {
            this.unAssignPressed = false;
            this.sendUnAssign();
            this.selectedActionableInterpreterID = -1;
        } else if (this.reAssignPressed) {
            for (let _id of this.selectedInterpreterIDs) {
                selectedInt.push(new Object({
                    id: _id
                }));
            }
            this.selectedInterpreterIDs = [];
            this.reAssignPressed = false;
            this.sendReAssign(selectedInt);
            this.selectedActionableInterpreterID = -1;
        }
    }

    // BOOKING_STATE comparison is a mess, need to fix later
    getStateString() {
        this.stateStr =
            parseInt(this.selectedBookingModel.state.toString(), 10) ===
            parseInt(BOOKING_STATE.In_progress.toString(), 10) ? ' - ' + this.currentStatus : '';
        this.stateStr = BOOKING_STATE[this.selectedBookingModel.state].toUpperCase() + this.stateStr;
        this.stateStr = this.stateStr.replace(/_/g, ' ').trim();
    }

    public showDialogBoxInterpreter(isCancel: Boolean) {
        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }

        let config: MdDialogConfig = {
            disableClose: true
        };
        let reachoutWarning = (this.currentStatus === 'Accepted' && this.isCurrentUserInterpreter() &&
            this.selectedBookingModel.state === BOOKING_STATE.In_progress);
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = isCancel ? 'Decline Booking' : 'Accept Booking';
        this.dialogRef.componentInstance.cancelTitle = 'Back to job';
        this.dialogRef.componentInstance.okTitle = reachoutWarning ? 'OK' :
            isCancel ? `Decline` : 'Accept';
        this.dialogRef.componentInstance.popupMessage =
            reachoutWarning ? 'Please contact the booking office to cancel this booking.' :
                isCancel ? `Do you want to decline the invitation?` :
                    `Do you want to accept the invitation?`;

        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {

            if (result && !reachoutWarning) {
                this.spinnerService.requestInProcess(true);


                this.currentStatus =
                    (result && !isCancel) ? 'accept' : (result && isCancel) ? 'reject' : 'tentative';
                this.bookingService.interpreterAction(this.selectedBookingModel.id,
                    GLOBAL.currentUser.id, this.currentStatus)
                    .subscribe((res: any) => {

                            this.disableAccept = true;
                            this.disableReject = true;
                            this.spinnerService.requestInProcess(false);
                            this.fetchBookingInterpreters(this.selectedBookingModel.id);
                        },
                        err => {
                            this.spinnerService.requestInProcess(false);
                            let e = err.json() || 'There is some error on server side';
                            this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                        });
            }
        });
    }

    isCurrentUserState(state: string) {
        let currUser = this.selectedBookingModel.interpreters.filter(i => i.id === GLOBAL.currentUser.id);
        if (Boolean(currUser) && currUser.length > 0) {
            return state === currUser[0].state;
        }

        return false;
    }

}
