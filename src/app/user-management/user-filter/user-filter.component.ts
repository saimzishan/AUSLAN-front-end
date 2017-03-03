import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {UserDetailComponent} from '../user-detail/user-detail.component';
import {User} from '../../shared/model/user.entity';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent {
  @Input('userModel') userModel: User;

  dialogRef: MdDialogRef<any>;

  constructor(
      public dialog: MdDialog,
      public viewContainerRef: ViewContainerRef) { }

    addUser() {
      let config = new MdDialogConfig();
      config.viewContainerRef = this.viewContainerRef;

      this.dialogRef = this.dialog.open(UserDetailComponent, config);
      this.dialogRef.componentInstance.userModel = this.userModel;
      this.dialogRef.afterClosed().subscribe(result => {
      });
    }

}
