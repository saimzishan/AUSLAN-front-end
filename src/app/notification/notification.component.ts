import { Component, OnChanges, Input } from '@angular/core';
// This component should be replaced with https://github.com/flauc/angular2-notifications
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnChanges {
  @Input('notification') public notification: string;
  @Input('isError') public isError: boolean;
  shouldShow = false;
  constructor() { }

  ngOnChanges() {
    if (this.notification && this.notification.length > 0) {
      this.show();
  }
}

  show() {
    this.shouldShow = true;
  }

  hide()  {
    this.shouldShow = false;
    this.notification = '';
  }

}
