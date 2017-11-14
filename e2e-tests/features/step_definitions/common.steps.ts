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

defineSupportCode(({Given, When, Then}) => {

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
    Given(/^I exist as an? (.*)/, function (type: string) {
        return browser.sleep(2000);
    });
    Given(/^I sign in with valid (.*) credentials$/, (type: string) => {
        return homePage.signInWithValidCredential(type).then(() => {
            browser.sleep(3000).then(() => {
                bookingManagementPage.onBookingListPage();
            });
        });
    });
    Given(/^I don't see any new New Booking link/, bookingManagementPage.newBookingDoesNotExists);
    Given(/^Assigned all bookings to (.*)/, Heroku.assignExistingBooking);
    Given(/^I click on forgot my password$/, homePage.clickOnResetPassword);
    Given(/^I am at reset password page$/, resetPage.browse);
    Given(/^I enter valid (.*) email$/, resetPage.enterEmailAddress);
    Given(/^I enter invalid (.*) email$/, resetPage.enterInValidEmailAddress);
    Given(/^I press Submit$/, resetPage.pressSubmit);
    Given(/^I get a valid create booking notification$/, bookingPage.getSuccessNotificationContent);
    Given(/^I get a valid create bulk upload booking notification$/, bookingPage.getSuccessNotificationForBulkUploadContent);
    Given(/^I get an booking error notification with (.*)$/, bookingPage.getErrorNotificationContentForBulkUpload);
    Given(/^I get a valid reset password notification$/, resetPage.getSuccessNotificationContent);
    Given(/^I get an error reset password notification$/, resetPage.getErrorNotificationContent);
    Given(/^I sign in with invalid (.*) credentials$/, homePage.signInWithInValidCredential);
    Given(/^I will get an error message saying "Email or password not found"$/, homePage.getAuthErrorNotificationContent);
    Given(/^I will be shown the bookings page$/, bookingManagementPage.verify);
    Given(/^I am on the bookings page$/, bookingManagementPage.verify);
    Given(/^I am on my admin home screen$/, bookingManagementPage.verify);
    Given(/^I fill New Booking form fields correctly$/, bookingPage.createBooking);
    Given(/^I select the bookable for client$/, bookingPage.selectClientAsBookbable);
    Given(/^I select the bookable for org rep/, bookingPage.selectOrgRepAsBookbable);
    Given(/^I fill New Booking form fields correctly with (.*) time from (.*) to (.*) with (.*) interpreters$/,
        bookingPage.createBookingWithTimeAndInterpreter);


    Given(/^I am on a mobile$/, onMobileResolution);

    function onMobileResolution() {
        return browser.driver.manage().window().setSize(420, 768);
    }

    Given(/^I will see attachment '(.*)'$/, verifyAttachment);

    function verifyAttachment(attachmentName: string) {
        return element(by.cssContainingText('span',
            attachmentName)).isPresent().then((elm) => {
            expect(elm).to.be.eq(true);
        });
    }

    Given(/^I will see attachment '(.*)' is removed$/, verifyAttachmentRemoved);

    function verifyAttachmentRemoved(attachmentName: string) {
        return expect(page.getElementByCSSandText('span', attachmentName).isPresent()).to.eventually.be.false;
    }
    Given(/^I will upload a document '(.*)'$/, documentUpload);

    function documentUpload(documentName: string) {
        let fileToUpload = '../../data/' + documentName;
        let p = path.resolve(__dirname, fileToUpload);
        let elm = element(by.css('input[name="uploader"]'));
        return elm.sendKeys(p);
    }

    Given(/^I will upload a bulk upload spreadsheet '(.*)'$/, excelUpload);

    function excelUpload(documentName: string) {
        let fileToUpload = '../../data/' + documentName;
        let p = path.resolve(__dirname, fileToUpload);
        let elm = element(by.css('input[name="bulk-uploader"]'));
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
    Given(/^I see attachment '(.*)' does '(.*)'$/, bookingJob.attachmentIsPresent);

    Given(/^I am on a computer$/, onDesktopResolution);

    function onDesktopResolution() {
        /*return browser.driver.manage().window().setSize(1400, 900).then( () => {

         browser.driver.manage().window().maximize();
         });
         */
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
        return expect(page.getElementByCss('app-popup').isPresent()).to.eventually.be.true;
    }

    Given(/^I will be shown a popup message '(.*)'$/, showPopupWithMessage);

    function showPopupWithMessage(message) {
        return page.getElementByCss('app-popup').isPresent().then(() => {
            let elm = page.getElementByCss('app-popup main > div > p');
            return elm.getText().then((text) => {
                return expect(text).to.eq(message);
            });
        });
    }

    When(/^If I am shown a popup message '(.*)', I approve it$/, approveIfPopupWithMessage);

    function approveIfPopupWithMessage(message) {
        return page.getElementByCss('app-popup')
            .isPresent()
            .then((presence: boolean) => {
                if (presence) {
                    return showPopupWithMessage(message)
                        .then((popup) => {
                            if (popup) {
                                clickOnBtnByName('yesBtn');
                            }
                        });
                }
            });
    }

    When(/^If I am shown a popup, I approve it$/, approveIfPopup);

    function approveIfPopup() {
        return page.getElementByCss('app-popup')
            .isPresent()
            .then((presence: boolean) => {
                if (presence) {
                    return showPopup()
                        .then((popup) => {
                            if (popup) {
                                clickOnBtnByName('yesBtn');
                            }
                        });
                }
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

    When(/^I click on link '(.*)'$/, clickOnLink);
    function clickOnLink(label: string) {
        return page.getElementByCSSandText('a', label).click();
    }

    When(/^I click on button with css '(.*)'$/, clickOnElementWithCSS);
    When(/^I click on element with css '(.*)'$/, clickOnElementWithCSS);
    function clickOnElementWithCSS(css: string) {
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
    When(/^I can see the button state with css '(.*)' is '(.*)'$/, isButtonWithCSSVisible);
    When(/^I can see the element with css '(.*)' is '(.*)'$/, isButtonWithCSSVisible);
    function isButtonWithCSSVisible(css: string, visible: string) {
        let isDisplayed = visible.toLowerCase() === 'visible';
        return page.getElementByCss(css).isPresent().then(val => {
                expect(val).to.be.eq(isDisplayed);
        });
    }
    When(/^I can count the element with css '(.*)' to be '(.*)'$/, elementWithCSSCount);
    function elementWithCSSCount(css: string, count: string) {
        return page.getAllElementByCSS(css).count().then((cnt) => {
            expect(cnt).to.be.eq(+count);
        });
    }
    When(/^I can see the element with name '(.*)' is '(.*)'$/, isElementWithNameVisible);
    function isElementWithNameVisible(text: string, visible: string) {
        let isDisplayed = visible.toLowerCase() === 'visible';

        return page.getElementByName(text).isPresent().then(val => {
            expect(val).to.be.eq(isDisplayed);
        });
    }


    When(/^I can see the element of type '(.*)' with text '(.*)'$/, isElementWithTextVisible);
    function isElementWithTextVisible(typ: string, text: string) {
        let isDisplayed = true;

        return page.getElementByCSSandText(typ, text).isPresent().then(val => {
            expect(val).to.be.eq(isDisplayed);
            });
    }

    When(/^I click on BUTTON '(.*)'$/, clickOnBtn);

    function clickOnBtn(btnLabel: string) {
        return page.getButtonByText(btnLabel).click();
    }

    When(/^I click on BUTTON name '(.*)'$/, clickOnBtnByName);

    function clickOnBtnByName(btnName: string) {
        let btn = page.getElementByName(btnName);
        return btn.isPresent().then(presence => {
            expect(presence).to.be.true;
            btn.click();
        });
    }

    When(/^I click on checkbox name '(.*)'$/, clickOnCBByName);
    When(/^I click on element by name '(.*)'$/, clickOnCBByName);
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
        let bVal = ((checkedState === 'True') || (checkedState === 'true'));
        return page.getElementByName(btnName).isSelected().then(val => {
            expect(val).to.be.eq(bVal);
        });
    }
    When(/^I verify radiobutton name '(.*)' and is checked$/, verifyOnRBByName);
    function verifyOnRBByName(name: string) {
        let elm = page.getElementByName(name);
        return elm.isPresent().then( (v) => {
            expect(elm.getAttribute('class')).to.eventually.contain('mat-radio-checked');
        });
    }

    When(/^I click on table header '(.*)'$/, clickOnTableHeader);

    function clickOnTableHeader(text: string) {
        let el = page.getElementByCSSandText('table thead tr th > span', text);
        return el.click();
    }

    Then(/^I should not be able to navigate to '(.*)'$/, notNavigateToUrl);
    function notNavigateToUrl(path: string) {
        return page.currentPath().then(urlPart => {
            let newPath = urlPart.split('/');
            let defaultUrl = urlPart.substring(0, urlPart.indexOf('#') + 2);
            let len = newPath.length;
            newPath[len - 1] = path;
            return browser.get(newPath.join('/')).then(() => {
                return page.currentPath().then(currentUrl => {
                    return expect(currentUrl).to.equal(defaultUrl);
                });
            });
        });
    }

    Then(/^I should be able to navigate to '(.*)'$/, navigateToUrl);
    function navigateToUrl(path: string) {
        return page.currentPath().then(urlPart => {
            let newPath = urlPart.split('/');
            let len = newPath.length;
            newPath[len - 1] = path;
            return browser.get(newPath.join('/')).then(() => {
                return page.currentPath().then((currentUrl => {
                    return expect(currentUrl).to.equal(newPath.join('/'));
                }));
            });
        });
    }
});
