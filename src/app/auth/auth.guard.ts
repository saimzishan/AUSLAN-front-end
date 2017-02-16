import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {GLOBAL} from '../shared/global';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {


        public static isLoggedIn(): boolean {
            let token = sessionStorage.getItem('token');
            let user = GLOBAL.currentUser;
            let val = (token !== null && token.length > 0) &&
            (user !== null && user.email !== null && user.email.length > 0) &&
            tokenNotExpired('token', token);
            return val;
        }

        public static logout() {
            sessionStorage.removeItem('token');
            GLOBAL.currentUser = null;
        }

        public static login(user) {
            sessionStorage.setItem('token', user.token);
            GLOBAL.currentUser = user;
        }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = sessionStorage.getItem('token');
        if (AuthGuard.isLoggedIn()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/authenticate'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    constructor(private router: Router) { }

}
