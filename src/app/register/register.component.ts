import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import { ROLE } from '../shared/model/role.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {NotificationServiceBus} from '../notification/notification.service';
import {NotificationComponent} from '../notification/notification.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    public model: User = new User();
    public selected = false;
    public selectedRole = 'Interpreter'.toUpperCase();
    public successMessage = `Congrats Your user has been created.
  Kindly go back to Login Page and Login`;
    private sub: any;

    constructor(public userService: UserService,
        public notificationServiceBus: NotificationServiceBus,
        public routes: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        this.sub = this.routes.url.subscribe(v => {
            this.selected = (v.length > 1 && v[1].path === 'step2');
        });
    }
    roleSelected(role) {

        this.selected = true;
        this.selectedRole = role.toUpperCase();
        this.router.navigate(['register', 'step2']);

    }

   ngOnDestroy() {
     this.sub.unsubscribe();
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
                this.notificationServiceBus.launchNotification(false, this.successMessage );

            }, errors => {
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' ' + e.errors.password[0] );
            });
    }
}
