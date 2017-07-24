import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {CONSTANT, User} from '../helper';
import {NotificationObject} from './notification';

export class BookingJobPage extends PageObject {
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
    browse = () => {
        return this.currentPath().then((currentPath) => {
            // this.didFinishedRendering();
            expect(currentPath).to.contain('booking-job');
        });
    }

    checkListofInterpreterIndividualBookingScreen = (num_of_user: string, verified: string) => {
        const interpreterRows = $$('section[id=invited-interpreters] tbody tr');
        const interpereter_num = interpreterRows.count().then( (val) => {
            return val;
        });
        return expect(interpereter_num).to.eql(parseInt(num_of_user, 10));
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
        return bookingRows.count().then( (rowCount) => {
            if (rowCount > 1) {
                let one_row = bookingRows[0];
                return one_row.click();
            }
        });
    }

    getAuthErrorNotificationContent = () => {
        let elm = $('div.sn-content');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
            expect(elm.getText()).to.eventually.contain('Email or Password not found');
        });
    }
}

