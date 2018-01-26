import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-payroll-time',
  templateUrl: './payroll-time.component.html',
  styleUrls: ['./payroll-time.component.css']
})
export class PayrollTimeComponent implements OnInit, AfterViewInit {
  @Input() payrollInvoice;
  @Input() index;
  @Input() isClient = false;
  @ViewChild('payrollTimeFields') public form: NgForm;
  @Input() parentForm: NgForm;
  @Input() isReadOnly = false;

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
  }

}
