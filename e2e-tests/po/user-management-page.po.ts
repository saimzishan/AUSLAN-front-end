import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User, Administrator, BookingOfficer, Interpreter, Client, Organisation} from '../helper';
import {NotificationObject} from './notification';

export class UserManagementPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */

    saveBtn;
    cnt = 0;

    returnValidUser = (type: string) => {
        let chosen_type = '';
        let valid_user = new User('', '', '', '', '');
        switch (type) {
            case 'Administrator':
                chosen_type = 'Administrator';
                valid_user = new Administrator('the_admin' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'Administrator', 'The', '0917257725');
                break;
            case 'Booking Officer':
                chosen_type = 'Booking Officer';
                valid_user = new BookingOfficer('the_bookingofficer' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'BookingOfficer', 'The', '0917257725');
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                valid_user = new Interpreter('the_interpreter' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'Interpreter', 'The', '0917257725');
                break;
            case 'Individual Client':
                chosen_type = 'Individual Client';
                valid_user = new Client('the_client' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'Client', 'The', '0917257725');
                break;
            case 'Organisational Representative':
                chosen_type = 'Organisational';
                valid_user = new Organisation('the_orgrep' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'OrgRep', 'The', '0917257725');
                break;
        }
        return {type: chosen_type, user: valid_user};
    }

    returnInvalidUser = (type: string) => {
        let chosen_type = '';
        let invalid_user = new User('', '', '', '', '');
        switch (type) {
            case 'Administrator':
                chosen_type = 'Administrator';
                invalid_user = new Administrator('the_admin2curvetomorrow.com.au',
                    'Pass@1234', 'Administrator', 'The', '0917257725');
                break;
            case 'Booking Officer':
                chosen_type = 'Booking Officer';
                invalid_user = new BookingOfficer('the_bookingofficer2curvetomorrow.com.au',
                    'Pass@1234', 'BookingOfficer', 'The', '0917257725');
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                invalid_user = new Interpreter('the_interpreter2curvetomorrow.com.au',
                    'Pass@1234', 'Interpreter', 'The', '0917257725');
                break;
            case 'Client':
                chosen_type = 'Individual Client';
                invalid_user = new Client('the_client2curvetomorrow.com.au',
                    'Pass@1234', 'Client', 'The', '0917257725');
                break;
            case 'Organisational Representative':
                chosen_type = 'Organisational';
                invalid_user = new Organisation('the_orgrep2curvetomorrow.com.au',
                    'Pass@1234', 'OrgRep', 'The', '0917257725');
                break;
        }
        return {type: chosen_type, user: invalid_user};
    }

    returnTypeAndUser = (type: string, valid: boolean) => {
        if (valid) {
            return this.returnValidUser(type);
        }
        return this.returnInvalidUser(type);
    }

    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('user-management');
        });
    }

    didFinishedRendering = () => {
        this.saveBtn = this.saveBtn;
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.saveBtn), 10000).then(() => {
            expect(this.saveBtn).to.exist;
        });
    }

    createUserClick = () => {
        let newUserBtn = this.getButtonByText('+ New User');
        return newUserBtn.click().then(() => {
            expect(this.getElementByCss('.md-dialog')).to.be.exist;
        });
    }

    addValidUser = (type: string) => {
        let type_valid_user = this.returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        let valid_user = type_valid_user.user;
        let dlg = this.getElementByCss('.md-dialog');
        let role = this.getButtonByTextInsideElement(dlg, chosen_type);
        role.click();
        let fn = this.getElementInside(dlg, 'first_name');
        let ln = this.getElementInside(dlg, 'last_name');
        let el = this.getElementInside(dlg, 'email');
        let mb = this.getElementInside(dlg, 'mobile');
        let ps = this.getElementInside(dlg, 'password');
        let cps = this.getElementInside(dlg, 'certainPassword');

        this.setValue(el, valid_user.email);
        this.setValue(ps, valid_user.pass);
        this.setValue(cps, valid_user.pass);
        this.setValue(mb, valid_user.mobile_num);
        this.setValue(fn, valid_user.first_name);
        this.setValue(ln, valid_user.last_name);
        return this.saveBtn.isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    addInvalidUser = (type: string) => {
        let type_invalid_user = this.returnTypeAndUser(type, false);
        let chosen_type = type_invalid_user.type;
        let invalid_user = type_invalid_user.user;
        let dlg = this.getElementByCss('.md-dialog');
        let role = this.getButtonByTextInsideElement(dlg, chosen_type);
        role.click();
        let fn = this.getElementInside(dlg, 'first_name');
        let ln = this.getElementInside(dlg, 'last_name');
        let el = this.getElementInside(dlg, 'email');
        let mb = this.getElementInside(dlg, 'mobile');
        let ps = this.getElementInside(dlg, 'password');
        let cps = this.getElementInside(dlg, 'certainPassword');

        this.setValue(el, invalid_user.email);
        this.setValue(ps, invalid_user.pass);
        this.setValue(cps, invalid_user.pass);
        this.setValue(mb, invalid_user.mobile_num);
        this.setValue(fn, invalid_user.first_name);
        this.setValue(ln, invalid_user.last_name);
        return this.saveBtn.isEnabled().then( (enabled) => {
            expect(enabled).to.equal(false);
        });
    }

    createUserClickInDialog = () => {
        let tr = $$('table.custom tr');
        return tr.count().then((count) => {
            this.cnt = count - 1;
            return this.saveBtn.click();
        });
    }

    // This function assumes the UI
    // The type column is user-management page is
    // third column from left
    trListByUserType = (type: string) => {
        let trList = super.getAll('table.custom tbody tr');
        return trList.filter((tr) => {
            let el = super.getAllByTagNameInElement(tr, 'td').get(2);
            return el.getText().then((text) => {
                return text.toLowerCase() === type.toLowerCase();
            });
        });
    }
    validUserShouldBeOnTheList = (count: number, type: string) => {
        count = count || 1;
        let trList = this.trListByUserType(type);
        return trList.count().then((ntr) => expect(ntr).to.equal(count));
    }
    userShouldNotBeOnTheList = (type: string) => {
        let trList = this.trListByUserType(type);
        return trList.count().then((ntr) => expect(ntr).to.equal(0));
    }

    showValidationError = () => {
        let errs = this.getAll('.inline-icon.error');
        return errs.count().then((count) => {
            // expect(count).to.be.greaterThan(0);
            expect(count).to.be.greaterThan(0);
        });
    }

    updateValidUserFields = (type: string) => {
        let type_valid_user = this.returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        let valid_user = type_valid_user.user;
        let dlg = this.getElementByCss('.md-dialog');
        let ln = this.getElementInside(dlg, 'last_name');
        let mb = this.getElementInside(dlg, 'mobile');

        mb.clear();
        this.setValue(mb, valid_user.mobile_num);
        ln.clear();
        this.setValue(ln, valid_user.last_name);
        return this.saveBtn.isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    updateInvalidatedField = (type: string) => {
        let type_valid_user = this.returnTypeAndUser(type, true);
        let valid_user = type_valid_user.user;
        let dlg = this.getElementByCss('.md-dialog');
        let el = this.getElementInside(dlg, 'email');
        el.clear();
        this.setValue(el, valid_user.email);
        return this.saveBtn.isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    findClickableActionButton = (name: string, active: string, type: string) => {
        let type_valid_user = this.returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        return this.getAllByCSSandText('.truncated-text', chosen_type).then( (list_of_ORs) => {
            let userRow: any;
            if (active === 'active ') {
                let first_OR = list_of_ORs[0];
                userRow = this.getParent(first_OR);
            } else {
                let first_OR = list_of_ORs[0];
                userRow = this.getParent(first_OR);
            }
            let action_button = this.getElementInsideByCSS(userRow, '.icon-actions');
            // hover over that button
            browser.actions().mouseMove(action_button).perform();
            return this.getElementInsideByCSS(userRow, '.icon-' + name);
        });
    }

    clickOnEditUser = (active: string, type: string) => {
        return this.findClickableActionButton('edit', active, type).then((edit) => {
            return edit.click().then(() => {
                expect(this.getElementByCss('.md-dialog')).to.be.exist;
            });
        });
    }

    clickOnResetPassword = (active: string, type: string) => {
        return this.findClickableActionButton('reset-password', active, type).then((btn) => {
            return btn.click();
        });
    }

    clickOnSkillMatrix = (active: string, type: string) => {
        return this.findClickableActionButton('skill-matrix', active, type).then((btn) => {
            return btn.click();
        });
    }

    updateAvailableField = (type: string) => {
        let dlg = this.getElementByCss('.md-dialog');
        let trigger = this.getElementInsideByCSS(dlg, '.mat-select-trigger');
        trigger.click();
        // this.setValue(el, invalid_org.email);
        let disable = this.getElementByCSSandText('.mat-option', 'Disabled');
        let isDisabled = disable.getText();
        expect(isDisabled).to.equal('Disabled');
        disable.click();
        return this.saveBtn.isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    clickOnUpdateOrSaveUser = () => {
        return this.saveBtn.click();
    }

    shouldShowTheValidNotification = (type: string) => {

        return NotificationObject.getNotificationContent('The password has been reset');
    }

    hoverOnActions = (type: string) => {
        let trList = this.trListByUserType(type);
        let firstTr = trList.get(0);
        let actionsBtn = super.getElementInsideByCSS(firstTr, 'ul.actions > li');
        return browser.actions().mouseMove(actionsBtn).perform();
    }
}

