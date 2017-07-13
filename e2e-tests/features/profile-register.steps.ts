import {expect} from '../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor, ExpectedConditions} from 'protractor';
import {PageObject} from '../po/app.po';

defineSupportCode(({Given, Then, When}) => {

    let page = new PageObject();

    Then(/^I will be taken to the 'Choose Profile' page$/, showChooseProfilePage);
    function showChooseProfilePage() {
        return page.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('register');
        });
    }

    Then(/^I will be taken to the '(.*) Signup' page$/, showSignupPage);
    function showSignupPage(signupType: string) {
        return page.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('selectedRole=' + signupType);
        });
    }

//    Correctly fill in
    When(/^I fill the field '(.*)' (.*)ly/, fillCorrectlyField);
    function fillCorrectlyField(lblString: string, correnctNess: string) {
        let input = page.getElementByName('first_name');
        expect(input).to.exist;
        return input.getAttribute('type').then((type) => {
            let isText = type === 'text';
            return page.setValue(input, (correnctNess === 'correct') ?
                (isText ? 'George Charalambous' : '123') :
                (isText ? 'A' : '1'));
        });
    }

    Then(/^I will get a (.*) validation alert$/, getNotification);
    Then(/^I will get a (.*) notification$/, getNotification);
    function getNotification(validType: string) {
        return page.getElementByName('last_name').click().then(() => {
            let elm = page.getElementByCss('span.' + validType);
            return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
                expect(elm).to.exist;
            });
        });
    }
});
