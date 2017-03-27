import { Injectable } from '@angular/core';


@Injectable()
export class LinkHelper {

  static _activeLink = ''; //
  public static set activeLink(val: string){
    this._activeLink = val;
  }

  public static get activeLink(): string {
    return this._activeLink;
  }
}

export enum LINK {
  'profile', 'usermanagement', 'booking'
}
