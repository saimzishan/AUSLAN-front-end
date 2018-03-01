import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../api/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationServiceBus } from '../notification/notification.service';
import {SpinnerService} from '../spinner/spinner.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit, OnDestroy {
  public userID = -0;
  public verificationCode = '';
  private sub: any;
  constructor(public service: UserService,
    public notificationServiceBus: NotificationServiceBus, public spinnerService: SpinnerService,
              public router: Router, public routes: ActivatedRoute) { }

  /*
  Initialize subscriptions
*/
  ngOnInit() {
    this.sub = this.routes.params.subscribe((p: any) => {
      this.userID = p.id;
      this.spinnerService.requestInProcess(false);
    });
  }

  /*
    Clean up the memory from subscriptions
  */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /*
    Handler to ask for verification code to be sent again
  */
  resendVerificationCode() {
      this.spinnerService.requestInProcess(true);

      this.service.resendVerificationCode(this.userID)
      .subscribe((res: any) => {
        if (res.status === 200) {
        }
              this.spinnerService.requestInProcess(false);
              this.notificationServiceBus.launchNotification(false, 'An email has been sent with your verification code');

          },
      err => {
        this.spinnerService.requestInProcess(false);
        this.notificationServiceBus.launchNotification(true, err.json());
      },
      () => { });
  }

  /*
    Handler to send the verification code
  */
  verifyUser() {
      this.spinnerService.requestInProcess(true);

      this.service.verifyUser(this.userID, this.verificationCode)
      .subscribe((res: any) => {
        if (res.status === 200) {
            this.router.navigate(['/dashboard']);
        }
      },
      err => {
          this.spinnerService.requestInProcess(false);
          this.notificationServiceBus.launchNotification(true, 'The verification Code is not right.');
      },
      () => { });
  }
}
