import { Component } from '@angular/core';
import { User } from '../../shared/model/user.entity';
import { UserService } from '../../api/user.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { GLOBAL } from '../../shared/global';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent {

  curr_password = '';
  new_password = '';
  confirm_password = '';
  constructor(public userDataService: UserService,
              public notificationServiceBus: NotificationServiceBus,
              public spinnerService: SpinnerService) {

  }


  editUser() {
    this.userDataService.updatePassword(GLOBAL.currentUser.id, this.curr_password, this.new_password)
        .subscribe((res: any) => {
              if (res.status === 204) {
                // UI Notification
                this.notificationServiceBus.launchNotification(false, 'User password updated Successfully');
              }
        }, errors => {
          let e = errors.json();
          this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
              + JSON.stringify(e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
        });
  }

}
