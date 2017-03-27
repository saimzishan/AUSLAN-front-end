import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  @Input('bookingList') bookingList: Array<Booking> = [];
  @Output() onEditBooking = new EventEmitter<Booking>();

  onBookingSelect(booking: Booking) {
    this.onEditBooking.emit(booking);
  }
}
