import { Component, OnInit, Input } from '@angular/core';
import { Accountant } from '../../shared/model/user.entity';
import { Venue } from '../../shared/model/venue.entity';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.css']
})
export class AccountantComponent implements OnInit {

  @Input() userModel: Accountant;

  constructor() { }

  ngOnInit() {
  }

}
