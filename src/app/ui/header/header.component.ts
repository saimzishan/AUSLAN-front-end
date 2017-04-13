import { Component, OnDestroy, Input } from '@angular/core';
import {GLOBAL} from '../../shared/global';
import {UserNameService} from '../../shared/user-name.service';
import {LinkHelper, LINK, LinkAuth} from '../../shared/router/linkhelper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  linkName= LINK;
  private sub: any;
  userIsActive = false;
  @Input() fullName = GLOBAL.currentUser ? GLOBAL.currentUser.first_name + ' '  + GLOBAL.currentUser.last_name : '';

  constructor(public userNameService: UserNameService, private linkAuth: LinkAuth) {
      this.sub = this.userNameService.loggedInUser$.subscribe(
        u => {
          this.fullName = u.first_name + ' ' + u.last_name;
          this.userIsActive = GLOBAL.currentUser.verified && (GLOBAL.currentUser.disabled === false);

        });
  }

   ngOnDestroy() {
    return this.sub && this.sub.unsubscribe();
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
