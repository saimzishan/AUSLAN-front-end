import {Component, OnInit, Input} from '@angular/core';
import {AvailabilityBlock, Interpreter} from '../../shared/model/user.entity';
import {Address} from '../../shared/model/venue.entity';
import {AddressComponent} from '../address/address.component';
import {GLOBAL} from '../../shared/global';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-interpreter',
    templateUrl: './interpreter.component.html',
    styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent implements OnInit {
    @Input() userModel: Interpreter;
    updateCalendar = false;
    calendarOptions: Object = {
        height: 'parent',
        fixedWeekCount: false,
        defaultDate: '2016-01-01',
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
        eventRender: function (event, element, view) {
            // console.log(event.start.format());
            return (event.ranges.filter(function (range) {
                    return (event.start.isBefore(range.end) &&
                    event.end.isAfter(range.start));
                }).length) > 0;
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

        for (let avail_block of this.userModel.availability_blocks_attributes) {
            let sd = new Date(avail_block.start_time);
            let ed = new Date(avail_block.end_time);
            let event = ({
                title: avail_block.name,
                color: avail_block.recurring ? '#257e4a' : '#0000ff',
                id: avail_block.id,
                booking_id: avail_block.booking_id,
                start: `${sd.getHours()}:${sd.getMinutes()}`,
                end: `${ed.getHours()}:${ed.getMinutes()}`,
                dow: avail_block.recurring && avail_block.frequency === 'daily' ? [1 , 2 , 3 , 4 , 5 , 6, 0] : [ sd.getDay()],
                ranges: [
                    {
                        start: moment().endOf(avail_block.frequency === 'daily' ? 'day' :
                            avail_block.frequency === 'weekly' ? 'week' :
                            avail_block.frequency === 'monthly' ? 'month' : 'week')
                        // ,end: moment().endOf('week').add(7,'d'),
                    },
                    {
                    start: moment(sd.toISOString(), 'YYYY-MM-DD'),
                    end: moment(ed.toISOString(), 'YYYY-MM-DD').endOf( avail_block.recurring ? 'year' : 'week')
                }],
                recurring: avail_block.recurring,
                frequency: avail_block.frequency
            });
            console.log (event);
            this.calendarOptions['events'].push(event);
        }

        this.updateCalendar = true;

    }
}
