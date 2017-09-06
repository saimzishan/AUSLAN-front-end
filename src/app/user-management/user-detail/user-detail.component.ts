import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { User } from '../../shared/model/user.entity';
import { UserService } from '../../api/user.service';
import { ROLE } from '../../shared/model/role.enum';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import {GLOBAL} from '../../shared/global';
import {SpacerPipe} from '../../shared/pipe/spacer.pipe';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
    @Input('userModel') userModel: User;
    @Output() onRefresh = new EventEmitter();
    isNewUser = true;
    selRoles = [];
    _selRoles = [ROLE.BookingOfficer, ROLE.IndividualClient , ROLE.OrganisationalRepresentative, ROLE.Interpreter];
    selectedRoles = {};
    showForm = false;
    userStatusArray = GLOBAL.userStatusArray;
    selectedStatus = '';
    public spacerPipe: SpacerPipe = new SpacerPipe();
    constructor(public userDataService: UserService,
    public notificationServiceBus: NotificationServiceBus,
        public spinnerService: SpinnerService, public dialogRef: MdDialogRef<any>) {
            if (GLOBAL.currentUser.getRole() === ROLE.Administrator) {
                this._selRoles.push(ROLE.Administrator);
            }
            for (let r of this._selRoles) {
                this.selRoles.push(this.spacerPipe.transform(ROLE[r]));
            }
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
        val = val.replace(/\s/g, '');
        return this.selectedRoles[val];
    }

    closeDialog() {
        for (let s in this.selectedRoles) {
            if (this.selectedRoles.hasOwnProperty(s)) {

                this.selectedRoles[s] = false;
            }
        }
        this.dialogRef.close();
        this.showForm = false;
        this.isNewUser = true;
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
