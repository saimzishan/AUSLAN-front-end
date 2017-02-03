import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    changeDetection: ChangeDetectionStrategy.Default

})

export class AdminComponent implements OnInit {
    newUser: User = new User();
    roles: any;
    users: Array<User> = [];
    ngOnInit() {

    }

    constructor(private userDataService: UserService) {
      this.roles = ROLE;

          this.userDataService.fetchUsers()
          .subscribe((res: any) => {
            this.users = res.data.users;
          }, err => console.log(err));
    }

    addUser() {
        this.userDataService.createUser(this.newUser)
        .subscribe((res: any) => {
           this.newUser.id =  res.data.id;
           this.users.push(this.newUser);
          this.newUser = new User();
        }, err => console.log(err));
      }

    editUser(user) {
        this.userDataService.updateUser(user)
        .subscribe((res: any) => {
            if ( res.status === 200) {
              // UI Notification
            }
        }, err => console.log(err));
    }

    removeUser(user) {
        this.userDataService.deleteUser(user.id)
        .subscribe((res: any) => {
          if ( res.status === 204 ) {
            // UI Notification
             this.users.splice(this.users.indexOf(user), 1);
          }
        }, err => console.log(err));
    }

}
