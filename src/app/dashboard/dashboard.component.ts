import { Component, OnInit, Input } from '@angular/core';
import {User} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  first_name = '';
  constructor() { }

  ngOnInit() {
    this.first_name = GLOBAL.getName();
  }

}
