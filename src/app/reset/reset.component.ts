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

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  resetUser() {
    this.service.resetUser(this.emailAddress)
        .subscribe((res: any) => {
            if (res.status === 200 ) {
            }
        },
        err => {
            console.log(err);
            this.errors = 'The email address is not registered with us.';
        },
        () => { });
  }

}
