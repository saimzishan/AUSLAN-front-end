import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { User } from '../../shared/model/user.entity';
import { UserService } from '../../api/user.service';
import { ROLE } from '../../shared/model/role.enum';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input('userModel') userModel: User;
  @Output() onRefresh = new EventEmitter();
  isNewUser = true;
  selRoles = ['BookingOfficer', 'Client', 'Organisation', 'Interpreter'];
  selectedRoles = {};
  showForm = false;
  userStatusArray = [{ name: 'ACTIVE' }, { name: 'DISABLED' }];
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
  }

  makeFormVisible(val: string) {
    this.selectedRoles[val] = true;
    for (let s in this.selectedRoles) {
      if (s !== val) {
        this.selectedRoles[s] = false;
      }
    }
    this.showForm = true;
    this.userModel.role = ROLE[val];
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
    this.userModel = new User();
    this.dialogRef.close();
    this.spinnerService.requestInProcess(false);

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
          this.onRefresh.emit();
          this.notificationServiceBus.launchNotification(false, 'User Created Successfully');
        }
      },
      (err) => {
        this.spinnerService.requestInProcess(false);
        this.notificationServiceBus.launchNotification(true, err);

        console.log(err);
      });
  }

  editUser() {
    this.userDataService.updateUser(this.userModel)
      .subscribe((res: any) => {
        if (res.status === 204) {
          // UI Notification
          this.closeDialog();
          this.onRefresh.emit();
          this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
        }
      },
      (err) => {
        this.spinnerService.requestInProcess(false);
        this.notificationServiceBus.launchNotification(true, err);
      });
  }

  updateStatus(e: boolean) {
    if (e) {
      this.enableUser();
    }
    this.selectedStatus = '';
  }


  enableUser() {
    this.spinnerService.requestInProcess(true);
    this.userModel.disabled = this.selectedStatus === 'DISABLED';
    this.userDataService.updateUser(this.userModel)
      .subscribe((res: any) => {
        if (res.status === 204) {
          this.closeDialog();
          this.onRefresh.emit();
          this.notificationServiceBus.launchNotification(false, 'User status has been changed Successfully');
        }
      },
      (err) => {
        this.spinnerService.requestInProcess(false);
        this.notificationServiceBus.launchNotification(true, err);
      });
  }

}
