import {Component, OnInit, Input, ViewContainerRef, AfterViewChecked, OnDestroy} from '@angular/core';
import {BookingService} from '../../api/booking.service';
import {Booking} from '../../shared/model/booking.entity';
import {BookingInterpreters} from '../../shared/model/contact.entity';
import {UserService} from '../../api/user.service';
import {IndividualClient, OrganisationalRepresentative, User} from '../../shared/model/user.entity';
import {ROLE} from '../../shared/model/role.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {ActivatedRoute} from '@angular/router';
import {Router, NavigationExtras} from '@angular/router';
import {BOOKING_STATUS} from '../../shared/model/booking-status.enum';
import {PopupComponent} from '../../shared/popup/popup.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PrettyIDPipe} from '../../shared/pipe/pretty-id.pipe';
import {GLOBAL} from '../../shared/global';


@Component({
    selector: 'app-booking-jobs',
    templateUrl: './booking-jobs.component.html',
    styleUrls: ['./booking-jobs.component.css']
})

export class BookingJobsComponent implements OnDestroy {
    selectedBookingModel: Booking = new Booking();
    invitePressed = false;
    isCancelledOrUnableToServe = false;

    interpreterList: User[] = [];
    selectedInterpreterIDs: number[] = [];
    private sub: any;
    private dialogSub: any;
    dialogRef: MdDialogRef<any>;

    constructor(public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef, public spinnerService: SpinnerService,
                public notificationServiceBus: NotificationServiceBus,
                public userDataService: UserService, public bookingService: BookingService,
                private router: Router, private route: ActivatedRoute) {

        /** http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription */
        this.sub = this.route.params.subscribe(params => {
            let param_id = params['id'] || '';
            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                this.fetchBookingInterpreters(param_id);
            }
        });
    }

    getSpecialInstruction() {
        return (GLOBAL.currentUser instanceof OrganisationalRepresentative)
           ? GLOBAL.currentUser.special_instructions : '';

    }

    anyInterpreterAccepted() {
        return this.selectedBookingModel.interpreters.filter(i => i.state === 'Accepted').length > 0;
    }

    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe()
            && this.dialogSub && this.dialogSub.unsubscribe();
    }

    isActiveState(bookingStatus: string) {
        return BOOKING_STATUS[this.selectedBookingModel.state].toLowerCase() === bookingStatus.toLowerCase();
    }

    isPassedState(bookingStatus: string) {
        return parseInt(this.selectedBookingModel.state.toString(), 10) >
            parseInt(BOOKING_STATUS[bookingStatus].toString(), 10);
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
          The client will be notified of this. This is a permanent action.`
                :
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

    unableToServiceBooking() {
        this.spinnerService.requestInProcess(true);
        this.bookingService.updateBookingByTransitioning(this.selectedBookingModel.id, 'unable_to_service')
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.selectedBookingModel.state = BOOKING_STATUS.Unable_to_service;
                        this.isCancelledOrUnableToServe = true;
                        this.notificationServiceBus.
                        launchNotification(false, 'The booking has been transitioned to \"Unable to Service\" state');
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
                        this.selectedBookingModel.state = BOOKING_STATUS.Cancelled;
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

    onChange($event, user) {
        let index = this.selectedInterpreterIDs.indexOf(user.id);
        if (index < 0) {
            this.selectedInterpreterIDs.push(user.id);
        } else {
            // delete this.selectedInterpreterIDs[user.id];
            this.selectedInterpreterIDs.splice(index, 1);

        }
    }

    fetchAllInterpreters() {
        // this.spinnerService.requestInProcess(true);
        this.userDataService.fetchUsersOfType('interpreters')
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.interpreterList = res.data.users.filter( i => i.verified === true);
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
                    if (res.status === 200) {
                        let data = res.data;
                        this.selectedBookingModel.fromJSON(data);
                        this.fetchAllInterpreters();
                        this.isCancelledOrUnableToServe = this.isActiveState('Cancelled')
                            || this.isActiveState('Unable_to_service');
                    }
                    // this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    isInvited(id: number) {
        let res = this.selectedBookingModel.interpreters.filter(i => i.id === id);
        return (res.length > 0);
    }

    isNotConfirmed(id: number) {
        let res = this.selectedBookingModel.interpreters.filter(i => i.id === id && i.state !== 'Accepted');
        return (res.length > 0);
    }

    inviteInterpreters() {
        this.invitePressed = this.selectedInterpreterIDs.length > 0;
    }

    sendInvite(interpreters) {
        this.bookingService.inviteInterpreters(this.selectedBookingModel.id, interpreters)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.notificationServiceBus.launchNotification(false, 'The interpreters have been invited');
                        this.selectedBookingModel.state = BOOKING_STATUS.In_progress;
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    saveChanges() {
        this.spinnerService.requestInProcess(true);

        let selectedInt = [];
        for (let _id of this.selectedInterpreterIDs) {
            selectedInt.push(new Object({
                id: _id
            }));
        }
        this.selectedBookingModel.interpreters = selectedInt;
        this.selectedInterpreterIDs = [];
        this.invitePressed = false;
        this.sendInvite(selectedInt);
    }
}
