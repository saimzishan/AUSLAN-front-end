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
import {Location} from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

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
    userID;
    queryParamSub;
    defaultDateTime: Date;
    public href;
    staff_availability;
    bookingDate: Date;
    sideToggleCheck = false;
    strt_time;
    repeat_days = [
        {
            sendValue: '0',
            display: 'S',
            value: 'Sunday',
            selected: false
        },
        {
            sendValue: '1',
            display: 'M',
            value: 'Monday',
            selected: false
        },
        {
            sendValue: '2',
            display: 'T',
            value: 'Tuesday',
            selected: false
        },
        {
            sendValue: '3',
            display: 'W',
            value: 'Wednesday',
            selected: false
        },
        {
            sendValue: '4',
            display: 'T',
            value: 'Thursday',
            selected: false
        },
        {
            sendValue: '5',
            display: 'F',
            value: 'Friday',
            selected: false
        },
        {
            sendValue: '6',
            display: 'S',
            value: 'Saturday',
            selected: false
        }
    ];
    isWeekely;
    constructor(public userDataService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                public spinnerService: SpinnerService,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MdDialog,
                private datePipe: DatePipe,
                public viewContainerRef: ViewContainerRef, private _location: Location) {
    }
    public isRecurrenceDayCheckboxDisabled(day) {
        return this.bookingDate && this.bookingDate.getDay() === this.repeat_days.indexOf(day);
    }
    isTimeEqual() {
        return Boolean(this.start_time) && Boolean(this.end_time) && this.start_time.getTime() === this.end_time.getTime();
    }
    ngOnInit() {
        this.staff_availability = false;
        this.href = this.router.url.split('/');
        if (this.href[3] === 'staff-availability') {
            this.staff_availability = true;
        }

        this.userID = localStorage.getItem('userId');
        if (this.userID > 0) {
            this.spinnerService.requestInProcess(true);
            this.userDataService.getUser(this.userID)
                .subscribe((res: any) => {
                    if (res.status === 200) {
                        delete res.data.assignments_attributes;
                        this.interpreter = <Interpreter>res.data;
                        this.userID = Boolean(this.interpreter) ? this.interpreter.id : -1;
                        this.end_time.setTime(this.start_time.getTime() + (1 * 60 * 60 * 1000));
                        this.end_date = this.end_time;
                        this.sub = this.route.params.subscribe(params => {
                            let param_id = params['id'] || '';
                            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                                this.param_id = parseInt(param_id, 10);
                                if (this.staff_availability) {
                                    this.interpreter.staff_availabilities_attributes
                                        .filter(a => a.id === this.param_id)
                                        .map(a =>
                                            this.availabilityBlock = a
                                        );
                                } else {
                                    this.interpreter.availability_blocks_attributes
                                        .filter(a => a.id === this.param_id)
                                        .map(a =>
                                            this.availabilityBlock = a
                                        );
                                }
                                this.sideToggleCheck = this.availabilityBlock.recurring;
                                for (let day of this.availabilityBlock.recurring_week_days) {
                                    this.repeat_days[day].selected = true;
                                }
                                this.checkIsWeekely();
                                this.settingTime();
                            }
                        });
                        this.roundOffMinutes();
                    }
                    this.spinnerService.requestInProcess(false);
                });
        }
    }
    public setRecurring_week_days() {
        this.availabilityBlock.recurring_week_days = [];
        for (let i = 0; i < this.repeat_days.length; i++) {
            if (this.repeat_days[i].selected) {
                this.availabilityBlock.recurring_week_days.push(this.repeat_days[i].sendValue);
            }
        }
    }
    checkIsWeekely() {
        this.isWeekely = false;
        if (this.availabilityBlock.frequency === 'weekly') {
            this.isWeekely = true;
        }
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

        dt.setTime(this.start_time.getTime() + (1 * 60 * 60 * 1000));
        this.end_time = dt;
    }
    roundOffMinutes() {
        let dt = this.end_time;
        let currentDate = this.start_time;
        this.defaultDateTime = currentDate;
        let minute = Math.ceil(currentDate.getMinutes() / 5) * 5;
        this.defaultDateTime.setMinutes(minute);
        this.start_time = this.defaultDateTime;
        let end_minute = Math.ceil(dt.getMinutes() / 5) * 5;
        this.end_time.setMinutes(end_minute);
    }
    setDayMonthYear() {
        this.end_time = new Date(this.start_time.getFullYear(), this.start_time.getMonth(), this.start_time.getDate(),
        this.end_time.getHours(), this.end_time.getMinutes());
    }
    getRoute () {
        this._location.back();
    }
    deleteBlockout() {
        let message = `Do you really want to delete this blockout?`;
        let title = 'Delete Blockouts';
        this.createModal(title, message);
        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.spinnerService.requestInProcess(true);
                if (this.staff_availability) {
                    this.deleteStaffAvailabilities();
                } else {
                    this.userDataService.deleteBlockout(this.userID, this.availabilityBlock.id)
                        .subscribe((res: any) => {
                            if (res.status === 204) {
                                // UI Notification
                                let idx = this.interpreter.availability_blocks_attributes.indexOf(this.availabilityBlock);
                                this.interpreter.availability_blocks_attributes.splice(idx, 1);
                                this.availabilityBlock = new AvailabilityBlock();
                                this.param_id = -1;
                                this.spinnerService.requestInProcess(false);
                                this.notificationServiceBus.launchNotification(false, 'Blockout successfully deleted');
                                this._location.back();
                            }
                        }, errors => {
                            this.spinnerService.requestInProcess(false);
                            let e = errors.json();
                            this.notificationServiceBus.launchNotification(true, e);
                        });
                }
            }
        });
    }
    deleteStaffAvailabilities() {
        this.userDataService.deleteStaffAvailabilities(this.userID, this.availabilityBlock.id)
            .subscribe((res: any) => {
                if (res.status === 204) {
                    // UI Notification
                    let idx = this.interpreter.staff_availabilities_attributes.indexOf(this.availabilityBlock);
                    this.interpreter.staff_availabilities_attributes.splice(idx, 1);
                    this.availabilityBlock = new AvailabilityBlock();
                    this.param_id = -1;
                    this.spinnerService.requestInProcess(false);
                    this.notificationServiceBus.launchNotification(false, 'Staff Availability successfully deleted');
                    this._location.back();
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, e);
            });
    }
    interpreterStateTimeZone (time) {
        let timeZone = Booking.getNamedTimeZone(this.interpreter.address_attributes.state, this.interpreter.address_attributes.post_code.toString());
        return momentTimeZone(time).tz(timeZone).format('HH:mm:ss');
    }
    editBlockouts(form: FormGroup) {
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        this.spinnerService.requestInProcess(true);

        this.timeFormatting();
        this.userDataService.editBlockout(this.userID,
            this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 204) {
                    // UI Notification
                    this.interpreter.availability_blocks_attributes.filter(o => o.id === this.availabilityBlock.id)
                        .map(o => o = this.availabilityBlock);
                    this.spinnerService.requestInProcess(false);
                    this.notificationServiceBus.launchNotification(false, 'Blockout successfully updated');
                    this._location.back();
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, e);
            });
    }
    editStaffAvailabilities(form: FormGroup) {
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        this.spinnerService.requestInProcess(true);
        this.timeFormatting();
        this.userDataService.editStaffAvailabilities(this.userID,
            this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 204) {
                    // UI Notification
                    this.interpreter.staff_availabilities_attributes.filter(o => o.id === this.availabilityBlock.id)
                        .map(o => o = this.availabilityBlock);
                    this.spinnerService.requestInProcess(false);
                    this.notificationServiceBus.launchNotification(false, 'Staff-Availability successfully updated');
                    this._location.back();
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);

                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, e);
            });
    }

    saveBlockouts(form: FormGroup) {
        if (this.availabilityBlock.id < 1) {
            this.addBlockouts(form);
        } else {
            if (this.staff_availability) {
                this.editStaffAvailabilities(form);
            } else {
                this.editBlockouts(form);
            }
        }
    }

    addBlockouts(form: FormGroup) {
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        this.timeFormatting();
        if (this.availabilityBlock.recurring) {
            this.setRecurring_week_days();
            if (this.availabilityBlock.frequency === 'weekly' && this.availabilityBlock.recurring_week_days.length === 0) {
                this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
                return;
            } else if (this.availabilityBlock.frequency === 'daily') {
                this.availabilityBlock.recurring_week_days = [];
            }
        }
        this.spinnerService.requestInProcess(true);
        delete this.availabilityBlock.booking_id;
        if (this.staff_availability) {
            this.addStaffAvailabilitie(this.availabilityBlock);
        } else {
            this.userDataService.addBlockout(this.userID, this.availabilityBlock)
                .subscribe((res: any) => {
                    if (res.status === 200) {
                        // UI Notification

                        this.availabilityBlock.id = res.json().id;
                        this.spinnerService.requestInProcess(false);
                        this.interpreter.availability_blocks_attributes.push(this.availabilityBlock);
                        this.notificationServiceBus.launchNotification(false, 'Blockout successfully added');
                        this._location.back();

                    }
                }, errors => {
                    this.spinnerService.requestInProcess(false);

                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, e);
                });
        }
    }
    addStaffAvailabilitie(staffAvailabilitieForm) {
        this.userDataService.addStaffAvailabilities(this.userID, this.availabilityBlock)
            .subscribe((res: any) => {
                if (res.status === 200) {
                    this.availabilityBlock.id = res.json().id;
                    this.spinnerService.requestInProcess(false);
                    this.interpreter.staff_availabilities_attributes.push(this.availabilityBlock);
                    this.notificationServiceBus.launchNotification(false, 'Staff Availability successfully added');
                    this._location.back();

                }
            }, errors => {
                this.spinnerService.requestInProcess(false);

                let e = errors.json();
                if (this.start_time.getTime() > this.end_time.getTime()) {
                    this.notificationServiceBus.launchNotification(true, 'End time cannot be before start time. Please change');
                } else {
                    this.notificationServiceBus.launchNotification(true, e);
                }
            });
    }

    timeFormatting() {
        let startDate = this.datePipe.transform(this.start_time, 'yyyy-MM-dd');
        let startTime = moment(this.start_time, 'hh:mm A').format('HH:mm:ss');
        let endTime = moment(this.end_time, 'hh:mm A').format('HH:mm:ss');
        let daylightSavings = this.interpreterDaylightSavings(startDate);
        let endDate;
        if (!this.availabilityBlock.recurring) {
            endDate = this.datePipe.transform(this.start_time, 'yyyy-MM-dd');
        } else {
            endDate = this.datePipe.transform(this.end_date, 'yyyy-MM-dd');
        }

        this.availabilityBlock.start_time = startDate + 'T' + startTime + daylightSavings;
        this.availabilityBlock.end_time = startDate + 'T' + endTime + daylightSavings;
        this.availabilityBlock.end_date = endDate;
    }
    settingTime() {
        let endTime = this.interpreterStateTimeZone(this.availabilityBlock.end_time);
        let currentDate = new Date();
        let sTime = this.interpreterStateTimeZone(this.availabilityBlock.start_time);
        let startDate = new Date(this.availabilityBlock.start_time);

        this.start_time = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),
            moment.duration(sTime).get('hours'), moment.duration(sTime).get('minutes'));

        this.end_time = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
            moment.duration(endTime).get('hours'), moment.duration(endTime).get('minutes'));
        this.end_date = Boolean(this.availabilityBlock.end_date) ? new Date(this.availabilityBlock.end_date) :
            new Date(this.availabilityBlock.start_time);
    }
    interpreterDaylightSavings(startDate) {
        let timeZone = Booking.getNamedTimeZone(this.interpreter.address_attributes.state, this.interpreter.address_attributes.post_code.toString());
        return momentTimeZone(startDate).tz(timeZone).format('Z');
    }
    enDateGreterthenTostartDate(endDate, startDate) {
        return (this.getFullDate(startDate) < this.getFullDate(endDate ) );
    }

    getFullDate(date) {
        let month = date.getMonth() + 1;
        let fullDate = date.getDate();
        fullDate += '' + month;
        fullDate += '' + date.getFullYear();
        return fullDate;
    }

    checkMe(event) {
        this.strt_time = event.target.value;
    }

        assignMe(timeControl) {
            this.strt_time = this.strt_time.replace(/\s/g, '');
            let bookingTime = '';
            let str;
            if (this.strt_time.length >= 5) {
                str = this.strt_time.substring(this.strt_time.length - 2, this.strt_time.length);
                if (timeControl === 'endTimeControl') {
                    this.strt_time = this.strt_time.substring(0, 5);
                    if (str === 'am' || str === 'AM') {
                        bookingTime = this.strt_time + ' 00';
                    } else if (str === 'PM' || str === 'pm') {
                        let hh = this.strt_time.substring(0, 2);
                        let mm = this.strt_time.substring(3, 5);
                        hh = +hh + 12;
                        bookingTime = hh + ':' + mm + ' 00';
                    } else {
                        bookingTime = this.strt_time + ' 00';
                    }
                    this.end_time = new Date(bookingTime);
                } else {
                    let strt_date = this.strt_time.substring(0, 10);
                    this.strt_time = this.strt_time.substring(11, 15);
                    if (str === 'am' || str === 'AM') {
                        bookingTime = strt_date + ' ' + this.strt_time + ' AM';
                    } else if (str === 'PM' || str === 'pm') {
                        bookingTime = strt_date + ' ' + this.strt_time + ' PM';
                    } else {
                        bookingTime = strt_date + ' ' + this.strt_time + ' AM';
                    }
                    this.start_time = new Date(bookingTime);
                }
            }
            this.strt_time = '';
        }
}
