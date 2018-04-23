import {Component, Input, OnInit} from '@angular/core';
import {GLOBAL} from '../../shared/global';
import { Administrator, BookingOfficer, Interpreter } from '../../shared/model/user.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent {
    @Input() title = '';
    @Input() backLink = '/booking-management';
    @Input() showBackLink = true;
    constructor(private router: Router) { }

    getPicturePath() {
        return Boolean(GLOBAL.currentUser)
            ? GLOBAL.currentUser.photo_url : '';
    }

    getActiveUserId() {
        return GLOBAL.currentUser.id;
    }

    isCurrentUserNotIndividualClientOrOrg() {
        return Boolean(GLOBAL.currentUser instanceof Administrator || GLOBAL.currentUser instanceof BookingOfficer || GLOBAL.currentUser instanceof Interpreter);
    }

    userLogout() {
        AuthGuard.logout();
        this.router.navigate(['/authenticate/logout']);
    }
}
