import {Component, OnInit, OnDestroy} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import {SpinnerService} from '../../spinner/spinner.service';
import {GLOBAL} from '../../shared/global';
import {NotificationServiceBus} from '../../notification/notification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking-payroll',
  templateUrl: './booking-payroll.component.html',
  styleUrls: ['./booking-payroll.component.css']
})
export class BookingPayrollComponent implements OnInit, OnDestroy {
  bookingModel: Booking = new Booking();
  private sub: any;
  payments = new Payments();

  constructor(public spinnerService: SpinnerService, public bookingService: BookingService,
              private route: ActivatedRoute, public notificationServiceBus: NotificationServiceBus) {
                this.sub = this.route.params.subscribe(params => {
                  let bookingID = params['id'] || '';
                  if (Boolean(bookingID) && parseInt(bookingID, 10) > 0) {
                      this.fetchBookingPayment(bookingID);
                      this.fetchBooking(bookingID);
                  }
              });
      }

  ngOnInit() { }

  ngOnDestroy() {
       return this.sub && this.sub.unsubscribe();
  }

  fetchBooking(bookingID) {
    this.spinnerService.requestInProcess(true);
    this.bookingService.getBooking(bookingID)
        .subscribe((res: any) => {
                if (res.status === 200) {
                    let data = res.data;
                    this.bookingModel.fromJSON(data);
                    this.bookingModel.venue.start_time_iso = this.bookingModel.utcToBookingTimeZone(this.bookingModel.venue.start_time_iso);
                    this.bookingModel.venue.end_time_iso = this.bookingModel.utcToBookingTimeZone(this.bookingModel.venue.end_time_iso);
                }
                this.spinnerService.requestInProcess(false);
            },
            err => {
                this.spinnerService.requestInProcess(false);
                let e = err.json() || 'There is some error on server side';
                this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
            });
    }

    fetchBookingPayment(bookingID) {
        this.spinnerService.requestInProcess(true);
        this.bookingService.getBookingPayments(bookingID).subscribe((res: any) => {
            if (res.status === 200) {
                this.payments.payroll_attributes = res.data.payments.payrolls;
                this.payments.invoice_attributes = res.data.payments.invoices;
            }
            this.spinnerService.requestInProcess(false);
        },
        err => {
            this.spinnerService.requestInProcess(false);
            let e = err.json() || 'There is some error on server side';
            this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
        });
    }

    updatePayment() {
        this.spinnerService.requestInProcess(true);
        this.bookingService.updateBookingPayments(this.bookingModel.id, this.payments).subscribe((res: any) => {
            if (res.status === 204) {
                this.notificationServiceBus.launchNotification(false, 'Hurray! Changes saved successfully.');
            }
            this.spinnerService.requestInProcess(false);
        },
        err => {
            this.spinnerService.requestInProcess(false);
            let e = err.json() || 'There is some error on server side';
            this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
        });
    }

}

export class Payments {
    public payroll_attributes = [];
    public invoice_attributes = [];
}
