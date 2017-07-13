import {expect} from '../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageObject} from '../po/app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client} from '../helper';

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
            case 'Client':
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

    // // // ================================== GIVEN PART ========================================
    // Given(/^Given There is at least 1 (.*) (.*)/, preloadANumberOfUser);
    //  async function preloadANumberOfUser(active: string, type: string): Promise<void>{
    //     await page.navigateTo('/');
    //     expect(page.getElementByCss('loginForm')).to.be.exist;
    // }

    // // ================================== COMMON PART ========================================
    // Given(/^I exist as an (.*)/, givenExistAsAnAdministrator);
    //  async function givenExistAsAnAdministrator(type: string): Promise<void>{
    //     await page.navigateTo('/');
    //     expect(page.getElementByCss('loginForm')).to.be.exist;
    // }
    //
    // Given(/^I sign in with valid (.*) credentials$/, signInWithValidCredential);
    // async function signInWithValidCredential(type: string): Promise<void>{
    //     let el = page.getElementByName('email');
    //     let ps = page.getElementByName('pass');
    //     let lu = page.getElementByName('login_user');
    //
    //     // page.setValue(el, 'nauman+support@curvetomorrow.com.au');
    //     // page.setValue(ps, 'Abcd#1234');
    //     page.setValue(el, nauman_admin.email);
    //     page.setValue(ps, nauman_admin.pass);
    //
    //     // let click = await lu.click().then( () => {
    //     //     // expect(page.currentPath()).toContain('dashboard');
    //     //     // console.log('Signing In');
    //     //     // // expect(page.currentPath());
    //     //     // browser.driver.sleep(2000);
    //     //     // expect(page.currentPath()).to.eventually.contain('dashboard');
    //     // });
    //     let click = await lu.click();
    // }

    // Given(/^I am on my admin home screen$/, onBookinManagementScreen);
    // async function onBookinManagementScreen(): Promise<void>{
    //     // isLoaded();
    //     // console.log(page.currentPath());
    //     await browser.driver.sleep(2000); // waiting for the elements to be loaded
    //     // console.log('It is here!');
    //     expect(page.currentPath()).to.eventually.contain('booking-management');
    // }



    // ================================== CREATING USER ========================================
    When(/^I click on 'Create New User'$/, createUserClick);
    async function createUserClick(): Promise<void> {
        let newUserBtn = page.getButtonByText('+ New User');
        newUserBtn.click();
        await browser.driver.sleep(2000);
        expect(page.getElementByCss('.md-dialog')).to.be.exist;
    }

    When(/^I add a valid (.*)/, addValidUser);
    async function addValidUser(type: string): Promise<void> {
        let type_valid_user = returnTypeAndUser(type, true);
        let chosen_type = type_valid_user.type;
        let valid_user = type_valid_user.user;
        let dlg = page.getElementByCss('.md-dialog');
        let role = page.getButtonByTextInsideElement(dlg, chosen_type);
        await browser.driver.sleep(2000);
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
        await browser.driver.sleep(2000);
        expect(btn.isEnabled()).to.eventually.to.equal(true);
    }

    When(/^I click on 'Create'$/, createUserClickInDialog);
    async function createUserClickInDialog(): Promise<void> {
        let tr = $$('table.custom tr');
        let current_count = await tr.count().then((count) => {
            // console.log(count);
            // cnt = count - 1;
            // console.log('The count of list before clicking is: ' + cnt);
            return count;
        });
        // await browser.driver.sleep(2000);
        cnt = current_count - 1;
        let btn = page.getElementByName('add_user');
        btn.click();
    }

    Then(/^I am on the 'User Management' list page$/, onUserManagementPageAfterOperation);
    async function onUserManagementPageAfterOperation(): Promise<void> {
        await browser.waitForAngular();
        let currentPath = await page.currentPath();
        expect(currentPath).to.contain('user-management');
    }

    Then(/^the valid (.*) should be in the list$/, validUserShouldBeOntheList);
    async function validUserShouldBeOntheList(type: string): Promise<void> {
        let tr = $$('table.custom tr');
        let current_count = await tr.count().then((d) => {
            // console.log(d-1);
            // expect(d - 1).to.be.greaterThan(cnt);
            // console.log(' Updated list: ' + (d - 1) + ' is larger than before: ' + cnt);
            return d;
        });
        expect(current_count - 1).to.be.greaterThan(cnt);
    }

    // ================================== INVALID CREATING ========================================
    When(/^I add an invalid (.*)/, addInvalidUser);
    async function addInvalidUser(type: string): Promise<void> {
        let type_invalid_user = returnTypeAndUser(type, false);
        let chosen_type = type_invalid_user.type;
        let invalid_user = type_invalid_user.user;
        let dlg = page.getElementByCss('.md-dialog');
        let role = page.getButtonByTextInsideElement(dlg, chosen_type);
        await browser.driver.sleep(2000);
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
        await browser.driver.sleep(2000);
        let isBtnEnabled = await btn.isEnabled();
        expect(isBtnEnabled).to.equal(false);
    }

    Then(/^I am shown a validation error/, showValidationError);
    async function showValidationError(): Promise<void> {
        let errs = page.getAll('.inline-icon.error');
        let errs_count = await errs.count().then((count) => {
            // expect(count).to.be.greaterThan(0);
            return count;
        });
        expect(errs_count).to.be.greaterThan(0);
        // await browser.driver.sleep(2000);
    }

    When(/^I update the invalid (.*) information/, updateInvalidatedField);
    async function updateInvalidatedField(type: string): Promise<void> {
        let type_valid_user = returnTypeAndUser(type, true);
        let valid_user = type_valid_user.user;
        let dlg = page.getElementByCss('.md-dialog');
        let el = page.getElementInside(dlg, 'email');
        el.clear();
        page.setValue(el, valid_user.email);
        let btn = page.getElementByName('add_user');
        await browser.driver.sleep(2000);
        let isBtnEnabled = await btn.isEnabled();
        expect(isBtnEnabled).to.equal(true);
    }

    // ================================== UPDATING & DISABLE USER ========================================
    When(/^I click on edit for an (.*)existing (.*)$/, clickOnEditUser);
    async function clickOnEditUser(active: string, type: string): Promise<void> {
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
        await browser.driver.sleep(1000);
        let edit = page.getElementInsideByCSS(userRow, '.icon-edit');
        edit.click();
        await browser.driver.sleep(1000);
        expect(page.getElementByCss('.md-dialog')).to.be.exist;
    }

    Then(/^I update some (.*) fields/, updateValidUserFields);
    async function updateValidUserFields(type: string): Promise<void> {
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
        await browser.driver.sleep(2000);
        let isBtnEnabled = await btn.isEnabled();
        expect(isBtnEnabled).to.equal(true);
    }

    Then(/^I update (.*) available field/, updateAvailableField);
    async function updateAvailableField(type: string): Promise<void> {
        await browser.driver.sleep(1000);
        let dlg = page.getElementByCss('.md-dialog');
        let trigger = page.getElementInsideByCSS(dlg, '.mat-select-trigger');
        trigger.click();
        await browser.driver.sleep(1000);
        // page.setValue(el, invalid_org.email);
        let disable = page.getElementByCSSandText('.mat-option', 'Disabled');
        await browser.driver.sleep(1000);
        let isDisabled = await disable.getText();
        expect(isDisabled).to.equal('Disabled');
        disable.click();
        await browser.driver.sleep(1000);
        let btn = page.getElementByName('add_user');
        let isBtnEnabled = await btn.isEnabled();
        expect(isBtnEnabled).to.equal(true);
    }

    When(/^I click on update$/, clickOnUpdateOrSaveUser);
    When(/^I click on 'SAVE'$/, clickOnUpdateOrSaveUser);
    async function clickOnUpdateOrSaveUser(): Promise<void> {
        await browser.driver.sleep(2000);
        let btn = page.getElementByName('add_user');
        btn.click();
    }

    Then(/^the updated (.*) should be in the list$/, updatedUserShouldBeOntheList);
    Then(/^the (.*) should be disabled$/, updatedUserShouldBeOntheList);
    async function updatedUserShouldBeOntheList(type: string): Promise<void> {
        let notification = page.getElementByCss('.simple-notification');
        let sn_title = page.getElementInsideByCSS(notification, '.sn-title');
        let notificationTitle = await page.getText(sn_title);
        expect(notificationTitle).to.equal('Hurray!');
        await browser.driver.sleep(2000);
    }
});
