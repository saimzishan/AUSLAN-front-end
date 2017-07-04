import { Component, OnInit, Input } from '@angular/core';
import { Interpreter } from '../../shared/model/user.entity';
import { Address } from '../../shared/model/venue.entity';
import { AddressComponent } from '../address/address.component';
import {GLOBAL} from '../../shared/global';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent  implements  OnInit {
  @Input() userModel: Interpreter;
  updateCalendar = false;
  calendarOptions: Object = {
    height: 'parent',
    fixedWeekCount : false,
    defaultDate: '2016-09-12',
    header: {
      left: 'prev,next today',
      center: 'title',

      right: 'listDay,listWeek,month'
    },

    // customize the button names,
    // otherwise they'd all just say "list"
    views: {
      listDay: { buttonText: 'list day' },
      listWeek: { buttonText: 'list week' }
    },

    defaultView: 'listWeek',
    navLinks: true, // can click day/week names to navigate views

    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [

    ]
  };

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

    for (let avail_block of this.userModel.availability_blocks) {
      this.calendarOptions['events'].push({title: avail_block.name,
        start: avail_block.start_time, end: avail_block.end_time,
      id: avail_block.id, booking_id: avail_block.booking_id, recurring: avail_block.recurring,
        frequency: avail_block.frequency});
    }
    this.updateCalendar = true;

  }
}
