import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-payroll-billing',
  templateUrl: './user-payroll-billing.component.html',
  styleUrls: ['./user-payroll-billing.component.css']
})
export class UserPayrollBillingComponent implements OnInit {
  private sub: any;
  selectedRole = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.selectedRole = params['selectedRole'] || '';
    });

  }

}
