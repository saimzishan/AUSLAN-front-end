import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../shared/global';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import {UserNameService} from '../shared/user-name.service';
import {LinkHelper, LINK} from '../shared/router/linkhelper';
import { RolePermission } from '../shared/role-permission/role-permission';
import { User, UserFactory } from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {AuthGuard} from '../auth/auth.guard';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(public service: UserService, public linkHelper: LinkHelper,
      public userNameService: UserNameService, public router: Router,
      private rolePermission: RolePermission) {
    }

    ngOnInit() {
      this.getUserProfile();
    }

    getUserProfile() {
      let user  = GLOBAL.currentUser; // how to do conditional casting neatly ?
      this.service.getUserByEmail(user.email)
          .subscribe((res: any) => {
              if (res.status === 200) {
                  let data = res.data;
                  GLOBAL.currentUser = UserFactory.createUser(data);
                  user = GLOBAL.currentUser;
                  AuthGuard.refreshUser(user);
                  this.userNameService.setLoggedInUser(user);
                  if (!res.data.verified) { // show errors
                      this.router.navigate(['/verify/' + data.id]);
                  }else {
                      let route = this.rolePermission.getDefaultRouteForCurrentUser(true);
                    this.router.navigate( [route] );
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
