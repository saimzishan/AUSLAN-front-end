import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [UserService] // <-- this would override the parent DI instance

})
export class AuthComponent implements OnInit {
  model: User = new User();

  constructor(private service: UserService) { }

  ngOnInit() {
  }

    onSubmit() {
      this.service.login(this.model);
    }

}
