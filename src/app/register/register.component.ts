import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {UserService} from '../api/user.service';
import {
    Accountant, IndividualClient, Interpreter, Organisational, OrganisationalRepresentative,
    User
} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationServiceBus} from '../notification/notification.service';
import {NotificationComponent} from '../notification/notification.component';
import {NavigationExtras} from '@angular/router';
import {Address} from '../shared/model/venue.entity';
import {Contact} from '../shared/model/contact.entity';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    public model: any;
    public successMessage = `Congrats Your user has been created.
  Kindly go back to Login Page and Login`;
    private sub_param: any;
    public selectedRole = '';

    constructor(public userService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                public routes: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {

            this.sub_param = this.routes.queryParams.subscribe(params => {
                let p = params['selectedRole'] || '';
                this.selectedRole = Boolean(p && p.length > 1) ? p : this.selectedRole;

                switch (this.selectedRole) {
                    case 'Interpreter'.toUpperCase():
                        let int = new Interpreter();
                        this.model = int;
                        this.model.role = ROLE.Interpreter;

                        break;

                    case 'IndividualClient'.toUpperCase():
                        let ic = new IndividualClient;
                        this.model = ic;
                        this.model.role = ROLE.IndividualClient;

                        break;

                    case 'Organisational'.toUpperCase():
                        let org = new OrganisationalRepresentative();
                        this.model = org;
                        this.model.role = ROLE.Organisational;

                        break;

                }
        });
    }



    ngOnDestroy() {
        return this.sub_param && this.sub_param.unsubscribe();
    }

    addUser() {

        this.userService.createUser(this.model)
            .subscribe((res: any) => {
                this.model.id = res.data.id;
                this.router.navigate(['/']);
                this.notificationServiceBus.launchNotification(false, this.successMessage);


            }, errors => {
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                    + JSON.stringify(e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
            });
    }
}
