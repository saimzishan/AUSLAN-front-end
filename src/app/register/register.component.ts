import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../api/user.service';
import { User } from '../shared/model/user.entity';
import { ROLE } from '../shared/model/role.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationServiceBus } from '../notification/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { NavigationExtras } from '@angular/router';

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
    private sub_param: any;

    constructor(public userService: UserService,
        public notificationServiceBus: NotificationServiceBus,
        public routes: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        this.sub = this.routes.url.subscribe(v => {
            this.selected = Boolean(v.length > 1 && v[1].path === 'step2');
        });
        this.sub_param = this.routes.queryParams.subscribe(params => {
            let p = params['selectedRole'] || '';
            this.selectedRole = Boolean(p && p.length > 1) ? p : this.selectedRole;
        });
    }
    roleSelected(role) {

        this.selected = true;
        this.selectedRole = role.toUpperCase();
        let navigationExtras: NavigationExtras = {
            queryParams: { selectedRole: this.selectedRole }
        };
        this.router.navigate(['register', 'step2'], navigationExtras);

    }

    ngOnDestroy() {
        return this.sub && this.sub.unsubscribe() && this.sub_param && this.sub_param.unsubscribe();
    }

    addUser() {

        switch (this.selectedRole) {
            case 'Interpreter'.toUpperCase():
                this.model.role = ROLE.Interpreter;
                break;

            case 'IndividualClient'.toUpperCase():
                this.model.role = ROLE.IndividualClient;
                break;

            case 'Organisational'.toUpperCase():
                this.model.role = ROLE.Organisational;
                break;

        }

        this.userService.createUser(this.model)
            .subscribe((res: any) => {
                this.model.id = res.data.id;
                this.notificationServiceBus.launchNotification(false, this.successMessage);

            }, errors => {
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' ' + e.errors.password[0]);
            });
    }
}
