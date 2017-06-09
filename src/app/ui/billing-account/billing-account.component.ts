import { Component, Input } from '@angular/core';
import {Accountant, OrganisationalRepresentative} from '../../shared/model/user.entity';
@Component({
  selector: 'app-billing-account',
  templateUrl: './billing-account.component.html',
  styleUrls: ['./billing-account.component.css']
})
export class BillingAccountComponent {
@Input() userModel: OrganisationalRepresentative;

address_title = 'Billing Address';
  @Input() billingAddressIsDifferent= true;
}
