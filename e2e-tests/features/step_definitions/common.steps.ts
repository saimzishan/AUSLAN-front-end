import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageObject} from '../../po/app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client, Heroku} from '../../helper';
import {OrganisationalRepresentative} from '../../../src/app/shared/model/user.entity';
import {HomePage} from '../../po/home-page.po';
import {BookingPage} from '../../po/booking-page.po';

defineSupportCode(({Given, When}) => {

    let page = new PageObject();
    let homePage = new HomePage();
    let bookingPage = new BookingPage();
    // // ================================== GIVEN PART ========================================
    Given(/^There is (.*) (.*) (.*)/, preloadANumberOfUser);
    function preloadANumberOfUser(numberOfUser: string, active: string, type: string) {
        return Heroku.createBulkUsers(numberOfUser, active, type);
    }

    Given(/^A booking is created/, givenBookingCreated);
    function givenBookingCreated() {
    }

    // ================================== COMMON PART ========================================

    Given(/^I click on my name$/, () => {
        return bookingPage.hoverOnProfile('lnkLogout');
    });


    Given(/^I click on logout$/, bookingPage.logoutClick);

    Given(/^I hover on the 'Profile'$/, () => {
        return bookingPage.hoverOnProfile('lnkSettings');
    });

    Given(/^I go to the 'User Management' list page$/, clickOnUserManagementPage);
    function clickOnUserManagementPage() {
        return page.getElementByID('lnkSettings').click().then(() => {
            expect(page.currentPath()).to.eventually.contain('user-management');
        });
    }

    Given(/^I go to the website/, homePage.browse);
    Given(/^I am shown the login screen, with picture and signup button/, homePage.didFinishedRendering);
    Given(/^I won't be logged in anymore and will be taken back to the loging screen/, homePage.didFinishedRendering);


    Given(/^I exist as an (.*)/, givenExistAsAValidUser);
    function givenExistAsAValidUser(type: string) {
    }

    Given(/^I sign in with valid (.*) credentials$/, (type: string) => {
        return homePage.signInWithValidCredential(type).then(() => {
            browser.sleep(10000);
            page.currentPath().then((currentPath) => {
                expect(currentPath).to.contain('booking-management');
            });
        });
    });


    Given(/^I sign in with invalid (.*) credentials$/, signInWithInValidCredential);
    function signInWithInValidCredential(type: string) {
        return homePage.signInWithInValidCredential(type);
    }

    Given(/^I will get an error message saying "Email or password not found"$/, homePage.getAuthErrorNotificationContent);


    Given(/^I will be shown the bookings page$/, bookingPage.verify);
    Given(/^I am on the bookings page$/, bookingPage.verify);
    Given(/^I am on my admin home screen$/, bookingPage.verify);


    Given(/^I am on a mobile$/, onMobileResolution);
    Given(/^I am on the mobile login screen without a hero picture$/, onMobileResolution);
    function onMobileResolution() {
        return browser.driver.manage().window().setSize(360, 640);
    }

    Given(/^I will be shown the booking detail page$/, isOnBookingJobDetails);
    function isOnBookingJobDetails() {
        return page.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('/booking-management/1/booking-job');
    });
    }

    Given(/^I click on booking job detail page$/, onBookingJobDetails);
    function onBookingJobDetails() {
        return page.navigateTo('/booking-management/1/booking-job');
    }

    Given(/^I am on a computer$/, onDesktopResolution);
    function onDesktopResolution() {
        return browser.driver.manage().window().setSize(1024, 768);
    }

    When(/^I click on button '(.*)'$/, clickOnButton);
    function clickOnButton(btnLabel: string) {
        return page.getElementByCSSandText('.button', btnLabel).click();
    }

    When(/^I click on BUTTON '(.*)'$/, clickOnBtn);
    function clickOnBtn(btnLabel: string) {
        return page.getButtonByText(btnLabel).click();
    }
});
