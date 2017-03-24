import { Component, AfterViewChecked, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {UserFilterComponent} from './user-filter/user-filter.component';
import {UserListComponent} from './user-list/user-list.component';
import {SpinnerService} from '../spinner/spinner.service';
import {ViewChild, ViewChildren} from '@angular/core';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { ActivatedRoute } from '@angular/router';

declare var $: JQueryStatic;

@Component({
    selector: 'app-admin',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css'],
    changeDetection: ChangeDetectionStrategy.Default

})

export class UserManagementComponent implements AfterViewChecked, OnInit {
    newUser: User = new User();
    roles: any;
    users: Array<User> = [];
    // this is bad
    activeLink = 'ManageUsers';
    selectedLastName = 'I am ';
    profilePage = false;

    ngAfterViewChecked() {
      $(document).foundation();

    }

    ngOnInit() {
      this.routes.url.subscribe( v => {
        this.profilePage = (v.length > 1 && v[1].path === 'profile');
        this.activeLink = this.profilePage ? 'Profile' : 'ManageUsers';
      });
    }

    constructor(public spinnerService: SpinnerService, public routes: ActivatedRoute,
      public userDataService: UserService) {
      this.roles = ROLE;
      this.fetchUsers();
    }

    onEditUser(u: User) {
        this.newUser = u;
    }

    fetchUsers() {
      this.spinnerService.requestInProcess(true);
      this.userDataService.fetchUsers()
      .subscribe((res: any) => {
        if ( res.status === 200 ) {
        this.users = res.data.users;
      }
      this.spinnerService.requestInProcess(false);
      },
       err => {
         this.spinnerService.requestInProcess(false);

         console.log(err);
       });
    }

}
