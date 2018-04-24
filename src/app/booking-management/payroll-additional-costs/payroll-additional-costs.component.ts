import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-payroll-additional-costs',
  templateUrl: './payroll-additional-costs.component.html',
  styleUrls: ['./payroll-additional-costs.component.css']
})
export class PayrollAdditionalCostsComponent implements OnInit {
  @Input() payrollInvoice;
  @Input() index;
  @Input() isClient = false;
  @ViewChild('payrollAdditionalCostFields') public form: NgForm;
  @Input() parentForm: NgForm;
  @Input() isReadOnly = false;
  interpTimePlaceHolder = '';
  prepTimePlaceHolder = '';
  kmPlaceHolder = '';
  travelTimePlaceHolder = '';

  constructor() { }

  ngAfterViewInit() {
    if (this.parentForm !== null) {
        let ctrlName = 'timeFields_' + (this.isClient ? 'client_' : 'interpreter_') + this.index;

        if (!this.parentForm.form.contains(ctrlName)) {
            this.parentForm.form.addControl(ctrlName, this.form.form);
        }
    }
  }

  ngOnInit() {
    this.interpTimePlaceHolder = this.payrollInvoice.recommended.interpreting_time;
    this.prepTimePlaceHolder = this.payrollInvoice.preparation_time;
    this.kmPlaceHolder = this.payrollInvoice.recommended.distance;
    this.travelTimePlaceHolder = this.payrollInvoice.recommended.travel_time;
  }
}
