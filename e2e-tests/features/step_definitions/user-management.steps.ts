import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageObject} from '../../po/app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client} from '../../helper';
import {UserManagementPage} from '../../po/user-management-page.po';

defineSupportCode(({Given, Then, When}) => {

    let userManagementPO = new UserManagementPage();
    // ================================== CREATING USER ========================================
    Then(/^I am on the 'User Management' list page$/, userManagementPO.browse);

    When(/^I click on 'Create New User'$/, userManagementPO.createUserClick);

    When(/^I add a valid (.*)/, userManagementPO.addValidUser);

    When(/^I click on 'Create'$/, userManagementPO.createUserClickInDialog);

    Then(/^the valid (.*) should be in the list$/, userManagementPO.validUserShouldBeOntheList);

    // ================================== INVALID CREATING ========================================
    When(/^I add an invalid (.*)/, userManagementPO.addInvalidUser);

    // Then(/^I am shown a validation error/, userManagementPO.showValidationError);

    When(/^I update the invalid (.*) information/, userManagementPO.updateInvalidatedField);

    // ================================== UPDATING & DISABLE USER ========================================
    When(/^I click on edit for an (.*) existing (.*)$/, userManagementPO.clickOnEditUser);

    Then(/^I update some (.*) fields/, userManagementPO.updateValidUserFields);
    Then(/^I update (.*) available field/, userManagementPO.updateAvailableField);

    When(/^I click on update$/, userManagementPO.clickOnUpdateOrSaveUser);

    When(/^I click on 'SAVE'$/, userManagementPO.clickOnUpdateOrSaveUser);

    Then(/^the updated (.*) should be in the list$/, userManagementPO.shouldShowTheValidNotification);
    Then(/^the (.*) should be disabled$/, userManagementPO.shouldShowTheValidNotification);
    Then(/^The (.*) for the user should be reset$/, userManagementPO.shouldShowTheValidNotification);

    // ================================== TRIGGER PASSWORD RESET ========================================
    When(/^I click on reset password for an (.*) existing (.*)$/, userManagementPO.clickOnResetPassword);
});
