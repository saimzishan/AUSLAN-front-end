import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageObject} from '../../po/app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client} from '../../helper';

defineSupportCode(({Given, Then, When}) => {

    let page = new PageObject();

    let cnt = 0;

    function returnValidUser(type: string) {
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

    function returnInvalidUser(type: string) {
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

    function returnTypeAndUser(type: string, valid: boolean) {
        if (valid) {
            return returnValidUser(type);
        }
        return returnInvalidUser(type);
    }

    // ================================== CREATING USER ========================================
    When(/^I click on 'Create New User'$/, createUserClick);
    function createUserClick() {
        let newUserBtn = page.getButtonByText('+ New User');
        return newUserBtn.click().then(() => {
            expect(page.getElementByCss('.md-dialog')).to.be.exist;
        });
    }

    When(/^I add a valid (.*)/, addValidUser);
    function addValidUser(type: string) {
        let type_valid_user = returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        let valid_user = type_valid_user.user;
        let dlg = page.getElementByCss('.md-dialog');
        let role = page.getButtonByTextInsideElement(dlg, chosen_type);
        role.click();
        let fn = page.getElementInside(dlg, 'first_name');
        let ln = page.getElementInside(dlg, 'last_name');
        let el = page.getElementInside(dlg, 'email');
        let mb = page.getElementInside(dlg, 'mobile');
        let ps = page.getElementInside(dlg, 'password');
        let cps = page.getElementInside(dlg, 'certainPassword');

        page.setValue(el, valid_user.email);
        page.setValue(ps, valid_user.pass);
        page.setValue(cps, valid_user.pass);
        page.setValue(mb, valid_user.mobile_num);
        page.setValue(fn, valid_user.first_name);
        page.setValue(ln, valid_user.last_name);

        let btn = page.getElementByName('add_user');
        return expect(btn.isEnabled()).to.eventually.to.equal(true);
    }

    When(/^I click on 'Create'$/, createUserClickInDialog);
    function createUserClickInDialog() {
        let tr = $$('table.custom tr');
        tr.count().then((count) => {
            // console.log(count);
            // cnt = count - 1;
            // console.log('The count of list before clicking is: ' + cnt);
            cnt = count - 1;
            return count;
        });
        return page.getElementByName('add_user').click();
    }

    Then(/^I am on the 'User Management' list page$/, onUserManagementPageAfterOperation);
    function onUserManagementPageAfterOperation() {
        return page.currentPath().then((currentPath) => {
            // this.didFinishedRendering();
            expect(currentPath).to.contain('user-management');
        });
    }

    Then(/^the valid (.*) should be in the list$/, validUserShouldBeOntheList);
    function validUserShouldBeOntheList(type: string) {
        let tr = $$('table.custom tr');
        return tr.count().then((d) => {
            console.log(d);
            console.log(cnt);
            expect(d - 1).to.be.greaterThan(cnt);
        });
        // return expect(current_count).to.be.greaterThan(cnt - 1);
    }

    // ================================== INVALID CREATING ========================================
    When(/^I add an invalid (.*)/, addInvalidUser);
    function addInvalidUser(type: string) {
        let type_invalid_user = returnTypeAndUser(type, false);
        let chosen_type = type_invalid_user.type;
        let invalid_user = type_invalid_user.user;
        let dlg = page.getElementByCss('.md-dialog');
        let role = page.getButtonByTextInsideElement(dlg, chosen_type);
        role.click();
        let fn = page.getElementInside(dlg, 'first_name');
        let ln = page.getElementInside(dlg, 'last_name');
        let el = page.getElementInside(dlg, 'email');
        let mb = page.getElementInside(dlg, 'mobile');
        let ps = page.getElementInside(dlg, 'password');
        let cps = page.getElementInside(dlg, 'certainPassword');

        page.setValue(el, invalid_user.email);
        page.setValue(ps, invalid_user.pass);
        page.setValue(cps, invalid_user.pass);
        page.setValue(mb, invalid_user.mobile_num);
        page.setValue(fn, invalid_user.first_name);
        page.setValue(ln, invalid_user.last_name);

        let btn = page.getElementByName('add_user');
        let isBtnEnabled = btn.isEnabled();
        return expect(isBtnEnabled).to.equal(false);
    }

    Then(/^I am shown a validation error/, showValidationError);
    function showValidationError() {
        let errs = page.getAll('.inline-icon.error');
        let errs_count = errs.count().then((count) => {
            // expect(count).to.be.greaterThan(0);
            return count;
        });
        return expect(errs_count).to.be.greaterThan(0);
    }

    When(/^I update the invalid (.*) information/, updateInvalidatedField);
    function updateInvalidatedField(type: string) {
        let type_valid_user = returnTypeAndUser(type, true);
        let valid_user = type_valid_user.user;
        let dlg = page.getElementByCss('.md-dialog');
        let el = page.getElementInside(dlg, 'email');
        el.clear();
        page.setValue(el, valid_user.email);
        let btn = page.getElementByName('add_user');
        let isBtnEnabled = btn.isEnabled();
        return expect(isBtnEnabled).to.equal(true);
    }

    // ================================== UPDATING & DISABLE USER ========================================
    When(/^I click on edit for an (.*) existing (.*)$/, clickOnEditUser);
    function clickOnEditUser(active: string, type: string) {
        let type_valid_user = returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        let valid_user = type_valid_user.user;
        let list_of_ORs = page.getAllByCSSandText('.truncated-text', chosen_type);
        let userRow: any;
        if (active === 'active ') {
            // userRow = await list_of_ORs.then(function (ors_list) {
            //     for (let i = 0; i < ors_list.length; i++) {
            //         let parentRow = page.getParent(ors_list[i]);
            //         let active_user = page.getElementInsideByCSS(parentRow, '.active');
            //         if (active_user.isPresent()){
            //             console.log(i)
            //             return parentRow;
            //         }
            //         // if (expect(page.getText(page.getElementInsideByCSS(parentRow, '.active'))).to.eventually.equal('Active')){
            //         //     return parentRow;
            //         // }
            //         // if (expect(page.getText(active_user)).to.eventually.equal('Active')){
            //         //     return parentRow;
            //         // }
            //     }
            // });
            let first_OR = list_of_ORs.get(0);
            userRow = page.getParent(first_OR);
        } else {
            let first_OR = list_of_ORs.get(0);
            userRow = page.getParent(first_OR);
        }
        let action_button = page.getElementInsideByCSS(userRow, '.icon-actions');
        // hover over that button
        browser.actions().mouseMove(action_button).perform();
        let edit = page.getElementInsideByCSS(userRow, '.icon-edit');
        return edit.click().then( () => {
            expect(page.getElementByCss('.md-dialog')).to.be.exist;
        });
    }

    Then(/^I update some (.*) fields/, updateValidUserFields);
    function updateValidUserFields(type: string) {
        let type_valid_user = returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        let valid_user = type_valid_user.user;
        let dlg = page.getElementByCss('.md-dialog');
        let ln = page.getElementInside(dlg, 'last_name');
        let mb = page.getElementInside(dlg, 'mobile');

        mb.clear();
        page.setValue(mb, valid_user.mobile_num);
        ln.clear();
        page.setValue(ln, valid_user.last_name);
        let btn = page.getElementByName('add_user');
        let isBtnEnabled = btn.isEnabled();
        return expect(isBtnEnabled).to.equal(true);
    }

    Then(/^I update (.*) available field/, updateAvailableField);
    function updateAvailableField(type: string) {
        let dlg = page.getElementByCss('.md-dialog');
        let trigger = page.getElementInsideByCSS(dlg, '.mat-select-trigger');
        trigger.click();
        // page.setValue(el, invalid_org.email);
        let disable = page.getElementByCSSandText('.mat-option', 'Disabled');
        let isDisabled = disable.getText();
        expect(isDisabled).to.equal('Disabled');
        disable.click();
        let btn = page.getElementByName('add_user');
        let isBtnEnabled = btn.isEnabled();
        return expect(isBtnEnabled).to.equal(true);
    }

    When(/^I click on update$/, clickOnUpdateOrSaveUser);
    When(/^I click on 'SAVE'$/, clickOnUpdateOrSaveUser);
    function clickOnUpdateOrSaveUser() {
        return page.getElementByName('add_user').click();
    }

    Then(/^the updated (.*) should be in the list$/, updatedUserShouldBeOntheList);
    Then(/^the (.*) should be disabled$/, updatedUserShouldBeOntheList);
    function updatedUserShouldBeOntheList(type: string) {
        let notification = page.getElementByCss('.simple-notification');
        let sn_title = page.getElementInsideByCSS(notification, '.sn-title');
        let notificationTitle = page.getText(sn_title);
        return expect(notificationTitle).to.equal('Hurray!');
    }
});
