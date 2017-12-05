import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {blockout_availability, Interpreter} from '../../../shared/model/user.entity';
import {FormGroup} from '@angular/forms';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {UserService} from '../../../api/user.service';
import {GLOBAL} from '../../../shared/global';
import {ActivatedRoute} from '@angular/router';
import {AvailabilityBlock} from '../../../shared/model/availability-block.entity';

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

    deleteBlockout () {
        this.spinnerService.requestInProcess(true);
        this.userDataService.deleteBlockout( GLOBAL.currentUser.id , this.availabilityBlock.id)
            .subscribe((res: any) => {
                if (res.status === 204) {
                    // UI Notification
                    let idx = this.interpreter.availability_blocks_attributes.indexOf(this.availabilityBlock);
                    this.interpreter.availability_blocks_attributes.splice(idx, 1);
                    this.availabilityBlock = new AvailabilityBlock();
                    this.spinnerService.requestInProcess(false);
                    this.notificationServiceBus.launchNotification(false, 'Blockout deleted Successfully');
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);

                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                    + JSON.stringify(e || e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
            });

    }

  editBlockouts(form: FormGroup) {
    if (form.invalid) {
      this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
      return;
    }
    this.spinnerService.requestInProcess(true);
    this.userDataService.editBlockout( GLOBAL.currentUser.id ,
        this.availabilityBlock)
        .subscribe((res: any) => {
          if (res.status === 204) {
            // UI Notification
              this.interpreter.availability_blocks_attributes.filter(o => o.id === this.availabilityBlock.id)
                  .map( o => o = this.availabilityBlock);
              this.spinnerService.requestInProcess(false);


              this.notificationServiceBus.launchNotification(false, 'Blockout edit Successfully');
          }
        }, errors => {
          this.spinnerService.requestInProcess(false);

          let e = errors.json();
          this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
              + JSON.stringify(e || e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
        });
  }

    addBlockouts(form: FormGroup) {
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, 'Oops! Please fill in all the fields correctly.');
            return;
        }
        this.spinnerService.requestInProcess(true);
        delete this.availabilityBlock.booking_id;
        delete this.availabilityBlock.id;
        this.userDataService.addBlockout( GLOBAL.currentUser.id , this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 200) {
                    // UI Notification
                    this.spinnerService.requestInProcess(false);
                    this.interpreter.availability_blocks_attributes.push(this.availabilityBlock);
                    this.notificationServiceBus.launchNotification(false, 'Blockout added Successfully');
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);

                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                    + JSON.stringify(e || e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
            });
    }
}
