import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';
import {BookingPage} from './create-booking.po';

enum BookingTableHeaders {
    None, Empty, Job, Status, State, Date, Org,
    Client, Suburb, Interpreter, 'Booking Type'
}

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
    booking = new BookingPage();

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
    selectionNotPresent = (headerTitle: string, selection: string) => {
        let headerCss = '.dropdown#' + {
            'Status': 'booking-status',
            'State': 'booking-state',
            'Type': 'booking-type',
            'userlist': 'user-roles'
        }[headerTitle];
        let el = this.getElementByCss(headerCss);
        return browser.actions().mouseMove(el).perform().then(() => {
            let listEl = this.getElementByCSSandText(headerCss + ' ul li a', selection);
            expect(listEl.isPresent()).to.eventually.false;
        });
    }
    hoverOnTableHeader = (headerTitle: string, selection: string) => {
        let headerCss = '.dropdown#' + {
            'Status': 'booking-status',
            'State': 'booking-state',
            'Type': 'booking-type',
            'userlist': 'user-roles'
        }[headerTitle];
        let el = this.getElementByCss(headerCss);
        return browser.actions().mouseMove(el).perform().then(() => {
            let listEl = this.getElementByCSSandText(headerCss + ' ul li a', selection);
            this.currentPath().then((path) => {
                browser.wait(protractor.ExpectedConditions.presenceOf(listEl), 10000).then(() => {
                    return listEl.click();
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
    showPopup = () => {
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.getElementByCss('app-popup')), 30000).then(() => {

        });
    }

    clickOnIndividualBooking = () => {
        const bookingRows = $$('tbody tr');
        return bookingRows.then((bookingR) => {
            return bookingR[0].click();
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
            return expect(countNum).to.equal(numBooking);
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
            'red': 'status-ready-to-process',
            'orange': 'status-allocated'
        }[booking_status];
        return this.getAllElementByCSS('i[class="status ' + className + '"]').count().then((cnt) => {
            expect(cnt.toString()).to.be.eq(count);
        });
    }

    bookingWithTypeExists = (count: string, booking_type: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let orgNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(10)');
        return orgNameTd.getText().then((txt) => {
            return expect(txt).to.be.eq(booking_type);
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
        return this.getFirstBookingID().then(txt => {
            let len = txt[0].length;
            return expect(len).to.be.eq(4);
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
    queryBookingByInterpreterName = (interpreterName: string) => {
        let bookingInterpreterNameInput = this.getElementByCss('form input[name=interpreter_name]');
        let bookingInterpreterNameForm = this.getParent(bookingInterpreterNameInput);
        bookingInterpreterNameInput.sendKeys(interpreterName);
        return bookingInterpreterNameForm.submit();
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

    querySearchWith = (value: string) => {
        let searchInput = this.getElementByCss('form input[name=search]');
        let searchForm = this.getParent(searchInput);
        value === 'empty' ? searchInput.click() : searchInput.sendKeys(value);;
        return searchForm.submit();
    }

    // Adds a '0' in the start if the date < 10
    private prettyDate = (date: number|string): string => {
        date = date.toString();
        return ('00' + date).slice(date.length);
    }

    filterBookingByDateRange = () => {
        let currentDate = new Date();
        let dateStart = new Date(new Date(currentDate).setDate(currentDate.getDate() + 12));
        let dateEnd = new Date(new Date(dateStart).setDate(dateStart.getDate() + 4));
        let dateFrom = {
            mm: this.prettyDate(dateStart.getMonth() + 1),
            dd: this.prettyDate(dateStart.getDate()),
            yy: dateStart.getFullYear().toString()
        };
        let dateTo = {
            mm: this.prettyDate(dateEnd.getMonth() + 1),
            dd: this.prettyDate(dateEnd.getDate()),
            yy: dateEnd.getFullYear().toString()
        };
        this.booking.setDateOnly('date_from', dateFrom);
        return this.booking.setDateOnly('date_to', dateTo);
    }

    filterBookingByCurrentDate = () => {
        let currentDate = new Date();
        let dateStart = new Date(new Date(currentDate).setDate(currentDate.getDate()));
        let todayDate= dateStart.getFullYear().toString()+"-"+(dateStart.getMonth() + 1)+"-"+"0"+dateStart.getDate().toString();
      let datefrom=this.getElementByName('date_from');
      datefrom.getAttribute('value').then((value)=> {
            return expect(value).to.be.eq(todayDate);
    });
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
        let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Client + ')');
        return clientNameTd.getText().then((txt) => {
            return expect(txt.split(' ')[0]).to.be.eq(client_name);
        });
    }
    bookingExistsWithClientLastName = (client_name: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Client + ')');
        return clientNameTd.getText().then((txt) => {
            return expect(txt.split(' ')[1]).to.be.eq(client_name);
        });
    }
    bookingExistsWithInterpreterFirstName = (interpreter_name: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(9)');
        return clientNameTd.getText().then((txt) => {
            return expect(txt.split(' ')[0]).to.be.eq(interpreter_name);
        });
    }
    bookingExistsWithInterpreterLastName = (interpreter_name: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(9)');
        return clientNameTd.getText().then((txt) => {
            return expect(txt.split(' ')[1]).to.be.eq(interpreter_name);
        });
    }
    bookingExistsWithOrgName = (org_name: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let orgNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Org + ')');
        return orgNameTd.getText().then((txt) => {
            return expect(txt).to.be.eq(org_name);
        });
    }
    bookingExistsWithSuburb = (suburb: string) => {
        let tblRows = this.getAllElementByCSS('table tbody tr');
        expect(tblRows.count()).to.eventually.be.equal(1);
        let suburbTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Suburb + ')');
        return suburbTd.getText().then((txt) => {
            return expect(txt).to.be.eq(suburb);
        });
    }
    comparisonExpectation = (firstRowText: any, lastRowText: any, isAscending: boolean) => {
        if (isAscending) {
            return expect(lastRowText > firstRowText).to.be.eq(true);
        } else {
            return expect(lastRowText < firstRowText).to.be.eq(true);
        }
    }
    compareByText = (firstEl, lastEl, isAscending) => {
        return firstEl.getText().then((firstRowText) => {
            // zzzz > any other text
            firstRowText = firstRowText === 'To be filled' ? 'zzzz' : firstRowText;
            return lastEl.getText().then((lastRowText) => {
                lastRowText = lastRowText === 'To be filled' ? 'zzzz' : lastRowText;
                return this.comparisonExpectation(firstRowText, lastRowText, isAscending);
            });
        });
    }
    compareByIconClass = (firstEl, lastEl, isAscending) => {
        return firstEl.$$('i').get(0).getAttribute('class').then((firstRowText) => {
            return lastEl.$$('i').get(0).getAttribute('class').then((lastRowText) => {
                return this.comparisonExpectation(firstRowText, lastRowText, isAscending);
            });
        });
    }
    private extractDateFrom = (rawDate: string) => {
        let startTime = rawDate.replace(
                            rawDate.slice(
                                rawDate.indexOf('-') - 1,
                                rawDate.match(/[A-Z][a-z]{2}/).index - 1
                            ), // ' - 6:50 PM '
            ''); // 4:50 PM Mon 30 Oct 17
        let matchData = startTime.match(/(\d+):(\d+)\s(AM|PM)\s[A-Z][a-z]{2}\s(\d+)\s([A-Z][a-z]{2})\s(\d+)/);
        // Match Data [1-6] represents various parts of the extracted startTime
        let hh = parseInt(matchData[1], 10),
            mm = parseInt(matchData[2], 10),
            am = matchData[3] === 'AM',
            dd = parseInt(matchData[4], 10),
            month = new Date(Date.parse(matchData[5] + ' 1, 2012')).getMonth() + 1,
            yy = parseInt(matchData[6], 10) + 2000;
        hh = am ? hh : hh + 12;
        return new Date(yy, month, dd, hh, mm);
    }
    compareByDate = (firstEl, lastEl, isAscending) => {
        let firstRowText: Date, lastRowText: Date;
        return firstEl.getText().then((rawDate1) => {
            firstRowText = this.extractDateFrom(rawDate1);
            return lastEl.getText().then((rawDate2) => {
                lastRowText = this.extractDateFrom(rawDate2);
                return this.comparisonExpectation(firstRowText, lastRowText, isAscending);
            });
        });
    }
    checkBookingOrder = (ascending: string, tableHeader: string) => {
        let firstEl = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders[tableHeader] + ')');
        let lastEl = this.getElementByCss('table tbody tr:last-child td:nth-child(' + BookingTableHeaders[tableHeader] + ')');
        let isAscending = ascending === 'ascending';

        let compareMethod = {
            Job: 'compareByText',
            Status: 'compareByIconClass', // red > green
            State: 'compareByText', // In Progress < Requested
            Date: 'compareByDate', // comparing only start times
            Org: 'compareByText', // Ted Bear > Adam Jones
            Client: 'compareByText', // John > Charles
            Suburb: 'compareByText', // Terabithia > Parkville
            Interpreter: 'compareByText' // Dragana < 'To be filled' - default text
        }[tableHeader];

        return this[compareMethod].call(BookingManagementPage, firstEl, lastEl, isAscending);
    }
}

