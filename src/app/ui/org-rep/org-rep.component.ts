import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { OrganisationalRepresentative } from '../../shared/model/user.entity';
import { AddressComponent } from '../address/address.component';
import {NgForm} from '@angular/forms';

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
  @Input() parentForm: NgForm;
  address_title = 'ORGANISATION ADDRESS';
  ngAfterViewInit() {
    if (this.parentForm !== null) {
        if (!this.parentForm.form.contains('orgRepForm')) {
            this.parentForm.form.addControl('orgRepForm', this.orgRepform.form);
        }
    }
  }
    ngOnInit() {
        delete this.userModel.password;
    }
}
