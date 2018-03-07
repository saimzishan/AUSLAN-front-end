import {Component, OnDestroy, Input, OnInit} from '@angular/core';
import {GLOBAL} from '../../shared/global';
import {UserNameService} from '../../shared/user-name.service';
import {LinkHelper, LINK, LinkAuth} from '../../shared/router/linkhelper';
import {BookingHeaderService} from '../../booking-management/booking-header/booking-header.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {
  linkName= LINK;
  private sub: any;
  userIsActive = false;
  fullName = '';

  constructor(private bookingHeaderService: BookingHeaderService, public router: Router, public userNameService: UserNameService, private linkAuth: LinkAuth) {
  }
  ngOnInit () {
      this.sub = this.userNameService.loggedInUser$.subscribe(
        u => {
          this.fullName = u.first_name + ' ' + u.last_name;
          this.userIsActive = GLOBAL.currentUser.verified && (GLOBAL.currentUser.disabled === false);

        });
        this.fullName = Boolean(GLOBAL.currentUser) && Boolean(GLOBAL.currentUser.first_name)
            && Boolean(GLOBAL.currentUser.first_name.length > 0 ) ?
            GLOBAL.currentUser.first_name + ' '  + GLOBAL.currentUser.last_name :
      '';
        this.userIsActive = Boolean(GLOBAL.currentUser && this.fullName && this.fullName.length > 0
        && this.fullName === GLOBAL.currentUser.first_name + ' '  + GLOBAL.currentUser.last_name);
  }

  getPicturePath() {
    return GLOBAL.currentUser.photo_url;
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

  refreshBooking() {
    this.bookingHeaderService.notifyOther({option: 'refreshBooking'});
  }
}
