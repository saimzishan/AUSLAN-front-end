import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {GLOBAL} from '../../shared/global';

@Component({
    selector: 'app-booking-filter',
    templateUrl: './booking-filter.component.html',
    styleUrls: ['./booking-filter.component.css']
})
export class BookingFilterComponent implements OnInit {

    extRefNumber: string;
    @Output() appBookingFilter = new EventEmitter();

    ngOnInit() {
        this.extRefNumber = GLOBAL._extRefVal.has('search') ? GLOBAL._extRefVal.get('search') : '';
    }

    clear() {
        this.extRefNumber = '';
        this.filter();
    }

    filter() {
        GLOBAL._extRefVal.set('search', this.extRefNumber);
        this.appBookingFilter.emit();
    }

}
