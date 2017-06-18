import { Component, OnInit, Input } from '@angular/core';
import { Interpreter } from '../../shared/model/user.entity';
import { Address } from '../../shared/model/venue.entity';
import { AddressComponent } from '../address/address.component';
import {GLOBAL} from '../../shared/global';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent  implements  OnInit {
  @Input() userModel: Interpreter;
  ngOnInit() {

    this.userModel.date_of_birth = GLOBAL.fixDateFormat(this.userModel.date_of_birth);
    this.userModel.naati_validity_end_date = GLOBAL.fixDateFormat(this.userModel.naati_validity_end_date);
    this.userModel.naati_validity_start_date = GLOBAL.fixDateFormat(this.userModel.naati_validity_start_date);

    delete this.userModel.assignments_attributes;
    delete this.userModel.password;
  }
}
