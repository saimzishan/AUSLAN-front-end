import { Component, Input, OnInit } from '@angular/core';
import {GLOBAL} from '../../shared/global';
import { Router } from '@angular/router';
import {UserNameService} from '../../shared/user-name.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() fullName = GLOBAL.currentUser ? GLOBAL.currentUser.first_name + ' '  + GLOBAL.currentUser.last_name : '';
  links = {};
  constructor(public userNameService: UserNameService) {
      this.userNameService.loggedInUser$.subscribe(
        u => {
          this.fullName = u.first_name + ' ' + u.last_name;
        });
  }

}
