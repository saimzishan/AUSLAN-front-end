import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {BookingDetailComponent} from '../booking-detail/booking-detail.component';
import {Booking} from '../../shared/model/booking.entity';

@Component({
  selector: 'app-booking-filter',
  templateUrl: './booking-filter.component.html',
  styleUrls: ['./booking-filter.component.css']
})
export class BookingFilterComponent  {


}
