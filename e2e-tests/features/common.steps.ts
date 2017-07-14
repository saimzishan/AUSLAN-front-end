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
    function preloadANumberOfUser(numberOfUser: string, active: string, type: string) {
        return Heroku.createBulkUsers(numberOfUser, active, type);
    }

    Given(/^A booking is created/, givenBookingCreated);
    function givenBookingCreated() {
    }

    // ================================== COMMON PART ========================================

    Given(/^I click on my name$/, hoverOnProfileForLogout);
    function hoverOnProfileForLogout() {
        return hoverOnProfile('lnkLogout');
    }

    function hoverOnProfile(insideElementCss) {
        let el = page.getElementByID('lnkProfile');
        return browser.actions().mouseMove(el).perform().then(() => {
            let elm = page.getElementByID(insideElementCss);
            page.currentPath().then((path) => {
                browser.wait(protractor.ExpectedConditions.presenceOf(elm), 5000).then(() => {
                    expect(elm).to.be.exist;
                });
            });
        });
    }

    Given(/^I click on logout$/, logoutClick);
    function logoutClick() {
        return page.getElementByID('lnkLogout').click();
    }

    Given(/^I hover on the 'Profile'$/, hoverOnProfileAsAdmin);
    function hoverOnProfileAsAdmin() {
        return hoverOnProfile('lnkSettings');
    }

    Given(/^I go to the 'User Management' list page$/, clickOnUserManagementPage);
    function clickOnUserManagementPage() {
        return page.getElementByID('lnkSettings').click().then(() => {
            expect(page.currentPath()).to.eventually.contain('user-management');
        });
    }

    Given(/^I go to the website/, new HomePage().browse);
    Given(/^I am shown the login screen, with picture and signup button/, new HomePage().didFinishedRendering);
    Given(/^I won't be logged in anymore and will be taken back to the loging screen/, new HomePage().didFinishedRendering);


    Given(/^I exist as an (.*)/, givenExistAsAValidUser);
    function givenExistAsAValidUser(type: string) {
    }

    Given(/^I sign in with valid (.*) credentials$/, (type: string) => {
        return new HomePage().signInWithValidCredential(type).then(() => {
            page.currentPath().then((currentPath) => {
                expect(currentPath).to.contain('booking-management');
            });
        });
    })


    Given(/^I sign in with invalid (.*) credentials$/, signInWithInValidCredential);
    function signInWithInValidCredential(type: string) {
        return new HomePage().signInWithInValidCredential(type);
    }

    Given(/^I will get an error message saying "Email or password not found"$/, new HomePage().getAuthErrorNotificationContent);



    Given(/^I will be shown the bookings page$/, onBookinManagementScreen);
    Given(/^I am on the bookings page$/, onBookinManagementScreen);
    Given(/^I am on my admin home screen$/, onBookinManagementScreen);
    function onBookinManagementScreen() {
        return page.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('booking-management');
        });
    }

    Given(/^I am on the mobile login screen without a hero picture$/, onMobileResolution);
    function onMobileResolution() {
        return browser.driver.manage().window().setSize(360, 640);
    }

    Given(/^I am on a computer$/, onDesktopResolution);
    function onDesktopResolution() {
        return browser.driver.manage().window().maximize();
    }

    When(/^I click on button '(.*)'$/, clickOnButton);
    function clickOnButton(btnLabel: string) {
        return page.getElementByCSSandText('.button', btnLabel).click();
    }
});
