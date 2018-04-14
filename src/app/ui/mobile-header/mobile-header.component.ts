import {Component, Input, OnInit} from '@angular/core';
import {GLOBAL} from '../../shared/global';
import { Administrator, BookingOfficer, Interpreter } from '../../shared/model/user.entity';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent {
    @Input() title = '';
    @Input() backLink = '';
    @Input() showBackLink = true;
  constructor() { }

    getPicturePath() {
        return GLOBAL.currentUser.photo_url;
    }

    getActiveUserId() {
        return GLOBAL.currentUser.id;
    }

    isCurrentUserNotIndividualClientOrOrg() {
        return Boolean(GLOBAL.currentUser instanceof Administrator || GLOBAL.currentUser instanceof BookingOfficer || GLOBAL.currentUser instanceof Interpreter);
    }
}
