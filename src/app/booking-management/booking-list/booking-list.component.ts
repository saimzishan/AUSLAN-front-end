import {Component, Input, Output, EventEmitter} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Booking} from '../../shared/model/booking.entity';
import {Router, NavigationExtras} from '@angular/router';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {BOOKING_STATUS} from '../../shared/model/booking-status.enum';
import {GLOBAL} from '../../shared/global';
import {PrettyIDPipe} from '../../shared/pipe/pretty-id.pipe';
import {Interpreter, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {BookingInterpreter} from '../../shared/model/contact.entity';
import {BookingFilter} from '../../shared/model/booking-filter.interface';
import {BookingComponent} from '../booking.component';

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent{
    @Input('bookingList') bookingList: Array<Booking> = [];
    @Input('bookingFilter') bookingFilter: BookingFilter = {};
    @Output() onEditBooking = new EventEmitter<Booking>();
    private validKeys(list): Array<string> {
        let keys = Object.keys(list);
        return keys.slice(keys.length / 2);
    };

    constructor(public router: Router, protected bookingComponent: BookingComponent) {
    }

    onBookingSelect(booking: Booking) {
        this.onEditBooking.emit(booking);
    }

    underScoreToSpaces(str: string) {
        if (!str) { return 'All'; }
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
    statusList() {
        let keys = Object.keys(BOOKING_STATUS);
        return keys.slice(keys.length / 2);
    }
    stateList() {
        let keys = Object.keys(BOOKING_STATE);
        return keys.slice(keys.length / 2);
    }
    private formatValueFor(filter: string, value: string) {
        switch(filter) {
            case 'booking_status':
                value = BOOKING_STATUS[value]
                break;
        }
        return value;
    }
    filter(field: string, value: string) {
        value = value.replace(/,$/g, '');
        value = this.formatValueFor(field, value);
        this.bookingFilter[field] = value.trim ? value.trim() : value;
        let params: URLSearchParams = new URLSearchParams();
        for(let k in this.bookingFilter) {
            params.set('filter[' + k +']', this.bookingFilter[k]);
        }
        this.bookingComponent.fetchBookings(params);
    }
}
