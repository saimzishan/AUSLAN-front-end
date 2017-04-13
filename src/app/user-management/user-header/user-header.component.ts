import { Component } from '@angular/core';
import {LinkHelper, LinkAuth, LINK} from '../../shared/router/linkhelper';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  linkName = LINK;
  constructor(private linkAuth: LinkAuth) {
  }

  isActiveLink(linkName) {
    return LinkHelper.activeLink === linkName;
  }

  setActiveLink(linkName) {
    LinkHelper.activeLink = linkName;
  }


  canShowLink(linkName) {
    return this.linkAuth.canShowLink(linkName);
  }
}
