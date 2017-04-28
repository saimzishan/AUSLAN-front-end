import { Component, OnInit, Input, AfterViewChecked, OnDestroy } from '@angular/core';
import { BookingService } from '../../api/booking.service';
import { Booking } from '../../shared/model/booking.entity';
import { BookingInterpreters } from '../../shared/model/contact.entity';
import { UserService } from '../../api/user.service';
import { User } from '../../shared/model/user.entity';
import { ROLE } from '../../shared/model/role.enum';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { BOOKING_STATUS } from '../../shared/model/booking-status.enum';

declare var $: any; // not liking it

@Component({
  selector: 'app-booking-jobs',
  templateUrl: './booking-jobs.component.html',
  styleUrls: ['./booking-jobs.component.css']
})

export class BookingJobsComponent implements AfterViewChecked, OnDestroy {
  selectedBookingModel: Booking = new Booking();
  invitePressed = false;
  interpreterList: User[] = [];
  selectedInterpreterIDs: number[] = [];
  private sub: any;

  constructor(public spinnerService: SpinnerService,
    public notificationServiceBus: NotificationServiceBus,
    public userDataService: UserService, public bookingService: BookingService,
    private router: Router, private route: ActivatedRoute) {

    /** http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription */
    this.sub = this.route.queryParams.subscribe(params => {
      let param = params['bookingModel'] || '';
      if (param.length > 0) {
        let jsonData = JSON.parse(param);
        this.selectedBookingModel.fromJSON(jsonData);
        this.fetchBookingInterpreters();
      }
    });
  }

  ngAfterViewChecked() {
    $(document).foundation();
  }

  ngOnDestroy() {
    return this.sub && this.sub.unsubscribe();
  }

  isSate(bookingStatus: string) {
    return BOOKING_STATUS[this.selectedBookingModel.state].toLowerCase() === bookingStatus.toLowerCase();
  }

  unableToServiceBooking() {
    this.spinnerService.requestInProcess(true);
    this.bookingService.updateBookingByTransitioning(this.selectedBookingModel.id, 'unable_to_service')
      .subscribe((res: any) => {
        if (res.status === 204) {
          this.notificationServiceBus.launchNotification(false, 'The booking has been transitioned to \"Unable to Service\" state');
        }
        this.spinnerService.requestInProcess(false);
      },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
      });
  }

  cancelBooking() {
    this.spinnerService.requestInProcess(true);
    this.bookingService.updateBookingByTransitioning(this.selectedBookingModel.id, 'cancel_booking')
      .subscribe((res: any) => {
        if (res.status === 204) {
          this.notificationServiceBus.launchNotification(false, 'The booking has been transitioned to \"Cancelled\" state');
        }
        this.spinnerService.requestInProcess(false);
      },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
      });
  }

  duplicateBooking() {
    let navigationExtras: NavigationExtras = {
      queryParams: { bookingModel: JSON.stringify(this.selectedBookingModel) }
    };
    this.router.navigate(['/booking-management', 'create-booking'], navigationExtras);
  }

  onChange($event, user) {
    let index = this.selectedInterpreterIDs.indexOf(user.id, 0);
    if (index < 0) {
      this.selectedInterpreterIDs.push(user.id);
    } else {
      delete this.selectedInterpreterIDs[user.id];
    }
  }

  fetchAllInterpreters() {
    this.spinnerService.requestInProcess(true);
    this.userDataService.fetchUsersOfType('interpreters')
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.interpreterList = res.data.users;
        }
        this.spinnerService.requestInProcess(false);
      },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
      });
  }

  fetchBookingInterpreters() {
    this.spinnerService.requestInProcess(true);
    this.bookingService.getBooking(this.selectedBookingModel.id)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.selectedBookingModel.interpreters = res.data['interpreters'];
          this.fetchAllInterpreters();
        }
        this.spinnerService.requestInProcess(false);
      },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
      });
  }

  isInvited(id: number) {
    let res = this.selectedBookingModel.interpreters.filter(i => i.id === id);
    return (res.length > 0);
  }

  isNotConfirmed(id: number) {
    let res = this.selectedBookingModel.interpreters.filter(i => i.id === id && i.state !== 'accepted');
    return (res.length > 0);
  }

  inviteInterpreters() {
    this.invitePressed = this.selectedInterpreterIDs.length > 0;
  }

  sendInvite(interpreters) {
    this.bookingService.inviteInterpreters(this.selectedBookingModel.id, interpreters)
      .subscribe((res: any) => {
        if (res.status === 204) {
          this.notificationServiceBus.launchNotification(false, 'The interpreters have been invited');
          this.selectedBookingModel.state = BOOKING_STATUS.In_progress;
        }
        this.spinnerService.requestInProcess(false);
      },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
      });
  }

  saveChanges() {
    this.spinnerService.requestInProcess(true);

    let selectedInt = [];
    for (let _id of this.selectedInterpreterIDs) {
      selectedInt.push(new Object({
        id: _id
      }));
    }
    this.selectedBookingModel.interpreters = selectedInt;
    this.selectedInterpreterIDs = [];
    this.invitePressed = false;
    this.sendInvite(selectedInt);
  }
}
