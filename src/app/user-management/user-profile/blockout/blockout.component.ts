import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AvailabilityBlock, Interpreter} from '../../../shared/model/user.entity';
import {FormGroup} from '@angular/forms';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {UserService} from '../../../api/user.service';
import {GLOBAL} from '../../../shared/global';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blockout',
  templateUrl: './blockout.component.html',
  styleUrls: ['./blockout.component.css']
})
export class BlockoutComponent implements  OnDestroy, OnInit {
  availabilityBlock: AvailabilityBlock;
  sub;
  interpreter: Interpreter;
    param_id: number;
  constructor(public userDataService: UserService,
              public notificationServiceBus: NotificationServiceBus,
              public spinnerService: SpinnerService,
              private route: ActivatedRoute) {


  }

    ngOnInit() {
        this.interpreter = Boolean(GLOBAL.currentUser) &&
        GLOBAL.currentUser instanceof Interpreter ?
            (<Interpreter>GLOBAL.currentUser) : null;

        this.sub = this.route.params.subscribe(params => {
            let param_id = params['id'] || '';
            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                this.param_id = parseInt(param_id, 10);
                this.interpreter.availability_blocks_attributes
                    .filter( a => a.id === this.param_id  ).map( a => this.availabilityBlock = a );
            } else {
                this.availabilityBlock = new AvailabilityBlock();
            }
        });
    }

    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe();
    }

  addBlockouts(form: FormGroup) {
    if (form.invalid) {
      this.notificationServiceBus.launchNotification(true, 'Kindly fill all the required (*) fields');
      return;
    }
    this.spinnerService.requestInProcess(true);
    delete this.availabilityBlock.booking_id;
    this.userDataService.addBlockout( GLOBAL.currentUser.id , this.availabilityBlock)
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
