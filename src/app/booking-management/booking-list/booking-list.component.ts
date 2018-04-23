import {Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';
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
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit, OnChanges {

    @Input() bookingList: Array<Booking> = [];
    @Output() onBookingFilter = new EventEmitter();
    bookingFilter: BookingFilter = {};
    private filterParams = new URLSearchParams();
    private currentSort = {'field': 'job', 'order': 'asc'};
    @Output() onPageEmit = new EventEmitter<number>();
    @Input() p = 1;
    @Input() totalItems = 0;
    maxPaginationSize = 7;
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
            this.setFilterParams('start_time');
            this.bookingFilter.date_from = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
        }
        this.filter('date_from', this.bookingFilter.date_from);
        this.maxPaginationSize = $(window).width() < 400 ? 5 : 7;
    }

    ngOnChanges(changes) { }

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
           return state === BOOKING_STATE.Service_completed || state === BOOKING_STATE.Cancelled_chargeable ||
                  state === BOOKING_STATE.Claimed || state === BOOKING_STATE.Claimed_exported || state === BOOKING_STATE.Cancelled_claimed ||
                  state === BOOKING_STATE.Cancelled_claimed_exported;
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
    isCurrentUserInterpreter(): boolean {
        return Boolean(GLOBAL.currentUser instanceof Interpreter);
    }
    didInterpreterAccepted(interpreters: Array<BookingInterpreter>) {
        return interpreters.filter(i => i.state === 'Accepted').slice(0, 3);
    }
    isClientOrOrgRep(): boolean {
        return Boolean(GLOBAL.currentUser instanceof IndividualClient || GLOBAL.currentUser instanceof OrganisationalRepresentative);
    }

    statusList() {
        let keys = Object.keys(BOOKING_STATUS);
        return ['All', ...keys.slice(keys.length / 2)];

    }

    isInterpreterStatusAccepted(booking: Booking) {
        if (this.isCurrentUserInterpreter()) {
            let r = [];
            r = booking.interpreters.filter(i => i.id === GLOBAL.currentUser.id && i.state === 'Accepted');
            return r.length;
        }
        return false;
    }
    interpreterAllowed(booking: Booking, status) {
        let res = false;
        // Green Tick => Accepted || Allocated
        // Gray => Invited , has not responded
        // Red => Invited , rejected but is not allocated
        let currentStatus = '';
        if (this.isCurrentUserInterpreter()) {
            booking.interpreters.filter(i => i.id === GLOBAL.currentUser.id)
                .map(i => currentStatus = i.state || 'Invited');

            if (currentStatus === 'Accepted' &&
                booking.state === BOOKING_STATE.In_progress) {
                res = status === 'green';

            } else if (currentStatus === 'Accepted' &&
                booking.state === BOOKING_STATE.Allocated) {
                res = status === 'green';

            } else if (currentStatus === 'Rejected' &&
                booking.state === BOOKING_STATE.In_progress) {
                res = status === 'red';


            } else if (currentStatus === 'Invited' &&
                booking.state !== BOOKING_STATE.Allocated) {
                res = status === 'gray';
            }
        }
        return res;
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

    filterMethodType(methodType: string) {
        switch (methodType) {
            case 'onsite':
                return 'On Site';
            case 'vri':
                return 'VRI';
            default:
                return 'All';
        }
    }
    bookingMethodTypes() {
        return ['All', 'onsite', 'vri'];
    }
    bookingServiceTypes() {
        let keys = ['ASL', 'Auslan', 'BSL', 'Captioning', 'Deaf', 'Indigenous Sign', 'ISL',
            'Notetaking', 'Platform', 'Signed English', 'Tactile', 'Visual Frame'];
        return ['All', ...keys];
    }

    filterStatus() {
        if (this.bookingFilter.booking_status) {
            return this.bookingFilter.booking_status.split(',').map(status => {
                return BOOKING_STATUS[status];
            }).join(',');
        } else {
            return 'All';
        }
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
                    formattedValue = value.split(',')
                        .filter(statusValue => BOOKING_STATUS.hasOwnProperty(statusValue))
                        .map(statusValue => BOOKING_STATUS[statusValue].toString()).join(',');
                    break;
                case 'booking_type':
                    formattedValue = value.split(',')
                        .filter(typeValue => BOOKING_NATURE.hasOwnProperty(typeValue))
                        .map(filteredTypeValue => BOOKING_NATURE[filteredTypeValue].toString()).join(',');
                    break;
                default:
                    formattedValue = value;
                    break;
            }
        }
        return formattedValue;
    }

    private toggleDropdownFilter(field: string, value: string) {
        const newValue = this.formatterValueFor(field, value);
        const currentValue = this.bookingFilter[field];
        const removeFilter = currentValue && currentValue.indexOf(newValue) > -1;
        if (removeFilter) {
            this.bookingFilter[field] = currentValue.replace(newValue, '').replace(/,,/g, ',').replace(/^,|,$/, '');
        } else {
            this.bookingFilter[field] = currentValue && currentValue.length ? currentValue + ',' + newValue : newValue;
        }
    }

    private unsetFilter(field: string): void {
        delete this.bookingFilter[field];
        this.filterParams.delete(`filter[${field}]`);
        GLOBAL._filterVal.delete(`filter[${field}]`);
    }

    filter(field: string, value: string, toggle?: boolean) {
        value = Boolean(value) ? value : 'all';
        if (value.toLowerCase() === 'all') {
            this.unsetFilter(field);
        } else if (toggle) {
            this.toggleDropdownFilter(field, value);
        } else {
            this.bookingFilter[field] = this.formatterValueFor(field, value);
        }
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

    isDropdownItemActive(field: string, value: string): ('active'|'') {
        const formattedValue = value !== 'All' && this.formatterValueFor(field, value);
        return this.bookingFilter[field] && this.bookingFilter[field].indexOf(formattedValue) > -1 ? 'active' : '';
    }

    sort(field: string) {
        this.setFilterParams(field);
        this.onBookingFilter.emit();
    }

    setFilterParams(field: string) {
        this.setCurrentSort(field);
        this.filterParams.set('sort', this.currentSort.field);
        this.filterParams.set('direction', this.currentSort.order);
        GLOBAL._filterVal = this.filterParams;
    }

    getPage(page: number) {
        this.onPageEmit.emit(page);
    }
    linkIdClicked(linkID: string) {
        this.bookingFilter.booking_ids = linkID;
        this.filter('booking_ids', this.bookingFilter.booking_ids);
    }

    calculateDaysAgo(created_at) {
        let createdDate = moment(created_at);
        let currentDate = moment(Date.now());
        return currentDate.diff(createdDate, 'days');
    }
}
