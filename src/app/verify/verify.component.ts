import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NotificationComponent } from '../notification/notification.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationServiceBus } from '../notification/notification.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  public userID = -1;
  public verificationCode = '';
  constructor(public service: UserService,
    public notificationServiceBus: NotificationServiceBus, public router: Router, public routes: ActivatedRoute) { }

  ngOnInit() {
    this.routes.params.subscribe((p: any) => {
      this.userID = p.id;
    });
  }

  /*
    Handler to ask for verification code to be sent again
  */
  resendVerificationCode() {
    this.service.resendVerificationCode(this.userID)
      .subscribe((res: any) => {
        if (res.status === 200) {
        }
      },
      err => {
        console.log(err);
        this.notificationServiceBus.launchNotification(true, err);
      },
      () => { });
  }

  /*
    Handler to send the verification code
  */
  verifyUser() {
    this.service.verifyUser(this.userID, this.verificationCode)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.router.navigate(['/dashboard']);
        }
      },
      err => {
        this.notificationServiceBus.launchNotification(true, 'The verification Code is not right.');
      },
      () => { });
  }
}
