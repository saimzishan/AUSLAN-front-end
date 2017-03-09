import { Component, Input, OnInit } from '@angular/core';
import {GLOBAL} from '../../shared/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() fullName = GLOBAL.currentUser ? GLOBAL.currentUser.first_name + ' '  + GLOBAL.currentUser.last_name : '';
  constructor() {
  }
}
