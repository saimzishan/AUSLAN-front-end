import { Component, OnInit, Input, AfterViewChecked, OnDestroy } from '@angular/core';
import { BookingService } from '../../api/booking.service';
import { Booking } from '../../shared/model/booking.entity';
import { UserService } from '../../api/user.service';
import { User } from '../../shared/model/user.entity';
import { ROLE } from '../../shared/model/role.enum';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';

declare var $: any; // not liking it

@Component({
  selector: 'app-booking-jobs',
  templateUrl: './booking-jobs.component.html',
  styleUrls: ['./booking-jobs.component.css']
})

export class BookingJobsComponent implements AfterViewChecked, OnDestroy {
  selectedBookingModel: Booking;
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
      let param = params['bookingModel'];
      let jsonData = JSON.parse(param);
      this.selectedBookingModel = new Booking();
      this.selectedBookingModel.fromJSON(jsonData);
    });
    this.fetchAllInterpreters();
  }

  ngAfterViewChecked() {
    $(document).foundation();
  }


   ngOnDestroy() {
    return this.sub && this.sub.unsubscribe();
  }

  isSate(bookingStatus) {
    return this.selectedBookingModel.state === bookingStatus;
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
    this.router.navigate(['/booking-management', 'create'], navigationExtras);
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
    this.userDataService.fetchUsers()
      .subscribe((res: any) => {
        if (res.status === 200) {
          let count = 0;
          this.interpreterList = res.data.users.filter(u => count++ < 10 && u.type === 'Interpreter');
        }
        this.spinnerService.requestInProcess(false);
      },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
      });
  }

  isInvited(int_email: string) {
    return this.selectedBookingModel.interpreters.filter(i => i.email === int_email);
  }


  inviteInterpreters() {
    this.invitePressed = true;
  }

  saveChanges() {
    let selectedInt = [];
    for (let id of this.selectedInterpreterIDs) {
      let o = this.interpreterList.filter(u => u.id === id);
      if (o) {
        selectedInt.push(o);
      }
    }
    this.selectedBookingModel.interpreters = selectedInt;
    this.selectedInterpreterIDs = [];
    this.notificationServiceBus.launchNotification(false, 'The interpreters have been invited');
    this.invitePressed = false;

  }
}
