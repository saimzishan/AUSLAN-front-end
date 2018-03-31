import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { OrganisationalRepresentative, Administrator, BookingOfficer } from '../../shared/model/user.entity';
import { AddressComponent } from '../address/address.component';
import {NgForm} from '@angular/forms';
import { GLOBAL } from '../../shared/global';
import { Address } from '../../shared/model/venue.entity';

@Component({
  selector: 'app-org-rep',
  templateUrl: './org-rep.component.html',
  styleUrls: ['./org-rep.component.css'],
  exportAs: 'ctOrgRepForm'
})
export class OrgRepComponent implements  OnInit, AfterViewInit {
  @ViewChild('orgRepForm') public orgRepform: NgForm;
  @Input() userModel: OrganisationalRepresentative;
  @Input() isDuplicate = false;
  @Input() isEdit = false;
  @Input() parentForm: NgForm;
  address_title = 'ORGANISATION ADDRESS';
  ngAfterViewInit() {
    if (this.parentForm !== null && this.parentForm !== undefined) {
        if (!this.parentForm.form.contains('orgRepForm')) {
            this.parentForm.form.addControl('orgRepForm', this.orgRepform.form);
        }
    }
  }
    ngOnInit() {
        delete this.userModel.password;
        let orgAddrss = this.userModel.address_attributes;
        let billingAddress = this.userModel.organisation_billing_account.organisation_billing_address;

        this.userModel.billingAddressIsSame = (orgAddrss.street_name === billingAddress.street_name &&
            orgAddrss.street_number === billingAddress.street_number &&
            orgAddrss.state === billingAddress.state &&
            orgAddrss.suburb === billingAddress.suburb &&
            orgAddrss.unit_number === billingAddress.unit_number &&
            orgAddrss.post_code === billingAddress.post_code);
    }

    checkUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer);
    }
    billingAddressNotAsOrg() {
        let billingAddress;
        if (this.userModel.billingAddressIsSame) {
            billingAddress = new Address();
            billingAddress = this.userModel.address_attributes;
            delete billingAddress.id;
        }
        this.userModel.organisation_billing_account.organisation_billing_address =
            this.userModel.billingAddressIsSame ? billingAddress : new Address();
    }
}
