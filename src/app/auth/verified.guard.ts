import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GLOBAL } from '../shared/global';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { RolePermission } from '../shared/role-permission/role-permission';
import { User, UserFactory } from '../shared/model/user.entity';
import { ROLE } from '../shared/model/role.enum';

@Injectable()
export class VerifiedGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Boolean(GLOBAL.currentUser) && Boolean(GLOBAL.currentUser.verified)
        && GLOBAL.currentUser.verified === true;
    }

}
