import { Component, OnInit } from '@angular/core';
import {BA, BOOKING_NATURE} from '../../shared/model/booking-nature.enum';

@Component({
  selector: 'app-skill-matrix',
  templateUrl: './skill-matrix.component.html',
  styleUrls: ['./skill-matrix.component.css']
})
export class SkillMatrixComponent {
  raw_nature_of_appointment: string;
  userDisplayName: string;
  appointment_types = Object.keys(BOOKING_NATURE).filter(value => value === BOOKING_NATURE[value]
  || BOOKING_NATURE[value].startsWith(value)).map(v => BOOKING_NATURE[v]) as string[];

  specific_appointment_types =  [];
  constructor() {
    BA.loadItems();
  }

  natureOfApptChange(value) {
    this.raw_nature_of_appointment = value;
    let val: BOOKING_NATURE = <BOOKING_NATURE> BOOKING_NATURE[this.raw_nature_of_appointment];
    this.specific_appointment_types = BA.DISSCUSSION_ITEM[BOOKING_NATURE[val]];
  }
}
