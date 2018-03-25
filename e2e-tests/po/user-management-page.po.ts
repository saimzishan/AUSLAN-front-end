import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User, Administrator, BookingOfficer, Interpreter, Client, Organisation, Accountant} from '../helper';
import {NotificationObject} from './notification';

enum UserTableHeaders {
    None, 'First Name', 'Last Name', Type, Organisation, Email, Mobile, Status
}
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
            case 'Accountant':
                chosen_type = 'Accountant';
                valid_user = new Accountant('the_bookingofficer' + Math.round(Math.random() * 100) + '@curvetomorrow.com.au',
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
            case 'Accountant':
                chosen_type = 'Accountant';
                invalid_user = new Accountant('the_accountant2curvetomorrow.com.au',
                    'Pass@1234', 'Accountant', 'The', '0490000111');
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
    validAdminShouldBeOnTheList = (type: string) => {
        let trList = this.trListByUserType(type);
        return trList.count().then((ntr) => expect(ntr).to.be.greaterThan(1));
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

    checkListOfRecordOnScreen = (num) => {
        const totalRows = $$('table.custom tbody tr');
        return totalRows.count().then(countTotal => {
            expect(countTotal).to.eql(parseInt(num, 10));
        });
    }

    queryUserByFormField = (field: string, value: string) => {
        let userFormInput = this.getElementByCss('form input[name=' + field + ']');
        let userNameFormInput = this.getParent(userFormInput);
        userFormInput.sendKeys(value);
        return userNameFormInput.submit();
    }

    hoverOnUserTableHeader = (headerTitle: string, selection: string) => {
        let headerCss = '.dropdown#' + {
            'Type': 'user-type',
            'Status': 'user-status'
        }[headerTitle];
        let el = this.getElementByCss(headerCss);
        return browser.actions().mouseMove(el).perform().then(() => {
            let listEl = this.getElementByCSSandText(headerCss + ' ul li a', selection);
            this.currentPath().then((path) => {
                browser.wait(protractor.ExpectedConditions.presenceOf(listEl), 10000).then(() => {
                    return listEl.click();
                });
            });
        });
    }

    searchUsersWithText = (searchText: string) => {
        let searchInput = this.getElementByCss('form input[name=search]');
        let searchForm = this.getParent(searchInput);
        searchText === 'empty' ? searchInput.click() : searchInput.sendKeys(searchText);
        return searchForm.submit();
    }

    clickOnUserTableHeader = (text: string) => {
        let el = this.getElementByCSSandText('table thead tr th > span', text);
        return el.click();
    }

    comparisonExpectation = (firstRowText: any, lastRowText: any, isAscending: boolean) => {
        if (firstRowText === lastRowText) {
            throw new Error('Text found to be same for first row and last row. Probably the table is not updated with latest data.');
        }
        if (isAscending) {
            return expect(lastRowText > firstRowText).to.be.eq(true);
        } else {
            return expect(lastRowText < firstRowText).to.be.eq(true);
        }
    }

    compareByText = (firstEl, lastEl, isAscending) => {
        return firstEl.getText().then((firstRowText) => {
            return lastEl.getText().then((lastRowText) => {
                return this.comparisonExpectation(firstRowText, lastRowText, isAscending);
            });
        });
    }

    checkUserListOrder = (ascending: string, tableHeader: string) => {
        let firstEl = this.getElementByCss('.users table tbody tr:first-child td:nth-child(' + UserTableHeaders[tableHeader] + ')');
        let lastEl = this.getElementByCss('.users table tbody tr:last-child td:nth-child(' + UserTableHeaders[tableHeader] + ')');
        let isAscending = ascending === 'ascending';
        return this.compareByText(firstEl, lastEl, isAscending);
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

    updateClientFields = (ur_id: string, eaf_id) => {
        let ur = this.getElementByName('ur_id');
        let eaf = this.getElementByName('eaf_id');

        ur.clear();
        this.setValue(ur, ur_id);
        eaf.clear();
        this.setValue(eaf, eaf_id);
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
    clickOnActivateUser = (type: string) => {
        return this.findClickableActionButton('check-mobile', '', type).then(edit => {
            return edit.click();
        });
    }
    clickOnDeactivateUser = (type: string) => {
        return this.findClickableActionButton('decline', '', type).then(edit => {
            return edit.click();
        });
    }
    clickOnDuplicateUser = (active: string, type: string) => {
        return this.findClickableActionButton('duplicate-orgrep', active, type).then((duplicate) => {
            return duplicate.isPresent().then( (v) => {
                browser.actions().mouseMove(duplicate).perform();
                duplicate.click();
            });
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

        return NotificationObject.getNotificationContent('Oops! Please fill in all the fields correctly.');
    }
    hoverOnActions = (type: string) => {
        let trList = this.trListByUserType(type);
        let firstTr = trList.get(0);
        let actionsBtn = super.getElementInsideByCSS(firstTr, 'ul.actions > li');
        return browser.actions().mouseMove(actionsBtn).perform();
    }
}

