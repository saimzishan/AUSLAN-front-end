import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {Router, NavigationExtras} from '@angular/router';
import { BOOKING_STATUS } from '../../shared/model/booking-status.enum';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  @Input('bookingList') bookingList: Array<Booking> = [];
  @Output() onEditBooking = new EventEmitter<Booking>();

  constructor(public router: Router) {

  }

  onBookingSelect(booking: Booking) {
    this.onEditBooking.emit(booking);
  }

  stateToString (booking_state) {
    return Boolean(booking_state) ? BOOKING_STATUS[booking_state].toLowerCase()
    : BOOKING_STATUS[BOOKING_STATUS.None].toLowerCase();
  }

  setClickedRow(booking: Booking) {
    let navigationExtras: NavigationExtras = {
            queryParams: {bookingModel: JSON.stringify(booking)}
        };
    this.router.navigate(['/booking-management/' + booking.id , 'booking-job'], navigationExtras );
  }

}
