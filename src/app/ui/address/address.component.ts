import { Component, Input } from '@angular/core';
import { Address } from '../../shared/model/venue.entity';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  @Input() address: Address;
  @Input() prefix = '';
}
