import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Administrator, blockout_availability, BookingOfficer, Interpreter, UserFactory} from '../../shared/model/user.entity';
import { AvailabilityBlock } from '../../shared/model/availability-block.entity';
import { GLOBAL } from '../../shared/global';
import {  MdDialogRef } from '@angular/material';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import * as moment from 'moment';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { UserService } from '../../api/user.service';

@Component({
    selector: 'app-staff-calendar',
    templateUrl: './staff-calendar.component.html',
    styleUrls: ['./staff-calendar.component.css']
})
export class StaffCalendarComponent implements OnInit {
    userModel: Interpreter;
    @ViewChild('mycal') myCal: CalendarComponent;
    displayCalendar = true;
    calendarOptions: Object = {};
    updateCalendar = false;
    userID;
    interpreter: Interpreter;
    constructor(public userDataService: UserService, private route: ActivatedRoute, private router: Router) {
        this.userModel = new Interpreter();
    }
    isUserLogin() {
        return Boolean(GLOBAL.currentUser);
    }
    ngOnInit() {
        let d = new DatePipe('en-us');
        this.userModel.naati_validity_start_date =
            d.transform(this.userModel.naati_validity_start_date, 'yyyy-MM-dd');
        this.userModel.naati_validity_end_date =
            d.transform(this.userModel.naati_validity_end_date, 'yyyy-MM-dd');
        this.userModel.date_of_birth =
            d.transform(this.userModel.date_of_birth, 'yyyy-MM-dd');

        delete this.userModel.assignments_attributes;
        delete this.userModel.password;

        this.interpreter = Boolean(GLOBAL.currentUser) &&
            GLOBAL.currentUser instanceof Interpreter ? <Interpreter>GLOBAL.currentUser :
            this.isUserAdminOrBO() ? GLOBAL.currentInterpreter : null;
        this.userID = this.interpreter !== null ? this.interpreter.id : -1;
        if (this.userID !== -1) {
            this.userDataService.getUser(this.userID)
                .subscribe((res: any) => {
                    if (res.status === 200) {
                        delete res.data.assignments_attributes;
                        this.userModel.staff_availabilities_attributes = res.data.staff_availabilities_attributes;
                        this.StaffAvialabilityToUpdate();
                    }
                });
        }
    }
    isUserAdminOrBO() {
        return GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer;
    }
    getStaffAvailabilities(userID) {
    }
    StaffAvialabilityToUpdate() {
        if (this.displayCalendar) {
            this.calendarOptions = {
                height: 'auto',
                fixedWeekCount: false,
                weekends: true, // will hide Saturdays and Sundays
                timezone: 'local',
                slotDuration: '01:00:00',
                header: {
                    left: 'title',
                    center: '',
                    right: $(window).width() >= 768 ? 'month,agendaWeek,agendaDay,listYear,today,prev,next' : 'today,prev,next'
                },
                textColor: '#ffffff',
                contentHeight: 'auto',
                navLinks: true, // can click day/week names to navigate views
                selectable: true,
                selectHelper: true,
                windowResize: (view) => {
                    this.myCal.fullCalendar('changeView', $(window).width() < 768 ? 'listMonth' : 'month');
                },
                // customize the button names,
                // otherwise they'd all just say "list"
                views: {

                    month: { buttonText: 'month' }
                },
                eventRender: function (event, elm, view) {
                    return event.recurring === false || (event.ranges.filter(function (range) { // test event against all the ranges
                        event.end = event.end || event.start;
                        return (event.start.isBefore(range.end) &&
                            event.end.isAfter(range.start));

                    }).length) > 0; // if it isn't in one of the ranges, don't render it (by returning false
                },
                defaultView: $(window).width() < 768 ? 'listMonth' : 'month',
                eventClick: (calEvent, jsEvent, view) => {
                    if (view.name !== 'listYear' && view.name !== 'listMonth') {
                        this.router.navigate(['/user-management/', calEvent.id, 'staff-availability']);
                    }
                },
                editable: true,
                eventLimit: 2, // allow "more" link when too many events
                events: []
            };
            for (let avail_block of this.userModel.staff_availabilities_attributes) {
                let sd = new Date(avail_block.start_time);
                let ed = new Date(avail_block.end_date || avail_block.start_time);
                let edt = new Date(avail_block.end_time);
                let event: any = ({
                    title: avail_block.name,
                    color: avail_block.recurring ? '#00ff00' : '#02b86e',
                    id: avail_block.id,
                    textColor: '#ffffff',
                    booking_id: avail_block.booking_id,
                    start: avail_block.recurring === false ? sd.toISOString() : `${sd.getHours()}:${sd.getMinutes()}`,
                    end: avail_block.recurring === false ? ed.toISOString() : `${edt.getHours()}:${edt.getMinutes()}`,
                    recurring: avail_block.recurring,
                    frequency: avail_block.frequency
                });
                if (avail_block.recurring === true) {
                    event.dow = avail_block.frequency === 'daily' ? [1, 2, 3, 4, 5] : [sd.getDay()];
                    event.ranges = [
                        {
                            start: moment().endOf(avail_block.frequency === 'daily' ? 'day' :
                                avail_block.frequency === 'weekly' ? 'week' :
                                    avail_block.frequency === 'monthly' ? 'month' : 'week'),
                            end: moment().endOf(avail_block.frequency === 'daily' ? 'day' :
                                avail_block.frequency === 'weekly' ? 'week' :
                                    avail_block.frequency === 'monthly' ? 'month' : 'week')
                        },
                        {
                            start: moment(sd.toISOString()).format('YYYY-MM-DD'),
                            end: moment(ed.toISOString()).format('YYYY-MM-DD')
                        }
                    ];
                }

                this.calendarOptions['events'].push(event);
            }
            this.updateCalendar = true;
        }

    }
}
