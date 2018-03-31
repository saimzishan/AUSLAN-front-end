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
import { Administrator, BookingOfficer } from '../../shared/model/user.entity';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

  meesageThreads = [];
  meesageThread;
  userId;
  message_body;
  message_tage = '-000000';
  checked = false;
  isTagShow = true;
  messages;
  selected = -1;
  loginUserID = GLOBAL.currentUser.id;
  business_id = GLOBAL.currentUser.business_id;

  constructor(private userService: UserService, private notificationServiceBus: NotificationServiceBus, public platformLocation: PlatformLocation,
    private messagingService: MessagingService, private _location: Location, public spinnerService: SpinnerService,
    private rolePermission: RolePermission) { }

  ngOnInit() {
    if (this.isCurrentUserAdminOrBookingOfficer()) {
      this.getAllMeesageThreads(this.business_id);
    } else {
      this.getInterpreterMessages(GLOBAL.currentUser.id);
    }
  }

  getInterpreterMessages(userId) {
     this.spinnerService.requestInProcess(true);
     this.messagingService.getInterpreterMessages(userId)
          .subscribe((res: any) => {
            if (res.status === 200) {
                  this.messages = res.data.messages;
                  this.userId = userId;
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
     this.messagingService.sendInterpreterMessages(this.loginUserID, url, this.message_tage, this.message_body)
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

  getAllMeesageThreads(businessId) {
      this.spinnerService.requestInProcess(true);

      this.messagingService.allMeesageThreads(businessId)
          .subscribe((res: any) => {
                  if (res.status === 200) {
                      this.meesageThreads = res.data.message_threads
                          .filter( m => m.messages.length > 0 )
                          .sort((a, b) =>
                          new Date(a.last_messaging_time).getTime() >
                          new Date(b.last_messaging_time).getTime()
                      );
                      this.selected = 0;
                      this.meesageThread = this.meesageThreads[this.selected].messages;
                      this.userId = this.meesageThreads[this.selected].user_id;
                  }
                  this.spinnerService.requestInProcess(false);
              },
              errors => {
                  this.spinnerService.requestInProcess(false);
                  let e = errors.json();
                  this.notificationServiceBus.launchNotification(true, e);
              });
  }

  sendMessage() {
    let url = (this.platformLocation as any).location.href;
      url = url.substr(0, 30);
      url += this.userId + '/inbox';
    this.spinnerService.requestInProcess(true);

    this.messagingService.sendMessages(this.loginUserID, this.userId , url, this.message_tage, this.message_body)
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

  showSingleMessageThread(index) {
    this.meesageThread = this.meesageThreads[index].messages;
    this.userId = this.meesageThreads[index].user_id;
  }

  checkEmpty() {
    if (this.message_body.trim().length === 0) {
        this.message_body = null;
      }
  }
  sendMessageTagHide() {
    this.isTagShow = false;
  }

  isCurrentUserAdminOrBookingOfficer(): boolean {
    return Boolean(GLOBAL.currentUser instanceof Administrator || GLOBAL.currentUser instanceof BookingOfficer);
  }

  backClicked() {
      this._location.back();
  }

  ngOnDestroy() {
        localStorage.setItem('bookingId', '-1');
  }

  checkDayIsToday(lastMesgDate) {
    let curentDate = new Date();
    let curentDay = curentDate.getDate();
    let lastMesgDay = lastMesgDate.substring(8, 10);
    return (+lastMesgDay === curentDay);
  }

}
