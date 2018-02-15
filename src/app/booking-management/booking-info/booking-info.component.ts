import {Component, OnInit, Input} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {Administrator, BookingOfficer} from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.css']
})
export class BookingInfoComponent {

  @Input() selectedBookingModel: Booking = new Booking();


  isCurrentUserAdminOrBookingOfficer(): boolean {
    return Boolean(GLOBAL.currentUser instanceof Administrator ||
      GLOBAL.currentUser instanceof BookingOfficer);
  }

}
