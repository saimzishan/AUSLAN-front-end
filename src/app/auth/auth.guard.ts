import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GLOBAL } from '../shared/global';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { RolePermission } from '../shared/role-permission/role-permission';
import { User, UserFactory } from '../shared/model/user.entity';
import { ROLE } from '../shared/model/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {

    public static isLoggedIn(): boolean {
        let token = localStorage.getItem('token');
        let u = localStorage.getItem('user');
        if (Boolean(token === 'undefined' || u === 'undefined'
            || u === null || token === null)) {
            // this.logout();
            return false;
        } else {
            let data = JSON.parse(u);
            GLOBAL.currentUser = Boolean(!GLOBAL.currentUser) ? UserFactory.createUser(data) : GLOBAL.currentUser;
        }
        let user = GLOBAL.currentUser;
        let res = Boolean(Boolean(token !== undefined && token.length > 0) &&
            Boolean(user !== undefined && user.email !== undefined && user.email.length > 0) &&
            tokenNotExpired('token', token));
        return res;
    }

    public static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('message');

        GLOBAL.currentUser = undefined;
        GLOBAL.currentInterpreter = undefined;
    }

    public static login(user) {
        GLOBAL.currentUser =  user as User;
        user.password = '************';
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(GLOBAL.currentUser));
    }

    public static   refreshUser(user) {
        GLOBAL.currentUser = user;
        user.password = '************';
        localStorage.setItem('user', JSON.stringify(GLOBAL.currentUser));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (AuthGuard.isLoggedIn()) {
            if ( null === GLOBAL.currentUser || GLOBAL.currentUser === undefined ) {
                // logged in but opened a new tab
                 this.router.navigate(['/dashboard']);
            } else if ( GLOBAL.currentUser instanceof User) {
                let res = this.rolePermission.isRestrictedRouteForCurrentUser(state.url);
                return !res;
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/authenticate'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    constructor(public router: Router, private rolePermission: RolePermission) {

    }
}
