import {Component, OnDestroy, ViewContainerRef} from '@angular/core';
import {NotificationServiceBus} from './notification.service';
import {Md2Toast} from 'md2';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnDestroy {
    private sub: any;
    title = '';
    mesg = '';

    constructor(private toast: Md2Toast,
                public notificationService: NotificationServiceBus) {
        this.sub = this.notificationService.launchNotification$.subscribe(
            notificationContainer => {
                if (notificationContainer && notificationContainer.message.length > 0) {
                    this.mesg = notificationContainer.message;
                    if (!notificationContainer.isError) {
                        this.title = 'Hurray! ';
                    } else {
                        this.title = 'Oops! ';
                    }
                    this.toast.show(this.mesg, 3200);
                }
            });
    }

    ngOnDestroy() {
        return this.sub.unsubscribe();
    }

}
