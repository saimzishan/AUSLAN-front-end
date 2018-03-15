import { Component } from '@angular/core';
import {NotificationServiceBus} from '../notification/notification.service';
import {GLOBAL} from '../shared/global';
import {SpinnerService} from '../spinner/spinner.service';
import {BookingService} from '../api/booking.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  date_from: Date;
  date_to: Date;
  exportType = '';

  constructor(public notificationServiceBus: NotificationServiceBus, public spinnerService: SpinnerService,
              public bookingService: BookingService, private datePipe: DatePipe) { }

  exportClick(report_form) {
    if (report_form.invalid) {
      this.notificationServiceBus.launchNotification(true, 'Please select all fields');
      return;
    }
    let data = {'date_from': this.datePipe.transform(this.date_from, 'dd/MM/yyyy'),
                'date_to': this.datePipe.transform(this.date_to, 'dd/MM/yyyy')};

    this.spinnerService.requestInProcess(true);
    this.bookingService.exportBookings(data)
        .subscribe((res: any) => {
                if (res.status === 204) {
                    this.notificationServiceBus.launchNotification(false, `Export is successful. Please check your email.`);
                }
                this.spinnerService.requestInProcess(false);
            },
            err => {
                this.spinnerService.requestInProcess(false);
                let e = err.json() || 'There is some error on server side';
                this.notificationServiceBus.launchNotification(true, e);
            });
  }

  private isBusinessVicdeaf(): boolean {
    return (GLOBAL.currentUser.business_name === 'Vicdeaf');
  }
}
