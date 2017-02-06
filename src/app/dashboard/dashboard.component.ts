import { Component, OnInit, Input } from '@angular/core';
import {User} from '../shared/model/user.entity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() model: User = new User();
  constructor() { }

  ngOnInit() {
  }

}
