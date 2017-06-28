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
  }
}
