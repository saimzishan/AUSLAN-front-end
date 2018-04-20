import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthGuard} from './auth.guard';
import { SpinnerService } from '../spinner/spinner.service';
import {NotificationServiceBus} from '../notification/notification.service';
import {GLOBAL} from '../shared/global';
import {URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']

})
export class AuthComponent implements OnInit, OnDestroy {
  model: User = new User();
  private sub: any;
  private querySub: any;
  private returnUrl = '';
  constructor(public spinnerService: SpinnerService, public notificationServiceBus: NotificationServiceBus, public service: UserService,
     public routes: ActivatedRoute, public router: Router) {
  }

   ngOnInit() {
     if (localStorage.getItem('user')) {
       this.router.navigate(['booking-management']);
     }
       this.querySub = this.routes
           .queryParams
           .subscribe(params => {
               // Defaults to 0 if no query param provided.
               this.returnUrl = params['returnUrl'] || '';
           });
   }


    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe()
            && this.querySub && this.querySub.unsubscribe();
    }

    onSubmit() {
      this.spinnerService.requestInProcess(true);
      this.service.login(this.model)
      .subscribe((res: any) => {
        // this.spinnerService.requestInProcess(false);

        if ( res.data.jwt) {
        this.model.token = res.data.jwt;
        AuthGuard.login(this.model);
        this.router.navigate(['/dashboard'], { queryParams: { redirectedUrl : this.returnUrl } });
      }
    },
    err => {
      this.spinnerService.requestInProcess(false);
      this.notificationServiceBus.launchNotification(true, 'Email or Password not found' );
    },
    () => {});
    }
}
