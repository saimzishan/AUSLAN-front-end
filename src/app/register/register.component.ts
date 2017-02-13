import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';
import { Router } from '@angular/router';
import { ROLE } from '../shared/model/role.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public model: User = new User();
  public selected = false;
  public selectedRole = 'Interpreter'.toUpperCase();
  public userCreated = false;
  ngOnInit() { }

  constructor(private userService: UserService,  private router: Router) {
  }

  roleSelected(role) {

    this.selected = true;
    this.selectedRole = role.toUpperCase();

  }

  addUser() {

      switch (this.selectedRole) {
        case 'Interpreter'.toUpperCase():
        this.model.role = ROLE.Interpreter;
        break;

        case 'Client'.toUpperCase():
        this.model.role = ROLE.Client;
        break;

        case 'Organization'.toUpperCase():
        this.model.role = ROLE.Organization;
        break;

      }

      this.userService.createUser(this.model)
      .subscribe((res: any) => {
         this.model.id =  res.data.id;
         // this.model = new User();
         this.userCreated = true;
         this.router.navigate(['/verify/' + this.model.id]);

      }, err => console.log(err));
    }
}
