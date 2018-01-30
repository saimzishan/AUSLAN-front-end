import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Administrator, blockout_availability, BookingOfficer, Interpreter, UserFactory} from '../../../shared/model/user.entity';
import {FormGroup} from '@angular/forms';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {UserService} from '../../../api/user.service';
import {GLOBAL, ModalOptions} from '../../../shared/global';
import {ActivatedRoute, Router} from '@angular/router';
import {AvailabilityBlock} from '../../../shared/model/availability-block.entity';
import {AuthGuard} from '../../../auth/auth.guard';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PopupComponent} from '../../../shared/popup/popup.component';
import {ROLE} from '../../../shared/model/role.enum';
import * as momentTimeZone from 'moment-timezone';
import {Booking} from '../../../shared/model/booking.entity';

@Component({
    selector: 'app-blockout',
    templateUrl: './blockout.component.html',
    styleUrls: ['./blockout.component.css']
})
export class BlockoutComponent implements OnDestroy, OnInit {
    sub;
    interpreter: Interpreter;
    param_id: number = -1;
    start_time: Date = new Date();
    end_time: Date = new Date();
    end_date: Date = this.start_time;
    public availabilityBlock: AvailabilityBlock = new AvailabilityBlock();
    dialogRef: MdDialogRef<any>;
    dialogSub;
    userID = -1;
    queryParamSub;
    defaultDateTime: Date;
    constructor(public userDataService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                public spinnerService: SpinnerService,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.interpreter = Boolean(GLOBAL.currentUser) &&
        GLOBAL.currentUser instanceof Interpreter ?  <Interpreter>GLOBAL.currentUser :
           this.isUserAdminOrBO() ?  GLOBAL.currentInterpreter : null;
        if (this.interpreter === null ) {
            this.router.navigate(['/user-management']);
        }
        this.userID = this.interpreter !== null ? this.interpreter.id : -1;
        this.end_time.setTime(this.start_time.getTime() + (1 * 60 * 60 * 1000));
        this.sub = this.route.params.subscribe(params => {
            let param_id = params['id'] || '';
            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                this.param_id = parseInt(param_id, 10);
                this.interpreter.availability_blocks_attributes
                    .filter(a => a.id === this.param_id)
                    .map(a =>
                        this.availabilityBlock = a
                    );
                this.start_time = new Date(this.availabilityBlock.start_time);
                this.end_time = new Date(this.availabilityBlock.end_time);
                this.end_date = Boolean(this.availabilityBlock.end_date) ? new Date(this.availabilityBlock.end_date) :
                    new Date(this.availabilityBlock.start_time);
            }
        });
        this.roundOffMinutes();
    }
    isUserAdminOrBO () {
        return GLOBAL.currentUser instanceof Administrator ||
        GLOBAL.currentUser instanceof BookingOfficer;
    }
    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe();
    }
    createModal(title: string, message: string, options?: ModalOptions) {
        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = title;
        this.dialogRef.componentInstance.cancelTitle = (options && options.cancelTitle) || 'BACK';
        this.dialogRef.componentInstance.okTitle = (options && options.okTitle) || 'DELETE';
        this.dialogRef.componentInstance.popupMessage = message;

    }
    onStartTimeChanged() {
        let dt = new Date();
        dt.setDate(this.start_time.getDate());
        this.end_date = dt;

        dt.setTime(this.start_time.getTime() + (1 * 60 * 60 * 1000));
        this.end_time = dt;
        console.log(this.end_time);
    }
    roundOffMinutes() {
        let currentDate = new Date();
        this.defaultDateTime = currentDate;
        let minute = Math.ceil(currentDate.getMinutes() / 5) * 5;
        this.defaultDateTime.setMinutes(minute);
        this.start_time =this.defaultDateTime;
        this.end_time =this.defaultDateTime;
    }
    getRoute () {
        this.router.navigate([ this.isUserAdminOrBO() ? '/user-management' : '/user-management/profile']);
    }
    deleteBlockout() {
        let message = `Do you really want to delete this blockout?`;
        let title = 'Delete Blockouts';
        this.createModal(title, message);
        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.spinnerService.requestInProcess(true);
                this.userDataService.deleteBlockout(this.userID, this.availabilityBlock.id)
                    .subscribe((res: any) => {
                        if (res.status === 204) {
                            // UI Notification
                            let idx = this.interpreter.availability_blocks_attributes.indexOf(this.availabilityBlock);
                            this.interpreter.availability_blocks_attributes.splice(idx, 1);
                            this.availabilityBlock = new AvailabilityBlock();
                            this.param_id = -1;
                            this.spinnerService.requestInProcess(false);
                            if (this.isUserAdminOrBO() === false) {
                                AuthGuard.refreshUser(this.interpreter);
                            }
                            this.notificationServiceBus.launchNotification(false, 'Blockout successfully deleted');
                            this.router.navigate([ this.isUserAdminOrBO() ? '/user-management' : '/user-management/profile']);
                        }
                    }, errors => {
                        this.spinnerService.requestInProcess(false);

                        let e = errors.json();
                        this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                            + JSON.stringify(e || e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
                    });
            }
        });
    }
    interpreterStateTimeZone (time) {
        let timeZone = Booking.getNamedTimeZone(this.interpreter.address_attributes.state, this.interpreter.address_attributes.post_code.toString());
        return momentTimeZone(time).tz(timeZone).format();
    }
    editBlockouts(form: FormGroup) {
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        this.spinnerService.requestInProcess(true);

        this.availabilityBlock.start_time = this.interpreterStateTimeZone(this.start_time);
        this.availabilityBlock.end_time = this.interpreterStateTimeZone(this.end_time);
        this.availabilityBlock.end_date = Boolean(this.end_date) ? this.interpreterStateTimeZone(this.end_date) : this.interpreterStateTimeZone(this.start_time);
        this.userDataService.editBlockout(this.userID,
            this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 204) {
                    // UI Notification
                    this.interpreter.availability_blocks_attributes.filter(o => o.id === this.availabilityBlock.id)
                        .map(o => o = this.availabilityBlock);
                    this.spinnerService.requestInProcess(false);
                    if (this.isUserAdminOrBO() === false) {
                        AuthGuard.refreshUser(this.interpreter);
                    }
                    this.router.navigate([ this.isUserAdminOrBO() ? '/user-management' : '/user-management/profile']);
                    this.notificationServiceBus.launchNotification(false, 'Blockout successfully updated');
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);

                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                    + JSON.stringify(e || e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
            });
    }

    saveBlockouts(form: FormGroup) {
        if (this.availabilityBlock.id < 1) {
            this.addBlockouts(form);
        } else {
            this.editBlockouts(form);
        }
    }

    addBlockouts(form: FormGroup) {
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        this.spinnerService.requestInProcess(true);
        delete this.availabilityBlock.booking_id;
        this.availabilityBlock.start_time = this.interpreterStateTimeZone(this.start_time);
        this.availabilityBlock.end_time = this.interpreterStateTimeZone(this.end_time);
        this.availabilityBlock.end_date = this.interpreterStateTimeZone(this.end_date);
        console.log(this.availabilityBlock);
        this.userDataService.addBlockout(this.userID, this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 200) {
                    // UI Notification

                    this.availabilityBlock.id = res.json().id;
                    this.spinnerService.requestInProcess(false);
                    this.interpreter.availability_blocks_attributes.push(this.availabilityBlock);
                    if (this.isUserAdminOrBO() === false) {
                        AuthGuard.refreshUser(this.interpreter);
                    }
                    this.router.navigate([ this.isUserAdminOrBO() ? '/user-management' : '/user-management/profile']);
                    this.notificationServiceBus.launchNotification(false, 'Blockout successfully added');
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);

                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                    + JSON.stringify(e || e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
            });
    }
}
