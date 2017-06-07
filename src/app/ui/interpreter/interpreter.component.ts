import { Component, OnInit, Input } from '@angular/core';
import { Interpreter } from '../../shared/model/user.entity';
import { Address } from '../../shared/model/venue.entity';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent implements OnInit {
  @Input() userModel: Interpreter;

  ngOnInit() {
    this.userModel.home_address = new Address();
    this.userModel.postal_address = new Address();
  }
}
