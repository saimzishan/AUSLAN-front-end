import { Component, OnInit, Input } from '@angular/core';
import {User} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';
import { UserService } from '../api/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    first_name = '';
    constructor(public service: UserService, public routes: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
      this.getUserProfile();
    }

    getUserProfile() {
      let user = GLOBAL.currentUser;
      this.service.getUserByEmail(user.email)
          .subscribe((res: any) => {
              if (res.status === 200) {
                  user = res.data;
                  GLOBAL.currentUser = user;

                  if (!res.data.verified) { // show errors
                      this.router.navigate(['/verify/' + user.id]);
                  }
              }
          },
          err => {
              console.log(err);
          },
          () => { this.first_name = user.first_name + ' ' + user.last_name; });
    }

}
