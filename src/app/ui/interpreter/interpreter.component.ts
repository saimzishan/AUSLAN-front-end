import {Component, ViewChild, OnInit, AfterViewInit, Input, ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';
import {Interpreter, BookingOfficer, Administrator} from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';
import {CalendarComponent} from 'ap-angular2-fullcalendar';
import {UserService} from '../../api/user.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-interpreter',
    templateUrl: './interpreter.component.html',
    styleUrls: ['./interpreter.component.css'],
    exportAs: 'ctInterpreterForm'
})
export class InterpreterComponent implements OnInit , AfterViewInit {
    @ViewChild('interpreterForm') public interpreterform: NgForm;
    @Input() userModel: Interpreter;
    @Input() displayCalendar= false;
    @Input() canCalculateDistance: boolean;
    @ViewChild('mycal') myCal: CalendarComponent;
    updateCalendar = false;
    calendarOptions: Object = {};
    @Input() parentForm: NgForm;

    constructor(private routes: ActivatedRoute, private router: Router, public userDataService: UserService) {
    }

    ngAfterViewInit() {
        if (this.parentForm !== null && this.parentForm !== undefined) {
            if (!this.parentForm.form.contains('interpreterFields')) {
                this.parentForm.form.addControl('interpreterFields', this.interpreterform.form);
            }
        }
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
        if (this.userModel) {
            this.userDataService.getUser(this.userModel.id)
                .subscribe((res: any) => {
                    if (res.status === 200) {
                        delete res.data.assignments_attributes;
                        this.userModel.availability_blocks_attributes = res.data.availability_blocks_attributes;
                        this.userModel.staff_availabilities_attributes = res.data.staff_availabilities_attributes;
                        this.BlockoutToUpdate();
                    }
                });
        }
    }
    isUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer);
    }
    BlockoutToUpdate() {
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
                navLinks: $(window).width() >= 768, // can click day/week names to navigate views , clickable if on desktop
                selectable: true,
                selectHelper: true,
                eventStartEditable: false, // will disable dragable events
                windowResize: (view) => {
                    this.myCal.fullCalendar( 'changeView', $(window).width() < 768 ? 'listMonth' : 'month');
                },
                // customize the button names,
                // otherwise they'd all just say "list"
                views: {

                    month: {buttonText: 'month'}
                },
                eventRender: function (event, elm, view) {
                    return event.recurring === false || (event.ranges.filter(function(range){ // test event against all the ranges
                        event.end = event.end || event.start;
                        return (event.start.isBefore(range.end) &&
                            event.end.isAfter(range.start));

                    }).length)  > 0; // if it isn't in one of the ranges, don't render it (by returning false
                },
                defaultView: 'listMonth',
                eventClick: (calEvent, jsEvent, view) => {
                        this.router.navigate(['/user-management/', calEvent.id, 'block_out']);
                },
                editable: true,
                eventLimit: 2, // allow "more" link when too many events
                events: []
            };
            for (let avail_block of this.userModel.availability_blocks_attributes) {
                let sd = new Date(avail_block.start_time);
                let ed = new Date(avail_block.end_date || avail_block.start_time);
                let edt = new Date(avail_block.end_time);


                let event: any = ({
                    title: avail_block.name,
                    color: '#02b86e',
                    id: avail_block.id,
                    textColor: '#ffffff',
                    booking_id: avail_block.booking_id,
                    start: avail_block.recurring === false ? sd.toISOString() : `${sd.getHours()}:${sd.getMinutes()}`,
                    end: avail_block.recurring === false ? ed.toISOString() :  `${edt.getHours()}:${edt.getMinutes()}`,
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
