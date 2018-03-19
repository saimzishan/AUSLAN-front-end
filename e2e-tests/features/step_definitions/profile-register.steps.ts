import {defineSupportCode} from 'cucumber';
import {ProfileChoosingPage} from '../../po/profile-choosing-page.po';
import {ProfileRegisterPage} from '../../po/profile-register-page.po';

defineSupportCode(({Then, When}) => {
    let profilePage = new ProfileChoosingPage();
    let profileRegisterPage = new ProfileRegisterPage();

    When(/^I click on image of '(.*)'$/, profilePage.clickOnImage);

    When(/^I fill all the details correctly for -> '(.*)' with the pref communication is '(.*)'$/, profileRegisterPage.fillAllDataForRegister);
    When(/^I fill in basic details correctly for -> '(.*)'$/, profileRegisterPage.fillBasicData);
    When(/^I fill in all the details correctly for -> '(.*)'$/, profileRegisterPage.fillAllDataForAdmin);
    When(/^I fill in basic details correctly for duplicate -> '(.*)'$/, profileRegisterPage.fillDuplicateBasicData);

    When(/^'(.*)' will be created$/, profileRegisterPage.userCreated);

    When(/^I will check the address fields has value '(.*)'$/, profileRegisterPage.checkAppAddressForm)

    Then(/^I will be taken to the 'Choose Profile' page$/, profilePage.browse);
    Then(/^I will be taken to the '(.*) Signup' page$/, profileRegisterPage.showSignupPage);

    Then(/^I will get a (.*) validation alert$/, profileRegisterPage.getValidation);
    Then(/^I will get a (.*) notification$/, profileRegisterPage.getValidation);
    Then(/^I will get an error notification saying "(.*)"$/, profileRegisterPage.invalidNotification);

    Then(/^I click on '(.*)' interpreter$/, profileRegisterPage.addInterpreter);
    Then(/^I verify '(.*)' interpreter is '(.*)'$/, profileRegisterPage.verifyInterpreterName);
    Then(/^I verify '(.*)' interpreter photo$/, profileRegisterPage.verifyInterpreterPhoto);
    Then(/^I can remove '(.*)' , '(.*)' interpreter$/, profileRegisterPage.removeInterpreter);
    Then(/^I can see '(.*)' validated interpreters$/, profileRegisterPage.countInterpreter);
    Then(/^I can see interpreters in alphabetical order$/, profileRegisterPage.validateAlphabeticalOrder);
});
