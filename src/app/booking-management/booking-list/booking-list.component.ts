import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {Router, NavigationExtras} from '@angular/router';
import { BOOKING_STATUS } from '../../shared/model/booking-status.enum';
import {GLOBAL} from '../../shared/global';
import { PrettyIDPipe } from '../../shared/pipe/pretty-id.pipe';
import {Interpreter, OrganisationalRepresentative} from '../../shared/model/user.entity';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  @Input('bookingList') bookingList: Array<Booking> = [];
  @Output() onEditBooking = new EventEmitter<Booking>();
    stateStr= '';

  constructor(public router: Router) {
 }

  onBookingSelect(booking: Booking) {
    this.onEditBooking.emit(booking);
  }

  stateToString (booking_state) {
    return Boolean(booking_state) ? BOOKING_STATUS[booking_state].replace(/_/g, ' ')
    : BOOKING_STATUS[BOOKING_STATUS.None].toLowerCase();
  }

  isSelectedBooking(bookingID) {
    return bookingID === GLOBAL.selBookingID;
  }

  setClickedRow(booking: Booking) {
    let route =  false === GLOBAL.currentUser instanceof Interpreter
        ? 'booking-job' : 'job-detail';
    this.router.navigate(['/booking-management/' + booking.id , route]);
    GLOBAL.selBookingID = booking.id;
  }

    isCurrentUser(id) {
      return GLOBAL.currentUser.id === id;
}

    isCurrentUserAllowed() {
        return false === GLOBAL.currentUser instanceof OrganisationalRepresentative;
    }
    isCurrentUserInvitedInterpreter(interpreters) {
      // Array.includes is not there in IE
        return interpreters.filter( i => i.id === GLOBAL.currentUser.id).length > 0;
    }
}
