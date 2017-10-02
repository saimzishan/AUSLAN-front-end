import {Component, Input, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {UserService} from '../../../api/user.service';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {GLOBAL} from '../../global';

@Component({
    selector: 'app-interpreter-popup',
    templateUrl: './interpreter-popup.component.html',
    styleUrls: ['./interpreter-popup.component.css']
})
export class InterpreterPopupComponent implements OnInit {

    @Input() title = '';
    @Input() selectedInterpreters = [];
    interpreterList = [];

    ngOnInit() {
        this.fetchAllInterpreters();
    }

    constructor(public dialogRef: MdDialogRef<InterpreterPopupComponent>,
                private userDataService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                private spinnerService: SpinnerService) {
    }

    closeDialog(val) {
        this.dialogRef.close(val);
    }

    removeInterpreter(interpreter_id) {
        this.selectedInterpreters =
            this.selectedInterpreters.filter(i => i === interpreter_id);
    }

    addInterpreter(interpreter_id) {
        this.selectedInterpreters.push(interpreter_id);
        this.addSelectedInterpreter(interpreter_id);
    }

    /* Hmm need a class as an api wrapper to throw in all such method, its anti-DRY*/
    fetchAllInterpreters() {
        // this.spinnerService.requestInProcess(true);
        this.userDataService.fetchUsersOfType('interpreters')
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.interpreterList = res.data.users.filter(i => i.verified === true);
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }
    addSelectedInterpreter(interpreter_id) {
        this.spinnerService.requestInProcess(true);
        this.userDataService.assignPreferredInterpreter(GLOBAL.currentUser.id,
            [interpreter_id])
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.notificationServiceBus.launchNotification(false,
                            'Interpreter Added Successfully');

                    }
                    this.spinnerService.requestInProcess(false);

                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }
    removeSelectedInterpreter(interpreter_id) {
        this.spinnerService.requestInProcess(true);
        this.userDataService.unassignPreferredInterpreter(GLOBAL.currentUser.id,
            [interpreter_id])
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.notificationServiceBus.launchNotification(false,
                            'Interpreter Removed Successfully');
                    }
                    this.spinnerService.requestInProcess(false);

                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }
}
