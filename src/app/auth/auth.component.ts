import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api/api.service';
import {User} from '../shared/model/user.entity';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [ApiService] // <-- this would override the parent DI instance

})
export class AuthComponent implements OnInit {
  @Input() u: User;

  constructor(private service: ApiService) { }

  ngOnInit() {
  }

}
