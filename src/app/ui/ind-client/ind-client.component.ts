import { Component, OnInit, Input } from '@angular/core';
import { IndividualClient } from '../../shared/model/user.entity';

@Component({
  selector: 'app-ind-client',
  templateUrl: './ind-client.component.html',
  styleUrls: ['./ind-client.component.css']
})
export class IndClientComponent {
  @Input() userModel: IndividualClient;
  address_title = 'Individual Client Address';
  billingAddressIsDifferent = true;
}
