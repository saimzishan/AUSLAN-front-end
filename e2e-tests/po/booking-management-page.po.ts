import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';

export class BookingManagementPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    verify = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('booking-management');
            this.didFinishedRendering();
        });
    }

    logoutClick = () => {
        return this.getElementByID('lnkLogout').click();
    }

    hoverOnProfile = (insideElementCss) => {
        let el = this.getElementByID('lnkProfile');
        return browser.actions().mouseMove(el).perform().then(() => {
            let elm = this.getElementByID(insideElementCss);
            this.currentPath().then((path) => {
                browser.wait(protractor.ExpectedConditions.presenceOf(elm), 5000).then(() => {
                    expect(elm).to.be.exist;
                });
            });
        });
    }

    newBookingClick = () => {
        return this.getElementByID('lnkNewBooking').click();
    }

    clickOnProfile = () => {
        return this.getElementByID('lnkProfile').click();
    }

    didFinishedRendering = () => {
        let el = this.getElementByID('jobs-responsive')
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.getElementByID('jobs-responsive')), 5000).then(() => {
            expect(el).to.exist;
        });
    }

    onBookingJobDetails = () => {
        return this.navigateTo(browser.baseUrl + '/#/booking-management/1/job-detail');
    }

    isOnBookingJobDetails = (id) => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('/booking-management/' + id + '/job-detail');
        });
    }

    onBookingListPage = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('booking-management');
        });
    }

    showSummaryDetails = () => {
        let tblRows = $$('#jobs-responsive tbody tr');
        expect(tblRows.length).to.be.greaterThan(0);
        let span = $('#jobs-responsive tbody > tr:first-child td.bookingID > div > span');
        return span.getText().then( (txt) => {
            expect(txt).to.equal('0001');
        });
    }

    getAuthErrorNotificationContent = () => {
        let elm = $('div.sn-content');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
            expect(elm.getText()).to.eventually.contain('Email or Password not found');
        });
    }
    pressButtonOnNewBookingScreen = (buttonLabel: string) => {
        return this.getButtonByText(buttonLabel).click();
    }

    clickOnIndividualBooking = () => {
        const bookingRows = $$('tbody tr');
        return bookingRows[0].click();
    }
}

