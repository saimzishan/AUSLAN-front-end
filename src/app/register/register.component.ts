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
    isEdit = false;
    termsAndConditionAccepted = false;
    selectedStatus = '';
    userStatusArray = GLOBAL.userStatusArray;

    constructor(public userService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                public spinnerService: SpinnerService,
                public routes: ActivatedRoute, public router: Router) {
    }

    isUserLogin() {
        return Boolean(GLOBAL.currentUser);
    }

    ngOnInit() {

        this.sub_param = this.routes.queryParams.subscribe(params => {
            let p = params['selectedRole'] || '';
            this.isEdit = Boolean(params['edit_user']);
            this.selectedRole = Boolean(p && p.length > 1) ? p : this.selectedRole;
            let jsonData = this.isEdit ?
                JSON.parse(params['edit_user']) : {};
            switch (this.selectedRole) {
                case 'Interpreter'.toUpperCase():
                    let int = new Interpreter(jsonData);
                    this.model = int;
                    this.model.role = ROLE.Interpreter;

                    break;

                case 'IndividualClient'.toUpperCase():
                    let ic = new IndividualClient(jsonData);
                    this.model = ic;
                    this.model.role = ROLE.IndividualClient;

                    break;
                case 'OrganisationalRepresentative'.toUpperCase():
                    let orgr = new OrganisationalRepresentative(jsonData);
                    this.model = orgr;
                    this.model.role = ROLE.OrganisationalRepresentative;

                    break;
                case 'Organisation'.toUpperCase():
                    let org = new OrganisationalRepresentative(jsonData);
                    this.model = org;
                    this.model.role = ROLE.Organisation;

                    break;

                case 'Administrator'.toUpperCase():
                    let admin = new Administrator(jsonData);
                    this.model = admin;
                    this.model.role = ROLE.Administrator;

                    break;

                case 'BookingOfficer'.toUpperCase():
                    let bo = new BookingOfficer(jsonData);
                    this.model = bo;
                    this.model.role = ROLE.BookingOfficer;

                    break;
                case 'Accountant'.toUpperCase():
                    let acc = new BookingOfficer(jsonData);
                    this.model = acc;
                    this.model.role = ROLE.Accountant;

                    break;

            }
            this.selectedStatus = Boolean(this.model && this.model.disabled === false) ?
                this.userStatusArray[0].name : this.userStatusArray[1].name;
        });
        this.termsAndConditionAccepted = this.isUserLogin();

    }

    tocChanged(val: boolean) {
        this.termsAndConditionAccepted = val;
    }

    ngOnDestroy() {
        return this.sub_param && this.sub_param.unsubscribe();
    }

    applyChanges(form: FormGroup) {
        if (!this.termsAndConditionAccepted) {
            this.notificationServiceBus.launchNotification(true, 'Kindly accept Terms and Conditions');
            return;
        }
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, 'Kindly fill all the required (*) fields');
            return;
        }
        this.spinnerService.requestInProcess(true);
        this.isEdit ? this.editUser() : this.addUser();
    }

    addUser() {
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

    editUser() {

        this.model.disabled = this.selectedStatus === 'Disabled';
        this.selectedStatus = '';
        this.userService.createUser(this.model)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        // UI Notification
                        this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
                    }
                },
                (err) => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json();
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
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
