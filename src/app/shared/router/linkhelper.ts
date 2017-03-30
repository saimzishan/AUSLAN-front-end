import { Injectable } from '@angular/core';


export enum LINK {
  'profile', 'usermanagement', 'booking' , 'None'
}

@Injectable()
export class LinkHelper {
  public static activeLink: LINK = LINK.None;
}
