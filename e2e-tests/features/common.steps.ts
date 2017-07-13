import {expect} from '../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageObject} from '../po/app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client, Heroku} from '../helper';
import {OrganisationalRepresentative} from '../../src/app/shared/model/user.entity';
import {HomePage} from '../po/home-page.po';

defineSupportCode(({Given, When}) => {

    let page = new PageObject();

    let currentlyLoggedInUser;
    // // ================================== GIVEN PART ========================================
    Given(/^There is (.*) (.*) (.*)/, preloadANumberOfUser);
    async function preloadANumberOfUser(numberOfUser: string, active: string, type: string) {
        await Heroku.createBulkUsers(numberOfUser, active, type);
    }

    Given(/^A booking is created/, givenBookingCreated);

    async function givenBookingCreated() {
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
        const command = Heroku.createSingleBooking(mock_booking);
        Heroku.sendCommandToHeroku(command);
    }

    // ================================== COMMON PART ========================================

    Given(/^I click on my name$/, hoverOnProfile);
    async function hoverOnProfile() {

        let el = page.getElementByID('lnkProfile');
        await browser.actions().mouseMove(el).perform();
        let elm = $('lnkLogout');
        browser.wait(protractor.ExpectedConditions.presenceOf(elm), 15000);
        expect(elm).to.be.exist;

    }

    Given(/^I click on logout$/, logoutClick);
    function logoutClick() {
        return page.getElementByID('lnkLogout').click();
    }

    Given(/^I hover on the 'Profile'$/, hoverOnProfileAsAdmin);
    async function hoverOnProfileAsAdmin() {
        await hoverOnProfile();
        expect(page.getElementByID('lnkSettings')).to.be.exist;
    }

    Given(/^I go to the 'User Management' list page$/, clickOnUserManagementPage);
    async function clickOnUserManagementPage() {
        page.getElementByID('lnkSettings').click().then(() => {
            expect(page.currentPath()).to.eventually.contain('user-management');
        });
    }

    Given(/^I go to the website/, new HomePage().browse);
    Given(/^I am shown the login screen, with picture and signup button/, new HomePage().isRender);
    Given(/^I won't be logged in anymore and will be taken back to the loging screen/, new HomePage().isRender);


    Given(/^I exist as an (.*)/, givenExistAsAValidUser);
    async function givenExistAsAValidUser(type: string) {
        currentlyLoggedInUser = User.returnTypeAndUser(type).user;
            await Heroku.addValidLoginUser(currentlyLoggedInUser, type);
        expect(currentlyLoggedInUser).to.not.null;
    }

    Given(/^I sign in with valid (.*) credentials$/, signInWithValidCredential);
    async function signInWithValidCredential(type: string) {
        await tryLogin(currentlyLoggedInUser.email, currentlyLoggedInUser.pass);

    }

    Given(/^I sign in with invalid (.*) credentials$/, signInWithInValidCredential);
    async function signInWithInValidCredential(type: string) {
        await tryLogin(currentlyLoggedInUser.email, 'ABCD#1234');
    }

    Given(/^I will get an error message saying "Email or password not found"$/, getErrorNotification);
    async function getErrorNotification() {
        let elm = $('div.sn-content');
        browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000);
        expect(elm.getText()).to.eventually.contain('Email or Password not found');
    }

    async function tryLogin(email, pass) {
        let el = page.getElementByName('email');
        let ps = page.getElementByName('pass');
        let lu = page.getElementByName('login_user');

        page.setValue(el, email);
        page.setValue(ps, pass);
        await lu.click();
    }

    Given(/^I will be shown the bookings page$/, onBookinManagementScreen);
    Given(/^I am on the bookings page$/, onBookinManagementScreen);
    Given(/^I am on my admin home screen$/, onBookinManagementScreen);
    async function onBookinManagementScreen() {
        let path = await page.currentPath();
        expect(path).to.contain('booking-management');
    }

    Given(/^I am on the mobile login screen without a hero picture$/, onMobileResolution);
    async function onMobileResolution() {
        browser.driver.manage().window().setSize(360, 640);
    }

    Given(/^I am on a computer$/, onDesktopResolution);
    async function onDesktopResolution() {
        browser.driver.manage().window().maximize();
    }

    When(/^I click on button '(.*)'$/, clickOnButton);
    function clickOnButton(btnLabel: string) {
       return page.getElementByCSSandText('.button', btnLabel).click();
    }
});
