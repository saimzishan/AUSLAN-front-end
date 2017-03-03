import { Component, Input, OnInit } from '@angular/core';
import {User} from '../../shared/model/user.entity';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input('userList') userList: Array<User> = [];

}
