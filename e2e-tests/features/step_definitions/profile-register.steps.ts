import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor, ExpectedConditions} from 'protractor';
import {PageObject} from '../../po/app.po';

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
            page.setValue(input, (correnctNess === 'correct') ?
                (isText ? 'George Charalambous' : '123') :
                (isText ? 'A' : '1'));
        });
    }

    When(/^I fill all the details correctly for '(.*)'$/, fillAllDataForOrgRep);
    function fillAllDataForOrgRep(type: string) {
        page.getElementByName('first_name').sendKeys('George');
        page.getElementByName('last_name').sendKeys('Charalambous');
        page.getElementByName('password').sendKeys('Abcd#1234');
        page.getElementByName('certainPassword').sendKeys('Abcd#1234');
        page.getElementByName('email').sendKeys('george' + type + '@curvetomorrow.com.au');
        page.getElementByName(type === 'INTERPRETER' ? 'phone1' : 'phone').sendKeys('0490394517');
        page.getElementByName(type === 'INTERPRETER' ? 'mobile1' : 'mobile').sendKeys('0490394517');
        if (type === 'INDIVIDUALCLIENT') {
            page.getElementByName('ndis_id').sendKeys('311');
            page.getElementByName('ndis_budget_limit').sendKeys('10000');
            page.getElementByName('dpEventDateStart').sendKeys('01-30-2015');
            page.getElementByName('dpEventDateEnd').sendKeys('01-30-2015');
            page.getElementByName('email_receipt').click(); //  email on receipt
            page.getElementByName('email_confirmation').click(); //  email on receipt
            page.getElementByName('cn_first_name').sendKeys('George');
            page.getElementByName('cn_last_name').sendKeys('Charalambous');
            page.getElementByName('cn_email').sendKeys('george@curvetomorrow.com.au');
            page.getElementByName('cn_phone').sendKeys('0490394517');
        } else if (type === 'INTERPRETER') {
            page.getElementByName('naati_id').sendKeys('ZS-111');
            page.getElementByName('naati_validity_start_date').sendKeys('01-30-2015');
            page.getElementByName('naati_validity_end_date').sendKeys('01-30-2015');
            page.getElementByName('date_of_birth').sendKeys('01-30-2015');
            page.getElementByName('after_hours_phone').sendKeys('0490394517');
            page.getElementByName('highest_level_edu').sendKeys('Bachelor Degree'.toUpperCase());
            page.getElementByName('location_pref').sendKeys('ACT');
            page.getElementByName('skill_level').sendKeys('ASL Certified'.toUpperCase());
            page.getElementByName('comm_pref').sendKeys('SMS');
        } else if (type === 'ORGANISATION') {
            page.getElementByName('business_abn').sendKeys('12312312311');
            page.getElementByName('business_name').sendKeys('Curve');
            page.getElementByName('business_branch_office').sendKeys('Melbourne');
            page.getElementByName('preferred_contact_method').sendKeys('Email'); // DROPDOWN
            page.getElementByName('email_receipt').click(); //  email on receipt
            page.getElementByName('email_confirmation').click(); //  email on receipt
            page.getElementByName('cn_first_name').sendKeys('George');
            page.getElementByName('cn_last_name').sendKeys('Charalambous');
            page.getElementByName('cn_email').sendKeys('george@curvetomorrow.com.au');
            page.getElementByName('cn_phone').sendKeys('0490394517');
        }

        page.getElementByName('address_unit_num').sendKeys('22');
        page.getElementByName('address_street_number').sendKeys('62');
        page.getElementByName('address_street').sendKeys('Dave');
        page.getElementByName('address_post_code').sendKeys('3064');
        page.getElementByName('address_suburb').sendKeys('Crazy');
        page.getElementByName('address_state').sendKeys('VIC'); // dropdown

        return page.getElementByName('register_user').click();
    }

    When(/^'(.*)' will be created$/, userCreated);
    function userCreated(type: string) {
        let elm = $('div.sn-content');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
            expect(elm.getText()).to.eventually.contain('Congrats');
        });
    }

    Then(/^I will get a (.*) validation alert$/, getNotification);
    Then(/^I will get a (.*) notification$/, getNotification);
    function getNotification(validType: string) {
        return page.getElementByName('last_name').click().then(() => {
            let elm = page.getElementByCss('span.' + validType);
            browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
                expect(elm).to.exist;
            });
        });
    }
});
