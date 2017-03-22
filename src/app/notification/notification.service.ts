import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NotificationContainer {
  isError = false;
  message = '';
}

@Injectable()
export class NotificationServiceBus {

  // Observable string sources
  launchNotificationSource = new Subject<NotificationContainer>();
  // Observable string streams
  launchNotification$ = this.launchNotificationSource.asObservable();
  // Service message commands
  launchNotification(isError: boolean, message: string) {
    let notificationContainer = new NotificationContainer();
    notificationContainer.isError = isError;
    notificationContainer.message = message;
    this.launchNotificationSource.next(notificationContainer);
  }

}
