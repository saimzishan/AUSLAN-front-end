import {Component, OnInit} from '@angular/core';
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
export class BookingPayrollComponent implements OnInit {
  bookingModel: Booking = new Booking();
  private sub: any;

  constructor(public spinnerService: SpinnerService, public bookingService: BookingService,
              private route: ActivatedRoute, public notificationServiceBus: NotificationServiceBus) {
                this.sub = this.route.params.subscribe(params => {
                  let bookingID = params['id'] || '';
                  if (Boolean(bookingID) && parseInt(bookingID, 10) > 0) {
                      this.fetchBooking(bookingID);
                  }
              });
      }

  ngOnInit() { }

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

}
