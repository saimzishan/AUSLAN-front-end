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
    logoutLink;
    profileLink;
    verify = () => {
        return this.currentPath().then((currentPath) => {
            // this.didFinishedRendering();
            expect(currentPath).to.contain('booking-management');
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
        this.logoutLink = this.getElementByName('lnkLogout');
        this.profileLink = this.getElementByName('lnkProfile');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.logoutLink), 30000).then(() => {
            expect(this.logoutLink).to.exist;
            expect(this.profileLink).to.exist;
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

    clickOnNewBooking = () => {
        return this.getElementByID('lnkNewBooking').click();
    }

    showPopup = () => {
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.getElementByCss('app-popup')), 30000).then(() => {

        });
    }

    clickOnIndividualBooking = () => {
        const bookingRows = $$('tbody tr');
        return bookingRows.then( (bookingR) => {
            // if (bookingR.length > 1) {
            return bookingR[0].click();
            // }
        });
    }

    showTheNumberofBooking = (num_of_booking: string, type_of_booking: string) => {
        let numBooking = parseInt(num_of_booking, 10);
        let allTypeBooking = this.getAllByCSSandText('tbody td',  type_of_booking);
        return allTypeBooking.count().then( (countNum) => {
            expect(countNum).to.equal(numBooking);
        });
    }

    clickAtOneofTheBooking = (pos: string, num_of_booking: string, type_of_booking: string) => {
        let numBooking = parseInt(num_of_booking, 10);
        let posth = parseInt(pos, 10);
        let allTypeBooking = this.getAllByCSSandText('tbody td',  type_of_booking);
        return allTypeBooking.then( (allBooking) => {
            const totalNumofType = allBooking.length;
            expect(posth).to.be.lessThan(totalNumofType);
            let row = this.getParent(allTypeBooking[posth - 1]);
            return row.click();
        });
    }

    showSummaryDetails = () => {
        let tblRows = $$('#jobs-responsive tbody tr');
        return tblRows.then( (tRows) => {
            expect(tRows.length).to.be.greaterThan(0);
            let span = $('#jobs-responsive tbody > tr:first-child td.bookingID > div > span');
            return span.getText().then( (txt) => {
                expect(txt).to.equal('0001');
            });
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

    // clickOnIndividualBooking = () => {
    //     const bookingRows = $$('tbody tr');
    //     return bookingRows[0].click();
    // }
}

