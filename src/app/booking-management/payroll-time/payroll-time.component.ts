import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payroll-time',
  templateUrl: './payroll-time.component.html',
  styleUrls: ['./payroll-time.component.css'],
  exportAs: 'payrollTimeForm'
})
export class PayrollTimeComponent implements OnInit {
  @Input() payrollInvoice;
  @Input() index;
  @Input() isClient = false;

  constructor() { }

  ngOnInit() {
  }

}
