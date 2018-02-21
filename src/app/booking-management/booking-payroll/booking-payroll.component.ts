import {Component, OnInit, OnDestroy} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import {SpinnerService} from '../../spinner/spinner.service';
import {GLOBAL} from '../../shared/global';
import {NotificationServiceBus} from '../../notification/notification.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {Payments} from '../../shared/model/payment.entity';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {Administrator, BookingOfficer} from '../../shared/model/user.entity';

@Component({
  selector: 'app-booking-payroll',
  templateUrl: './booking-payroll.component.html',
  styleUrls: ['./booking-payroll.component.css']
})
export class BookingPayrollComponent implements OnInit, OnDestroy {
  bookingModel: Booking = new Booking();
  private sub: any;
  payments = new Payments();
  oldPayments;
  claimPressed = false;
  undoClaimPressed = false;
  isReadonlyForBO = false;

  constructor(public spinnerService: SpinnerService, public bookingService: BookingService,
              private route: ActivatedRoute, public notificationServiceBus: NotificationServiceBus) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          let bookingID = params['id'] || '';
          if (Boolean(bookingID) && parseInt(bookingID, 10) > 0) {
              this.fetchBookingPayment(bookingID);
              this.fetchBooking(bookingID);
          }
      });
  }

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
                    this.isReadonlyForBO = (GLOBAL.currentUser instanceof BookingOfficer &&
                                            this.bookingModel.state === BOOKING_STATE.Claimed);
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
                this.oldPayments = this.deepCopy(this.payments);
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

        if (this.claimPressed || this.undoClaimPressed) {
            let state = this.claimPressed ? 'claimed' : 'service_completed';
            this.changeBookingState(state);
        } else {
            this.savePayment();
        }
    }

    savePayment() {
        this.spinnerService.requestInProcess(true);
        this.bookingService.updateBookingPayments(this.bookingModel.id, this.payments).subscribe((res: any) => {
            if (res.status === 204) {
                this.notificationServiceBus.launchNotification(false, 'Hurray! Payroll & Billing details have been updated.');
            }
            this.spinnerService.requestInProcess(false);
        },
        err => {
            this.spinnerService.requestInProcess(false);
            let e = err.json() || 'There is some error on server side';
            this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
        });
    }

    changeBookingState(state: string) {
        this.spinnerService.requestInProcess(true);
        this.bookingService.updateBookingByTransitioning(this.bookingModel.id, state)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        let msg = this.claimPressed ? 'Claimed' : 'Service Completed';
                        this.notificationServiceBus.launchNotification(false, 'The booking has been transitioned to \"' + msg + '\" state');
                        this.claimPressed = this.undoClaimPressed = false;
                        this.fetchBooking(this.bookingModel.id);
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
                        this.payments[payrollInvoice][index]['interpreting_time'] = this.payments[payrollInvoice][index]['recommended']['interpreting_time'];
                        this.payments[payrollInvoice][index]['preparation_time'] = '0:00';
                        this.setRecommendedDistanceTravelTime(payrollInvoice, index);
                    } else {
                        this.payments[payrollInvoice][index]['pay_travel'] = false;
                        this.resetTimeDistance(payrollInvoice, index);
                    }
                } else {
                    if (this.payments[payrollInvoice][index][field]) {
                        this.setRecommendedDistanceTravelTime(payrollInvoice, index);
                    } else {
                        this.setDistanceTravelTimeZero(payrollInvoice, index);
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
                        this.resetTimeDistance(payrollInvoice, index);
                    }
                } else {
                    if (this.payments[payrollInvoice][index][field]) {
                        this.setRecommendedDistanceTravelTime(payrollInvoice, index);
                    } else {
                        this.setDistanceTravelTimeZero(payrollInvoice, index);
                    }
                }
            }
    }

    setDistanceTravelTimeZero(payrollInvoice: string, index) {
        this.payments[payrollInvoice][index]['distance'] = 0;
        this.payments[payrollInvoice][index]['travel_time'] = '0:00';
    }

    resetTimeDistance(payrollInvoice: string, index) {
        ['interpreting_time', 'preparation_time', 'distance', 'travel_time'].forEach(distTime => {
            this.payments[payrollInvoice][index][distTime] = (distTime === 'distance') ? 0 : '0:00';
        });
    }

    setRecommendedDistanceTravelTime(payrollInvoice: string, index) {
        ['distance', 'travel_time'].forEach(distTime => {
            this.payments[payrollInvoice][index][distTime] = this.payments[payrollInvoice][index]['recommended'][distTime];
        });
    }

    deepCopy(oldObj: any) {
            let newObj = JSON.parse(JSON.stringify(oldObj));
            return newObj;
    }

    isStateCompleteOrCancelCharge() {
        return this.bookingModel.state === BOOKING_STATE.Service_completed ||
                this.bookingModel.state === BOOKING_STATE.Cancelled_chargeable;
    }

    isActiveState(bookingState: string) {
        return BOOKING_STATE[this.bookingModel.state].toLowerCase() === bookingState.toLowerCase();
    }

    isCurrentUserAdmin() {
        return GLOBAL.currentUser instanceof Administrator;
    }
}
