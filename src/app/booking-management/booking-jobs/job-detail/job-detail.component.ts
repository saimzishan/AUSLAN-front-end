import {Component, OnInit, Input, ViewContainerRef, AfterViewChecked, OnDestroy} from '@angular/core';
import {BookingService} from '../../../api/booking.service';
import {Booking} from '../../../shared/model/booking.entity';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {Router, NavigationExtras} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {PrettyIDPipe} from '../../../shared/pipe/pretty-id.pipe';
import {BOOKING_STATUS} from '../../../shared/model/booking-status.enum';
import {MobileFooterModule} from '../../../ui/mobile-footer/mobile-footer.module';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PopupComponent} from '../../../shared/popup/popup.component';
import {GLOBAL} from '../../../shared/global';
import {Interpreter, OrganisationalRepresentative} from '../../../shared/model/user.entity';


@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})

export class JobDetailComponent implements OnDestroy {
    selectedBookingModel: Booking = new Booking();
    private sub: any;
    private currentStatus = 'Invited';
    disableAccept = false;
    disableReject = false;
    private dialogSub: any;
    dialogRef: MdDialogRef<any>;
    stateStr = '';
    jobAccessError = false;

    constructor(public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef,
                public spinnerService: SpinnerService,
                public notificationServiceBus: NotificationServiceBus,
                public bookingService: BookingService,
                private router: Router, private route: ActivatedRoute) {

        this.sub = this.route.params.subscribe(params => {
            let param_id = params['id'] || '';
            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                this.getJobDetail(param_id);
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

    public showDialogBox(isCancel: Boolean) {
        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }

        let config: MdDialogConfig = {
            disableClose: true
        };
        let reachoutWarning = (this.currentStatus === 'Accepted' && this.isCurrentUserInterpreter() &&
            this.selectedBookingModel.state === BOOKING_STATUS.In_progress);
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = isCancel ? 'Decline Booking' : 'Accept Booking';
        this.dialogRef.componentInstance.cancelTitle = 'Back to job';
        this.dialogRef.componentInstance.okTitle = reachoutWarning ? 'OK' :
            isCancel ? `Decline` : 'Accept';
        this.dialogRef.componentInstance.popupMessage =
            reachoutWarning ? 'Please contact the booking office to cancel this booking.' :
                isCancel ? `Do you want to decline the invitation?`
                    :
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
                            this.getJobDetail(this.selectedBookingModel.id);
                        },
                        err => {
                            this.spinnerService.requestInProcess(false);
                            let e = err.json() || 'There is some error on server side';
                            this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                        });
            }
        });
    }

    isActiveState(bookingStatus: string) {
        return BOOKING_STATUS[this.selectedBookingModel.state].toLowerCase() === bookingStatus.toLowerCase();
    }

    isPassedState(bookingStatus: string) {
        return parseInt(this.selectedBookingModel.state.toString(), 10) >
            parseInt(BOOKING_STATUS[bookingStatus].toString(), 10);
    }

    // BOOKING_STATUS comparison is a mess, need to fix later
    getStateString() {
        this.stateStr =
            parseInt(this.selectedBookingModel.state.toString(), 10) ===
            parseInt(BOOKING_STATUS.In_progress.toString(), 10) ? ' - ' + this.currentStatus : '';
        this.stateStr = BOOKING_STATUS[this.selectedBookingModel.state].toUpperCase() + this.stateStr;
        this.stateStr = this.stateStr.trim();

    }

    isCurrentUserInterpreter() {
        return GLOBAL.currentUser instanceof Interpreter;
    }

    getJobDetail(param_id) {
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
                        this.selectedBookingModel.interpreters.filter(i => i.id === GLOBAL.currentUser.id)
                            .map(i => this.currentStatus = i.state || 'Invited');

                        if (this.currentStatus === 'Accepted' && this.isCurrentUserInterpreter() &&
                            this.selectedBookingModel.state === BOOKING_STATUS.In_progress) {
                            this.disableReject = false;
                            this.disableAccept = true;
                        } else if (this.currentStatus === 'Accepted' && this.isCurrentUserInterpreter() &&
                            this.selectedBookingModel.state === BOOKING_STATUS.Allocated) {
                            this.disableReject = true;
                            this.disableAccept = true;
                        } else if (this.currentStatus === 'Rejected' && this.isCurrentUserInterpreter() &&
                            this.selectedBookingModel.state === BOOKING_STATUS.In_progress) {
                            this.disableReject = true;
                            this.disableAccept = false;
                        } else if (this.currentStatus !== 'Accepted' && this.isCurrentUserInterpreter() &&
                            this.selectedBookingModel.state === BOOKING_STATUS.Allocated) {
                            this.disableReject = true;
                            this.disableAccept = true;
                            /* Also Redirects */
                            this.router.navigate(['/booking-management']);
                        }
                        /** Accept Button Disable Logic
                         this.disableAccept = !this.isCurrentUserInterpreter() ||
                         this.selectedBookingModel.state === BOOKING_STATUS.Allocated ||
                         this.currentStatus === 'Rejected' ? false :
                         this.currentStatus === 'Accepted';
                         this.disableReject = !this.isCurrentUserInterpreter() ? true :
                         this.selectedBookingModel.state ===
                         BOOKING_STATUS.Allocated ? true : this.currentStatus === 'Rejected'
                         || this.currentStatus === 'Accepted';
                         */
                        this.getStateString();
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.jobAccessError = true;

                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }


    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe()
            && this.dialogSub && this.dialogSub.unsubscribe();
    }
}
