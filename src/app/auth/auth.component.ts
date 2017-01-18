import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api/api.service';
import {User} from '../shared/model/user.entity'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @Input('user') u: User;

  constructor(private service: ApiService) { }

  ngOnInit() {
  }

}
