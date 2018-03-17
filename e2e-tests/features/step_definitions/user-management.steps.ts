import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageObject} from '../../po/app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client, Heroku} from '../../helper';
import {UserManagementPage} from '../../po/user-management-page.po';

defineSupportCode(({Given, Then, When}) => {

    let userManagementPO = new UserManagementPage();

    Given(/^There exist all types of verified users$/, Heroku.preloadAllTypesVerifiedUsers);
    Given(/^I (disabled|unverified) the (first|last) (.*)$/, Heroku.setUserStatus);
    // ================================== CREATING USER ========================================
    Then(/^I am on the 'User Management' list page$/, userManagementPO.browse);

    When(/^I click on 'New User'$/, userManagementPO.createUserClick);

    When(/^I add a valid (.*)/, userManagementPO.addValidUser);

    When(/^I click on 'Create'$/, userManagementPO.createUserClickInDialog);

    // Following strings are matched
    // the 21 valid Interpreters should be in the list
    // The valid Interpreters should be in the list
    // The valid Interpreter should be in the list
    // the valid Booking Officer should be in the list
    // the 2 valid Administrators should be in the list
    Then(/^[tT]he (\d+)?\s?valid (.*[^s])s? should be in the list$/, userManagementPO.validUserShouldBeOnTheList);
    Then(/^The valid (.*) should not be in the list$/, userManagementPO.userShouldNotBeOnTheList);
    Then(/^The valid (.*) should be in the list are more than one$/, userManagementPO.validAdminShouldBeOnTheList);

    // ================================== INVALID CREATING ========================================
    When(/^I add an invalid (.*)/, userManagementPO.addInvalidUser);

    // Then(/^I am shown a validation error/, userManagementPO.showValidationError);

    When(/^I update the invalid (.*) information/, userManagementPO.updateInvalidatedField);

    // ================================== UPDATING & DISABLE USER ========================================
    When(/^I click on edit for an (.*) existing (.*)$/, userManagementPO.clickOnEditUser);
    When(/^I click on duplicate for an (.*) existing (.*)$/, userManagementPO.clickOnDuplicateUser);
    Then(/^I update some (.*) fields/, userManagementPO.updateValidUserFields);
    Then(/^I update UR id as '(.*)' and EAF id as '(.*)' fields$/, userManagementPO.updateClientFields);
    Then(/^I update (.*) available field/, userManagementPO.updateAvailableField);
    When(/^I see success notification$/, userManagementPO.userUpdated);
    When(/^I see validation errors$/, userManagementPO.shouldShowInValidNotification);

    When(/^I click on update$/, userManagementPO.clickOnUpdateOrSaveUser);
    When(/^I hover on the 'Actions' of the (.*)$/, userManagementPO.hoverOnActions);
    When(/^I click on 'SAVE'$/, userManagementPO.clickOnUpdateOrSaveUser);

    When(/^I click on 'Skill Matrix' for an (.*) existing (.*)$/, userManagementPO.clickOnSkillMatrix);

    Then(/^the updated (.*) should be in the list$/, userManagementPO.shouldShowTheValidNotification);
    Then(/^the (.*) should be disabled$/, userManagementPO.shouldShowTheValidNotification);
    Then(/^The (.*) for the user should be reset$/, userManagementPO.shouldShowTheValidNotification);

    // ================================== TRIGGER PASSWORD RESET ========================================
    When(/^I click on reset password for an (.*) existing (.*)$/, userManagementPO.clickOnResetPassword);

    Then(/^I can see a list of (.*) records on the page$/, userManagementPO.checkListOfRecordOnScreen);
    When(/^I query user by form field (.*) and value '(.*)'$/, userManagementPO.queryUserByFormField);
    When(/^I hover on the (.*) dropdown on user list table header and select '(.*)'$/, userManagementPO.hoverOnUserTableHeader);
    When(/^I search users with '(.*)'$/, userManagementPO.searchUsersWithText);
    When(/^I click on the user list table header '(.*)'$/, userManagementPO.clickOnUserTableHeader);
    Then(/^I can see the user list in (ascending|descending) order of (.*)$/, userManagementPO.checkUserListOrder);
});
