import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';
import { RolePermission } from '../role-permission/role-permission';

export enum LINK {
  'profile', 'usermanagement', 'booking', 'None', 'change_pass', 'change_skills', 'block_out'
}

@Injectable()
export class LinkHelper {
  public static activeLink: LINK = LINK.None;
}

@Injectable()
export class LinkAuth {
  constructor(private rolePermission: RolePermission) {
  }

  canShowLink(path) {
    let res = Boolean(false === this.rolePermission.isRestrictedRouteForCurrentUser(path));
    return res;
  }

  canEditLink(path, data_owner) {
    let res = Boolean(false === this.rolePermission.isDataRestrictedForCurrentUser(path, data_owner)
      && false === this.rolePermission.isDataReadOnlyForCurrentUser(path, data_owner));
          return res;

  }
}
