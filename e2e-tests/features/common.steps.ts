import { expect } from '../config/helpers/chai-imports';
// import * from 'chai';
// import {} from 'jasmine';
import { defineSupportCode } from 'cucumber';
import { browser, by, element, $, $$ } from 'protractor';
import { PageHelper } from '../app.po';
import { User } from '../app.user';
import { Administrator } from '../app.admin';
import { Organisation } from '../app.org';
import { Client } from '../app.client';
import { Interpreter } from '../app.interpreter';
import { BookingOfficer } from '../app.bookofficer';
import {bufferWhen} from 'rxjs/operator/bufferWhen';
import {OrganisationalRepresentative} from '../../src/app/shared/model/user.entity';
import {main} from '@angular/compiler-cli/src/main';

defineSupportCode(({Given, When}) => {

  let page = new PageHelper();

  let valid_logged_in_user = new User('', '', '', '', '');

  // let nauman_admin = new Administrator('admin@auslan.com.au', 'Abcd#1234');

  function puts(error, stdout, stderr) { console.log(stdout); }

  function sendCommandToHeroku(command) {
    const exec = require('child_process').execSync;
    exec('echo \'' + command + '; exit\' | heroku run console --app auslan-e2e-testing', puts);
  }

  function preloadUser(data) {
    // return_command += 'a = ' + userType + '.create({email: "' + email + '", password: "' + password + '", ' +
    //     'first_name: "' + firstname + '", last_name: "' + lastname + '", ' +
    //     'mobile: "' + mobile;

    let return_command = '';
    let userType = user_type(data.type);

    // delete the key type
    delete data.type;
    // const user_json = json_for_user(data);

    return_command += 'a = ' + userType + '.create(' + JSON.stringify(data);

    // finish the command
    return_command += ');';

    // if verified
    if (data.verified) {
      return_command += ' a.verified = true;';
    }
    return_command += ' a.save';

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
    valid_user.mobile_num = '123123123';
    return { type: chosen_type, user: valid_user };
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
    let mobileNum = '123123123';
    console.log(email);

    if (typeof user !== 'undefined') {
      email = user.email;
      password = user.pass;
      firstName = user.first_name;
      lastName = user.last_name;
      mobileNum = user.mobile_num;
    }

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
        data_to_sent['date_of_birth'] = '20/05/1987';
        data_to_sent['naati_id'] = 'ABC-' + (123 + i * 7).toString();
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
    console.log(num_of_user);
    for (let i = 0; i < num_of_user; i++) {
      let verified = false;
      if (active === 'active') {
        verified = true;
      }
      const data_to_sent = returnJSONForUser(verified, type, i);
      const command = preloadUser(data_to_sent);
      sendCommandToHeroku(command);
    }
  }

  function addValidLoginUser(valid_login_user: User, type: string) {
    const verifed = true;
    const data_to_sent = returnJSONForUser(verifed, type, 1, valid_login_user);
    const command = preloadUser(data_to_sent);
    sendCommandToHeroku(command);
    // switch (type) {
    //     case 'Interpreter':
    //         sendCommandToHeroku(type, valid_login_user.email, valid_login_user.pass,
    // 'MOH', 'JAY', '123123123', true, true, true, '20/05/1987');
    //         break;
    //     case 'Client':
    //         sendCommandToHeroku(type, valid_login_user.email, valid_login_user.pass,
    // 'MOH', 'JAY', '123123123', true, true, true, '');
    //         break;
    //     default:
    //         sendCommandToHeroku(type, valid_login_user.email, valid_login_user.pass, 'MOH', 'JAY', '123123123', true);
    //         break;
    // }
  }

  // // ================================== GIVEN PART ========================================
  Given(/^There is (.*) (.*) (.*)/, preloadANumberOfUser);
  async function preloadANumberOfUser(numberOfUser: string, active: string, type: string): Promise<void> {
    await addUserToHeroku(numberOfUser, active, type);
  }

  // ================================== COMMON PART ========================================
  Given(/^A booking is created/, givenBookingCreated);

  async function givenBookingCreated(): Promise<void> {
    const booking_ = {};
    const command = preloadUser(booking_);
    sendCommandToHeroku(command);
  }

  Given(/^I exist as an (.*)/, givenExistAsAValidUser);
  async function givenExistAsAValidUser(type: string): Promise<void> {
    // await sendCommandToHeroku('Booking Officer', 'mohjay_bookingOfficer2@auslan.com.au', 'Abcd#1234',
    // 'MOH', 'JAY', '123123123', true);
    valid_logged_in_user = returnTypeAndUser(type).user;
    await addValidLoginUser(valid_logged_in_user, type);
    await page.navigateTo('/');
    await browser.waitForAngular();
    expect(page.getElementByCss('loginForm')).to.be.exist;
  }

  Given(/^I go to the website/, goToTheWebsite);
  async function goToTheWebsite(): Promise<void> {
    // await sendCommandToHeroku('Booking Officer', 'mohjay_bookingOfficer2@auslan.com.au', 'Abcd#1234',
    // 'MOH', 'JAY', '123123123', true);
    await page.navigateTo('/');
    await browser.waitForAngular();
    expect(page.getElementByCss('loginForm')).to.be.exist;
  }

  Given(/^I sign in with valid (.*) credentials$/, signInWithValidCredential);
  async function signInWithValidCredential(type: string): Promise<void> {
    let el = page.getElementByName('email');
    let ps = page.getElementByName('pass');
    let lu = page.getElementByName('login_user');

    // page.setValue(el, 'nauman+support@curvetomorrow.com.au');
    // page.setValue(ps, 'Abcd#1234');
    page.setValue(el, valid_logged_in_user.email);
    page.setValue(ps, valid_logged_in_user.pass);

    // let click = await lu.click().then( () => {
    //     // expect(page.currentPath()).toContain('dashboard');
    //     // console.log('Signing In');
    //     // // expect(page.currentPath());
    //     // browser.driver.sleep(2000);
    //     // expect(page.currentPath()).to.eventually.contain('dashboard');
    // });
    let click = await lu.click();
  }

  Given(/^I am on the bookings page$/, onBookinManagementScreen);
  Given(/^I am on my admin home screen$/, onBookinManagementScreen);
  async function onBookinManagementScreen(): Promise<void> {
    // isLoaded();
    // console.log(page.currentPath());
    // await browser.driver.sleep(2000); // waiting for the elements to be loaded
    // console.log('It is here!');
    await browser.waitForAngular();
    let currPath = await page.currentPath();
    expect(currPath).to.contain('booking-management');
  }


  //    MOBILE
  Given(/^I use mobile phone$/, useMobilePhone);
  async function useMobilePhone(): Promise<void> {
    browser.manage().window().setSize(600, 800);
  }

  Given(/^I am on the mobile login screen without a hero picture$/, onLoginScreenNoHero);
  async function onLoginScreenNoHero(): Promise<void> {
    let aside = $('aside');
    await aside.getSize().then((size) => {
      expect(size.width).to.eql(600);
      expect(size.height).to.eql(800);
    });
  }

  When(/^I click on button '(.*)'$/, clickOnButton);
  async function clickOnButton(btnLabel: string): Promise<void> {
    await browser.waitForAngular();
    let btn = page.getElementByCSSandText('.button', btnLabel);
    await btn.click();
  }
});