import {expect} from '../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageHelper} from '../app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client, Heroku} from '../helper';
import {OrganisationalRepresentative} from '../../src/app/shared/model/user.entity';

defineSupportCode(({Given, When}) => {

    let page = new PageHelper();

    let currentlyLoggedInUser;
    // // ================================== GIVEN PART ========================================
    Given(/^There is (.*) (.*) (.*)/, preloadANumberOfUser);
    async function preloadANumberOfUser(numberOfUser: string, active: string, type: string): Promise<void> {
        await Heroku.createBulkUsers(numberOfUser, active, type);
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
        const command = Heroku.createSingleBooking(mock_booking);
        Heroku.sendCommandToHeroku(command);
    }

    // ================================== COMMON PART ========================================

    Given(/^I click on my name$/, hoverOnProfile);
    async function hoverOnProfile(): Promise<void> {

        let el = page.getElementByID('lnkProfile');
        await browser.actions().mouseMove(el).perform();
        let elm = $('lnkLogout');
        browser.wait(protractor.ExpectedConditions.presenceOf(elm), 15000);
        expect(elm).to.be.exist;

    }

    Given(/^I click on logout$/, logoutClick);
    async function logoutClick(): Promise<void> {
        await page.getElementByID('lnkLogout').click();
    }

    Given(/^I hover on the 'Profile'$/, hoverOnProfileAsAdmin);
    async function hoverOnProfileAsAdmin(): Promise<void> {
        await hoverOnProfile();
        expect(page.getElementByID('lnkSettings')).to.be.exist;
    }

    Given(/^I go to the 'User Management' list page$/, clickOnUserManagementPage);
    async function clickOnUserManagementPage(): Promise<void> {
        page.getElementByID('lnkSettings').click().then(() => {
            expect(page.currentPath()).to.eventually.contain('user-management');
        });
    }

    Given(/^I go to the website/, goToTheWebsite);
    async function goToTheWebsite(): Promise<void> {
        await page.navigateTo(browser.baseUrl);
        // Cannot believe this workaround
        // https://stackoverflow.com/questions/35938841/window-angular-is-undefined-when-using-protractor-for-automated-testing
        await loginScreenLoaded();


    }

    Given(/^I am shown the login screen, with picture and signup button/, loginScreenLoaded);
    Given(/^I won't be logged in anymore and will be taken back to the loging screen/, loginScreenLoaded);
    async function loginScreenLoaded(): Promise<void> {
        let el = page.getElementByName('login_user');
        let el1 = page.getElementByCss('loginForm');
        browser.wait(protractor.ExpectedConditions.presenceOf(el), 10000);
        browser.wait(protractor.ExpectedConditions.presenceOf(el1), 10000);
        expect(el1).to.be.exist;
        expect(el).to.be.exist;
        el.getAttribute('disabled').then(function (value) {
            expect(value).to.exist;
        });
    }

    Given(/^I exist as an (.*)/, givenExistAsAValidUser);
    async function givenExistAsAValidUser(type: string): Promise<void> {
        currentlyLoggedInUser = User.returnTypeAndUser(type).user;
            await Heroku.addValidLoginUser(currentlyLoggedInUser, type);
        expect(currentlyLoggedInUser).to.not.null;
    }

    Given(/^I sign in with valid (.*) credentials$/, signInWithValidCredential);
    async function signInWithValidCredential(type: string): Promise<void> {
        await tryLogin(currentlyLoggedInUser.email, currentlyLoggedInUser.pass);

    }

    Given(/^I sign in with invalid (.*) credentials$/, signInWithInValidCredential);
    async function signInWithInValidCredential(type: string): Promise<void> {
        await tryLogin(currentlyLoggedInUser.email, 'ABCD#1234');
    }

    Given(/^I will get an error message saying "Email or password not found"$/, getErrorNotification);
    async function getErrorNotification(): Promise<void> {
        let elm = $('div.sn-content');
        browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000);
        expect(elm.getText()).to.eventually.contain('Email or Password not found');
    }

    async function tryLogin(email, pass): Promise<void> {
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
    async function onBookinManagementScreen(): Promise<void> {
        let path = await page.currentPath();
        expect(path).to.contain('booking-management');
    }

    Given(/^I am on the mobile login screen without a hero picture$/, onMobileResolution);
    async function onMobileResolution(): Promise<void> {
        browser.driver.manage().window().setSize(360, 640);
    }

    Given(/^I am on a computer$/, onDesktopResolution);
    async function onDesktopResolution(): Promise<void> {
        browser.driver.manage().window().maximize();
    }

    When(/^I click on button '(.*)'$/, clickOnButton);
    async function clickOnButton(btnLabel: string): Promise<void> {
        let btn = page.getElementByCSSandText('.button', btnLabel);
        await btn.click();
    }
});
