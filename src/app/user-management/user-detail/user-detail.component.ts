import { Component, Input,  OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {User} from '../../shared/model/user.entity';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input('userModel') userModel: User;

  constructor(public dialogRef: MdDialogRef<any>) { }
}
