import {Component, OnInit, ViewContainerRef, OnDestroy, ViewChild} from '@angular/core';
import {BookingService} from '../../api/booking.service';
import {Booking} from '../../shared/model/booking.entity';
import {UserService} from '../../api/user.service';
import {
    Administrator, BookingOfficer, Interpreter, OrganisationalRepresentative,
    User
} from '../../shared/model/user.entity';
import {SpinnerService} from '../../spinner/spinner.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {ActivatedRoute} from '@angular/router';
import {Router, NavigationExtras} from '@angular/router';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {PopupComponent} from '../../shared/popup/popup.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {GLOBAL} from '../../shared/global';
import {BookingHeaderService} from '../booking-header/booking-header.service';
import {LinkidPopupComponent} from '../linkid-popup/linkid-popup.component';
import * as moment from 'moment';
import * as $ from 'jquery';
import {CalendarComponent} from 'ap-angular2-fullcalendar';
import {AvailabilityBlock} from '../../shared/model/availability-block.entity';
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
    unlinkPressed = false;
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
    hideInvite = false;
    hideAccept = false;
    showCalendar = false;
    startTime: Date;
    endTime: Date;
    timelineChartData = {
        chartType: 'Timeline',
        dataTable: [],
        options: {
            colors: ['red'],
            timeline: { groupByRowLabel: true },
            hAxis: {
                minValue: new Date(0, 0, 0, 5, 30, 0),
                maxValue: new Date(0, 0, 0, 13, 30, 0)
            }
        },
    };


    @ViewChild('cchart') cchart;

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
                case 'unlinkBooking':
                    this.unlinkBooking();
                    break;
                case 'linkBooking':
                    this.linkBooking();
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

        if (this.isCurrentUserAdminOrBookingOfficer() && this.selectedBookingModel.link_id) {
            this.linkedBookingConfirmation(isCancel);
        } else {

            let config: MdDialogConfig = {
                disableClose: true
            };
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(PopupComponent, config);
            this.dialogRef.componentInstance.title = isCancel ? 'Cancel Booking' : 'Unable To Service';
            this.dialogRef.componentInstance.cancelTitle = 'Back to job';
            this.dialogRef.componentInstance.okTitle = isCancel ? `Cancel this job` : 'Unable to service this job';
            this.dialogRef.componentInstance.popupMessage =
                isCancel ? `Are you sure you want to cancel the booking?
          The client will be notified of this. This is a permanent action.` :
                    `Are you sure you want to mark this booking as unable to service?
          The client will be notified of this. This is a permanent action.`;

            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.changeBookingState(isCancel);
                }
            });
        }
    }

    linkedBookingConfirmation(isCancel: Boolean) {
        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = isCancel ? 'Cancel linked booking' : 'Unable to service linked booking';
        this.dialogRef.componentInstance.cancelTitle = isCancel ? 'Cancel all bookings' : 'Unable to service all bookings';
        this.dialogRef.componentInstance.okTitle = isCancel ? 'Cancel only this booking' : 'Unable to service this booking';
        this.dialogRef.componentInstance.popupMessage =
            isCancel ? `Would you like to cancel only this booking, or
          all linked bookings?` :
                `Would you like to mark this booking as unable to service, or
          all linked bookings?`;

        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
            this.changeBookingState(isCancel, !result);
        });
    }

    isCurrentUserInterpreter() {
        return GLOBAL.currentUser instanceof Interpreter;
    }

    isCurrentUserAdminOrBookingOfficer(): boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer);
    }

    showActions() {
        return this.selectedBookingModel.state === BOOKING_STATE.In_progress && this.isCurrentUserInterpreter();
    }

    changeBookingState(isCancel: Boolean, update_all_linked_bookings?: boolean) {
        let state = isCancel ? 'cancelled_no_charge' : 'unable_to_service';
        let stateMsg = isCancel ? 'Cancelled with No Charge' : 'Unable to Service';

        this.spinnerService.requestInProcess(true);
        this.bookingService.updateBookingByTransitioning(this.selectedBookingModel.id, state, update_all_linked_bookings)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.selectedBookingModel.state = isCancel ? BOOKING_STATE.Cancelled_no_charge : BOOKING_STATE.Unable_to_service;
                        this.isCancelledOrUnableToServe = true;
                        this.notificationServiceBus.launchNotification(false, 'The booking has been transitioned to \"' + stateMsg + '\" state');
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

    linkBooking() {
        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(LinkidPopupComponent, config);
        this.dialogRef.componentInstance.bookingId = this.selectedBookingModel.id;
        this.dialogSub = this.dialogRef.afterClosed().subscribe((selectedLinkId: any) => {
            if (+selectedLinkId) {
                this.selectedBookingModel.link_id = Number(selectedLinkId);
                this.selectedBookingModel.new_link_id_required = false;
                this.selectedBookingModel.update_all_linked_bookings = false;
            } else if (selectedLinkId === 'New linked booking') {
                this.selectedBookingModel.link_id = null;
                this.selectedBookingModel.new_link_id_required = true;
                this.selectedBookingModel.update_all_linked_bookings = false;
            }

            if (selectedLinkId) {
                this.saveChanges();
            }
        });
    }

    unlinkBooking() {
        this.unlinkPressed = true;
        this.selectedBookingModel.link_id = null;
        this.selectedBookingModel.update_all_linked_bookings = false;
        this.selectedBookingModel.new_link_id_required = false;
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
            this.selectedInterpreterIDs.splice(index, 1);
            this.checkList[ind] = false;
        }
        let hide_invite = false;
        let hide_accept = this.selectedInterpreterIDs.length > this.selectedBookingModel.interpreters_required;
        for (let uid of this.selectedInterpreterIDs) {
            let inte: Interpreter;
            this.interpreterList.filter(i => i.id === uid).map(u => inte = <Interpreter>u);
            hide_invite = hide_invite === false ?
                inte && (inte.booked || inte.blocked || inte.blockout
                ||  this.selectedBookingModel.interpreters
                    .filter(i => i.state === 'Accepted' &&
                        inte.id === i.id).length > 0) : hide_invite;
            hide_accept = hide_accept === false ?
                inte && (inte.booked || inte.blocked
                ||  this.selectedBookingModel.interpreters
                    .filter(i => i.state === 'Accepted' &&
                        inte.id === i.id).length > 0) : hide_accept;
        }
        this.hideAccept = hide_accept;
        this.hideInvite = hide_invite;
    }
    getInterpreterIconClass(user: Interpreter) {
        return user.booked ? 'fa fa-times-circle' :
            user.blocked ? 'fa fa-ban' :
                user.blockout ? 'fa fa-exclamation-circle fa-danger' :
                    '';
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
    fetchNearbyinterpreters(booking_id) {
        this.bookingService.nearbyBookings(booking_id)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.interpreterList = res.data.users;
                    }
                    this.showCalendar = true;
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
                        this.selectedBookingModel.fromJSON(data);
                        this.selectedBookingModel.interpreters.sort((i, j) =>
                            i.state === 'Accepted' ? -1 : j.state === 'Accepted' ? 1 : 0
                        );
                        this.isCancelledOrUnableToServe = this.isActiveState('Cancelled_no_charge')
                            || this.isActiveState('Unable_to_service') || this.isActiveState('Cancelled_chargeable');

                        this.selectedBookingModel.venue.start_time_iso = this.selectedBookingModel.utcToBookingTimeZone(this.selectedBookingModel.venue.start_time_iso);
                        this.selectedBookingModel.venue.end_time_iso = this.selectedBookingModel.utcToBookingTimeZone(this.selectedBookingModel.venue.end_time_iso);
                        this.startTime = new Date(this.selectedBookingModel.venue.start_time_iso);
                        this.endTime = new Date(this.selectedBookingModel.venue.end_time_iso);
                        this.timelineChartData.options.hAxis.minValue = new Date(0, 0, 0, this.startTime.getHours() - 2 , 0, 0);
                        this.timelineChartData.options.hAxis.maxValue = new Date(0, 0, 0, this.endTime.getHours() + 2 , 0, 0);
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
                            if (this.selectedBookingModel.state === BOOKING_STATE.Service_completed) {
                                this.disableReject = true;
                                this.disableAccept = true;
                            }
                            this.getStateString();
                        }
                    }
                    if (this.isCurrentUserAdminOrBookingOfficer()) {
                        this.fetchNearbyinterpreters(param_id);
                    } else {
                        this.spinnerService.requestInProcess(false);
                    }
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

    private updateSelectedBookingModel = () => {
        this.bookingService.updateBooking(this.selectedBookingModel.id, this.selectedBookingModel)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.spinnerService.requestInProcess(false);
                        this.notificationServiceBus.launchNotification(false, 'The Booking has been Updated.');
                        this.fetchBookingInterpreters(this.selectedBookingModel.id);
                    }
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || {errors: 'There booking could not be updated. Please try after some time.'};
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }
    interpreterHasBlockoutDialog (selectedInt) {
            if (this.dialogSub) {
                this.dialogSub.unsubscribe();
            }

            let config: MdDialogConfig = {
                disableClose: true
            };
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(PopupComponent, config);
            this.dialogRef.componentInstance.title = 'Interpreter With A Blockout';
            this.dialogRef.componentInstance.cancelTitle = 'Back to job';
            this.dialogRef.componentInstance.okTitle = 'YES';
            this.dialogRef.componentInstance.popupMessage = `One or more interpreters have a blockout within the booking time. Do you still want to assign?`;
        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.spinnerService.requestInProcess(true);

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
        });
    }
    saveChanges() {
        let selectedInt = [];
        let warnInterpreterWithBlockout = false;
        this.checkList = {};
        if (this.invitePressed) {
            this.spinnerService.requestInProcess(true);

            for (let _id of this.selectedInterpreterIDs) {
                selectedInt.push(new Object({
                    id: _id
                }));
            }
            this.selectedInterpreterIDs = [];
            this.invitePressed = false;
            this.sendInvite(selectedInt);
        } else if (this.unAssignPressed) {
            this.spinnerService.requestInProcess(true);
            this.unAssignPressed = false;
            this.sendUnAssign();
            this.selectedActionableInterpreterID = -1;
        } else if (this.reAssignPressed) {
            for (let inte of this.interpreterList) {
                if ( (<Interpreter>inte).blockout) {
                    warnInterpreterWithBlockout = true;
                    break;
                }
            }
            if (warnInterpreterWithBlockout) {
                this.interpreterHasBlockoutDialog(selectedInt);

            } else {
                this.spinnerService.requestInProcess(true);

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
        } else if (this.unlinkPressed) {
            this.spinnerService.requestInProcess(true);
            this.unlinkPressed = false;
            this.updateSelectedBookingModel();
        } else {
            this.spinnerService.requestInProcess(true);
            this.updateSelectedBookingModel();
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

    travelPayStatus(interpreter) {
        if (interpreter.distance === '-') {
            return '-';
        } else {
            return interpreter.travel_pay ? 'Yes' : 'No';
        }
    }

    isPreferred(user_id) {
        return this.interpreterOfTypeExists('preferred', user_id);

    }

    isStaff(user) {
        return false;
    }

    getSuburb(user: Interpreter) {
        return user.address_attributes.suburb;
    }

    stringifyUser(user) {
        return JSON.stringify(user);
    }
    getTimelineBlockoutStyle (avail_block) {
        let toRet = '';
        let sd = new Date(avail_block.start_time);
        if (sd.toLocaleDateString() === this.startTime.toLocaleDateString()) {
            let edt = new Date(avail_block.end_time);
            let cells = '';
            let offset = '';
            let st = this.startTime.getHours() - 2;
            if (sd.getHours() >= st) {
                offset = 'offset' + (sd.getHours() - st);
                cells = 'cells' + (edt.getHours() - sd.getHours());

            }  else if (sd.getHours() < st) {

                offset = 'offset' + (st - sd.getHours() > 1 ? '' : (st - sd.getHours()));
                cells = 'cells' + (edt.getHours() - sd.getHours());

            }
            toRet = cells + ' ' + offset + ' pink';
        }
        console.log(toRet);
        return toRet;
    }
    getTimelineMoverStyle () {
        let diff = Math.abs(this.endTime.getTime() - this.startTime.getTime()) / 36e5;
        return 'cells' + diff  + ' offset2';
    }
    getTimelineStartTime () {
        let array = [];
        let dt = new Date();
        dt.setTime(this.startTime.getTime());
        dt.setHours( dt.getHours() - 2 );
        for (let i = 0; i < 7; i++) {
            let amPm = dt.getHours() >= 12 ? 'pm' : 'am';
            array.push(dt.getHours() + ' ' + amPm);
            dt.setHours( dt.getHours() + 1 );

        }
        return array;
    }
    interpreterOfTypeExists ( type: string, user_id: string) {
        let blocked_int =
            this.selectedBookingModel.preference_allocations_attributes.filter(i =>
                i.preference === type);
        return blocked_int.filter(
            i => i.interpreter_id === user_id
        ).length > 0;
    }
}
