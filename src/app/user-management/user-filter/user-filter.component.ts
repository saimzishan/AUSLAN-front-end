import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {UserDetailComponent} from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {

  constructor(public dialog: MdDialog) {}

    addUser() {
      let dialogRef = this.dialog.open(UserDetailComponent);
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  ngOnInit() {
  }

}
