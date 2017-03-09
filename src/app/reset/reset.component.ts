import { Component, OnInit } from '@angular/core';
import {NotificationComponent} from '../notification/notification.component';
import {UserService} from '../api/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  public emailAddress= '';
  errors: any;
  isError = false;

  constructor(public service: UserService) { }

  ngOnInit() {
  }

  resetUser() {
    this.service.resetUser(this.emailAddress)
        .subscribe((res: any) => {
            if (res.status === 200 ) {
              this.isError = false;
              this.errors = 'The email address has been sent to your address';
            }
        },
        err => {
            console.log(err);
            this.isError = true;
            this.errors = 'The email address is not registered with us.';
        },
        () => { });
  }

}
