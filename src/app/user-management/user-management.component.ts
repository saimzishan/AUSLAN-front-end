import { Component, AfterViewChecked, Input, ChangeDetectionStrategy } from '@angular/core';
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
declare var $: JQueryStatic;

@Component({
    selector: 'app-admin',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css'],
    changeDetection: ChangeDetectionStrategy.Default

})

export class UserManagementComponent implements AfterViewChecked {
    newUser: User = new User();
    roles: any;
    users: Array<User> = [];
    // this is bad
    selectedLastName = 'I am ';

    ngAfterViewChecked() {
      $(document).foundation();

    }

    constructor(private userDataService: UserService) {
      this.roles = ROLE;
      this.fetchUsers();
    }

    onEditUser(u: User) {
        this.newUser = u;
    }

    fetchUsers() {
      this.userDataService.fetchUsers()
      .subscribe((res: any) => {
        if ( res.status === 200 ) {
        this.users = res.data.users;
      }
      }, err => console.log(err));
    }

}
