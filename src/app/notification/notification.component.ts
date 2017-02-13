import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input('notification') public notification: string;
  @Input('isError') public isError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
