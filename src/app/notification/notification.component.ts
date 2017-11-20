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
    _timer;
    ticks = 0;

    constructor(private ngZone: NgZone,
                public notificationService: NotificationServiceBus) {

    }

    ngOnInit() {

        this.sub = this.notificationService.launchNotification$.subscribe(
            notificationContainer => {
                if (notificationContainer && notificationContainer.message.length > 0) {
                    this.mesg = notificationContainer.message;
                    if (!notificationContainer.isError) {
                        this.title = 'Hurray! ';
                        this.isError = true;
                    } else {
                        this.title = 'Oops! ';
                    }
                    this.show = true;

                }
            });
        this.ngZone.runOutsideAngular(() => {
            this._timer = timer(3000, 3000);
            // subscribing to a observable returns a subscription object
            this.subscription = this._timer.subscribe(t => {
                this.ticks = t;
                this.show = false;
                this.isError = false;

            });
        });

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        return this.sub.unsubscribe();
    }

}
