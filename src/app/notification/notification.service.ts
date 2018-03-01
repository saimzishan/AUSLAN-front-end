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
    // Handle error objects for Notification
    handleErrorObjectsForNotification(obj) {
        let message = '';
        for (let field in obj.errors) {
            if (obj.errors.hasOwnProperty(field)) {
                let fieldName = field === 'base' ? '' : field.charAt(0).toUpperCase() + field.slice(1);
                message += `${fieldName} ${obj.errors[field][0]}. `;
            }
        }
        this.launchNotification(true, message);
    }
    // Service message commands
    launchNotification(isError: boolean, message: string | object) {
        let notificationContainer = new NotificationContainer();
        if (message instanceof String) {
            notificationContainer.message = message;
        } else if (message.hasOwnProperty('errors') && message['errors'].length) {
            notificationContainer.message = message['errors'];
        } else if (message instanceof Object && isError) {
            this.handleErrorObjectsForNotification(message);
        } else {
            notificationContainer.message = JSON.stringify(message).replace(/[{"\[\]\}:]|errors|base/gmi, '');
        }
        notificationContainer.isError = isError;
        this.launchNotificationSource.next(notificationContainer);
    }
}
