import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class AdminComponent implements OnInit {
    newUser: User = new User();
    roles: any;
    @Input() users: User[] = [];

    ngOnInit() {
      if ( this.users.length < 1 ) {
        this.fetchUsers();
      }
    }

    constructor(private userDataService: UserService) {
      this.roles = ROLE;
    }

    addUser() {
        this.userDataService.createUser(this.newUser)
        .subscribe(data => {
          this.users.push(this.newUser);
          this.newUser = new User();
        }, err => console.log(err));
      }

    editUser(user) {
        this.userDataService.updateUser(user.id);
    }

    removeUser(user) {
        this.userDataService.deleteUser(user.id);
    }

    fetchUsers() {
        this.userDataService.fetchUsers()
        .subscribe((res: any) => {
          this.users = res.data;
        }, err => console.log(err));

    }

}
