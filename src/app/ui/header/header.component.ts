import { Component, Input, OnInit } from '@angular/core';
import {GLOBAL} from '../../shared/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() fullName = GLOBAL.currentUser.first_name + ' '  + GLOBAL.currentUser.last_name;
  constructor() { }

  ngOnInit() {
  }

}
