import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payroll-time',
  templateUrl: './payroll-time.component.html',
  styleUrls: ['./payroll-time.component.css']
})
export class PayrollTimeComponent implements OnInit {
  @Input() payrollInvoice;

  constructor() { }

  ngOnInit() {
  }

}
