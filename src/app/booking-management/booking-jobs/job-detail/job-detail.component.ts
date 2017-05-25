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
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import {PopupComponent} from '../../../shared/popup/popup.component';

declare var $: any;

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})

export class JobDetailComponent implements AfterViewChecked, OnDestroy {
    selectedBookingModel: Booking = new Booking();
    private sub: any;

    private dialogSub: any;
    dialogRef: MdDialogRef<any>;

    constructor(
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef, public spinnerService: SpinnerService,
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


    public showDialogBox(isCancel: Boolean) {
        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }

        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = isCancel ? 'Decline Booking' : 'Accept Booking';
        this.dialogRef.componentInstance.cancelTitle =  'Back to job';
        this.dialogRef.componentInstance.okTitle = isCancel ? `Decline` : 'Accept';
        this.dialogRef.componentInstance.popupMessage =
            isCancel ? `Are you sure you want to decline the invitation?
          The client will be notified of this. This is a permanent action.`
                :
                `Are you sure you want to accept the invitation?
          The client will be notified of this. This is a permanent action.`;

        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
            if (result && !isCancel) {
                // Accept the Booking

            } else if (result && isCancel) {
// Decline the Booking
            }
        });
    }

    isState(bookingStatus: string) {
        return BOOKING_STATUS[this.selectedBookingModel.state].toLowerCase() === bookingStatus.toLowerCase();
    }

    getStateString() {
        return BOOKING_STATUS[this.selectedBookingModel.state].toLowerCase();
    }

    getJobDetail(param_id) {
        this.spinnerService.requestInProcess(true);
        this.bookingService.getBooking(param_id)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        let data = res.data;
                        this.selectedBookingModel.fromJSON(data);
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    ngAfterViewChecked() {
        $(document).foundation();
    }

    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe()
            && this.dialogSub && this.dialogSub.unsubscribe();
    }
}
