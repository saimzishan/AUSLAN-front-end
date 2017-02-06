import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [UserService] // <-- this would override the parent DI instance

})
export class AuthComponent implements OnInit {
  model: User = new User();
  constructor(private service: UserService, private router: Router) { }

   ngOnInit() {
   }

    onSubmit() {
      this.service.login(this.model)
      .subscribe((res: any) => {
        if ( res.data.token) {
        this.model.token = res.data.token;
        GLOBAL.currentUser = this.model;
        this.router.navigate(['/dashboard']);
      }else { // show errors
      }
      }, err => console.log(err));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.model.token = null;
        GLOBAL.currentUser = null;
    }

}
