import { Component, OnInit } from '@angular/core';
import {UserService} from '../api/user.service';
import {User} from '../shared/model/user.entity';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    newUser: User = new User();

    ngOnInit() {
    }

    constructor(private userDataService: UserService) {
    }

    addUser() {
        this.userDataService.createUser(this.newUser)
        .subscribe(data => {
          this.userDataService.users.push(this.newUser);
          this.newUser = new User();
        });
      }

    editUser(user) {
        this.userDataService.updateUser(user.id);
    }

    removeUser(user) {
        this.userDataService.deleteUser(user.id);
    }

    get users() {
        return this.userDataService.fetchUsers();
    }

}
