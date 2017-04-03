import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { User } from '../../shared/model/user.entity';
import { UserService } from '../../api/user.service';
import { ROLE } from '../../shared/model/role.enum';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import {GLOBAL} from '../../shared/global';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
    @Input('userModel') userModel: User;
    @Output() onRefresh = new EventEmitter();
    isNewUser = true;
    selRoles = ['Booking Officer', 'Client', 'Organisation', 'Interpreter'];
    selectedRoles = {};
    showForm = false;
    userStatusArray = GLOBAL.userStatusArray;
    selectedStatus = '';
    constructor(public userDataService: UserService, public notificationServiceBus: NotificationServiceBus,
        public spinnerService: SpinnerService, public dialogRef: MdDialogRef<any>) {
    }

    setRole() {
        if (this.userModel && this.userModel.type) {
            this.selectedRoles[this.userModel.type] = true;
        } else {
            for (let s in this.selectedRoles) {
                if (this.selectedRoles.hasOwnProperty(s)) {
                    this.selectedRoles[s] = false;
                }
            }
        }
        this.selectedStatus = this.userModel.disabled === false ? this.userStatusArray[0].name : this.userStatusArray[1].name;
    }

    makeFormVisible(val: string) {
        this.selectedRoles[val] = true;
        for (let s in this.selectedRoles) {
            if (s !== val) {
                this.selectedRoles[s] = false;
            }
        }
        this.showForm = true;
        this.userModel.role = ROLE[val.split(' ').join('')];
    }

    isRoleSelected(val: string) {
        return this.selectedRoles[val];
    }

    closeDialog() {
        for (let s in this.selectedRoles) {
            if (this.selectedRoles.hasOwnProperty(s)) {

                this.selectedRoles[s] = false;
            }
        }
        this.showForm = false;
        this.isNewUser = true;
        this.userModel = null;
        this.dialogRef.close();
        this.spinnerService.requestInProcess(false);
        this.onRefresh.emit();
    }

    applyChanges() {
        this.spinnerService.requestInProcess(true);
        this.isNewUser ? this.addUser() : this.editUser();
    }

    addUser() {
        this.userDataService.createUser(this.userModel)
            .subscribe((res: any) => {
                if (res.data.id && 0 < res.data.id) {
                    this.closeDialog();
                    this.notificationServiceBus.launchNotification(false, 'User Created Successfully');
                }
            },
            (err) => {
                this.spinnerService.requestInProcess(false);
                let e = err.json();
                this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);     });
    }

    editUser() {
        this.userModel.disabled = this.selectedStatus === 'Disabled';
        this.selectedStatus = '';
        this.userDataService.updateUser(this.userModel)
            .subscribe((res: any) => {
                if (res.status === 204) {
                    // UI Notification
                    this.closeDialog();
                    this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
                }
            },
            (err) => {
                this.spinnerService.requestInProcess(false);
                let e = err.json();
                this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);     });
    }

}
