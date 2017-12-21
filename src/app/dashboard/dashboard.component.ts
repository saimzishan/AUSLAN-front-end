import { Component, OnInit, OnDestroy } from '@angular/core';
import {GLOBAL} from '../shared/global';
import { UserService } from '../api/user.service';
import {UserNameService} from '../shared/user-name.service';
import {LinkHelper, LINK} from '../shared/router/linkhelper';
import { RolePermission } from '../shared/role-permission/role-permission';
import { User, UserFactory } from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {AuthGuard} from '../auth/auth.guard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private querySub: any;
    private returnUrl = '';

    constructor(public service: UserService, public linkHelper: LinkHelper,
      public userNameService: UserNameService, public router: Router,
      public routes: ActivatedRoute,
      private rolePermission: RolePermission) {
    }

    ngOnInit() {
        this.querySub = this.routes
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.returnUrl = params['redirectedUrl'] || '';
            });
        this.getUserProfile();

    }

    ngOnDestroy() {
        return this.querySub
            && this.querySub.unsubscribe();
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
                  if (!data.verified) { // show errors
                      this.router.navigate(['/verify/' + data.id]);
                  } else {
                      let route = this.returnUrl.length > 0 && this.returnUrl.endsWith('job-detail') ?
                          this.returnUrl : this.rolePermission.getDefaultRouteForCurrentUser();
                    this.router.navigate( [route] );
                    LinkHelper.activeLink = LINK.booking;
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
