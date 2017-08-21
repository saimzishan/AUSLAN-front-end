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
import * as path from 'path';

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

    Given(/^There exists an? (.*)/, Heroku.createFactory);
    Given(/^I click on my name$/, () => {
        return bookingManagementPage.hoverOnProfile('lnkLogout');
    });
    Given(/^I scroll to top$/, () => {
        return browser.executeScript('window.scrollTo(0,0);').then(function () {
            browser.sleep(1000);
        });
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
    Given(/^I exist as an (.*)/, function (type: string) {
        return browser.sleep(2000);
    });
    Given(/^I sign in with valid (.*) credentials$/, (type: string) => {
        return homePage.signInWithValidCredential(type).then(() => {
            browser.sleep(7000).then(() => {
                bookingManagementPage.onBookingListPage();
            });
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
    Given(/^I fill New Booking form fields correctly with (.*) time from (.*) to (.*) with (.*) interpreters$/,
        bookingPage.createBookingWithTimeAndInterpreter);


    Given(/^I am on a mobile$/, onMobileResolution);

    function onMobileResolution() {
        return browser.driver.manage().window().setSize(420, 768);
    }

    Given(/^I will see attachment '(.*)'$/, verifyAttachment);

    function verifyAttachment(attachmentName: string) {
        return element(by.partialButtonText(attachmentName)).isPresent().then((elm) => {
            expect(elm).to.exist;
        });
    }

    Given(/^I will upload a document '(.*)'$/, documentUpload);

    function documentUpload(documentName: string) {
        let fileToUpload = '../data/' + documentName;
        let p = path.resolve(__dirname, fileToUpload);
        let elm = element(by.css('input[type="file"]'));
        return elm.sendKeys(p);
    }

    Given(/^I will close the file upload$/, documentUploadClose);

    function documentUploadClose() {
        /* let elm = element(by.css('input[type="file"]'));
         return elm.click().then(el => {
         return elm.sendKeys(protractor.Key.ESCAPE);
         });

         return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
         */
    }

    Given(/^I will be shown the booking detail page with id (.*)$/, bookingJob.isOnBookingJobDetails);
    Given(/^I will be shown a valid booking detail page$/, bookingJob.isOnValidBookingJobDetails);
    Given(/^I can see the valid header in booking detail page$/, bookingJob.isValidBookingHeader);
    Given(/^I can see the booking state '(.*)' in booking detail page$/, bookingJob.isBookingStateText);
    Given(/^I can see the booking state '(.*)' in booking job page$/, bookingJob.isBookingJOBStateText);
    Given(/^I will be shown the booking job page$/, bookingJob.browse);
    Given(/^I click on booking job detail page$/, bookingJob.onBookingJobDetails);
    Given(/^I get a valid '(.*)' notification for state$/, bookingJob.getSuccessNotificationContentForState);
    Given(/^I get a valid invite notification$/, bookingJob.getSuccessNotificationContentForInvite);
    Given(/^I select (.*) Interpreter$/, bookingJob.selectInterpreters);
    Given(/^I see (\d+) interpreter has accepted the booking$/, bookingJob.bookingAccepted);
    Given(/^I am on a computer$/, onDesktopResolution);

    function onDesktopResolution() {
        /*return browser.driver.manage().window().setSize(1400, 900).then( () => {

         browser.driver.manage().window().maximize();
         });
         */
    }

    When(/^I debug$/, () => {
        return browser.pause();
    });
    When(/^I refresh/, () => {
        return browser.refresh();
    });
    When(/^I click on button '(.*)'$/, clickOnButton);

    function clickOnButton(btnLabel: string) {
        return page.getElementByCSSandText('.button', btnLabel).click();
    }

    When(/^I click on button with css '(.*)'$/, clickOnButtonWithCSS);

    function clickOnButtonWithCSS(css: string) {
        return page.getElementByCss(css).click();
    }

    When(/^I can see the booking state '(.*)'$/, bookingJob.confirmBookingState);


    When(/^I can see the button '(.*)' is (.*)$/, isButtonDisabled);

    function isButtonDisabled(btnLabel: string, disabled: string) {
        let isEnabled = disabled.toLowerCase() === 'enabled';
        return page.getElementByCSSandText('.button', btnLabel).isEnabled().then((val) => {
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

    When(/^I can see the button with css '(.*)' is (.*)$/, isButtonWithCSSDisabled);

    function isButtonWithCSSDisabled(css: string, disabled: string) {
        let isEnabled = disabled.toLowerCase() === 'enabled';
        return page.getElementByCss(css).isEnabled().then((val) => {
            expect(val).to.be.eq(isEnabled);
        });
    }

    When(/^I can see the button state with css '(.*)' is (.*)$/, isButtonWithCSSVisible);

    function isButtonWithCSSVisible(css: string, visible: string) {
        let isDisplayed = visible.toLowerCase() === 'visible';
        return browser.sleep(1000).then(() => {
            page.getElementByCss(css).isPresent().then(val => {
                expect(val).to.be.eq(isDisplayed);
            });
        });
    }

    When(/^I click on BUTTON '(.*)'$/, clickOnBtn);

    function clickOnBtn(btnLabel: string) {
        return page.getButtonByText(btnLabel).click();
    }

    When(/^I click on BUTTON name '(.*)'$/, clickOnBtnByName);

    function clickOnBtnByName(btnName: string) {
        return page.getElementByName(btnName).click();
    }

    When(/^I click on checkbox name '(.*)'$/, clickOnCBByName);

    function clickOnCBByName(btnName: string) {
        return page.getElementByName(btnName).click();
    }

    When(/^I verify that the link with name '(.*)' href is '(.*)'$/, (linkName: string, linkUrl: string) => {
        let link = page.getElementByName(linkName);
        return link.getAttribute('href').then((v) => {
            expect(v).to.be.eq(linkUrl);

        });
    });

    When(/^I move to element name '(.*)'$/, moveToElementByName);

    function moveToElementByName(btnName: string) {
        return browser.actions().mouseMove(page.getElementByName(btnName)).perform();
    }

    When(/^I verify checkbox name '(.*)' and is checked '(.*)'$/, verifyOnCBByName);

    function verifyOnCBByName(btnName: string, checkedState: string) {
        let bVal = ((checkedState === 'True') || (checkedState === 'true')) ?
            true : false;
        return page.getElementByName(btnName).isSelected().then(val => {
            expect(val).to.be.eq(bVal);
        });
    }

    Given(/^I wait for (.*) milli-seconds/, (seconds: string) => {
        return browser.sleep(parseInt(seconds, 10));
    });

    Given(/^I fill the field '(.*)' with value '(.*)'/, fillCorrectlyField);

    function fillCorrectlyField(lblString: string, value: string) {
        let input = page.getElementByName(lblString);
        expect(input).to.exist;
        input.clear();
        return page.setValue(input, value);
    }

    Given(/^I jump to '(.*)' element$/, toNextElement);

    function toNextElement(element_tag: string) {
        return page.getElementByName(element_tag).click();
    }

    Given(/^(.*) belongs to (.*)/, (entity: string, dependant: string) => {
        Heroku.assignEntityToDependant(entity, dependant);
    });

    Given(/^I click on Bookings$/, clickOnBookings);

    function clickOnBookings() {
        return page.getElementByID('lnkBooking').click();
    }

    Given(/^I will be shown a popup message$/, showPopup);

    function showPopup() {
        return browser.wait(protractor.ExpectedConditions.presenceOf(page.getElementByCss('app-popup')), 30000).then(() => {
        });
    }

    Given(/^I will be shown a popup message '(.*)'$/, showPopupWithMessage);

    function showPopupWithMessage(message) {
        return browser.wait(protractor.ExpectedConditions.presenceOf(page.getElementByCss('app-popup')), 30000).then(() => {
            let elm = page.getElementByCss('main > div > p');
            expect(elm.getText()).to.be.eventually.eq(message);
        });
    }

    Given(/^I am shown a validation error$/, showValidationError);

    function showValidationError() {
        let errs = page.getAll('.inline-icon.error');
        return errs.count().then((count) => {
            // expect(count).to.be.greaterThan(0);
            expect(count).to.be.greaterThan(0);
        });
    }

    Given(/^I am shown a validation error with the text '(.*)'$/, showValidationErrorWithText);

    function showValidationErrorWithText(errText: string) {
        // browser.explore();
        let errs = page.getAll('.inline-icon.error');
        return errs.count().then((count) => {
            // expect(count).to.be.greaterThan(0);
            expect(count).to.be.greaterThan(0);
        });
    }
});
