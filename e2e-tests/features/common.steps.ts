import {expect} from '../config/helpers/chai-imports';
// import * from 'chai';
// import {} from 'jasmine';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$} from 'protractor';
import {PageHelper} from '../app.po';
import {User} from '../app.user';
import {Administrator} from '../app.admin';
import {Organisation} from '../app.org';
import {Client} from '../app.client';
import {Interpreter} from '../app.interpreter';
import {BookingOfficer} from '../app.bookofficer';
import {bufferWhen} from 'rxjs/operator/bufferWhen';
import {OrganisationalRepresentative} from '../../src/app/shared/model/user.entity';
import {main} from '@angular/compiler-cli/src/main';

defineSupportCode(({Given, When}) => {

    let page = new PageHelper();

    let valid_logged_in_user = new User('', '', '', '', '');

    function puts(error, stdout, stderr) {
        console.log(stdout);
    }

    function sendCommandToHeroku(command) {
        const exec = require('child_process').execSync;
        // exec('echo \'' + command + '; exit\' | heroku run console --app auslan-e2e-testing', puts);
        console.log(command);
        exec('cd ../booking-system-api/ && echo  \'' + command + ' \' | bundle exec rails c && cd ../booking-system-frontend/', puts);
    }

    function preloadBooking(data) {
        return 'Booking.create(' + JSON.stringify(data) + ');';
    }

    function preloadUser(data) {
        let return_command = '';
        let userType = user_type(data.type);
        // delete the key type
        delete data.type;
        return_command += 'a = ' + userType + '.create(' + JSON.stringify(data);
        return_command += ')\n';
        return return_command;
    }

    function user_type(type: string) {
        let chosen_type = '';
        switch (type) {
            case 'Administrator':
                chosen_type = 'Administrator';
                break;
            case 'Booking Officer':
                chosen_type = 'BookingOfficer';
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                break;
            case 'Client':
                chosen_type = 'IndividualClient';
                break;
            case 'Organisational Representative':
                chosen_type = 'OrganisationalRepresentative';
                break;
        }
        return chosen_type;
    }

    function returnValidUser(type: string) {
        let chosen_type = '';
        let valid_user = new User('', '', '', '', '');
        switch (type) {
            case 'Administrator':
                chosen_type = 'Administrator';
                valid_user = new Administrator('admin@auslan.com.au', 'Abcd#1234');
                break;
            case 'Booking Officer':
                chosen_type = 'Booking Officer';
                valid_user = new BookingOfficer('bookingofficer@auslan.com.au', 'Abcd#1234');
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                valid_user = new Interpreter('interpreter@auslan.com.au', 'Abcd#1234');
                break;
            case 'Client':
                chosen_type = 'Individual Client';
                valid_user = new Client('client@auslan.com.au', 'Abcd#1234');
                break;
            case 'Organisational Representative':
                chosen_type = 'Organisational';
                valid_user = new Organisation('orgrepn@auslan.com.au', 'Abcd#1234');
                break;
        }
        valid_user.first_name = 'MOH';
        valid_user.last_name = 'JAY';
        valid_user.mobile_num = '0444 555 666';
        return {type: chosen_type, user: valid_user};
    }

    function returnTypeAndUser(type: string) {
        return returnValidUser(type);
    }

    function returnJSONForUser(verified: boolean, type: string, i, user?: User) {
        const extend_email = user_type(type).toLowerCase();
        let email = 'mohjay_test_' + extend_email + /*( (i === 0) ? '' :*/ i.toString() /*)*/ + '@auslan.com.au';
        let password = 'Abcd#1234';
        let firstName = 'MOH';
        let lastName = 'JAY';
        let mobileNum = '0444 555 666';

        if (typeof user !== 'undefined') {
            email = user.email;
            password = user.pass;
            firstName = user.first_name;
            lastName = user.last_name;
            mobileNum = user.mobile_num;
        }
        console.log(email);

        // Similar for every user
        let data_to_sent = {};
        data_to_sent['type'] = type;
        data_to_sent['email'] = email;
        data_to_sent['password'] = password;
        data_to_sent['first_name'] = firstName;
        data_to_sent['last_name'] = lastName;
        data_to_sent['mobile'] = mobileNum;
        data_to_sent['verified'] = verified;
        let billing_account_attributes_fields = {};
        let billing_address_attributes_fields = {};

        switch (type) {
            case 'Client':
                data_to_sent['send_email_on_receipt_of_request'] = true;
                data_to_sent['email_confirmation_on_interpreter_allocation'] = true;
                billing_account_attributes_fields['primary_contact_first_name'] = 'MOH';
                billing_account_attributes_fields['primary_contact_last_name'] = 'JAY';
                billing_account_attributes_fields['email_address'] = 'mohjay_client ' + i * 9 + 5 + '@auslan.com.au';
                billing_account_attributes_fields['account_number'] = (1111111 + (i * 4)).toString();
                billing_account_attributes_fields['preferred_billing_method_email'] = true;
                billing_address_attributes_fields['unit_number'] = i;
                billing_address_attributes_fields['street_number'] = i * 2 + 1;
                billing_address_attributes_fields['street_name'] = 'Flemington Road';
                billing_address_attributes_fields['suburb'] = 'Flemington Road';
                billing_address_attributes_fields['state'] = 'VIC';
                billing_address_attributes_fields['post_code'] = 3054 + i;
                billing_account_attributes_fields['address_attributes'] = billing_address_attributes_fields;
                data_to_sent['billing_account_attributes'] = billing_account_attributes_fields;
                break;
            case 'Interpreter':
                data_to_sent['date_of_birth'] = '20/05/1987';
                data_to_sent['naati_id'] = 1234;
                let address_attributes_fields = {};
                address_attributes_fields['unit_number'] = i;
                address_attributes_fields['street_number'] = i * 2 + 1;
                address_attributes_fields['street_name'] = 'Flemington Road';
                address_attributes_fields['suburb'] = 'Flemington Road';
                address_attributes_fields['state'] = 'VIC';
                address_attributes_fields['post_code'] = 3054 + i;
                data_to_sent['address_attributes'] = address_attributes_fields;
                break;
            case 'Organisational Representative':
                data_to_sent['send_email_on_receipt_of_request'] = true;
                data_to_sent['email_confirmation_on_interpreter_allocation'] = true;
                let organisation_attributes_fields = {};
                organisation_attributes_fields['abn'] = 13878943 + i;
                organisation_attributes_fields['name'] = 'CompanyName' + (i * 2).toString();
                organisation_attributes_fields['group_email'] = 'info_group_' + (i * 2).toString();
                organisation_attributes_fields['branch_office'] = 'Melbourne ' + (i * 2).toString();
                organisation_attributes_fields['phone_number'] = 'info_group_' + (i * 2).toString();
                organisation_attributes_fields['branch_office'] = 'Melbourne ' + (i * 2).toString();
                let organisation_address_attributes_fields = {};
                organisation_address_attributes_fields['unit_number'] = i;
                organisation_address_attributes_fields['street_number'] = i * 2 + 1;
                organisation_address_attributes_fields['street_name'] = 'Flemington Road';
                organisation_address_attributes_fields['suburb'] = 'Flemington Road';
                organisation_address_attributes_fields['state'] = 'VIC';
                organisation_address_attributes_fields['post_code'] = 3054 + i;
                organisation_attributes_fields['address_attributes'] = organisation_address_attributes_fields;

                let org_billing_account_attributes_fields = {};
                org_billing_account_attributes_fields['primary_contact_first_name'] = 'MOH';
                org_billing_account_attributes_fields['primary_contact_last_name'] = 'JAY';
                org_billing_account_attributes_fields['email_address'] = 'mohjay_client ' + i * 9 + 5 + '@auslan.com.au';
                org_billing_account_attributes_fields['account_number'] = (1111111 + (i * 4)).toString();
                org_billing_account_attributes_fields['preferred_billing_method_email'] = true;
                let org_billing_address_attributes_fields = {};
                org_billing_address_attributes_fields['unit_number'] = i;
                org_billing_address_attributes_fields['street_number'] = i * 2 + 1;
                org_billing_address_attributes_fields['street_name'] = 'Flemington Road';
                org_billing_address_attributes_fields['suburb'] = 'Flemington Road';
                org_billing_address_attributes_fields['state'] = 'VIC';
                org_billing_address_attributes_fields['post_code'] = 3054 + i;
                org_billing_account_attributes_fields['address_attributes'] = org_billing_address_attributes_fields;
                organisation_attributes_fields['billing_account_attributes'] = org_billing_account_attributes_fields;
                data_to_sent['organisation_attributes'] = organisation_attributes_fields;
                break;
            default:
                break;
        }

        return data_to_sent;
    }


    function addUserToHeroku(numberOfUser: string, active: string, type: string) {
        const num_of_user = parseInt(numberOfUser, 10);
        for (let i = 0; i < num_of_user; i++) {
            let verified = false;
            if (active === 'active') {
                verified = true;
            }
            const data_to_sent = returnJSONForUser(verified, type, i);
            const command = preloadUser(data_to_sent);
            sendCommandToHeroku(command);
            sendCommandToHeroku(type + '.first.update_attributes(verified:true)');
        }
    }

    function addValidLoginUser(valid_login_user: User, type: string) {
        const verifed = true;
        const data_to_sent = returnJSONForUser(verifed, type, 1, valid_login_user);
        const command = preloadUser(data_to_sent);
        sendCommandToHeroku(command);
        sendCommandToHeroku(type.replace(/ /g, '') + '.first.update_attributes(verified:true)');
    }


    // // ================================== GIVEN PART ========================================
    Given(/^There is (.*) (.*) (.*)/, preloadANumberOfUser);
    async function preloadANumberOfUser(numberOfUser: string, active: string, type: string): Promise<void> {
        await addUserToHeroku(numberOfUser, active, type);
    }

    Given(/^A booking is created/, givenBookingCreated);

    async function givenBookingCreated(): Promise<void> {
        const mock_booking = new Object({
            'venue': 'Fed Square',
            'requested_by_first_name': 'Georgious',
            'requested_by_last_name': 'Chara',
            'nature_of_appointment': 'Medical',
            'specific_nature_of_appointment': 'Audiology',
            'contact_first_name': 'Hadrian',
            'contact_last_name': 'French',
            'contact_email': 'a@a.com',
            'contact_phone_number': '03 2342 2343',
            'deaf_persons_first_name': 'Clifford',
            'deaf_persons_last_name': 'Waz',
            'deaf_persons_mobile': '0444 555 666',
            'deaf_persons_email': 'clifford@vicdeaf.org.au',
            'deaf_persons_eaf_no': '1231 0900',
            'number_of_people_attending': 1,
            'number_of_interpreters_required': 1,
            'start_time': '2017-08-05T09: 01: 26.298+00: 00',
            'end_time': '2017-08-05T10: 01: 26.298+00: 00',
            'billing_account_attributes': {
                'primary_contact_first_name': 'Paul',
                'primary_contact_last_name': 'Biller',
                'primary_contact_email': 'a@a.com',
                'primary_contact_phone_number': '0482 232 232',
                'account_number': 'ABCD-1234',
                'preferred_billing_method_email': false,
                'external_reference': 'Curve and Sanj',
                'address_attributes': {
                    'unit_number': 'Curve Tomorrow',
                    'street_number': 'L4 West RCH',
                    'street_name': '50 Flemington Rd',
                    'suburb': 'Parkville',
                    'state': 'VIC',
                    'post_code': '3025'
                }
            },
            'address_attributes': {
                'unit_number': 'Curve Tomorrow',
                'street_number': 'L4 West RCH',
                'street_name': '50 Flemington Rd',
                'suburb': 'Parkville',
                'state': 'VIC',
                'post_code': '3025'
            },
            'parking_availability': 'None - Use the Tram',
            'bookable_id': 1,
            'bookable_type': 'Administrator'
        });
        const command = preloadBooking(mock_booking);
        sendCommandToHeroku(command);
    }

    // ================================== COMMON PART ========================================


    Given(/^I go to the website/, goToTheWebsite);
    async function goToTheWebsite(): Promise<void> {
        // await sendCommandToHeroku('Booking Officer', 'mohjay_bookingOfficer2@auslan.com.au', 'Abcd#1234',
        // 'MOH', 'JAY', '123123123', true);
        await page.navigateTo('/');
        await browser.waitForAngular();
        expect(page.getElementByCss('loginForm')).to.be.exist;
    }


    Given(/^I exist as an (.*)/, givenExistAsAValidUser);
    async function givenExistAsAValidUser(type: string): Promise<void> {
        valid_logged_in_user = returnTypeAndUser(type).user;
        await addValidLoginUser(valid_logged_in_user, type);
        await page.navigateTo('/');
        await browser.waitForAngular();
        expect(page.getElementByCss('loginForm')).to.be.exist;
    }

    Given(/^I sign in with valid (.*) credentials$/, signInWithValidCredential);
    async function signInWithValidCredential(type: string): Promise<void> {
        let el = page.getElementByName('email');
        let ps = page.getElementByName('pass');
        let lu = page.getElementByName('login_user');

        page.setValue(el, valid_logged_in_user.email);
        page.setValue(ps, valid_logged_in_user.pass);
        let click = await lu.click();
    }

    Given(/^I am on the bookings page$/, onBookingPage);
    async function onBookingPage(): Promise<void> {
        await browser.waitForAngular();
        expect(page.currentPath()).to.eventually.contain('booking-management');
    }

    Given(/^I am on my admin home screen$/, onBookinManagementScreen);
    async function onBookinManagementScreen(): Promise<void> {
        await browser.waitForAngular();
        let currPath = await page.currentPath();
        expect(currPath).to.contain('booking-management');
    }

    Given(/^I am on the mobile login screen without a hero picture$/, onLoginScreenNoHero);
    async function onLoginScreenNoHero(): Promise<void> {
        browser.driver.manage().window().setSize(360, 640);
    }

    When(/^I click on button '(.*)'$/, clickOnButton);
    async function clickOnButton(btnLabel: string): Promise<void> {
        await browser.waitForAngular();
        let btn = page.getElementByCSSandText('.button', btnLabel);
        await btn.click();
    }
});
