import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  @Input('bookingList') bookingList: Array<Booking> = [];
  @Output() onEditBooking = new EventEmitter<Booking>();

  constructor(public router: Router) {}

  onBookingSelect(booking: Booking) {
    this.onEditBooking.emit(booking);
  }

  setClickedRow(booking: Booking) {
    let navigationExtras: NavigationExtras = {
            queryParams: {bookingModel: JSON.stringify(booking)}
        };
    this.router.navigate(['/booking-management/' + booking.id , 'jobs'], navigationExtras );
  }

}
