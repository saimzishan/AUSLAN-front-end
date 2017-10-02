import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
    Accountant,
    Administrator, BookingOfficer, IndividualClient, Interpreter, OrganisationalRepresentative,
    User
} from '../../shared/model/user.entity';
import {UserService} from '../../api/user.service';
import {SpinnerService} from '../../spinner/spinner.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {GLOBAL} from '../../shared/global';
import {UserNameService} from '../../shared/user-name.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']

})
export class UserProfileComponent implements OnInit {
    userModel;
    selectedStatus = '';
    userStatusArray = GLOBAL.userStatusArray;
    public selectedRole = '';

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
    }

    editUser(form: FormGroup) {
        if ( form.invalid ) {
            this.notificationServiceBus.
            launchNotification(true, 'Kindly fill all the required (*) fields');
            return;
        }

        this.userModel.disabled = this.selectedStatus === 'Disabled';
        this.selectedStatus = '';
        this.spinnerService.requestInProcess(true);
        console.log (this.userModel);
        this.userDataService.updateUser(this.userModel)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        // UI Notification
                        this.userModel.photo_url = res.json().photo_url || '';
                        this.userNameService.setLoggedInUser(this.userModel);
                        this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
                        this.spinnerService.requestInProcess(false);

                    }
                },
                (errors) => {
                    this.spinnerService.requestInProcess(false);

                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, errors.statusText + ' '
                        + JSON.stringify(e || e.errors).replace(/]|[[]/g, '').replace(/({|})/g, ''));
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
