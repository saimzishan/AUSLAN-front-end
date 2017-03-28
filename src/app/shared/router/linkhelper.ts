import { Injectable } from '@angular/core';


@Injectable()
export class LinkHelper {
  public static activeLink = '';
}

export enum LINK {
  'profile', 'usermanagement', 'booking'
}
