import {Component, AfterViewChecked, OnDestroy, OnChanges, Directive, SimpleChanges, OnInit} from '@angular/core';
import { Booking } from '../../shared/model/booking.entity';
import { BookingService } from '../../api/booking.service';
import { BA, BOOKING_NATURE } from '../../shared/model/booking-nature.enum';
import { PARKING } from '../../shared/model/parking.enum';
import { SpinnerService } from '../../spinner/spinner.service';
import { BOOKING_STATUS } from '../../shared/model/booking-status.enum';
import { GLOBAL } from '../../shared/global';
import { NotificationServiceBus } from '../../notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RolePermission } from '../../shared/role-permission/role-permission';
import { DatePipe } from '@angular/common';
import {NgForm} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import {Address} from '../../shared/model/venue.entity';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']

})
export class BookingDetailComponent implements OnInit, OnDestroy, OnChanges {

  private sub: any;
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  bookingModel: Booking;
  standardInvoice: true;
  appointment_types = Object.keys(BOOKING_NATURE).filter(value => value === BOOKING_NATURE[value]
  || BOOKING_NATURE[value].startsWith(value)).map(v => BOOKING_NATURE[v]) as string[];

  specific_appointment_types =  [];
  parking_types = PARKING;
  currentUserIsContact = 'true';
  currentUserIsClient = 'true';
  prefInterpreter: boolean;

  constructor(public bookingService: BookingService, private router: Router,
  private route: ActivatedRoute, private rolePermission: RolePermission,
    public notificationServiceBus: NotificationServiceBus, public spinnerService: SpinnerService,
    private datePipe: DatePipe) {
          BA.loadItems();

    this.bookingModel = new Booking();

    /** http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription */
    this.sub = this.route.queryParams.subscribe(params => {
      let param = params['bookingModel'] || '';
      if (param.length > 0) {
        let jsonData = JSON.parse(param);
        this.bookingModel.fromJSON(jsonData);
        this.bookingModel.venue.start_time_iso =
        this.datePipe.transform(this.bookingModel.venue.start_time_iso, 'yyyy-MM-ddThh:mm:ss');
        this.bookingModel.venue.end_time_iso =
        this.datePipe.transform(this.bookingModel.venue.end_time_iso, 'hh:mm:ss');
      }
    });
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes['standardInvoice']) {
      this.bookingModel.client.organisation_billing_account.organisation_billing_address =
          <Address> this.bookingModel.venue;

    }

  }

  public fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  natureOfApptChange($event) {
    console.log(($event));
    let val: BOOKING_NATURE = <BOOKING_NATURE> BOOKING_NATURE[this.bookingModel.raw_nature_of_appointment];
    this.specific_appointment_types = BA.DISSCUSSION_ITEM[BOOKING_NATURE[val]];
  }
  ngOnDestroy() {
    return this.sub && this.sub.unsubscribe();
  }

  ngOnInit() {
    if (GLOBAL.currentUser !== undefined) {
      this.onSelectionChange();
      this.onClientSelectionChange();
    }
  }

  public onClientSelectionChange() {
    this.bookingModel.deaf_person.first_name = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.first_name : '';
    this.bookingModel.deaf_person.last_name = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.last_name : '';
    this.bookingModel.deaf_person.email = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.email : '';
    this.bookingModel.deaf_person.mobile_number = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.mobile : '';
    this.bookingModel.deaf_person.phone_number = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.mobile : '';
  }

  public onSelectionChange() {
    this.bookingModel.primaryContact.first_name =
        this.currentUserIsContact === 'true' ? GLOBAL.currentUser.first_name : '';
    this.bookingModel.primaryContact.last_name =
        this.currentUserIsContact === 'true' ? GLOBAL.currentUser.last_name : '';
    this.bookingModel.primaryContact.email =
        this.currentUserIsContact === 'true' ? GLOBAL.currentUser.email : '';
    this.bookingModel.primaryContact.mobile_number =
        this.currentUserIsContact === 'true' ? GLOBAL.currentUser.mobile : '';
    this.bookingModel.primaryContact.phone_number =
        this.currentUserIsContact === 'true' ? GLOBAL.currentUser.mobile : '';
  }
  /*
    Calling this method will create a new booking
  */
  public onCreateBooking() {

    this.spinnerService.requestInProcess(true);
    this.bookingModel.state = BOOKING_STATUS.Requested; // res.data.status;
    this.bookingModel.clean(this.bookingModel.toJSON());
    this.bookingService.createBooking(this.bookingModel)
      .subscribe((res: any) => {
        if (res.status === 201 && res.data.id && 0 < res.data.id) {
          this.bookingModel.id = res.data.id;
          this.notificationServiceBus.launchNotification(false, 'The Booking has been created.');
          let route = this.rolePermission.getDefaultRouteForCurrentUser();
          this.router.navigate( [route] );
        }
        this.spinnerService.requestInProcess(false);
      },
      errors => {
                this.spinnerService.requestInProcess(false);
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true,
                'Error occured on server side. ' + errors.statusText + ' ' + JSON.stringify(e.errors));
            });
  }

  onCancelBooking() {
    let route = this.rolePermission.getDefaultRouteForCurrentUser();
    this.router.navigate( [route] );
  }
}
