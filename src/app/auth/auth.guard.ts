import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {GLOBAL} from '../shared/global';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import { RolePermission } from '../shared/role-permission/role-permission';
import { User } from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {

    public static isLoggedIn(): boolean {
        let token = sessionStorage.getItem('token');
        let user = GLOBAL.currentUser;
        if (!token || !user) { // this happens is token is there and user close the browser. We have to remove token on browser close
          this.logout();
          return false;
        }
        return ((token !== undefined && token.length > 0) &&
            (user !== undefined && user.email !== undefined && user.email.length > 0) &&
            tokenNotExpired('token', token));
    }

    public static logout() {
        sessionStorage.removeItem('token');
        GLOBAL.currentUser = undefined;
    }

    public static login(user) {
        sessionStorage.setItem('token', user.token);
        GLOBAL.currentUser = user;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (AuthGuard.isLoggedIn()) {
             let r = GLOBAL.currentUser.getRole();
            return !this.rolePermission.isRestrictedRoute(ROLE[r], state.url );
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/authenticate'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    constructor(public router: Router, private rolePermission: RolePermission) {

    }
}
