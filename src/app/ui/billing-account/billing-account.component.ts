import {Component, Input, ViewChild} from '@angular/core';
import {Contact} from '../../shared/model/contact.entity';
import {Address} from '../../shared/model/venue.entity';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-billing-account',
  templateUrl: './billing-account.component.html',
  styleUrls: ['./billing-account.component.css'],
  exportAs: 'ctBillingForm'
})
export class BillingAccountComponent {
  @Input() primaryContact: Contact;
  @Input() billingAddress: Address;
  @Input() preferred_billing_method_email = false;
  @Input() parentForm: NgForm;
  @Input() canCalculateDistance: boolean;
  @ViewChild('billingFields') public form: NgForm;
  address_title = 'BILLING ADDRESS';
  @Input() isReadOnly = false;
}
