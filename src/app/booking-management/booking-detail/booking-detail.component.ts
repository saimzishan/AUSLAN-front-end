import { Component, Input, Output, EventEmitter, AfterViewChecked, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import { BOOKING_NATURE } from '../../shared/model/booking-nature.enum';
import { PARKING } from '../../shared/model/parking.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import { EnumValPipe } from '../../shared/pipe/enum-val.pipe';

declare var $: JQueryStatic;

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})

export class BookingDetailComponent implements AfterViewChecked {

    bookingModel: Booking = new Booking();
    appointment_types: BOOKING_NATURE;
    parking_types: PARKING;
    currentUserIsContact: boolean;
    prefInterpreter: boolean;

    constructor(public spinnerService: SpinnerService) {
    }

    ngAfterViewChecked() {
      $(document).foundation();
    }

}
