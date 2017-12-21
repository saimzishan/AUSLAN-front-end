import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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

    selectedInterpreters = [];
    isPreffered = false;
    interpreterList = [];
    checkedInterpreter = -1;

    ngOnInit() {
        this.fetchAllInterpreters();
    }

    constructor(public dialogRef: MdDialogRef<InterpreterPopupComponent>,
                private userDataService: UserService,
                public notificationServiceBus: NotificationServiceBus,
                private spinnerService: SpinnerService) {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    isAlreadyAdded(interpreter_id) {
        return this.selectedInterpreters.filter((i) => i.interpreter_id === interpreter_id).length > 0;
    }

    isInterpreterSelectable(interpreter_id) {
        this.checkedInterpreter =
            this.isAlreadyAdded(interpreter_id) ? -1 : interpreter_id;
            this.checkForNotification(this.isAlreadyAdded(interpreter_id), interpreter_id);
    }

    /* Hmm need a class as an api wrapper to throw in all such method, its anti-DRY*/
    fetchAllInterpreters() {
        // This call is creating problem in console, why ?
        this.spinnerService.requestInProcess(false);
        this.userDataService.fetchBasicDetailsForInterpreter()
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.interpreterList = res.data.users.sort( (a, b) => {
                            let nameA = a.first_name.toLowerCase();
                            let nameB = b.first_name.toLowerCase();
                            if (nameA < nameB) { // sort string ascending
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0; // default return value (no sorting)
                        });
                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, err.statusText + ' ' + e.errors);
                });
    }

    addSelectedInterpreter() {
        let selectedInterpreter =
            this.interpreterList.filter(i => i.interpreter_id === this.checkedInterpreter)[0];
        selectedInterpreter.preference = this.isPreffered ? 'preferred' : 'blocked';
        this.selectedInterpreters.push(selectedInterpreter);
        this.closeDialog();
    }

    checkForNotification(showError, interpreter_id) {
        if (showError) {
            let tmp = this.selectedInterpreters.filter((i) => i.interpreter_id === interpreter_id)[0];
            if (tmp.preference === 'preferred') {
                this.notificationServiceBus.launchNotification(true, `Oops! This interpreter is already selected as a preferred interpreter.
                 Please remove this interpreter first.`);
            } else {
                this.notificationServiceBus.launchNotification(true, `Oops! This interpreter is already selected as a blocked interpreter.
                 Please remove this interpreter first.`);
            }
        }
    }
}
