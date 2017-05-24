import { Component, OnInit, Input, ViewContainerRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { BookingService } from '../../../api/booking.service';
import { Booking } from '../../../shared/model/booking.entity';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PrettyIDPipe } from '../../../shared/pipe/pretty-id.pipe';
import { BOOKING_STATUS } from '../../../shared/model/booking-status.enum';

declare var $: any;

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})

export class JobDetailComponent implements AfterViewChecked, OnDestroy {
  selectedBookingModel: Booking = new Booking();
  private sub: any;

  constructor(
   public spinnerService: SpinnerService,
      public notificationServiceBus: NotificationServiceBus,
      public bookingService: BookingService,
      private router: Router, private route: ActivatedRoute) {

    this.sub = this.route.params.subscribe(params => {
      let param_id = params['id'] || '';
      if ( Boolean(param_id) && parseInt(param_id, 10) > 0 ) {
        this.getJobDetail(param_id);
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
    return this.sub && this.sub.unsubscribe();
  }
}
