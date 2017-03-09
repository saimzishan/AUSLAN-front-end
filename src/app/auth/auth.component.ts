import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {SpinnerComponent} from '../spinner/spinner.component';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']

})
export class AuthComponent implements OnInit {
  errors: any;
  model: User = new User();

  constructor(public spinnerService: SpinnerService, public service: UserService,
     public routes: ActivatedRoute, public router: Router) {
       this.logout();
  }

   ngOnInit() {
     this.routes.url.subscribe( v => {
       if (v.length > 1 && v[1].path === 'logout') {
         this.logout();
       }
     });
   }

    onSubmit() {
      this.spinnerService.requestInProcess(true);
      this.errors = '';
      this.service.login(this.model)
      .subscribe((res: any) => {
        this.spinnerService.requestInProcess(false);

        if ( res.data.jwt) {
        this.model.token = res.data.jwt;
        AuthGuard.login(this.model);
        this.router.navigate(['/user-management']);
      }
    },
    err => {
      console.log(err);
      this.errors = 'Email or Password not found';
      this.spinnerService.requestInProcess(false);

    },
    () => {});
    }

    logout(): void {
        this.model.token = null;
        // clear token remove user from local storage to log user out
        AuthGuard.logout();
    }

}
