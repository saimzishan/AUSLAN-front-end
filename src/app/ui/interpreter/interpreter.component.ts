import {Component, ViewChild, OnInit, Input, ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';
import {Interpreter, BookingOfficer, Administrator} from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';
import {CalendarComponent} from 'ap-angular2-fullcalendar';

@Component({
    selector: 'app-interpreter',
    templateUrl: './interpreter.component.html',
    styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent implements OnInit {
    @Input() userModel: Interpreter;
    @Input() displayCalendar= false;
    @Input() canCalculateDistance: boolean;
    @ViewChild('mycal') myCal: CalendarComponent;
    updateCalendar = false;
    calendarOptions: Object = {};

    constructor(private router: Router) {}

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

        if (this.displayCalendar) {
            this.calendarOptions = {
                height: 'parent',
                fixedWeekCount: false,
                weekends: false, // will hide Saturdays and Sundays
                timezone: 'local',
                header: {
                    left: 'title',
                    center: '',
                    right: 'month,agendaWeek,agendaDay,listYear,today,prev,next'
                },
                contentHeight: 'auto',
                navLinks: true, // can click day/week names to navigate views
                selectable: true,
                selectHelper: true,
                windowResize: (view) => {
                    this.myCal.fullCalendar( 'changeView', $(window).width() < 768 ? 'listMonth' : 'month');
                },
                // customize the button names,
                // otherwise they'd all just say "list"
                views: {
                    listMonth: {buttonText: 'list Month'},
                    month: {buttonText: 'Grid Month'}
                },
                eventRender: function (event, elm, view) {
                    return event.recurring === false || (event.ranges.filter(function(range){ // test event against all the ranges
                        event.end = event.end || event.start;
                        return (event.start.isBefore(range.end) &&
                            event.end.isAfter(range.start));

                    }).length)  > 0; // if it isn't in one of the ranges, don't render it (by returning false
                },
                defaultView: 'month',
                eventClick: (calEvent, jsEvent, view) => {
                    this.router.navigate(['/user-management/', calEvent.id, 'block_out']);
                },
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events: []
            };

            for (let avail_block of this.userModel.availability_blocks_attributes) {
                let sd = new Date(avail_block.start_time);
                let ed = new Date(avail_block.end_date);
                let edt = new Date(avail_block.end_time);


                let event: any = ({
                    title: avail_block.name,
                    color: avail_block.recurring ? '#00ff00' : '#257e4a',
                    id: avail_block.id,
                    booking_id: avail_block.booking_id,
                    start: avail_block.recurring === false ? sd.toISOString() : `${sd.getHours()}:${sd.getMinutes()}`,
                    end: avail_block.recurring === false ? ed.toISOString() :  `${edt.getHours()}:${edt.getMinutes()}`,
                    recurring: avail_block.recurring,
                    frequency: avail_block.frequency
                });
                if (avail_block.recurring === true) {
                    event.dow = avail_block.frequency === 'daily' ? [1, 2, 3, 4, 5] : [sd.getDay()];
                    // let offSet = 1;
                    // ed.setDate(ed.getDate() + offSet);

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

    isUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer) ;
    }

}
