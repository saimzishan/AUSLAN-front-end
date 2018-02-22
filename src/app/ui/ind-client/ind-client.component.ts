import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { IndividualClient } from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-ind-client',
  templateUrl: './ind-client.component.html',
  styleUrls: ['./ind-client.component.css']
})
export class IndClientComponent   implements  OnInit , AfterViewInit {

  @Input() userModel: IndividualClient;
  @Input() canCalculateDistance: boolean;
    @Input() parentForm: NgForm;
    @ViewChild('indClientForm') public form: NgForm;
  address_title = 'INDIVIDUAL CLIENT ADDRESS';
  ngOnInit() {
    delete this.userModel.password;

  }
  ngAfterViewInit() {
    if (this.parentForm !== null && this.parentForm !== undefined) {
        if (!this.parentForm.form.contains('indClientForm')) {
            this.parentForm.form.addControl('indClientForm', this.form.form);
        }
    }
  }
}
