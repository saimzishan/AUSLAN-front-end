import { Component, Input } from '@angular/core';
import {Contact} from '../../shared/model/contact.entity';
import {Address} from '../../shared/model/venue.entity';
@Component({
  selector: 'app-billing-account',
  templateUrl: './billing-account.component.html',
  styleUrls: ['./billing-account.component.css']
})
export class BillingAccountComponent {
  @Input() primaryContact: Contact;

address_title = 'BILLING ADDRESS';
  @Input() billingAddressIsSame= true;
  @Input() billingAddress: Address;
  @Input() preferred_billing_method_email = false;
}
