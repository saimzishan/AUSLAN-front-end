import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GLOBAL } from '../shared/global';
import { AuthGuard} from './auth.guard';

@Injectable()
export class NoAuthGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (AuthGuard.isLoggedIn()) {
            AuthGuard.logout();
        }
        return true;
    }
}
