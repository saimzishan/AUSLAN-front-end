import {defineSupportCode} from 'cucumber';
import {PageObject} from '../../po/app.po';
import {BookingManagementPage} from '../../po/booking-management-page.po';
import {Heroku} from '../../helper';
import {UserPasswordPage} from '../../po/user-password-page.po';
import {UserProfilePage} from '../../po/user-profile-page.po';
import {BlockoutPagePo} from '../../po/blockout-page.po';


defineSupportCode(({Given, Then, When}) => {

    let list_of_object = {};

    let page = new PageObject();
    let bookingPage = new BookingManagementPage();
    let userPasswordPage = new UserPasswordPage();
    let userProfilePage = new UserProfilePage();
    let blockoutPage = new BlockoutPagePo();
    Given(/^Assign (.*) with preferred Interpreters$/, Heroku.createUserWithPreferedInterpreters);

    When(/^I click on my name in the top corner$/, bookingPage.clickOnProfile);
    When(/^I click on my name in the top corner on mobile$/, bookingPage.clickOnProfileMobile);
    When(/^I click on the option  profile$/, bookingPage.clickOnOptionProfile);

    Then(/^I will be taken to my individual (.*) page$/, takeToIndividualPage);
    function takeToIndividualPage(individual_type: string) {
        if (individual_type === 'secure_pass') {
            return userPasswordPage.browse();
        } else {
            return userProfilePage.browse();
        }
    }
    Then(/^I will be taken to blockout page$/, blockoutPage.browse);
    Then(/^I enter blockout name '(.*)'$/, blockoutPage.enterBlockoutName);
    Then(/^I check that the end time is greater then start time$/, blockoutPage.checkEndTimeAgainstStartTime);
    Then(/^I enter blockout details with booking time same as booking$/, blockoutPage.createBlockoutWithBookingTime);

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
