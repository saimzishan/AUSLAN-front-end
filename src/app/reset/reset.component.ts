import { Component } from '@angular/core';
import { NotificationServiceBus } from '../notification/notification.service';
import { UserService } from '../api/user.service';
import {SpinnerService} from '../spinner/spinner.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  public emailAddress = '';
  constructor(public service: UserService,
              public spinnerService: SpinnerService, public notificationServiceBus: NotificationServiceBus) { }

  resetUser() {
      this.spinnerService.requestInProcess(true);
      this.service.resetUser(this.emailAddress)
      .subscribe((res: any) => {
        if (res.status === 200) {
            let msg = 'The password has been reset for ' + this.emailAddress;
          this.notificationServiceBus.launchNotification(false, msg);
        }
        this.spinnerService.requestInProcess(false);
      },
      err => {
          this.spinnerService.requestInProcess(false);
        this.notificationServiceBus.launchNotification(true, 'The email address is not registered with us.');
      });
  }

}
