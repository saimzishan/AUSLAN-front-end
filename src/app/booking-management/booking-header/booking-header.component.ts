import { Component, Input } from '@angular/core';
import { BookingService } from '../../api/booking.service';
import { BOOKING_STATE } from '../../shared/model/booking-state.enum';
import {Booking} from '../../shared/model/booking.entity';
import {GLOBAL} from '../../shared/global';
import {Interpreter, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booking-header',
  templateUrl: './booking-header.component.html',
  styleUrls: ['./booking-header.component.css']
})
export class BookingHeaderComponent {

  @Input() bookingModel: Booking = new Booking();
  @Input() isCancelOrUnable = false;
  @Input() invitePress = false;
  @Input() unAssignPress = false;
  @Input() reAssignPress = false;
  @Input() bookingState;
  @Input() showButtons = false;
  
  constructor(private bookingService: BookingService,private router: Router) { }

  showDialogBoxClick(data) {

    this.bookingService.notifyOther({ option: 'showDialogBox', value: data });
  }

  bookingDetailClick() {

    this.bookingService.notifyOther({ option: 'editBooking', value: '' });
  }

  duplicateClick() {

    this.bookingService.notifyOther({ option: 'duplicateBooking', value: '' });
  }

  saveClick() {

    this.bookingService.notifyOther({ option: 'saveChanges', value: '' });
  }

  isActiveState(bookingStatus: string) {
    return BOOKING_STATE[this.bookingState].toLowerCase() === bookingStatus.toLowerCase();
  }

  isPassedState(bookingStatus: string) {
    return parseInt(this.bookingState.toString(), 10) >
      parseInt(BOOKING_STATE[bookingStatus].toString(), 10);
  }

  infoClick()
  {
        let route = GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof OrganisationalRepresentative
        ? 'job-detail' : 'booking-job';
      this.router.navigate(['/booking-management/' + GLOBAL.selBookingID, route]);
  }
  
  isActive(route: string){

      return this.router.url.includes(route);
  }
} 
