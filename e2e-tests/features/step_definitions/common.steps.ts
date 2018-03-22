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
import {BookingPayrollPage} from '../../po/booking-payroll.po';
import * as path from 'path';

defineSupportCode(({Given, When, Then}) => {

    let page = new PageObject();
    let homePage = new HomePage();
    let bookingManagementPage = new BookingManagementPage();
    let resetPage = new ResetPage();
    let bookingPage = new BookingPage();
    let bookingJob = new BookingJobPage();
    let bookingPayroll = new BookingPayrollPage();
    const EC = protractor.ExpectedConditions;
    // // ================================== GIVEN PART ========================================
    Given(/^There is (.*) (.*) (.*)/, preloadANumberOfUser);

    function preloadANumberOfUser(numberOfUser: string, active: string, type: string) {
        return Heroku.createBulkUsers(numberOfUser, active, type);
    }

    Given(/^There exists an? (.*)/, Heroku.createFactory);
    Given(/^I click on my name$/, bookingManagementPage.clickOnProfile);
    Given(/^I scroll to top$/, () => {
        return browser.executeScript('window.scrollTo(0,0);').then(function () {
            browser.sleep(1000);
        });
    });
    Given(/^I verify all Interpreters/, Heroku.verifyAllInterpreter);
    Given(/^I create the interpreter of type '(.*)'/, Heroku.createInterpreterOfType);
    Given(/^I click on logout$/, bookingManagementPage.logoutClick);
    Given(/^I hover on the 'Profile'$/, bookingManagementPage.clickOnProfile);
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
        return browser.sleep(4000);
    });
    Given(/^I sign in with valid (.*) credentials$/, (type: string) => {
        return homePage.signInWithValidCredential(type).then(() => {
            browser.sleep(4000).then(() => {
                bookingManagementPage.onBookingListPage();
            });
        });
    });
    Given(/^I am shown the verify screen/, bookingManagementPage.showVerifyPage);
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
    Given(/^I am on my dashboard screen$/, bookingManagementPage.verify);
    Given(/^I fill New Booking form fields correctly$/, bookingPage.createBooking);
    Given(/^I fill New Booking form fields with specfic time correctly$/, bookingPage.createBookingWithTime);
    Given(/^I fill New Booking form fields with specfic new time correctly$/, bookingPage.createBookingWithNewTime);
    Given(/^I fill New Booking form fields correctly with yesterday date$/, bookingPage.createBookingWithYesterdayDate);
    Given(/^I update the booking to be within 48 hours with vicdeaf$/, bookingPage.editBookingWithDayAfterTomorrowDateWith_VICDEAF_STATE);
    Given(/^I fill New Booking form fields correctly with DSQ state$/, bookingPage.editBookingWith_DSQ_STATES);
    Given(/^I fill New Booking form fields correctly with just vicdeaf$/, bookingPage.editBookingWith_VICDEAF_STATE);
    Given(/^I fill New Booking form fields with address greater than 40 kilometers$/, bookingPage.createBookingForPerth);
    Given(/^I select the bookable for client$/, bookingPage.selectClientAsBookbable);
    Given(/^I select the bookable for org rep/, bookingPage.selectOrgRepAsBookbable);
    Given(/^I fill New Booking form fields correctly with (.*) time from (.*) to (.*) with (.*) '(.*)'$/,
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
    Given(/^I select (\d+) Interpreter$/, bookingJob.selectInterpreters);
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

    Given(/^I fill the payroll field '(.*)' with value '(.*)'/, fillPayrollField);

        function fillPayrollField(lblString: string, value: string) {
            let input = page.getElementByCss('input[ng-reflect-name="' + lblString + '"]');
            expect(input).to.exist;
            input.clear();
            return page.setValue(input, value);
    }

    Given(/^I clear the payroll input field '(.*)'/, clearPayrollField);

    function clearPayrollField(fieldName: string) {
            let input = bookingPayroll.getElementByCss('input[ng-reflect-name="' + fieldName + '"]');
            expect(input).to.exist;
            input.clear();
    }

    Given(/^I can see the payroll element '(.*)' has text '(.*)'/, checkPayrollFieldText);

    function checkPayrollFieldText(fieldName: string, text: string) {
        let input = bookingPayroll.getElementByCss('input[ng-reflect-name="' + fieldName + '"]');
        return input.getAttribute('value').then(elmTxt => {
            return expect(elmTxt).to.be.eq(text);
        });
    }

    Given(/^I can see the payroll element '(.*)' has non-zero value/, checkPayrollFieldTextIsNonZero);

    function checkPayrollFieldTextIsNonZero(fieldName: string) {
        let input = bookingPayroll.getElementByCss('input[ng-reflect-name="' + fieldName + '"]');
        return input.getAttribute('value').then(elmTxt => {
            return expect(elmTxt.match(/[1-9]/)).to.be.greaterThan(0);
        });
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
        const bookingLink = page.getElementByID('lnkBooking');
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(bookingLink), 5000);
        return bookingLink.click();
    }

    Given(/^I will be shown a popup message$/, showPopup);

    function showPopup() {
        return expect(page.getElementByCss('app-popup').isPresent()).to.eventually.be.true;
    }

    Given(/^I will be shown a popup message '(.*)'$/, showPopupWithMessage);

    function showPopupWithMessage(message) {
        return page.getElementByCss('md-dialog-content').isPresent().then(() => {
            let elm = page.getElementByCss('md-dialog-content main > div > p');
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
                    let elm = page.getElementByCss('app-popup main > div > p');
                    return elm.getText().then(text => {
                        if (text === message) {
                            clickOnBtnByName('yesBtn');
                        }
                    });
                }
            });
    }

    When(/^If I am shown a popup, I approve it$/, approveIfPopup);

    function approveIfPopup() {
        let popup = page.getElementByCss('app-popup');
        return popup.isPresent().then(presence => {
            if (presence) {
                clickOnBtnByName('yesBtn');
            }
            return presence;
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
        let errs = page.getAllByCSSandText('.inline-icon.error > span', errText);
        return errs.count().then((count) => {
            // expect(count).to.be.greaterThan(0);
            expect(count).to.be.greaterThan(0);
        });
    }
    Given(/^I set a interpreter as '(.*)'$/, setInterpreterAsCasual);
    function setInterpreterAsCasual(value: string) {
        Heroku.setInterpreterType(value);
    }

    When(/^I debug$/, () => {
        return browser.pause();
    });
    When(/^I refresh/, () => {
        return browser.getCurrentUrl().then(u => browser.driver.navigate().to(u));
    });
    When(/^I click on button '(.*)'$/, clickOnButton);
    function clickOnButton(btnLabel: string) {
        return page.getElementByCSSandText('.button', btnLabel).click();
    }

    When(/^I click on link '(.*)'$/, clickOnLink);
    function clickOnLink(label: string) {
        return element(by.linkText(label)).click();
    }

    When(/^I click on button with css '(.*)'$/, clickOnElementWithCSS);
    When(/^I click on element with css '(.*)'$/, clickOnElementWithCSS);
    function clickOnElementWithCSS(css: string) {
        return page.getElementByCss(css).click();
    }
    When(/^I click on parent of '(.*)' element with css '(.*)'$/, clickOnSingleElementWithCSS);
    function clickOnSingleElementWithCSS(nth_child: number, css: string) {
        return page.getAllElementByCSS(css).get(nth_child).element(by.xpath('..')).click();
    }
    When(/^I can see the booking state '(.*)'$/, bookingJob.confirmBookingState);


    When(/^I can see the button '(.*)' is (disabled|enabled)$/, isButtonDisabled);

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
    When(/^I can see the element with name '(.*)' as (.*)$/, isElementWithNameDisabled);

    function isElementWithNameDisabled(css: string, disabled: string) {
        let isEnabled = disabled.toLowerCase() === 'enabled';
        return page.getElementByCss(css).isEnabled().then((val) => {
            expect(val).to.be.eq(isEnabled);
        });
    }
    When(/^I can see the element with css '(.*)' and text (.*)$/, isElementWithCSSAndTextPresent);
    function isElementWithCSSAndTextPresent(css: string, txt: string) {
        let elm = page.getAllByCSSandText(css, txt).first();
        browser.actions().mouseMove(elm).perform().then( () => {
            return elm.isDisplayed().then((val) => {
                expect(val).to.be.eq(true);
            });
        });
    }
    When(/^I can click the element with css '(.*)' and text (.*)$/, clickElementWithCSSAndTextPresent);
    function clickElementWithCSSAndTextPresent(css: string, txt: string) {
        let elm = page.getAllByCSSandText(css, txt).first();
        return browser.actions().mouseMove(elm).perform().then( () => {
            elm.click();
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
                return expect(cnt).to.be.eq(+count);
        });
    }
    When(/^I can count the element with css '(.*)' to be greater than '(.*)'$/, elementWithCSSCountGte);
    function elementWithCSSCountGte(css: string, count: string) {
        return page.getAllElementByCSS(css).count().then((cnt) => {
                return expect(cnt).to.be.gte(+count);
        });
    }
    When(/^I can see the element with name '(.*)' is '(.*)'$/, isElementWithNameVisible);
    function isElementWithNameVisible(text: string, visible: string) {
        let isDisplayed = visible.toLowerCase() === 'visible';

        return page.getElementByName(text).isPresent().then(val => {
            expect(val).to.be.eq(isDisplayed);
        });
    }

    When(/^I can see the button '(.*)' is '(.*)'$/, isElementActive);
    function isElementActive(btnName: string, active: string) {
        let activeVal = active.toLowerCase() === 'active' ? active.toLowerCase() : '';
        return page.getElementByName(btnName).getAttribute('ng-reflect-ng-class').then(val => {
            expect(val).to.be.eq(activeVal);
        });
    }

    When(/^I can see the (.*) with name '(.*)' has text '(.*)'$/, isElementHasText);
    function isElementHasText(elemType: string, nam: string, txt: string) {
        if (elemType === 'input') {
            return page.getElementByName(nam).getAttribute('value').then(elmTxt => {
                return expect(elmTxt).to.be.eq(txt);
            });
        } else {
            return page.getElementByName(nam).getText().then(elmTxt => {
                return expect(elmTxt).to.be.eq(txt);
            });
        }
    }
    When(/^I can see the element with id '(.*)' has text '(.*)'$/, hasElementWithIDText);
    function hasElementWithIDText(nam: string, txt: string) {

        return page.getElementByID(nam).getText().then(elmTxt => {
            return expect(elmTxt).to.be.eq(txt);
        });
    }
    When(/^I click on BUTTON '(.*)'$/, clickOnBtn);

    function clickOnBtn(btnLabel: string) {
        const button = page.getButtonByText(btnLabel);
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(button), 5000);
        return button.click();
    }

    When(/^I click on BUTTON name '(.*)'$/, clickOnBtnByName);

    function clickOnBtnByName(btnName: string) {
        let btn = page.getElementByName(btnName);
        return btn.isPresent().then(presence => {
            expect(presence).to.be.true;
            // Waits for the element to be clickable.
            browser.wait(EC.elementToBeClickable(btn), 5000).then(() => btn.click());
        });
    }

    When(/^I click on checkbox name '(.*)'$/, clickOnCBByName);
    When(/^I click on element by name '(.*)'$/, clickOnCBByName);
    function clickOnCBByName(btnName: string) {
        return page.getElementByName(btnName).click();
    }

    When(/^I click on element by id '(.*)'$/, clickOnElementById);
    function clickOnElementById(elemId: string) {
        return page.getElementByID(elemId).click();
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

    When(/^I verify checkbox name '(.*)' is checked '(.*)'$/, verifyOnCBByName);
    function verifyOnCBByName(btnName: string, checkedState: 'True' | 'true') {
        return page.getElementByName(btnName).getAttribute('ng-reflect-model').then(val => {
            return expect(val).to.be.eq(checkedState.toLowerCase());
        });
    }

    When(/^I verify material checkbox name '(.*)' is checked '(.*)'$/, verifyMaterialCB);
    function verifyMaterialCB(btnName: string, checkedState: 'True' | 'true') {
        const checkbox = page.getElementByCss('md-checkbox[ng-reflect-name="' + btnName + '"]');
        return checkbox.getAttribute('ng-reflect-model').then(val => {
            return expect(val).to.be.eq(checkedState.toLowerCase());
        });
    }

    When(/^I click on material checkbox name '(.*)'$/, clickMaterialCB);
    function clickMaterialCB(cbName: string) {
        return page.getElementByCss('md-checkbox[ng-reflect-name="' + cbName + '"]').click();
    }

    When(/^I verify radiobutton name '(.*)' and is checked$/, verifyOnRBByName);
    function verifyOnRBByName(name: string) {
        let elm = page.getElementByName(name);
        return elm.isPresent().then(presence => {
            return expect(elm.getAttribute('class')).to.eventually.contain('mat-radio-checked');
        });
    }

    When(/^I click on table header '(.*)'$/, clickOnTableHeader);

    function clickOnTableHeader(text: string) {
        let el = page.getElementByCSSandText('table thead tr th > span', text);
        return el.click();
    }

    When(/^I search for '(.*)' in autocomplete$/, bookingPage.enterSearchTermInAutocomplete);

    Then(/^I am shown (.*) as a suggestion$/, isAutocompleteSuggestionShown);
    function isAutocompleteSuggestionShown(suggestionTerm: string) {
        const suggestionElement = page.getElementByCSSandText('ul.ui-autocomplete-items.ui-autocomplete-list li span', suggestionTerm);
        return expect(suggestionElement.isPresent()).to.eventually.equal(true);
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

    Then(/^If I am shown popups, I approve all of them$/, approveAllPopups);
    function approveAllPopups() {
        return approveIfPopup().then(presence => {
            if (presence) {
                browser.sleep(1200).then(() => {
                    approveAllPopups();
                });
            }
        });
    }
    Then(/^I can see that form '(.*)' is '(.*)'$/, checkFormDisabled);
    function checkFormDisabled (name: string, disabled: string) {
        let isEnabled = disabled.toLowerCase() === 'disabled';
        let elem = page.getElementByName(name);
            return elem.getAttribute('disabled').then(disable => {
                console.log("disable"+disable+"isenable"+isEnabled);
                    return expect(disable === isEnabled.toString() || disable === null).to.be.true;
            });
    }

    Then(/^I run all background jobs$/, Heroku.runAllBackgroundTasks);
});
