import { Component, OnDestroy} from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NotificationServiceBus } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnDestroy {
  private sub: any;
  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true,
    maximumLength: 200,
    preventDuplicates: false,
    animate: 'scale'
  };

  constructor(public notificationService: NotificationServiceBus, private _service: NotificationsService) {
    this.sub = this.notificationService.launchNotification$.subscribe(
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

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
