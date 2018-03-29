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
    When(/^I click on the option  staff calender$/, bookingPage.clickOnStaffCalender);

    Then(/^I will be taken to my individual (.*) page$/, takeToIndividualPage);
    function takeToIndividualPage(individual_type: string) {
        if (individual_type === 'secure_pass') {
            return userPasswordPage.browse();
        } else {
            return userProfilePage.browse();
        }
    }
    Then(/^I will be taken to blockout page$/, blockoutPage.browse);
    Then(/^I will be taken to message page$/, blockoutPage.browseMessages);
    Then(/^I will be taken to staff-calendar page$/, blockoutPage.browseStaff);
    Then(/^I enter blockout name '(.*)'$/, blockoutPage.enterBlockoutName);
    Then(/^I check that the end time is greater then start time$/, blockoutPage.checkEndTimeAgainstStartTime);
    Then(/^I check that the start time and end time is 6:25am - 7:25am$/, blockoutPage.checkEndTimeAgainstStartTime);
    Then(/^I check that the start time and end time is 09:00PM - 10:00PM$/, blockoutPage.chengeEndTimeAgainstStartTime);
    Then(/^I check the value of endTime is '(.*)'$/, blockoutPage.checkEndTimeOFBlockout);
    Then(/^I check the value of availability is '(.*)'$/, blockoutPage.checkValuOFBlockoutName);
    Then(/^I change the value of end time$/, blockoutPage.changeEndTimeOFBlockout);
    Then(/^I change the value of end date$/, blockoutPage.changeEndDateOFBlockout);
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
