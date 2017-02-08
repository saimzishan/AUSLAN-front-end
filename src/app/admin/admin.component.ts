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
    // this is bad
    selectedLastName = '';

    ngOnInit() {

    }

    onKey(event: any) { // without type info
      this.selectedLastName = event.target.value;
    }
    constructor(private userDataService: UserService) {
      this.roles = ROLE;
      this.fetchUsers();
    }

    addUser() {
        this.userDataService.createUser(this.newUser)
        .subscribe((res: any) => {
           if ( res.data.id &&  0 < res.data.id) {
           this.newUser = new User();
           this.fetchUsers();
         }
        }, err => console.log(err));
      }

    editUser(user) {
        user.last_name = this.selectedLastName;
        this.userDataService.updateUser(user)
        .subscribe((res: any) => {
            if ( res.status === 200) {
              // UI Notification
              this.fetchUsers();
            }
        }, err => console.log(err));
    }

    removeUser(user) {
        this.userDataService.deleteUser(user.id)
        .subscribe((res: any) => {
          if ( res.status === 204 ) {
            this.fetchUsers();
          }
        }, err => console.log(err));
    }

    fetchUsers() {
      this.userDataService.fetchUsers()
      .subscribe((res: any) => {
        this.users = res.data.users;
      }, err => console.log(err));
    }

}
