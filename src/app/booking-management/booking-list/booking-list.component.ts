import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Booking} from '../../shared/model/booking.entity';
import {Router} from '@angular/router';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {BOOKING_STATUS} from '../../shared/model/booking-status.enum';
import {GLOBAL} from '../../shared/global';
import {
    Administrator,
    BookingOfficer,
    IndividualClient,
    Interpreter,
    OrganisationalRepresentative
} from '../../shared/model/user.entity';
import {BookingInterpreter} from '../../shared/model/contact.entity';
import {BookingFilter} from '../../shared/model/booking-filter.interface';
import {BA, BOOKING_NATURE} from '../../shared/model/booking-nature.enum';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
    @Input('bookingList') bookingList: Array<Booking> = [];
    @Output() onBookingFilter = new EventEmitter();
    bookingFilter: BookingFilter = {};
    private filterParams = new URLSearchParams();
    private currentSort = {'field': 'job', 'order': 'asc'};
    @Output() onPageEmit = new EventEmitter<number>();
    @Input() p = 1;
    @Input() totalItems = 0;

    constructor(public router: Router, private datePipe: DatePipe) {
        BA.loadItems();
    }

    ngOnInit() {
        this.filterParams = GLOBAL._filterVal;
        this.filterParams.paramsMap.forEach((value: string[], key: string) => {
            for (let v of value) {
            if (key !== 'sort' && key !== 'direction') {
                key = key.match(/filter\[(\w+)\]/)[1];
            }
                this.bookingFilter[key] = v;
                break;
            }
        });
        if (this.filterParams.paramsMap.size === 0) {
            this.sort('start_time');
            this.bookingFilter.date_from = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
            }
        this.filter('date_from', this.bookingFilter.date_from);
    }

    underScoreToSpaces(str: string) {
        if (!str) {
            return 'All';
        }
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
        let route;
        if (this.isCurrentUserAdminOrBookingOfficer() && this.isStateCancelClaimOrComplete(booking.state)) {
            route = 'payroll-billing';
        } else {
            route = GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof OrganisationalRepresentative
                || GLOBAL.currentUser instanceof IndividualClient
                ? 'job-detail' : 'booking-job';
        }
        this.router.navigate(['/booking-management/' + booking.id, route]);
        GLOBAL.selBookingID = booking.id;
    }

    isStateCancelClaimOrComplete(state) {
           return state === BOOKING_STATE.Service_completed || state === BOOKING_STATE.Cancelled_chargeable;
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

    isCurrentUserAdminOrBookingOfficer(): boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer);
    }

    didInterpreterAccepted(interpreters: Array<BookingInterpreter>) {
        return interpreters.filter(i => i.state === 'Accepted').slice(0, 3);
    }

    statusList() {
        let keys = Object.keys(BOOKING_STATUS);
        return ['All', ...keys.slice(keys.length / 2)];

    }

    stateList() {
        let keys = Object.keys(BOOKING_STATE);
        keys = keys.slice(keys.length / 2);
        keys.splice(0, 1);
        return ['All', ...keys];
    }

    assignmentCategoryList() {
        let keys = Object.keys(BA.DISSCUSSION_ITEM) as Array<string>;
        return ['All', ...keys];
    }

    filterStatus() {
        return BOOKING_STATUS[this.bookingFilter.booking_status];
    }

    private formatterValueFor(field: string, value: string) {
        let formattedValue: string;
        if (value !== undefined && value.toLowerCase() === 'all') {
            return '';
        }
        if (value && value.length) {
            value = value.trim();
            value = value.replace(/,$/g, '');
            switch (field) {
                case 'booking_status':
                    formattedValue = BOOKING_STATUS.hasOwnProperty(value) ? BOOKING_STATUS[value].toString() : '';
                    break;
                case 'booking_type':
                    formattedValue = BOOKING_NATURE.hasOwnProperty(value) ? BOOKING_NATURE[value].toString() : '';
                    break;
                default:
                    formattedValue = value;
                    break;
            }
        }
        return formattedValue;
    }

    filter(field: string, value: string) {
        this.bookingFilter[field] = this.formatterValueFor(field, value);
        for (let k in this.bookingFilter) {
            if (this.bookingFilter.hasOwnProperty(k)) {
                this.filterParams.set('filter[' + k + ']', this.bookingFilter[k]);
            }
        }
        GLOBAL._filterVal = this.filterParams;
        this.onBookingFilter.emit();
    }

    private isCurrentSort(field: string) {
        return this.currentSort.field === field;
    }

    private setCurrentSort(field: string) {
        let order = 'asc';
        if (this.isCurrentSort(field)) {
            order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
        }
        this.currentSort.field = field;
        this.currentSort.order = order;
    }

    getSortOrder(field: string) {
        return this.isCurrentSort(field) ? this.currentSort.order : '';
    }

    sort(field: string) {
        this.setCurrentSort(field);
        this.filterParams.set('sort', this.currentSort.field);
        this.filterParams.set('direction', this.currentSort.order);
        GLOBAL._filterVal = this.filterParams;
        this.onBookingFilter.emit();
    }

    getPage(page: number) {
        this.onPageEmit.emit(page);
    }
    linkIdClicked(linkID: string) {
        this.bookingFilter.booking_ids = linkID;
        this.filter('booking_ids', this.bookingFilter.booking_ids);
    }
}
