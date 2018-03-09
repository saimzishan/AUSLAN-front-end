import { Component } from '@angular/core';
import {NotificationServiceBus} from '../notification/notification.service';
import {GLOBAL} from '../shared/global';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  startDate: Date;
  endDate: Date;
  exportType = '';

  constructor(public notificationServiceBus: NotificationServiceBus) { }

  exportClick(report_form) {
    if (report_form.invalid) {
      this.notificationServiceBus.launchNotification(true, 'Please select all fields');
      return;
    }
  }

  private isBusinessVicdeaf(): boolean {
    return (GLOBAL.currentUser.business_name === 'Vicdeaf');
  }
}
