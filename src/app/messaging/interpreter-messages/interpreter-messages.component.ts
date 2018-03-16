import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { URLSearchParams } from '@angular/http';
import { SpinnerService } from '../../spinner/spinner.service';
import { RolePermission } from '../../shared/role-permission/role-permission';
import { GLOBAL } from '../../shared/global';
import { IndividualClient, Interpreter, OrganisationalRepresentative, User } from '../../shared/model/user.entity';
import { Booking } from '../../shared/model/booking.entity';
import { BookingInterpreter } from '../../shared/model/contact.entity';
import { BOOKING_STATE } from '../../shared/model/booking-state.enum';
import { UserService } from '../../api/user.service';
import { MessagingService } from '../../api/messaging.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-interpreter-messages',
  templateUrl: './interpreter-messages.component.html',
  styleUrls: ['./interpreter-messages.component.css']
})
export class InterpreterMessagesComponent implements OnInit, OnDestroy {
  tempPage;
  page;
  search;
  totalItems;
  bookings: Array<Booking> = [];
  isTagShow = true;
  message_body = null;
  message_tage;
  messages;
  constructor(private userService: UserService, private notificationServiceBus: NotificationServiceBus, public platformLocation: PlatformLocation,
     private messagingService: MessagingService, private _location: Location, public spinnerService: SpinnerService,
    private rolePermission: RolePermission) { }

  ngOnInit() {

    if ( Boolean(GLOBAL.currentUser) && GLOBAL.currentUser.id > 0) {
      this.getInterpreterMessages(this.getCurrentUserID());
    }
    this.message_tage = localStorage.getItem('bookingId');
  }
  getCurrentUserID() {
    return GLOBAL.currentUser.id;
  }
  backClicked() {
    this._location.back();
  }

  sendMessageTagHide() {
    this.isTagShow = false;
  }

  getInterpreterMessages(userId) {
    this.spinnerService.requestInProcess(true);
    this.messagingService.getInterpreterMessages(userId)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.messages = res.data.messages;
        }
        this.spinnerService.requestInProcess(false);
      },
        errors => {
          this.spinnerService.requestInProcess(false);
          let e = errors.json();
            this.notificationServiceBus.launchNotification(true, e);
      });
  }

  sendInterpreterMessages() {

    let url = (this.platformLocation as any).location.href;
    this.spinnerService.requestInProcess(true);
    this.messagingService.sendInterpreterMessages(this.getCurrentUserID(), url,  this.message_tage, this.message_body )
        .subscribe((res: any) => {
          if (res.status === 200) {
            this.ngOnInit();
            this.notificationServiceBus.launchNotification(false, 'Message sent successfully..');
            this.message_body = '';
          }
          this.spinnerService.requestInProcess(false);
        }, errors => {
          this.spinnerService.requestInProcess(false);
          let e = errors.json();
          this.notificationServiceBus.launchNotification(true, e);
        });
  }

  checkEmpty() {
    if (!this.message_body || this.message_body.trim().length === 0) {
      this.message_body = null;
    }
  }

  ngOnDestroy() {
    localStorage.setItem('bookingId', '-1');
  }
}
