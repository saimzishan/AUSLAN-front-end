import { Component, OnInit, Input } from '@angular/core';
import {User} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';
import { UserService } from '../api/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UserNameService} from '../shared/user-name.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(public service: UserService, public userNameService: UserNameService, public router: Router) {
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
                  this.userNameService.setLoggedInUser(user);
                  if (!res.data.verified) { // show errors
                      this.router.navigate(['/verify/' + user.id]);
                  }else {
                    this.router.navigate(['/user-management']);
                  }
              }
          },
          err => {
              console.log(err);
          },
          () => {  });
    }

}
