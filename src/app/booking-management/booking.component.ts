import { Component, AfterViewChecked, Input, ChangeDetectionStrategy } from '@angular/core';
import {BookingService} from '../api/booking.service';
import {Booking} from '../shared/model/booking.entity';
import {ROLE} from '../shared/model/role.enum';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {BookingFilterComponent} from './booking-filter/booking-filter.component';
import {BookingListComponent} from './booking-list/booking-list.component';
import {SpinnerService} from '../spinner/spinner.service';
declare var $: JQueryStatic;


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements AfterViewChecked {
    bookings: Array<Booking> = [];

    ngAfterViewChecked() {
      $(document).foundation();

    }

    constructor(public spinnerService: SpinnerService, public bookingDataService: BookingService) {
      this.fetchBookings();
    }

    fetchBookings() {
      this.spinnerService.requestInProcess(true);
      this.bookingDataService.fetchBookings()
      .subscribe((res: any) => {
        if ( res.status === 200 ) {
        // this.bookings = res.data.bookings;
        for (let o of res.data.bookings) {
          let b = new Booking();
          b.fromJSON(o);
          this.bookings.push(b);
        }
      }
      $(document).foundation();
      this.spinnerService.requestInProcess(false);

      },
       err => {
         this.spinnerService.requestInProcess(false);
       });
    }

}
