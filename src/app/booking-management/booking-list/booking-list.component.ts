import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {Router, NavigationExtras} from '@angular/router';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {BOOKING_STATUS} from '../../shared/model/booking-status.enum';
import {GLOBAL} from '../../shared/global';
import {PrettyIDPipe} from '../../shared/pipe/pretty-id.pipe';
import {Interpreter, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {BookingInterpreter} from '../../shared/model/contact.entity';

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
    @Input('bookingList') bookingList: Array<Booking> = [];
    @Output() onEditBooking = new EventEmitter<Booking>();
    private validKeys(list): Array<string> {
        let keys = Object.keys(list);
        return keys.slice(keys.length / 2);
    };

    constructor(public router: Router) {
    }

    onBookingSelect(booking: Booking) {
        this.onEditBooking.emit(booking);
    }

    underScoreToSpaces(str: string) {
        return str.replace(/_/g, ' ');
    }

    stateToString(booking_state) {
        return Boolean(booking_state) ? this.underScoreToSpaces(BOOKING_STATE[booking_state])
            : BOOKING_STATE[BOOKING_STATE.None].toLowerCase();
    }

    isSelectedBooking(bookingID) {
        return bookingID === GLOBAL.selBookingID;
    }

    setClickedRow(booking: Booking) {
        let route = GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof OrganisationalRepresentative
            ? 'job-detail' : 'booking-job';
        this.router.navigate(['/booking-management/' + booking.id, route]);
        GLOBAL.selBookingID = booking.id;
    }

    isCurrentUser(id) {
        return GLOBAL.currentUser.id === id;
    }

    isCurrentUserAllowed() {
        return GLOBAL.currentUser instanceof Interpreter;
    }

    isCurrentUserInvitedInterpreter(interpreters) {
        // Array.includes is not there in IE
        return interpreters.filter(i => i.id === GLOBAL.currentUser.id).length > 0;
    }

    didInterpreterAccepted(interpreters: Array<BookingInterpreter>) {
        return interpreters.filter(i => i.state === 'Accepted').slice(0, 3);
    }
}
