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
    rowCount = 0;

    verify = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
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
                browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
                    expect(elm).to.be.exist;
                });
            });
        });
    }

    clickOnProfile = () => {
        return this.getElementByID('lnkProfile').click();
    }

    didFinishedRendering = () => {
        let el = this.getElementByID('jobs-responsive');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.getElementByID('jobs-responsive')), 10000).then(() => {
            expect(el).to.exist;
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

    clickOnBookings = () => {
        return this.getElementByID('lnkBooking').click();
    }
    showPopup = () => {
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.getElementByCss('app-popup')), 30000).then(() => {

        });
    }

    clickOnIndividualBooking = () => {
        const bookingRows = $$('tbody tr');
        return bookingRows.then((bookingR) => {
            // if (bookingR.length > 1) {
            return bookingR[0].click();
            // }
        });
    }
    clickOnIndividualBookingOfType = (booking_type: string) => {
        return this.clickAtOneofTheBooking('1', '1', booking_type);
    }

    showTheNumberofBooking = (num_of_booking: string, type_of_booking: string) => {
        let numBooking = parseInt(num_of_booking, 10);
        let allTypeBooking = this.getAllByCSSandText('tbody td', type_of_booking);
        return allTypeBooking.count().then((countNum) => {
            expect(countNum).to.equal(numBooking);
        });
    }

    clickAtOneofTheBooking = (pos: string, num_of_booking: string, booking_state: string) => {
        let posth = parseInt(pos, 10);
        let allTypeBooking = this.getAllByCSSandText('tbody td', booking_state);
        return allTypeBooking.then((allBooking) => {
            const totalNumofType = allBooking.length;
            expect(posth).not.to.be.greaterThan(totalNumofType);
        }).then(() => {
            return allTypeBooking.get(posth - 1).click();
        });
    }

    bookingWithStateExists = (booking_state: string) => {
        return this.getAllByCSSandText('tbody td', booking_state).count().then((cnt) => {
            expect(cnt).to.be.greaterThan(0);
        });
    }

    storeCurrentBookingCount = () => {
        return this.getElementByID('jobs-responsive').$$('tr').count().then(cnt => {
            this.rowCount = cnt;
        });
    }

    isCurrentBookingCountGreaterThanStoredCount = () => {
        return this.getElementByID('jobs-responsive').$$('tr').count().then(cnt => {
            expect(cnt).to.be.greaterThan(this.rowCount);
        });
    }

    atleastABookingExists = () => {
        let table = this.getElementByID('jobs-responsive');
        return table.isPresent().then(res => {
            expect(res).to.be.true;
        }).then(() => {
            let tblRows = table.$$('tr');
            expect(tblRows.count()).to.eventually.be.greaterThan(0);
        }).then(() => {
            let el = table.$$('tr:first-child td.bookingID > div > span');
            el.getText().then(txt => {
                let len = txt[0].length;
                expect(len).to.be.eq(4);
            });
        });
    }

    newBookingDoesNotExists = () => {
        return $$('lnkNewBooking').count().then(cnt => {
            expect(cnt).to.be.eq(0);
        });
    }
}

