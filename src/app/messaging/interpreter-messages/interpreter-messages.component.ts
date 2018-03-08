import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { URLSearchParams } from '@angular/http';
import { SpinnerService } from '../../spinner/spinner.service';
import { RolePermission } from '../../shared/role-permission/role-permission';
import { BookingService } from '../../api/booking.service';
import { GLOBAL } from '../../shared/global';
import { IndividualClient, Interpreter, OrganisationalRepresentative, User } from '../../shared/model/user.entity';
import { Booking } from '../../shared/model/booking.entity';
import { BookingInterpreter } from '../../shared/model/contact.entity';
import { BOOKING_STATE } from '../../shared/model/booking-state.enum';


@Component({
  selector: 'app-interpreter-messages',
  templateUrl: './interpreter-messages.component.html',
  styleUrls: ['./interpreter-messages.component.css']
})
export class InterpreterMessagesComponent implements OnInit {
  tempPage;
  page;
  search;
  totalItems;
  bookings: Array<Booking> = [];
  isTagShow;
  constructor(private _location: Location, public spinnerService: SpinnerService, public bookingDataService: BookingService,
    private rolePermission: RolePermission) { }

  ngOnInit() {
    this.isTagShow = true;
  }

  backClicked() {
    this._location.back();
  }
  getPaginatedBooking() {
    this.spinnerService.requestInProcess(true);
    this.bookingDataService.fetchPaginatedBookings(this.tempPage, this.search)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.bookings = [];
          this.totalItems = Boolean(res.data.paginates) ? res.data.paginates.total_records : res.data.bookings.length;
          for (let o of res.data.bookings) {
            if (Boolean(!this.rolePermission.isDataRestrictedForCurrentUser('booking-management', o.created_by.type))
              || (GLOBAL.currentUser instanceof OrganisationalRepresentative && GLOBAL.currentUser.id === o.created_by.id)
              || (GLOBAL.currentUser instanceof IndividualClient && GLOBAL.currentUser.id === o.created_by.id)
              || o.interpreters_attributes.filter(int =>
                int.id === GLOBAL.currentUser.id).length > 0) {
              let b = new Booking();
              b.fromJSON(o);
              let currentInt: BookingInterpreter;
              b.interpreters.filter(int => int.id === GLOBAL.currentUser.id)
                .map(int => currentInt = int);
              if (GLOBAL.currentUser instanceof Interpreter && Boolean(currentInt)
                && b.state === BOOKING_STATE.Allocated
                && (currentInt.state === 'Invited' ||
                  currentInt.state === 'Rejected')) {
                continue;
              } else {
                this.bookings.push(b);
              }
            }
          }
          this.page = this.tempPage;
        }
        this.spinnerService.requestInProcess(false);
      }
        ,
        err => {
          this
            .spinnerService
            .requestInProcess(
              false
            );
        }
      )
      ;
  }

  fetchBookings() {
    this.tempPage = this.page = 1;
    this.search = GLOBAL.getSearchParameter();
    this.getPaginatedBooking();

  }
  sendMessageTagHide() {
    this.isTagShow = false;
  }
}
