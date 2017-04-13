import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';
import { RolePermission } from '../role-permission/role-permission';

export enum LINK {
  'profile', 'usermanagement', 'booking', 'None'
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
    let r = GLOBAL.currentUser.getType();
    return false === this.rolePermission.isRestrictedRoute(r, path);
  }

  canEditLink(path, data_owner) {
    let r = GLOBAL.currentUser.getType();
    return false === this.rolePermission.isDataRestricted(r, path, data_owner)
      && false === this.rolePermission.isDataReadOnly(r, path, data_owner);
  }
}
