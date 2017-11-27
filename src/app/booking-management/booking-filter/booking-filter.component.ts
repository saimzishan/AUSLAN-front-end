import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { GLOBAL } from '../../shared/global';

@Component({
  selector: 'app-booking-filter',
  templateUrl: './booking-filter.component.html',
  styleUrls: ['./booking-filter.component.css']
})
export class BookingFilterComponent implements OnInit {

  strSearch: string;
  @Output() appBookingFilter = new EventEmitter<string>();

  ngOnInit() {
    this.setOldSearch(GLOBAL._searchVal);
  }

  clear() {
    this.strSearch = '';
  }

  filter() {
    GLOBAL._searchVal = this.strSearch ? 'search=' + this.strSearch : '';
    this.appBookingFilter.emit('search=' + this.strSearch);
  }

  setOldSearch(val: string) {
    this.strSearch = val !== undefined ? val.replace('search=', '') : '';
  }

}
