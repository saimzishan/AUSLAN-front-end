import {Component, OnInit, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Interpreter, BookingOfficer, Administrator} from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';

@Component({
    selector: 'app-interpreter',
    templateUrl: './interpreter.component.html',
    styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent implements OnInit {
    @Input() userModel: Interpreter;
    @Input() displayCalendar= false;
    @Input() canCalculateDistance: boolean;
    updateCalendar = false;
    calendarOptions: Object = {
        height: 'parent',
        fixedWeekCount: false,
        weekends: false, // will hide Saturdays and Sundays
        header: {
            left: 'prev,next, today',
            center: 'title',
            right: 'listMonth, month'
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
        navLinks: true, // can click day/week names to navigate views
        eventClick: (calEvent, jsEvent, view) => {
            this.router.navigate(['/user-management/', calEvent.id, 'block_out']);
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: []
    };

    constructor(private router: Router) {


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

        if (this.displayCalendar) {
            for (let avail_block of this.userModel.availability_blocks_attributes) {
                let sd = new Date(avail_block.start_time);
                let ed = new Date(avail_block.end_time);
                let event: any = ({
                    title: avail_block.name,
                    color: avail_block.recurring ? '#00ff00' : '#257e4a',
                    id: avail_block.id,
                    booking_id: avail_block.booking_id,
                    start: avail_block.recurring === false ? sd.toISOString() : `${sd.getHours()}:${sd.getMinutes()}`,
                    end: avail_block.recurring === false ? ed.toISOString() : `${ed.getHours()}:${ed.getMinutes()}`,
                    ranges: [
                        {
                            start: moment(sd.toISOString()).format('YYYY-MM-DD'),
                            end: moment(ed.toISOString()).format('YYYY-MM-DD')
                        }
                    ],
                    recurring: avail_block.recurring,
                    frequency: avail_block.frequency
                });
                if ( avail_block.recurring === true ) {
                 event.dow = [sd.getDay()];
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
