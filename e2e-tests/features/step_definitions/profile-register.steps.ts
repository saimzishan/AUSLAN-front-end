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

    // When(/^I fill all the details correctly for '(.*)'$/, profileRegisterPage.fillAllDataForRegister);
    When(/^I fill all the details correctly for -> '(.*)' with the pref communication is '(.*)'$/,
        profileRegisterPage.fillAllDataForRegister);

    When(/^'(.*)' will be created$/, profileRegisterPage.userCreated);

    Then(/^I will get a (.*) validation alert$/, profileRegisterPage.getValidation);
    Then(/^I will get a (.*) notification$/, profileRegisterPage.getValidation);

    Then(/^I will get an error notification saying "(.*)"$/, profileRegisterPage.invalidNotification);
    Then(/^I click on '(.*)' interpreter$/, profileRegisterPage.addInterpreter);
    Then(/^I verify '(.*)' interpreter is '(.*)'$/, profileRegisterPage.verifyInterpreterName);
    Then(/^I verify '(.*)' interpreter photo$/, profileRegisterPage.verifyInterpreterPhoto);
    Then(/^I click on '(.*)' interpreter$/, profileRegisterPage.addInterpreter);
    Then(/^I click on '(.*)' interpreter$/, profileRegisterPage.addInterpreter);
    Then(/^I can see '(.*)' validated interpreters$/, profileRegisterPage.countInterpreter);
    Then(/^I can see interpreters in alphabetical order$/, profileRegisterPage.validateAlphabeticalOrder);

});
