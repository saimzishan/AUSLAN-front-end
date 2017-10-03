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
    queryIdBooking = '';

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
    hoverOnTableHeader = (headerTitle: string, selection: string) => {
        let headerId = {
            'Status': 'booking-status',
            'State': 'booking-state'
        }[headerTitle];
        let el = this.getElementByCss('.dropdown#' + headerId);
        return browser.actions().mouseMove(el).perform().then(() => {
            let listEl = this.getElementInsideByCSSandText(el, 'ul li a', selection);
            return listEl.click();
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
    //
    // clickOnBookings = () => {
    //     return this.getElementByID('lnkBooking').click();
    // }
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

    showTheNumberofBooking = (num_of_booking: string, type_of_booking?: string) => {
        let numBooking = parseInt(num_of_booking, 10);
        let allTypeBooking;
        if (type_of_booking) {
            allTypeBooking = this.getAllByCSSandText('tbody tr', type_of_booking);
        } else {
            allTypeBooking = this.getAllElementByCSS('tbody tr');
        }
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

    bookingWithStateExists = (count: string, booking_state: string) => {
        if (count === 'one') { count = '1'; }
        return this.getAllByCSSandText('tbody td', booking_state).count().then((cnt) => {
            expect(cnt.toString()).to.be.eq(count);
        });
    }

    noBookingWithStateExists = (booking_state: string) => {
        return this.getAllByCSSandText('tbody td', booking_state).count().then((cnt) => {
            expect(cnt).not.to.be.greaterThan(0);
        });
    }

    noBookingExists = () => {
        return this.getAll('tbody td').count().then((cnt) => {
            expect(cnt).not.to.be.greaterThan(0);
        });
    }

    bookingWithStatusExists = (count: string, booking_status: string) => {
        if (count === 'one') { count = '1'; }
        let className = {
            'green': 'icon-check-green',
            'red': 'status-allocated',
            'orange': 'status-ready-to-process'
        }[booking_status];
        return this.getAllElementByCSS('i[class="status ' + className + '"]').count().then((cnt) => {
            expect(cnt.toString()).to.be.eq(count);
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

    private getFirstBookingID = () => {
        let table = this.getElementByID('jobs-responsive');
        return table.isPresent().then(res => {
            expect(res).to.be.true;
        }).then(() => {
            let tblRows = table.$$('tr');
            expect(tblRows.count()).to.eventually.be.greaterThan(0);
        }).then(() => {
            let el = table.$$('tr:first-child td.bookingID > div > span');
            return el.getText();
        });
    }

    atleastABookingExists = () => {
        this.getFirstBookingID().then(txt => {
            let len = txt[0].length;
            expect(len).to.be.eq(4);
        });
    }

    newBookingDoesNotExists = () => {
        return $$('lnkNewBooking').count().then(cnt => {
            expect(cnt).to.be.eq(0);
        });
    }
    queryBookingWithID = () => {
        let bookingIdForm = this.getElementByCss('table thead tr th form');
        let bookingIdInput = this.getElementInsideByCSS(bookingIdForm, 'input');
        return this.getFirstBookingID().then((txt) => {
            let firstID = txt[0];
            this.queryIdBooking = firstID;
            bookingIdInput.sendKeys(firstID);
            return bookingIdForm.submit();
        });
    }
    queryBookingByClientName = (clientName: string) => {
        let bookingClientNameInput = this.getElementByCss('form input[name=client_name]');
        let bookingClientNameForm = this.getParent(bookingClientNameInput);
        bookingClientNameInput.sendKeys(clientName);
        return bookingClientNameForm.submit();
    }
    queryBookingByOrgName = (org_name: string) => {
        let bookingOrgNameInput = this.getElementByCss('form input[name=organisation]');
        let bookingOrgNameForm = this.getParent(bookingOrgNameInput);
        bookingOrgNameInput.sendKeys(org_name);
        return bookingOrgNameForm.submit();
    }
    queryBookingBySuburb = (suburb: string) => {
        let bookingSuburbInput = this.getElementByCss('form input[name=suburb]');
        let bookingSuburbForm = this.getParent(bookingSuburbInput);
        bookingSuburbInput.sendKeys(suburb);
        return bookingSuburbForm.submit();
    }
    bookingExistsWithId = () => {
        let queriedID = this.queryIdBooking;
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        return this.getFirstBookingID().then((txt) => {
            return expect(queriedID).to.be.eq(txt[0]);
        });
    }
    bookingExistsWithClientName = (client_name: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(7)');
        return clientNameTd.getText().then((txt) => {
            return expect(txt.split(' ')[0]).to.be.eq(client_name);
        });
    }
    bookingExistsWithOrgName = (org_name: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let orgNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(6)');
        return orgNameTd.getText().then((txt) => {
            return expect(txt).to.be.eq(org_name);
        });
    }
    bookingExistsWithSuburb = (suburb: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let suburbTd = this.getElementByCss('table tbody tr:first-child td:nth-child(8)');
        return suburbTd.getText().then((txt) => {
            return expect(txt).to.be.eq(suburb);
        });
    }
}

