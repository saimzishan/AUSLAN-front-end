import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../shared/global';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import {UserNameService} from '../shared/user-name.service';
import {LinkHelper, LINK} from '../shared/router/linkhelper';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(public service: UserService, public linkHelper: LinkHelper,
      public userNameService: UserNameService, public router: Router) {
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
                    LinkHelper.activeLink = LINK.usermanagement;
                    this.linkHelper = LinkHelper;
                  }
              }
          },
          err => {
              console.log(err);
          },
          () => {  });
    }

}
