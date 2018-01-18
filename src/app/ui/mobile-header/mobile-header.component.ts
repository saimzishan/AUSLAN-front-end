import {Component, Input, OnInit} from '@angular/core';
import {GLOBAL} from '../../shared/global';

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
}
