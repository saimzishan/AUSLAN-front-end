import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [UserService] // <-- this would override the parent DI instance

})
export class AuthComponent implements OnInit {
  error: any;
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
      this.service.login(this.model)
      .subscribe((res: any) => {
        if ( res.data.jwt) {
        this.model.token = res.data.jwt;
        GLOBAL.login(this.model);
        this.router.navigate(['/dashboard']);
      }else { // show errors
      }
    },
    err => {console.log(err); this.error = err; },
    () => {});
    }

    logout(): void {
        this.model.token = null;
        // clear token remove user from local storage to log user out
        GLOBAL.logout();
    }

}
