import { Component } from '@angular/core';
import { User } from '../../shared/model/user.entity';
import { UserService } from '../../api/user.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { GLOBAL } from '../../shared/global';
import {FormGroup} from '@angular/forms';

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


  editUser(form: FormGroup) {
      if ( form.invalid ) {
          this.notificationServiceBus.
          launchNotification(true, 'Kindly fill all the required (*) fields');
          return;
      }

      this.spinnerService.requestInProcess(true);

      this.userDataService.updatePassword(GLOBAL.currentUser.id, this.curr_password, this.new_password)
        .subscribe((res: any) => {
              if (res.status === 200) {
                // UI Notification
                  this.spinnerService.requestInProcess(false);

                  this.notificationServiceBus.launchNotification(false, 'User password updated Successfully');
              }
        }, errors => {
            this.spinnerService.requestInProcess(false);

            let e = errors.json();
          this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
              + JSON.stringify(e.errors || e).replace(/]|[[]/g, '').replace(/({|})/g, ''));
        });
  }

}
