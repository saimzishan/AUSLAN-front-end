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

    cnt = 0;

    returnValidUser = (type: string) => {
        let chosen_type = '';
        let valid_user = new User('', '', '', '', '');
        switch (type) {
            case 'Administrator':
                chosen_type = 'Administrator';
                valid_user = new Administrator('the_admin' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'Administrator', 'The', '0490000111');
                break;
            case 'Booking Officer':
                chosen_type = 'Booking Officer';
                valid_user = new BookingOfficer('the_bookingofficer' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'BookingOfficer', 'The', '0490000111');
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                valid_user = new Interpreter('the_interpreter' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'Interpreter', 'The', '0490000111');
                break;
            case 'Client':
            case 'Individual Client':
                chosen_type = 'Individual Client';
                valid_user = new Client('the_client' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'Client', 'The', '0490000111');
                break;
            case 'Organisational Representative':
            case 'Organisational':
                chosen_type = 'Organisational';
                valid_user = new Organisation('the_orgrep' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
                    'Pass@1234', 'OrgRep', 'The', '0490000111');
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
                    'Pass@1234', 'Administrator', 'The', '0490000111');
                break;
            case 'Booking Officer':
                chosen_type = 'Booking Officer';
                invalid_user = new BookingOfficer('the_bookingofficer2curvetomorrow.com.au',
                    'Pass@1234', 'BookingOfficer', 'The', '0490000111');
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                invalid_user = new Interpreter('the_interpreter2curvetomorrow.com.au',
                    'Pass@1234', 'Interpreter', 'The', '0490000111');
                break;
            case 'Client':
            case 'Individual Client':
                chosen_type = 'Individual Client';
                invalid_user = new Client('the_client2curvetomorrow.com.au',
                    'Pass@1234', 'Client', 'The', '0490000111');
                break;
            case 'Organisational Representative':
            case 'Organisational':
                chosen_type = 'Organisational';
                invalid_user = new Organisation('the_orgrep2curvetomorrow.com.au',
                    'Pass@1234', 'OrgRep', 'The', '0490000111');
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

    }

    createUserClick = () => {
        let newUserBtn = this.getButtonByText('+ New User');
        return newUserBtn.click();
    }

    addValidUser = (type: string) => {
        let type_valid_user = this.returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        let valid_user = type_valid_user.user;
        let fn = this.getElementByName('first_name');
        let ln = this.getElementByName( 'last_name');
        let el = this.getElementByName( 'email');
        let mb = this.getElementByName( 'mobile');
        let ps = this.getElementByName( 'password');
        let cps = this.getElementByName( 'certainPassword');

        this.setValue(el, valid_user.email);
        this.setValue(ps, valid_user.pass);
        this.setValue(cps, valid_user.pass);
        this.setValue(mb, valid_user.mobile_num);
        this.setValue(fn, valid_user.first_name);
        this.setValue(ln, valid_user.last_name);
        return this.getElementByName('register_user').isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    addInvalidUser = (type: string) => {
        let type_invalid_user = this.returnTypeAndUser(type, false);
        let invalid_user = type_invalid_user.user;
        let fn = this.getElementByName( 'first_name');
        let ln = this.getElementByName( 'last_name');
        let el = this.getElementByName( 'email');
        let mb = this.getElementByName( 'mobile');
        let ps = this.getElementByName( 'password');
        let cps = this.getElementByName( 'certainPassword');

        this.setValue(el, invalid_user.email);
        this.setValue(ps, invalid_user.pass);
        this.setValue(cps, invalid_user.pass);
        this.setValue(mb, invalid_user.mobile_num);
        this.setValue(fn, invalid_user.first_name);
        this.setValue(ln, invalid_user.last_name);
        return this.getElementByName('register_user').isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    createUserClickInDialog = () => {
        let tr = $$('table.custom tr');
        return tr.count().then((count) => {
            this.cnt = count - 1;
            return this.getElementByName('register_user').click();
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
        let valid_user = type_valid_user.user;
        let ln = this.getElementByName( 'last_name');
        let mb = this.getElementByName( 'mobile');

        mb.clear();
        this.setValue(mb, valid_user.mobile_num);
        ln.clear();
        this.setValue(ln, valid_user.last_name);
        return this.getElementByName('register_user').isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    updateInvalidatedField = (type: string) => {
        let type_valid_user = this.returnTypeAndUser(type, true);
        let valid_user = type_valid_user.user;
        let el = this.getElementByName( 'email');
        el.clear();
        this.setValue(el, valid_user.email);
        return this.getElementByName('register_user').isEnabled().then( (enabled) => {
            expect(enabled).to.equal(true);
        });
    }

    findClickableActionButton = (name: string, active: string, type: string) => {
        let type_valid_user = this.returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        return this.getAllByCSSandText('.truncated-text', chosen_type).then((list_of_ORs) => {
            let userRow: any;
            let first_OR = list_of_ORs[0];
            userRow = this.getParent(first_OR);

            let action_button = this.getElementInsideByCSS(userRow, '.icon-actions');
            // hover over that button
            browser.actions().mouseMove(action_button).perform();
            return browser.sleep(200).then( () => {
              return this.getElementInsideByCSS(userRow, '.icon-' + name);
            });
        });
    }

    clickOnEditUser = (active: string, type: string) => {
        return this.findClickableActionButton('edit', active, type).then((edit) => {
            return edit.click();
        });
    }

    clickOnResetPassword = (active: string, type: string) => {
        return this.findClickableActionButton('reset-password', active, type).then((btn) => {
            return btn.click();
        });
    }
    userUpdated = () => {
        return NotificationObject.getNotificationContent('Successfully');
    }
    clickOnSkillMatrix = (active: string, type: string) => {
        return this.findClickableActionButton('skill-matrix', active, type).then((btn) => {
            return btn.click();
        });
    }

    updateAvailableField = (type: string) => {
        let trigger = this.getElementByName( 'selStatus');
        trigger.click();
        let disable = this.getElementByCSSandText('option', 'Disabled');
        return disable.getText().then( (disable_txt) => {
            expect(disable_txt).to.equal('Disabled');
            disable.click();
        });
    }

    clickOnUpdateOrSaveUser = () => {
        return this.getElementByName('register_user').click();
    }

    shouldShowTheValidNotification = (type: string) => {

        return NotificationObject.getNotificationContent('The password has been reset');
    }
    shouldShowInValidNotification = () => {

        return NotificationObject.getNotificationContent('Kindly fill all the required (*) fields');
    }
    hoverOnActions = (type: string) => {
        let trList = this.trListByUserType(type);
        let firstTr = trList.get(0);
        let actionsBtn = super.getElementInsideByCSS(firstTr, 'ul.actions > li');
        return browser.actions().mouseMove(actionsBtn).perform();
    }
}

