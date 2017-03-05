import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {UserDetailComponent} from '../user-detail/user-detail.component';
import {User} from '../../shared/model/user.entity';

@Component({
    selector: 'app-user-filter',
    templateUrl: './user-filter.component.html',
    styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnChanges {
    @Input('userModel') userModel: User;

    isNewUser = true;

    dialogRef: MdDialogRef<any>;

    constructor(
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef) { }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            if (!changes[propName].isFirstChange()) {
                let to = JSON.stringify(changes[propName].currentValue);
                let from = JSON.stringify(changes[propName].previousValue);
                console.log(`${propName} changed from ${from} to ${to}`);
                this.isNewUser = false;
                this.showDialogBox();
            }
        }
    }

    newUser() {
      this.isNewUser = true;
      this.userModel = new User();
      this.showDialogBox();
    }

    private showDialogBox() {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        this.dialogRef = this.dialog.open(UserDetailComponent, config);
        this.dialogRef.componentInstance.userModel = this.userModel;
        this.dialogRef.componentInstance.isNewUser = this.isNewUser;
        this.dialogRef.componentInstance.showForm = !this.isNewUser;
        this.dialogRef.componentInstance.setRole();

        this.dialogRef.afterClosed().subscribe(result => {
          this.isNewUser = true;
          this.userModel = new User();

        });
    }

}
