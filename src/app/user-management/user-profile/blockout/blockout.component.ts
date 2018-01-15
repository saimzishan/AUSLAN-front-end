import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {blockout_availability, Interpreter} from '../../../shared/model/user.entity';
import {FormGroup} from '@angular/forms';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {UserService} from '../../../api/user.service';
import {GLOBAL} from '../../../shared/global';
import {ActivatedRoute} from '@angular/router';
import {AvailabilityBlock} from '../../../shared/model/availability-block.entity';
import {AuthGuard} from '../../../auth/auth.guard';

@Component({
    selector: 'app-blockout',
    templateUrl: './blockout.component.html',
    styleUrls: ['./blockout.component.css']
})
export class BlockoutComponent implements  OnDestroy, OnInit {
    sub;
    interpreter: Interpreter;
    param_id: number;
    end_time: Date = new Date();
    end_date: Date = new Date();
    start_time: Date  = new Date();
    public availabilityBlock: AvailabilityBlock = new AvailabilityBlock();
    constructor(public userDataService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                public spinnerService: SpinnerService,
                private route: ActivatedRoute) {}
    ngOnInit() {
        this.interpreter = Boolean(GLOBAL.currentUser) &&
        GLOBAL.currentUser instanceof Interpreter ?
            (<Interpreter>GLOBAL.currentUser) : null;
        this.sub = this.route.params.subscribe(params => {
            let param_id = params['id'] || '';
            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                this.param_id = parseInt(param_id, 10);
                this.interpreter.availability_blocks_attributes
                    .filter( a => a.id === this.param_id  )
                    .map( a =>
                        this.availabilityBlock = a
                    );
                this.start_time = new Date(this.availabilityBlock.start_time);
                this.end_time = new Date(this.availabilityBlock.end_time);
                this.end_date = new Date(this.availabilityBlock.end_date);
            }
        });
    }

    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe();
    }
    onStartTimeChanged () {
        // this.end_time.setTime(this.start_time.getTime() + (1 * 60 * 60 * 1000));
        this.end_time = this.start_time;
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
                    AuthGuard.refreshUser(this.interpreter);
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

        this.availabilityBlock.start_time = this.start_time.toISOString();
        this.availabilityBlock.end_time = this.end_time.toISOString();
        this.availabilityBlock.end_date = this.end_date.toISOString();
        this.userDataService.editBlockout( GLOBAL.currentUser.id ,
            this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 204) {
                    // UI Notification
                    this.interpreter.availability_blocks_attributes.filter(o => o.id === this.availabilityBlock.id)
                        .map( o => o = this.availabilityBlock);
                    this.spinnerService.requestInProcess(false);
                    AuthGuard.refreshUser(this.interpreter);
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
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        this.spinnerService.requestInProcess(true);
        delete this.availabilityBlock.booking_id;
        this.availabilityBlock.start_time = this.start_time.toISOString();
        this.availabilityBlock.end_time = this.end_time.toISOString();
        this.availabilityBlock.end_date = this.end_date.toISOString();

        this.userDataService.addBlockout( GLOBAL.currentUser.id , this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 200) {
                    // UI Notification
                    this.availabilityBlock.id = res.id;
                    this.spinnerService.requestInProcess(false);
                    this.interpreter.availability_blocks_attributes.push(this.availabilityBlock);
                    AuthGuard.refreshUser(this.interpreter);
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
