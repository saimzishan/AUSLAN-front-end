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
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  meesageThreads;
  business_name = GLOBAL.currentUser.business_name;
  business_id = GLOBAL.currentUser.business_id;
  constructor(private userService: UserService, private notificationServiceBus: NotificationServiceBus, public platformLocation: PlatformLocation,
    private messagingService: MessagingService, private _location: Location, public spinnerService: SpinnerService,
    private rolePermission: RolePermission) { }

  ngOnInit() {
    this.getAllMeesageThreads(this.business_id);
  }

  getAllMeesageThreads(businessId) {
    this.spinnerService.requestInProcess(true);

    this.messagingService.allMeesageThreads(businessId)
            .subscribe((res: any) => {
                if (res.status === 200) {
                  this.meesageThreads = res.data.message_threads;
                  }
                this.spinnerService.requestInProcess(false);
              },
                errors => {
                  this.spinnerService.requestInProcess(false);
                  let e = errors.json();
                  this.notificationServiceBus.launchNotification(true, e);
          });
  }

}
