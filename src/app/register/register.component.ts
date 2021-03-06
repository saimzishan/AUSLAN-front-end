import {Component, OnInit, AfterViewInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {UserService} from '../api/user.service';
import {
    Accountant, Administrator, BookingOfficer, IndividualClient, Interpreter, Organisational, OrganisationalRepresentative,
    User, UserFactory
} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import {NotificationServiceBus} from '../notification/notification.service';
import {FormGroup, FormControl, NgForm, NgModel} from '@angular/forms';
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
    userId;
    otherGender = '';
    isEditInterpreter;
    vicDeaf = ['VIC', 'TAS', 'SA', 'WA'];
    dsq = ['ACT', 'NSW', 'QLD', 'NT'];
    stateBookingOccur = [];
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
            let p = this.isEditInterpreter = params['selectedRole'] || '';
            this.isEdit = Boolean(params['edit_user']);
            this.isDuplicate = Boolean(params['isduplicate']);
            this.selectedRole = Boolean(p && p.length > 1) ? p : this.selectedRole;
            let jsonData = this.isEdit ?
                JSON.parse(params['edit_user']) : {};
            jsonData.id = params['uid'] || '';
            this.userId = jsonData.id;
            switch (this.selectedRole) {
                case 'Interpreter'.toUpperCase():
                    let int1: Interpreter = this.isEdit ? <Interpreter>UserFactory.createUser(jsonData) : new Interpreter();
                    this.model = int1;
                    this.setIfOtherGender();
                    this.model.role = ROLE.Interpreter;
                    GLOBAL.currentInterpreter = this.isEdit ? int1 : GLOBAL.currentInterpreter;
                    localStorage.setItem('userId', this.userId);
                    break;

                case 'IndividualClient'.toUpperCase():
                    let ic = this.isEdit ? UserFactory.createUser(jsonData) : new IndividualClient(jsonData);
                    this.model = ic;
                    this.setIfOtherGender();
                    this.model.role = ROLE.IndividualClient;

                    break;
                case 'OrganisationalRepresentative'.toUpperCase():
                case 'Organisation'.toUpperCase():
                    let org = this.isEdit || this.isDuplicate ? UserFactory.createUser(jsonData) : new OrganisationalRepresentative(jsonData);
                    this.model = org;
                    this.setIfOtherGender();
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
        this.model.staff_to_casual_toggle = this.model.employment_type;
        if (this.isUserDsqAdmin()) {
            this.stateBookingOccur = this.dsq;
        } else if (this.isUserVicdeaf()) {
            this.stateBookingOccur = this.vicDeaf;
        } else {
            this.stateBookingOccur = this.vicDeaf.concat(this.dsq);
        }
    }

    setIfOtherGender() {
        if (this.model.gender !== 'Male' && this.model.gender !== 'Female' && this.model.gender !== null && this.isEdit) {
            this.otherGender = this.model.gender;
            this.model.gender = 'Other';
        }
    }

    staffToCasualToggle() {
        if (this.model.id > 0) {
            this.userService.toggle_employment_type(this.model.id)
                .subscribe((res: any) => {
                    if (res) {
                        this.notificationServiceBus.launchNotification(false, 'Successfully applied changes.');
                    }
                }, errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, e);
                });
        }
    }
    tocChanged(val: boolean) {
        this.termsAndConditionAccepted = val;
    }

    ngOnDestroy() {
        return this.sub_param && this.sub_param.unsubscribe();
    }

    applyChanges(form: any) {
        if (!this.termsAndConditionAccepted) {
            this.notificationServiceBus.launchNotification(true, 'Kindly accept Terms and Conditions');
            return;
        }
        if (form.invalid) {
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            this.validateAllFormFields(form.control);
            return;
        }
        this.spinnerService.requestInProcess(true);
        this.isEdit && !this.isDuplicate ? this.editUser() : this.isDuplicate ? this.duplicateUser('create_orgrep') : this.addUser();
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    addUser() {
        this.model.gender = this.model.gender === 'Other' ? this.otherGender : this.model.gender;
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
                this.notificationServiceBus.launchNotification(true, e);
            });
    }

    editUser() {
        this.model.gender = this.model.gender === 'Other' ? this.otherGender : this.model.gender;
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
                    this.notificationServiceBus.launchNotification(true, e);
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
                this.notificationServiceBus.launchNotification(true, e);
            });
    }

    checkUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer) ;
    }

    isUserDsqAdmin(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator && GLOBAL.currentUser.business_name === 'DSQ');
    }

    isUserVicdeaf(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator && GLOBAL.currentUser.business_name === 'Vicdeaf');
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

    navigateToPayroll() {
        let navigationExtras: NavigationExtras = {
            queryParams: {userId: this.selectedRole === 'ORGANISATION' ? this.model.organisation_attributes.id : this.model.id,
                          selectedRole: this.selectedRole}
        };
        this.router.navigate(['/user-management/', 'payroll-billing'], navigationExtras);
    }

    checkIsEditInterpreter() {
        return (this.isEditInterpreter === 'INTERPRETER');
    }
}
