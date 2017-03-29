import { Component } from '@angular/core';
import { NotificationServiceBus } from '../notification/notification.service';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  public emailAddress = '';

  constructor(public service: UserService, public notificationServiceBus: NotificationServiceBus) { }

  resetUser() {
    this.service.resetUser(this.emailAddress)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.notificationServiceBus.launchNotification(false, 'The email address has been sent to your address');
        }
      },
      err => {
        console.log(err);
        this.notificationServiceBus.launchNotification(true, 'The email address is not registered with us.');
      },
      () => { });
  }

}
