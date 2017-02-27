import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {SpinnerComponent} from '../spinner/spinner.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']

})
export class AuthComponent implements OnInit {
  errors: any;
  public isRequesting: boolean;
  model: User = new User();
  constructor(private service: UserService, private routes: ActivatedRoute, private router: Router) {
  }

   ngOnInit() {
     this.routes.url.subscribe( v => {
       if (v.length > 1 && v[1].path === 'logout') {
         this.logout();
       }
     });
   }

    onSubmit() {
      this.isRequesting = true;
      this.errors = '';
      this.service.login(this.model)
      .subscribe((res: any) => {
        this.isRequesting = false;
        if ( res.data.jwt) {
        this.model.token = res.data.jwt;
        AuthGuard.login(this.model);
        this.router.navigate(['/dashboard']);
      }
    },
    err => {
      console.log(err);
      this.errors = 'Email or Password not found';
      this.isRequesting = false;
    },
    () => {});
    }

    logout(): void {
        this.model.token = null;
        // clear token remove user from local storage to log user out
        AuthGuard.logout();
    }

}
