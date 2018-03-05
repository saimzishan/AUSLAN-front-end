import {Component, OnDestroy, NgZone, OnInit} from '@angular/core';
import {NotificationServiceBus} from './notification.service';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {timer} from 'rxjs/observable/timer';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnDestroy, OnInit {
    private sub: any;
    title = '';
    mesg = '';
    show = false;
    isError = false;
    subscription;

    constructor(private ngZone: NgZone,
                public notificationService: NotificationServiceBus) {

    }

    ngOnInit() {

        this.sub = this.notificationService.launchNotification$.subscribe(
            notificationContainer => {
                if (notificationContainer && notificationContainer.message.length > 0) {
                    if (this.subscription) {
                        clearTimeout(this.subscription);
                    }
                    this.show = false;
                    this.isError = false;
                    this.mesg = notificationContainer.message;
                    if (!notificationContainer.isError) {
                        this.title = 'Hurray! ';
                        this.isError = true;
                    } else {
                        this.title = 'Oops! ';
                    }
                    this.show = true;
                    this.ngZone.runOutsideAngular(() => {
                        this.subscription = setTimeout(() => {
                            this.show = false;
                            this.isError = false;
                            this.ngZone.run(() => {
                            });

                        }, 2000);
                    });

                }
            });

    }

    ngOnDestroy() {
        if (this.subscription) {
            clearTimeout(this.subscription);
        }
        return this.sub.unsubscribe();
    }

}
