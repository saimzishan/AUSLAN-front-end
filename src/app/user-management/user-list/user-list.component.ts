import { Component, Input, Output, EventEmitter } from '@angular/core';
import {User} from '../../shared/model/user.entity';
import { SpacerPipe } from '../../shared/pipe/spacer.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input('userList') userList: Array<User> = [];
  @Output() onEditUser = new EventEmitter<User>();
  @Output() onResetPass = new EventEmitter<User>();

  onUserSelect(user: User) {
    this.onEditUser.emit(user);
  }

  onResetPassword(user: User) {
    this.onResetPass.emit(user);
  }
}
