import { Component, OnInit } from '@angular/core';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(public verificationCode: string) { }

  ngOnInit() {
  }

  verifyUser() {

  }

}
