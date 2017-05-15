import { Component, AfterViewChecked, OnDestroy } from '@angular/core';
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

declare var $: any;

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']

})

export class BookingDetailComponent implements AfterViewChecked, OnDestroy {

  private sub: any;
  bookingModel: Booking;
  appointment_types = Object.keys(BOOKING_NATURE).filter(value => value === BOOKING_NATURE[value]
  || BOOKING_NATURE[value].startsWith(value)).map(v => BOOKING_NATURE[v]) as string[];

  specific_appointment_types =  [];
  parking_types = PARKING;
  currentUserIsContact = 'true';
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
        this.datePipe.transform(this.bookingModel.venue.start_time, 'yyyy-dd-MMThh:mm:ss');
        this.bookingModel.venue.end_time_iso =
        this.datePipe.transform(this.bookingModel.venue.end_time, 'hh:mm:ss');

      }
    });
  }

  natureOfApptChange($event) {
    console.log(($event));
    let val: BOOKING_NATURE = <BOOKING_NATURE> BOOKING_NATURE[this.bookingModel.raw_nature_of_appointment];
    this.specific_appointment_types = BA.DISSCUSSION_ITEM[BOOKING_NATURE[val]];
  }
  ngOnDestroy() {
    return this.sub && this.sub.unsubscribe();
  }

  ngAfterViewChecked() {
    $(document).foundation();
    if (GLOBAL.currentUser !== undefined) {
      this.onSelectionChange();
    }
  }

  public onSelectionChange() {
    this.bookingModel.contact.first_name = this.currentUserIsContact === 'true' ? GLOBAL.currentUser.first_name : '';
    this.bookingModel.contact.last_name = this.currentUserIsContact === 'true' ? GLOBAL.currentUser.last_name : '';
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
          this.bookingModel.state = BOOKING_STATUS.Requested; // res.data.status;
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
