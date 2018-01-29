import {Component, OnInit, OnDestroy} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import {SpinnerService} from '../../spinner/spinner.service';
import {GLOBAL} from '../../shared/global';
import {NotificationServiceBus} from '../../notification/notification.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {Payments} from '../../shared/model/payment.entity';

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
        this.payments.payroll_attributes = [];
        this.payments.invoice_attributes = [];
        this.spinnerService.requestInProcess(true);
        this.bookingService.getBookingPayments(bookingID).subscribe((res: any) => {
            if (res.status === 200) {
                this.payments.fromJSON('payroll', res.data.payments.payrolls);
                this.payments.fromJSON('invoice', res.data.payments.invoices);
            }
            this.spinnerService.requestInProcess(false);
        },
        err => {
            this.spinnerService.requestInProcess(false);
            let e = err.json() || 'There is some error on server side';
            this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
        });
    }

    updatePayment(payroll_form: any) {
        if (payroll_form.invalid) {
            this.notificationServiceBus.launchNotification(true, 'Oops! Only numbers and dots allowed. Please try again.');
            return;
        }
        this.spinnerService.requestInProcess(true);
        this.payments.timeDistanceConversion('payroll', this.payments.payroll_attributes);
        this.payments.timeDistanceConversion('invoice', this.payments.invoice_attributes);
        this.bookingService.updateBookingPayments(this.bookingModel.id, this.payments).subscribe((res: any) => {
            if (res.status === 204) {
                this.notificationServiceBus.launchNotification(false, 'Hurray! Changes saved successfully.');
                this.fetchBookingPayment(this.bookingModel.id);
            }
            this.spinnerService.requestInProcess(false);
        },
        err => {
            this.spinnerService.requestInProcess(false);
            let e = err.json() || 'There is some error on server side';
            this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
        });
    }

    cbChanged(payrollInvoice: string, field: string, index) {
            if (payrollInvoice === 'payroll_attributes') {
                if (field === 'pay_interpreter') {
                    if (this.payments[payrollInvoice][index][field]) {
                         let startDate = moment(this.bookingModel.venue.start_time_iso);
                         let endDate = moment(this.bookingModel.venue.end_time_iso);
                         let duration = moment.duration(endDate.diff(startDate));

                        this.payments[payrollInvoice][index]['interpreting_time'] = duration.hours() + ':' + duration.minutes();
                        this.payments[payrollInvoice][index]['preparation_time'] = 0;
                    } else {
                        this.payments[payrollInvoice][index]['pay_travel'] = false;
                        ['interpreting_time', 'preparation_time', 'distance', 'travel_time'].forEach(distTime => {
                            this.payments[payrollInvoice][index][distTime] = 0;
                        });
                    }
                } else {
                    if (!this.payments[payrollInvoice][index][field]) {
                        this.payments[payrollInvoice][index]['distance'] = this.payments[payrollInvoice][index]['travel_time'] = 0;
                    }
                }
            } else {
                if (field === 'invoice_client') {
                    if (this.payments[payrollInvoice][index][field]) {
                        ['interpreting_time', 'preparation_time', 'travel_time'].forEach(time => {
                            this.payments[payrollInvoice][index][time] = this.payments.payroll_attributes[index][time];
                        });
                    } else {
                        this.payments[payrollInvoice][index]['charge_travel'] = false;
                        ['interpreting_time', 'preparation_time', 'distance', 'travel_time'].forEach(distTime => {
                            this.payments[payrollInvoice][index][distTime] = 0;
                        });
                    }
                } else {
                    if (this.payments[payrollInvoice][index][field]) {
                        ['distance', 'travel_time'].forEach(distTime => {
                            this.payments[payrollInvoice][index][distTime] = this.payments.payroll_attributes[index][distTime];
                        });
                    } else {
                        this.payments[payrollInvoice][index]['distance'] = this.payments[payrollInvoice][index]['travel_time'] = 0;
                    }
                }
            }
    }

}
