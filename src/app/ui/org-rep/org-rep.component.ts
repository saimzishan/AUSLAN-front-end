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
    }

    checkUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer);
    }
    billingAddressNotAsOrg() {
        this.userModel.organisation_billing_account.organisation_billing_address =
            !this.userModel.billingAddressIsSame ? new Address() : this.userModel.address_attributes;
    }
}
