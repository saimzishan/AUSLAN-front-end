import { Component, Input, OnInit } from '@angular/core';
import { OrganisationalRepresentative } from '../../shared/model/user.entity';
import { AddressComponent } from '../address/address.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-org-rep',
  templateUrl: './org-rep.component.html',
  styleUrls: ['./org-rep.component.css']
})
export class OrgRepComponent implements  OnInit {
  @Input() userModel: OrganisationalRepresentative;
  @Input() parentForm: NgForm;
  address_title = 'ORGANISATION ADDRESS';
    ngOnInit() {
        delete this.userModel.password;
    }
}
