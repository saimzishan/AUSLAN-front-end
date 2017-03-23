import { Component, OnChanges, Input } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NotificationServiceBus, NotificationContainer } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true,
    maximumLength: 200,
    preventDuplicates: false,
    animate: 'scale'
  };

  constructor(public notificationService: NotificationServiceBus, private _service: NotificationsService) {
    this.notificationService.launchNotification$.subscribe(
      notificationContainer => {
        if (notificationContainer && notificationContainer.message.length > 0) {
          if (!notificationContainer.isError) {
            this._service.success('Hurray! ', notificationContainer.message);
          } else {
            this._service.error('Oops! ', notificationContainer.message);
          }
        }
      });
  }


}
