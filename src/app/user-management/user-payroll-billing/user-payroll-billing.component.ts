import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../api/user.service';
import {SpinnerService} from '../../spinner/spinner.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {UserPayrollBilling} from '../../shared/model/user-payroll-billing.entity';

@Component({
  selector: 'app-user-payroll-billing',
  templateUrl: './user-payroll-billing.component.html',
  styleUrls: ['./user-payroll-billing.component.css']
})
export class UserPayrollBillingComponent implements OnInit, OnDestroy {
  private sub: any;
  selectedRole = '';
  ordHours = '';
  paymentModel: UserPayrollBilling;

  constructor(private route: ActivatedRoute, public userService: UserService, public spinnerService: SpinnerService,
              public notificationServiceBus: NotificationServiceBus) { }

  ngOnInit() {
    this.paymentModel = new UserPayrollBilling();
    this.sub = this.route.queryParams.subscribe(params => {
      this.selectedRole = params['selectedRole'] || '';
      let userID = params['userId'] || '';
      if (Boolean(userID) && parseInt(userID, 10) > 0) {
        this.fetchUserPayrollOrBilling(userID);
      }
    });
  }

  ngOnDestroy() {
    return this.sub && this.sub.unsubscribe();
  }

  fetchUserPayrollOrBilling(userID) {
    this.spinnerService.requestInProcess(true);
    this.userService.getUserPayrollOrBilling(userID, this.selectedRole === 'ORGANISATION').subscribe((res: any) => {
      if (res.status === 200) {
        this.paymentModel.fromJSON(res.data);
      }
      this.spinnerService.requestInProcess(false);
    },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, e);
      });
  }

  savePayrollBilling(payroll_billing_form) {
    if (payroll_billing_form.invalid) {
      this.notificationServiceBus.launchNotification(true, 'Please fill all the fields correctly');
      return;
    }
    this.spinnerService.requestInProcess(true);
    this.userService.updateUserPayrollOrBilling(this.paymentModel).subscribe((res: any) => {
      if (res.status === 204) {
        this.notificationServiceBus.launchNotification(false, 'Hurray! details have been updated.');
      }
      this.spinnerService.requestInProcess(false);
    },
      err => {
        this.spinnerService.requestInProcess(false);
        let e = err.json() || 'There is some error on server side';
        this.notificationServiceBus.launchNotification(true, e);
      });
  }

}
