import {expect} from '../../config/helpers/chai-imports';
// import * from 'chai';
// import {} from 'jasmine';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$} from 'protractor';

import {PageObject} from '../../po/app.po';
import {BookingManagementPage} from '../../po/booking-management-page.po';
import {CONSTANT, Booking} from '../../helper';
import {UserPasswordPage} from '../../po/user-password-page.po';
import {UserProfilePage} from '../../po/user-profile-page.po';


defineSupportCode(({Given, Then, When}) => {

    let list_of_object = {};

    let page = new PageObject();
    let bookingPage = new BookingManagementPage();
    let userPasswordPage = new UserPasswordPage();
    let userProfilePage = new UserProfilePage();

    When(/^I click on my name in the top corner$/, bookingPage.clickOnProfile);

    Then(/^I will be taken to my individual (.*) page$/, takeToIndividualPage);
    function takeToIndividualPage(individual_type: string) {
        if (individual_type === 'secure_pass') {
            return userPasswordPage.browse();
        } else {
            return userProfilePage.browse();
        }
    }

    When(/^I change some input (.*) fields of the (.*)/, userProfilePage.updateMandatoryFields);

    When(/^I verify input (.*) fields of the (.*) is updated/, userProfilePage.mandatoryFieldsIsUpdated);

    When(/^I change the input field (.*) with (.*)/, userProfilePage.updateTheField);

    When(/^I change the dropwdown field (.*) with (.*)/, userProfilePage.updateDropDownField);

    Then(/^The input field (.*) will be updated with (.*)/, userProfilePage.fieldWillBeUpdated);

    Then(/^The dropdown field (.*) will be updated with (.*)/, userProfilePage.dropdownFieldWillBeUpdated);

    When(/^I click on Profile '(.*)'/, clickonProfileButton);
    function clickonProfileButton(btnLabel: string) {
        return page.getElementByCSSandText('a', btnLabel).click();
    }

    When(/^I type in current password is (.*)$/, userPasswordPage.enterCurrentPassword);

    When(/^I type in the new password is (.*)$/, userPasswordPage.enterNewPassword);

    When(/^I type in the confirm password is (.*)$/, userPasswordPage.enterConfirmPassword);

    When(/^I can verify my profile pic is (.*) with link '(.*)'$/, userProfilePage.verifyProfilePic);

    Then(/^I get (.*) message: '(.*)'$/, getMessage);
    function getMessage(success: string, message: string) {
        return userPasswordPage.getNotificationContent(message);
    }
});
