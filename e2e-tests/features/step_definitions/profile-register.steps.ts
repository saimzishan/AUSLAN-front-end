import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor, ExpectedConditions} from 'protractor';
import {PageObject} from '../../po/app.po';
import {ProfileChoosingPage} from '../../po/profile-choosing-page.po';
import {ProfileRegisterPage} from '../../po/profile-register-page.po';

defineSupportCode(({Then, When}) => {

    let profilePage = new ProfileChoosingPage();
    let profileRegisterPage = new ProfileRegisterPage();

    Then(/^I will be taken to the 'Choose Profile' page$/, profilePage.browse);

    When(/^I click on image of '(.*)'$/, profilePage.clickOnImage);

    Then(/^I will be taken to the '(.*) Signup' page$/, profileRegisterPage.showSignupPage);

//    Correctly fill in
    When(/^I fill the field '(.*)' (.*)ly/, profileRegisterPage.fillCorrectlyField);

    Then(/^I jump to (.*) element$/, profileRegisterPage.toNextElement);

    When(/^I fill all the details correctly for '(.*)'$/, profileRegisterPage.fillAllDataForRegister);

    When(/^'(.*)' will be created$/, profileRegisterPage.userCreated);

    Then(/^I will get a (.*) validation alert$/, profileRegisterPage.getValification);
    Then(/^I will get a (.*) notification$/, profileRegisterPage.getValification);

    Then(/^I will get an error notification saying "(.*)"$/, profileRegisterPage.invalidNotification);

    When(/^I fill most the details correctly for INTERPRETER with the pref communication is '(.*)'$/,
        profileRegisterPage.fillAllDataForInterpreterWithPrefComm);
});
