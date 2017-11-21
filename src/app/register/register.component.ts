import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {UserService} from '../api/user.service';
import {
    Accountant, Administrator, BookingOfficer, IndividualClient, Interpreter, Organisational, OrganisationalRepresentative,
    User
} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationServiceBus} from '../notification/notification.service';
import {NotificationComponent} from '../notification/notification.component';
import {NavigationExtras} from '@angular/router';
import {Address} from '../shared/model/venue.entity';
import {Contact} from '../shared/model/contact.entity';
import {FormGroup} from '@angular/forms';
import {SpinnerService} from '../spinner/spinner.service';
import {GLOBAL} from '../shared/global';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    public model: any;
    public successMessage = `Congratulations. Your account has been created.
     Please login with your credentials. `;
    private sub_param: any;
    public selectedRole = '';
    termsAndConditionAccepted = false;

    constructor(public userService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                public spinnerService: SpinnerService,
                public routes: ActivatedRoute, public router: Router) {
    }

    isUserLogin() {
        return GLOBAL.currentUser !== null;
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
                    let ic = new IndividualClient({});
                    this.model = ic;
                    this.model.role = ROLE.IndividualClient;

                    break;
                case 'OrganisationalRepresentative'.toUpperCase():
                    let orgr = new OrganisationalRepresentative({});
                    this.model = orgr;
                    this.model.role = ROLE.OrganisationalRepresentative;

                    break;
                case 'Organisation'.toUpperCase():
                    let org = new OrganisationalRepresentative({});
                    this.model = org;
                    this.model.role = ROLE.Organisation;

                    break;

                case 'Administrator'.toUpperCase():
                    let admin = new Administrator({});
                    this.model = admin;
                    this.model.role = ROLE.Administrator;

                    break;

                case 'BookingOfficer'.toUpperCase():
                    let bo = new BookingOfficer({});
                    this.model = bo;
                    this.model.role = ROLE.BookingOfficer;

                    break;
                case 'Accountant'.toUpperCase():
                    let acc = new BookingOfficer({});
                    this.model = acc;
                    this.model.role = ROLE.Accountant;

                    break;

            }
        });
        this.termsAndConditionAccepted = this.isUserLogin();

    }

    tocChanged(val: boolean) {
        this.termsAndConditionAccepted = val;
    }

    ngOnDestroy() {
        return this.sub_param && this.sub_param.unsubscribe();
    }

    addUser(form: FormGroup) {
        if (!this.termsAndConditionAccepted) {
            this.notificationServiceBus.launchNotification(true, 'Kindly accept Terms and Conditions');
            return;
        }
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, 'Kindly fill all the required (*) fields');
            return;
        }
        this.spinnerService.requestInProcess(true);

        this.userService.createUser(this.model)
            .subscribe((res: any) => {
                if (res.data.id && 0 < res.data.id) {

                    this.model.id = res.data.id;
                    let route = this.isUserLogin ? '/user-management' : '/';
                    this.router.navigate([route]);
                    this.spinnerService.requestInProcess(false);
                    this.notificationServiceBus.launchNotification(false, this.successMessage);
                }
            }, errors => {
                this.spinnerService.requestInProcess(false);
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                    + JSON.stringify(e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
            });
    }

    handleFileSelect(evt) {
        let files = evt.target.files;
        let file = files[0];

        if (files && file) {
            let reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsDataURL(file);
        }
    }

    _handleReaderLoaded(readerEvt) {
        this.model.avatar = readerEvt.target.result;
    }
}
