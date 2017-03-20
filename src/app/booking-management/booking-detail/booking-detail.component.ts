import { Component, Input, Output, EventEmitter, AfterViewChecked, OnInit } from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import { BOOKING_NATURE } from '../../shared/model/booking-nature.enum';
import { PARKING } from '../../shared/model/parking.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import { EnumValPipe } from '../../shared/pipe/enum-val.pipe';
import {BOOKING_STATUS} from '../../shared/model/booking-status.enum';
import { GLOBAL } from '../../shared/global';

declare var $: JQueryStatic;

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']

})

export class BookingDetailComponent implements AfterViewChecked {

    bookingModel: Booking = new Booking();
    appointment_types = BOOKING_NATURE;
    parking_types = PARKING;
    currentUserIsContact = 'true';
    prefInterpreter: boolean;

    constructor(public bookingService: BookingService, public spinnerService: SpinnerService) {
    }

    ngAfterViewChecked() {
      $(document).foundation();
      if (GLOBAL.currentUser !== undefined) {
        this.onSelectionChange();
        }
    }

    public onSelectionChange() {
      this.bookingModel.contact.name = this.currentUserIsContact === 'true' ? GLOBAL.currentUser.first_name : '';
      this.bookingModel.contact.email = this.currentUserIsContact === 'true' ? GLOBAL.currentUser.email : '';
      this.bookingModel.contact.mobile_number = this.currentUserIsContact === 'true' ? GLOBAL.currentUser.mobile : '';
      this.bookingModel.contact.phone_number = this.currentUserIsContact === 'true' ? GLOBAL.currentUser.mobile : '';
}
    /*
      Calling this method will create a new booking
    */
    public onCreateBooking() {
      this.spinnerService.requestInProcess(true);

      this.bookingService.createBooking(this.bookingModel)
              .subscribe((res: any) => {
                  if (res.status === 201 && res.data.id && 0 < res.data.id) {
                    this.bookingModel.id = res.data.id;
                    this.bookingModel.status = BOOKING_STATUS.Ready_to_process; // res.data.status;
                  }
                  this.spinnerService.requestInProcess(false);

              },
               (err) => {
                 this.spinnerService.requestInProcess(false);
                 console.log(err);
               });
      }
}
