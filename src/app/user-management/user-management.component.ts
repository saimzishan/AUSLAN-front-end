import { Component, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {SpinnerService} from '../spinner/spinner.service';
import { NotificationServiceBus } from '../notification/notification.service';
import {GLOBAL} from '../shared/global';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import { RolePermission } from '../shared/role-permission/role-permission';
declare var $: any;

@Component({
    selector: 'app-admin',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css'],
    changeDetection: ChangeDetectionStrategy.Default

})

export class UserManagementComponent implements AfterViewChecked {
    newUser: User = null;
    roles: any;
    users: Array<User> = [];
    // this is bad
    userName = '';
    ngAfterViewChecked() {
        $(document).foundation();
    }


    constructor(public spinnerService: SpinnerService,
    public notificationServiceBus: NotificationServiceBus,
      public userDataService: UserService,
      private rolePermission: RolePermission) {
      this.roles = ROLE;
      this.fetchUsers();
      this.userName = '';
    }

    onEditUser(u: User) {
        this.newUser = u;
    }

    onResetPassword(u: User) {
      this.userName = u.first_name + ' ' + u.last_name;
      this.userDataService.resetUser(u.email)
      .subscribe((res: any) => {
        if (res.status === 200) {
          let msg = 'The password has been reset for ' + this.userName;
          this.notificationServiceBus.launchNotification(false, msg);
        }
      },
      err => {
        console.log(err);
        this.notificationServiceBus.launchNotification(true, 'The email address is not registered with us.');
      },
      () => { });
    }

    fetchUsers() {
      this.newUser = null;
      this.spinnerService.requestInProcess(true);
      this.userDataService.fetchUsers()
      .subscribe((res: any) => {
        if ( res.status === 200 ) {
          let userList = res.data.users.filter( (u) => {
            let result = Boolean(false === this.rolePermission.isDataRestrictedForCurrentUser('user-management', u.type, false));
            return result;
          });
          this.users = userList;
      }
      this.spinnerService.requestInProcess(false);
      },
       err => {
         this.spinnerService.requestInProcess(false);

         console.log(err);
       });
    }

}
