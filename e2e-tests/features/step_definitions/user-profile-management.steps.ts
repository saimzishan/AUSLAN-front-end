import {expect} from '../../config/helpers/chai-imports';
// import * from 'chai';
// import {} from 'jasmine';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$} from 'protractor';

import {PageObject} from '../../po/app.po';
import {BookingPage} from '../../po/booking-page.po';
import {CONSTANT, Booking} from '../../helper';
import {UserPasswordPage} from '../../po/user-password-page.po';
import {UserProfilePage} from '../../po/user-profile-page.po';


defineSupportCode(({Given, Then, When}) => {

    let list_of_object = {};

    let page = new PageObject();
    let bookingPage = new BookingPage();
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

    Then(/^I can see the fields (.*)$/, showAllTheFields);
    function showAllTheFields(fields_string: string) {
        const fields = fields_string.split(', ');
        const all_fields =  $$('form div.form-field label');
        const all_fields_length = all_fields.then((array) => {
            return array.length;
        });
        expect(fields.length).to.equal(all_fields_length);
        for (let i = 0; i < fields.length; i++) {
            let label_text = page.getText(all_fields[i]);
            expect(fields).to.includes(label_text);
        }
    }

    When(/^I change the input field (.*) with (.*)/, updateTheField);
    function updateTheField(fields_string: string, updated_text: string) {
        const selected_label = page.getElementByCSSandText('label', fields_string);
        const div = page.getParent(selected_label);
        let input_field = page.getElementInsideByTag(div, 'input');
        input_field.clear();
        return page.setValue(input_field, updated_text);
    }

    Then(/^The input field (.*) will be updated with (.*)/, filedWillBeUpdated);
    function filedWillBeUpdated(fields_string: string, updated_text: string)    {
        const selected_label = page.getElementByCSSandText('label', fields_string);
        const div = page.getParent(selected_label);
        let input_field = page.getElementInsideByTag(div, 'input');
        let val = input_field.getAttribute('value');
        return val.then( (value) => {
            // console.log(value+'------');
            // console.log(updated_text + '++++++');
            expect(value).to.be.equal(updated_text);
        });
    }

    When(/^I click on Profile '(.*)'/, clickonProfileButton);
    function clickonProfileButton(btnLabel: string) {
        return page.getElementByCSSandText('a', btnLabel).click();
    }

    When(/^I type in current pass word is (.*)$/, userPasswordPage.enterCurrentPassword);

    When(/^I type in the new password is (.*)$/, userPasswordPage.enterNewPassword);

    When(/^I type in the confirm password is (.*)$/, userPasswordPage.enterConfirmPassword);

    Then(/^I get (.*) message: '(.*)'$/, getMessage);
    function getMessage(success: string, message: string) {
        return userPasswordPage.getNotificationContent(message);
    }
});
