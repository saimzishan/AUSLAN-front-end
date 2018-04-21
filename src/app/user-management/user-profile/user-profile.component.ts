import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
    Accountant,
    Administrator, BookingOfficer, IndividualClient, Interpreter, OrganisationalRepresentative,
    User, UserFactory
} from '../../shared/model/user.entity';
import {UserService} from '../../api/user.service';
import {SpinnerService} from '../../spinner/spinner.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {GLOBAL} from '../../shared/global';
import {UserNameService} from '../../shared/user-name.service';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthGuard} from '../../auth/auth.guard';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']

})
export class UserProfileComponent implements OnInit {
    userModel;
    selectedStatus = '';
    userStatusArray = GLOBAL.userStatusArray;
    otherGender = '';

    constructor(public userDataService: UserService, public userNameService: UserNameService,
                public notificationServiceBus: NotificationServiceBus,
                public spinnerService: SpinnerService) {
    }

    ngOnInit() {
        this.userModel = Boolean(GLOBAL.currentUser) &&
        GLOBAL.currentUser instanceof OrganisationalRepresentative ?
            (<OrganisationalRepresentative>GLOBAL.currentUser) :
            Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof IndividualClient ?
                (<IndividualClient>GLOBAL.currentUser) :
                Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof Interpreter ?
                    (<Interpreter>GLOBAL.currentUser) :
                    Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof Administrator ?
                        (<Administrator>GLOBAL.currentUser) :
                        Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof BookingOfficer ?
                            (<BookingOfficer>GLOBAL.currentUser) :
                            Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof Accountant ?
                                (<Accountant>GLOBAL.currentUser) :
                            GLOBAL.currentUser;

        this.selectedStatus = Boolean(this.userModel && this.userModel.disabled === false) ?
            this.userStatusArray[0].name : this.userStatusArray[1].name;
        this.setGenderIfOther();
        if (GLOBAL.currentUser instanceof Interpreter) {
            localStorage.setItem('userId', this.userModel.id);
        }

    }

    setGenderIfOther() {
        if (this.userModel.gender !== 'Male' && this.userModel.gender !== 'Female' && this.userModel.gender !== null) {
            this.otherGender = this.userModel.gender;
            this.userModel.gender = 'Other';
        }
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
    editUser(form: any) {
        if ( form.invalid ) {
            this.validateAllFormFields(form.control);
            this.notificationServiceBus.
            launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }

        this.userModel.gender = this.userModel.gender === 'Other' ? this.otherGender : this.userModel.gender;
        this.otherGender = '';
        this.userModel.disabled = this.selectedStatus === 'Disabled';
        this.selectedStatus = '';
        this.spinnerService.requestInProcess(true);
        if (this.userModel instanceof Interpreter) {
            delete this.userModel.assignments_attributes;
        }
        this.userDataService.updateUser(this.userModel)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        let user ;
                        // UI Notification
                        if ( this.userModel instanceof OrganisationalRepresentative
                        || this.userModel instanceof IndividualClient) {
                            this.userModel.prefferedInterpreters =
                                this.userModel.prefferedInterpreters.filter(i => i._destory === -1);
                        }
                        user = UserFactory.createUser(JSON.parse(res._body));
                        GLOBAL.currentUser = user;
                        AuthGuard.refreshUser(user);
                        this.userModel = user;
                        this.userModel.photo_url = user.photo_url || '';
                        this.setGenderIfOther();
                        this.userNameService.setLoggedInUser(user);
                        this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
                        this.spinnerService.requestInProcess(false);

                    }
                },
                (errors) => {
                    this.spinnerService.requestInProcess(false);

                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, e);
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
        this.userModel.avatar = readerEvt.target.result;
    }
}
