import { Component, AfterViewChecked } from '@angular/core';
import { BookingService } from '../api/booking.service';
import { Booking } from '../shared/model/booking.entity';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { SpinnerService } from '../spinner/spinner.service';
import { RolePermission } from '../shared/role-permission/role-permission';
import { User } from '../shared/model/user.entity';
import { ROLE } from '../shared/model/role.enum';
import { GLOBAL } from '../shared/global';

declare var $: any;


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

  constructor(public spinnerService: SpinnerService, public bookingDataService: BookingService,
    private rolePermission: RolePermission) {
    this.fetchBookings();
  }

  fetchBookings() {
    this.spinnerService.requestInProcess(true);
    this.bookingDataService.fetchBookings()
      .subscribe((res: any) => {
        if (res.status === 200) {
          for (let o of res.data.bookings) {
            if (Boolean(!this.rolePermission.isDataRestrictedForCurrentUser('booking-management', o.created_by.type))) {
              let b = new Booking();
              b.fromJSON(o);
              this.bookings.push(b);
            }
          }

        }
        this.spinnerService.requestInProcess(false);
        $(document).foundation();

      },
      err => {
        this.spinnerService.requestInProcess(false);
      });
  }

}
