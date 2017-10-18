import { Component, Input, ViewChild } from '@angular/core';
import { Address } from '../../shared/model/venue.entity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  exportAs: 'ctAddressForm'
})
export class AddressComponent {
  @Input() address: Address;
  @Input() prefix = '';
  @ViewChild('addressFields') public form: NgForm;
}
