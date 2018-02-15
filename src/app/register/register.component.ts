import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {UserService} from '../api/user.service';
import {
    Accountant, Administrator, BookingOfficer, IndividualClient, Interpreter, Organisational, OrganisationalRepresentative,
    User, UserFactory
} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationServiceBus} from '../notification/notification.service';
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
    isDuplicate = false;
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
            this.isDuplicate = Boolean(params['isduplicate']);
            this.selectedRole = Boolean(p && p.length > 1) ? p : this.selectedRole;
            let jsonData = this.isEdit ?
                JSON.parse(params['edit_user']) : {};
            jsonData.id = params['uid'] || '';
            switch (this.selectedRole) {
                case 'Interpreter'.toUpperCase():
                    let int1: Interpreter = this.isEdit ? <Interpreter>UserFactory.createUser(jsonData) : new Interpreter();
                    this.model = int1;
                    this.model.role = ROLE.Interpreter;
                    GLOBAL.currentInterpreter = this.isEdit ? int1 : GLOBAL.currentInterpreter;
                    break;

                case 'IndividualClient'.toUpperCase():
                    let ic = this.isEdit ? UserFactory.createUser(jsonData) : new IndividualClient(jsonData);
                    this.model = ic;
                    this.model.role = ROLE.IndividualClient;

                    break;
                case 'OrganisationalRepresentative'.toUpperCase():
                case 'Organisation'.toUpperCase():
                    let org = this.isEdit || this.isDuplicate ? UserFactory.createUser(jsonData) : new OrganisationalRepresentative(jsonData);
                    this.model = org;
                    this.model.role = ROLE.Organisation;
                    if (this.isDuplicate) {
                        this.model.first_name = this.model.last_name =
                            this.model.email = this.model.mobile =
                                this.model.photo_url = this.model.password =
                                    this.model.confirm_password = '';
                    }
                    this.selectedRole = 'ORGANISATION';
                    break;

                case 'Administrator'.toUpperCase():
                    let admin = this.isEdit ? UserFactory.createUser(jsonData) : new Administrator();
                    this.model = admin;
                    this.model.role = ROLE.Administrator;

                    break;

                case 'BookingOfficer'.toUpperCase():
                    let bo = this.isEdit ? UserFactory.createUser(jsonData) : new BookingOfficer();
                    this.model = bo;
                    this.model.role = ROLE.BookingOfficer;

                    break;
                case 'Accountant'.toUpperCase():
                    let acc = this.isEdit ? UserFactory.createUser(jsonData) : new Accountant();
                    this.model = acc;
                    this.model.role = ROLE.Accountant;

                    break;

            }
            this.selectedStatus = Boolean(this.model && this.model.disabled === false) ?
                this.userStatusArray[0].name : this.userStatusArray[1].name;
        });
        this.termsAndConditionAccepted = this.isUserLogin();
        this.model.state_where_most_bookings_occur = 'VIC';
        this.model.staffToCasualToggle = 'Casual';
    }
    staffToCasualToggle() {
        this.userService.toggle_employment_type(this.model.id)
            .subscribe((res: any) => {
                    if (res) {
                        this.notificationServiceBus.launchNotification(false, 'Successfully applyChanges');
                    }
                 }, errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                        + JSON.stringify(e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
                });
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
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        this.spinnerService.requestInProcess(true);
        this.isEdit && !this.isDuplicate ? this.editUser() : this.isDuplicate ? this.duplicateUser('create_orgrep') : this.addUser();
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
        this.userService.updateUser(this.model)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        // UI Notification

                        let route = '/user-management';
                        this.router.navigate([route]);
                        this.spinnerService.requestInProcess(false);
                        this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
                    }
                },
                (err) => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json();
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    duplicateUser(toCreate: string) {
        this.userService.duplicateUser(toCreate, this.model)
            .subscribe((res: any) => {
                if (res.status === 200) {

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

    checkUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer) ;
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
