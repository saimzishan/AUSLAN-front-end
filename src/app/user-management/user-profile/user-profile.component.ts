import { Component } from '@angular/core';
import { User } from '../../shared/model/user.entity';
import { UserService } from '../../api/user.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import {GLOBAL} from '../../shared/global';
import {UserNameService} from '../../shared/user-name.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userModel: User = GLOBAL.currentUser;
  selectedStatus = '';
  userStatusArray = GLOBAL.userStatusArray;

  constructor(public userDataService: UserService, public userNameService: UserNameService,
    public notificationServiceBus: NotificationServiceBus,
    public spinnerService: SpinnerService) {
      this.selectedStatus = this.userModel.disabled === false ? this.userStatusArray[0].name : this.userStatusArray[1].name;
  }


  editUser() {
      this.userModel.disabled = this.selectedStatus === 'Disabled';
      this.selectedStatus = '';
      this.userDataService.updateUser(this.userModel)
          .subscribe((res: any) => {
              if (res.status === 204) {
                  // UI Notification
                  this.userNameService.setLoggedInUser(this.userModel);
                  this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
              }
          },
          (err) => {
              this.spinnerService.requestInProcess(false);
              this.notificationServiceBus.launchNotification(true, err);
          });
  }
}
