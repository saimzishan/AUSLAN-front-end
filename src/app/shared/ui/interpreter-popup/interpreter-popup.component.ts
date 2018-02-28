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
    state_where_most_bookings_occur = 'VIC';
    interpreterList = [];
    checkedInterpreter = -1;
    currentPage = 1;
    totalItems;

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

    isLocallyRemoved(selectedInterpreter) {
        return selectedInterpreter.hasOwnProperty('_destroy') && selectedInterpreter._destroy === 1;
    }
    isLocallyRemovedFromArray(interpreter_id) {
        if ( this.selectedInterpreters.filter((i) => i.interpreter_id === interpreter_id).length > 0) {
            let selectedInterpreter = this.selectedInterpreters.filter((i) => i.interpreter_id === interpreter_id)[0];
            return selectedInterpreter.hasOwnProperty('_destroy') && selectedInterpreter._destroy === 1;
        }
        return false;
    }
    isInterpreterSelectable(interpreter_id) {
        let alreadyAdded = this.isAlreadyAdded(interpreter_id);
        this.checkedInterpreter = alreadyAdded ? -1 : interpreter_id;
        if (alreadyAdded) {
            let selectedInterpreter = this.selectedInterpreters.filter((i) => i.interpreter_id === interpreter_id)[0];
            if (!this.isLocallyRemoved(selectedInterpreter)) {
                this.notificationServiceBus.launchNotification(true, `Oops! This interpreter is already selected as a ${selectedInterpreter.preference} interpreter.
                 Please remove this interpreter first.`);
            } else {
                selectedInterpreter._destroy = 0;
                selectedInterpreter.preference = this.isPreffered ? 'preferred' : 'blocked';
                this.checkedInterpreter = interpreter_id;
            }
        }
    }

    /* Hmm need a class as an api wrapper to throw in all such method, its anti-DRY*/
    fetchAllInterpreters() {
        // This call is creating problem in console, why ?
        this.spinnerService.requestInProcess(false);
        this.userDataService.fetchBasicDetailsForInterpreter(this.currentPage, this.state_where_most_bookings_occur)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.totalItems = Boolean(res.data.paginates) ? res.data.paginates.total_records : res.data.users.length;
                        this.interpreterList = res.data.users.sort(function (a, b) {
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
                    this.getNotification(e.errors);
                });
    }

    addSelectedInterpreter() {
        let selectedInterpreter =
            this.interpreterList.filter(i => i.interpreter_id === this.checkedInterpreter)[0];
        selectedInterpreter.preference = this.isPreffered ? 'preferred' : 'blocked';
        if (!this.isAlreadyAdded(selectedInterpreter.interpreter_id)) {
            this.selectedInterpreters.push(selectedInterpreter);
        }
        this.closeDialog();
    }

    getPage(page: number) {
        this.currentPage = page;
        this.fetchAllInterpreters();
    }

    getNotification(error) {
        this.notificationServiceBus.launchNotification(true, JSON.stringify(error.base || error)
        .replace(/]|[[]/g, '').replace(/({|})/g, '').replace(/["]/g, ''));
    }

}
