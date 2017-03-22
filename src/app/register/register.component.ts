import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';
import { ROLE } from '../shared/model/role.enum';
import {NotificationComponent} from '../notification/notification.component';
import { ActivatedRoute, Router } from '@angular/router';
import {NotificationServiceBus} from '../notification/notification.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public model: User = new User();
    public selected = false;
    public selectedRole = 'Interpreter'.toUpperCase();
    public successMessage = `Congrats Your user has been created.
  Kindly go back to <a [routerLink]="['/authenticate']">Login Page</a> and Login`;

    constructor(public userService: UserService,
        public notificationServiceBus: NotificationServiceBus,
        public routes: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        this.routes.url.subscribe(v => {
            this.selected = (v.length > 1 && v[1].path === 'step2');

        });
    }
    roleSelected(role) {

        this.selected = true;
        this.selectedRole = role.toUpperCase();
        this.router.navigate(['register/step2']);

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
                this.model.role = ROLE.Organisation;
                break;

        }

        this.userService.createUser(this.model)
            .subscribe((res: any) => {
                this.model.id = res.data.id;

            }, errors => {
                console.log(errors);
                this.notificationServiceBus.launchNotification(true, errors );
            },
            () => { });
    }
}
