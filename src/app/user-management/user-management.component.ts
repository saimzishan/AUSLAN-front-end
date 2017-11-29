import {Component, AfterViewChecked, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {UserService} from '../api/user.service';
import {User, UserFactory} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {SpinnerService} from '../spinner/spinner.service';
import {NotificationServiceBus} from '../notification/notification.service';
import {GLOBAL} from '../shared/global';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {RolePermission} from '../shared/role-permission/role-permission';

@Component({
    selector: 'app-admin',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css'],
    changeDetection: ChangeDetectionStrategy.Default

})

export class UserManagementComponent implements OnInit {
    newUser: User = null;
    roles: any;
    users: Array<User> = [];
    // this is bad
    userName = '';
    totalItems = 0;
    page = 1;
    constructor(public spinnerService: SpinnerService,
                public notificationServiceBus: NotificationServiceBus,
                public userDataService: UserService,
                private rolePermission: RolePermission) {
        this.roles = ROLE;
        this.userName = '';
    }
    ngOnInit() {
        this.fetchUsers();
    }
    onPageEmit(page: number) {
        this.page = page;
        this.newUser = null;
        this.spinnerService.requestInProcess(true);
        this.userDataService.fetchPaginatedUsers(this.page)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        let userList = res.data.users.filter((u) => {
                            let result = Boolean(false === this.rolePermission.isDataRestrictedForCurrentUser('user-management', u.type));
                            return result;
                        }).map(u => UserFactory.createUser(u));
                        this.users = userList;
                        this.totalItems = Boolean(res.data.paginates) ? res.data.paginates.total_records : res.data.users.length;

                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);

                    console.log(err);
                });
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
                () => {
                });
    }

    fetchUsers() {
        this.onPageEmit(this.page);
    }

}
