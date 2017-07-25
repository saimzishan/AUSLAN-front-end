import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {PageObject} from '../../po/app.po';
import {User, Administrator, BookingOfficer, Interpreter, Organisation, Client, Heroku} from '../../helper';
// import {OrganisationalRepresentative} from '../../src/app/shared/model/user.entity';
import {HomePage} from '../../po/home-page.po';
import {BookingManagementPage} from '../../po/booking-management-page.po';
import {ResetPage} from '../../po/reset-page.po';
import {BookingPage} from '../../po/create-booking.po';
import {BookingJobPage} from '../../po/booking-job.po';

defineSupportCode(({Given, When}) => {

    let page = new PageObject();
    let homePage = new HomePage();
    let bookingManagementPage = new BookingManagementPage();
    let resetPage = new ResetPage();
    let bookingPage = new BookingPage();
    let bookingJob = new BookingJobPage();
    // // ================================== GIVEN PART ========================================
    Given(/^There is (.*) (.*) (.*)/, preloadANumberOfUser);
    function preloadANumberOfUser(numberOfUser: string, active: string, type: string) {
        return Heroku.createBulkUsers(numberOfUser, active, type);
    }

    Given(/^A booking is created/, givenBookingCreated);
    function givenBookingCreated() {
    }
    Given(/^I click on my name$/, () => {
        return bookingManagementPage.hoverOnProfile('lnkLogout');
    });
    Given(/^I click on logout$/, bookingManagementPage.logoutClick);
    Given(/^I hover on the 'Profile'$/, () => {
        return bookingManagementPage.hoverOnProfile('lnkSettings');
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
    Given(/^I am on the mobile login screen without a hero picture$/, homePage.didFinishedRendering);
    Given(/^I exist as an (.*)/, function (done) {
    });
    Given(/^I sign in with valid (.*) credentials$/, (type: string) => {
        return homePage.signInWithValidCredential(type).then(() => {
            bookingManagementPage.onBookingListPage();
        });
    });
    Given(/^I don't see any new New Booking link/, bookingManagementPage.newBookingDoesNotExists);

    Given(/^I click on forgot my password$/, homePage.clickOnResetPassword);
    Given(/^I am at reset password page$/, resetPage.browse);
    Given(/^I enter valid (.*) email$/, resetPage.enterEmailAddress);
    Given(/^I enter invalid (.*) email$/, resetPage.enterInValidEmailAddress);
    Given(/^I press Submit$/, resetPage.pressSubmit);
    Given(/^I get a valid create booking notification$/, bookingPage.getSuccessNotificationContent);
    Given(/^I get a valid reset password notification$/, resetPage.getSuccessNotificationContent);
    Given(/^I get an error reset password notification$/, resetPage.getErrorNotificationContent);
    Given(/^I sign in with invalid (.*) credentials$/, homePage.signInWithInValidCredential);
    Given(/^I will get an error message saying "Email or password not found"$/, homePage.getAuthErrorNotificationContent);
    Given(/^I will be shown the bookings page$/, bookingManagementPage.verify);
    Given(/^I am on the bookings page$/, bookingManagementPage.verify);
    Given(/^I am on my admin home screen$/, bookingManagementPage.verify);
    Given(/^I fill New Booking form fields correctly$/, bookingPage.createBooking);

    Given(/^I am on a mobile$/, onMobileResolution);
    function onMobileResolution() {
        return browser.driver.manage().window().setSize(360, 640);
    }
    Given(/^I will be shown the booking detail page with id (.*)$/, bookingJob.isOnBookingJobDetails);
    Given(/^I will be shown the booking job page$/, bookingJob.browse);
    Given(/^I click on booking job detail page$/, bookingJob.onBookingJobDetails);
    Given(/^I get a valid '(.*)' notification for state$/, bookingJob.getSuccessNotificationContentForState);
    Given(/^I get a valid invite notification$/, bookingJob.getSuccessNotificationContentForInvite);
    Given(/^I select (.*) Interpreter$/, bookingJob.selectInterpreters);

    Given(/^I am on a computer$/, onDesktopResolution);
    function onDesktopResolution() {
        return browser.driver.manage().window().setSize(1400, 900).then( () => {

             browser.driver.manage().window().maximize();
        });

    }
    When(/^I click on button '(.*)'$/, clickOnButton);
    function clickOnButton(btnLabel: string) {
        return page.getElementByCSSandText('.button', btnLabel).click();
    }

    When(/^I can see the booking state '(.*)'$/, bookingManagementPage.confirmBookingState);


    When(/^I can see the button '(.*)' is (.*)$/, isButtonDisabled);
    function isButtonDisabled(btnLabel: string, disabled: string) {
        let isEnabled = disabled.toLowerCase() === 'enabled';
        return page.getElementByCSSandText('.button', btnLabel).isEnabled().then( (val) => {
            expect(val).to.be.eq(isEnabled);
        });
    }

    When(/^I can see the button state '(.*)' is (.*)$/, isButtonVisible);
    function isButtonVisible(btnLabel: string, visible: string) {
        let isDisplayed = visible.toLowerCase() === 'visible';
        return browser.sleep(1000).then(() => {
            page.getElementByCSSandText('.button', btnLabel).isPresent().then(val => {
                expect(val).to.be.eq(isDisplayed);
            });
        });
    }

    When(/^I click on BUTTON '(.*)'$/, clickOnBtn);
    function clickOnBtn(btnLabel: string) {
        return page.getButtonByText(btnLabel).click();
    }

    When(/^I click on BUTTON name '(.*)'$/, clickOnBtnByName);
    function clickOnBtnByName(btnLabel: string) {
        return page.getElementByName(btnLabel).click();
    }
});
