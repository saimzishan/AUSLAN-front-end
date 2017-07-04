import {Component, Input, OnInit} from '@angular/core';
import {AvailibilityBlock, Interpreter} from '../../../shared/model/user.entity';
import {FormGroup} from '@angular/forms';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {UserService} from '../../../api/user.service';
import {GLOBAL} from '../../../shared/global';

@Component({
  selector: 'app-blockout',
  templateUrl: './blockout.component.html',
  styleUrls: ['./blockout.component.css']
})
export class BlockoutComponent {
  availibilityBlock: AvailibilityBlock = new AvailibilityBlock();
  constructor(public userDataService: UserService,
              public notificationServiceBus: NotificationServiceBus,
              public spinnerService: SpinnerService) {

  }

  addBlockouts(form: FormGroup) {
    if (form.invalid) {
      this.notificationServiceBus.launchNotification(true, 'Kindly fill all the required (*) fields');
      return;
    }
    this.spinnerService.requestInProcess(true);

    this.userDataService.addBlockout( GLOBAL.currentUser.id , this.availibilityBlock)
        .subscribe((res: any) => {
          if (res.status === 200) {
            // UI Notification
            this.spinnerService.requestInProcess(false);

            this.notificationServiceBus.launchNotification(false, 'Blockout added Successfully');
          }
        }, errors => {
          this.spinnerService.requestInProcess(false);

          let e = errors.json();
          this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
              + JSON.stringify(e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
        });
  }
}
