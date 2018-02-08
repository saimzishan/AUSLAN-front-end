import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {BookingPage} from './create-booking.po';

enum InterpreterTableHeaders {
    None, Empty, Id, Status, Preferred, 'First Name',
    'Last Name', Role, Lvl, Suburb, Km, 'Pay Travel'
}

export class InterpreterManagementPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */

    hoverOnInterpreterTableHeader = (headerTitle: string, selection: string) => {
        let headerCss = '.dropdown#' + {
            'Preferred': 'preferred-interpreter',
            'Lvl': 'skill-level',
            'Pay Travel (Y/N)': 'travel-pay-status'
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

    queryInterpreterByFormField = (field: string, value: string) => {
        let interpreterFormInput = this.getElementByCss('form input[name=' + field + ']');
        let interpreterNameForm = this.getParent(interpreterFormInput);
        interpreterFormInput.sendKeys(value);
        return interpreterNameForm.submit();
    }

    // showTheNumberofBooking = (num_of_booking: string, type_of_booking?: string) => {
    //     let numBooking = parseInt(num_of_booking, 10);
    //     let allTypeBooking;
    //     if (type_of_booking) {
    //         allTypeBooking = this.getAllByCSSandText('tbody tr', type_of_booking);
    //     } else {
    //         allTypeBooking = this.getAllElementByCSS('tbody tr');
    //     }
    //     return allTypeBooking.count().then((countNum) => {
    //         return expect(countNum).to.equal(numBooking);
    //     });
    // }
    //
    // bookingWithMethodExists = (count: string, bookingMethod: string) => {
    //     if (count === 'one') { count = '1'; }
    //     return this.getAllByCSSandText('tbody td', bookingMethod).count().then((cnt) => {
    //         expect(cnt.toString()).to.be.eq(count);
    //     });
    // }
    //
    // bookingWithServiceTypeExists = (count: string, serviceType: string) => {
    //     if (count === 'one') { count = '1'; }
    //     return this.getAllByCSSandText('tbody td', serviceType).count().then((cnt) => {
    //         expect(cnt.toString()).to.be.eq(count);
    //     });
    // }
    //
    // bookingWithTypeExists = (count: string, booking_type: string) => {
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     expect(tblRows.count()).to.eventually.be.least(1);
    //     let orgNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(10)');
    //     return orgNameTd.getText().then((txt) => {
    //         return expect(txt).to.be.eq(booking_type);
    //     });
    // }
    //
    // private getFirstBookingTdText = (spanCss: string) => {
    //     let table = this.getElementByID('jobs-responsive');
    //     return table.isPresent().then(res => {
    //         expect(res).to.be.true;
    //     }).then(() => {
    //         let tblRows = table.$$('tr');
    //         expect(tblRows.count()).to.eventually.be.greaterThan(0);
    //     }).then(() => {
    //         let el = table.$$('tr:first-child td.bookingID > div > span' + spanCss);
    //         return el.getText();
    //     });
    // }
    //
    // private getFirstBookingID = () => {
    //     return this.getFirstBookingTdText(':first-child');
    // }
    //
    // private getFirstBookingLinkID = () => {
    //     return this.getFirstBookingTdText('.linkId');
    // }
    //
    // atleastABookingExists = () => {
    //     return this.getFirstBookingID().then(txt => {
    //         let len = txt[0].length;
    //         return expect(len).to.be.eq(4);
    //     });
    // }
    //
    // newBookingDoesNotExists = () => {
    //     return $$('lnkNewBooking').count().then(cnt => {
    //         expect(cnt).to.be.eq(0);
    //     });
    // }
    // queryBookingWithID = () => {
    //     let bookingIdForm = this.getElementByCss('table thead tr th form');
    //     let bookingIdInput = this.getElementInsideByCSS(bookingIdForm, 'input');
    //     return this.getFirstBookingID().then((txt) => {
    //         let firstID = txt[0];
    //         this.queryIdBooking = firstID;
    //         bookingIdInput.sendKeys(firstID);
    //         return bookingIdForm.submit();
    //     });
    // }
    // queryBookingByClientName = (clientName: string) => {
    //     let bookingClientNameInput = this.getElementByCss('form input[name=client_name]');
    //     let bookingClientNameForm = this.getParent(bookingClientNameInput);
    //     bookingClientNameInput.sendKeys(clientName);
    //     return bookingClientNameForm.submit();
    // }
    // queryBookingByInterpreterName = (interpreterName: string) => {
    //     let bookingInterpreterNameInput = this.getElementByCss('form input[name=interpreter_name]');
    //     let bookingInterpreterNameForm = this.getParent(bookingInterpreterNameInput);
    //     bookingInterpreterNameInput.sendKeys(interpreterName);
    //     return bookingInterpreterNameForm.submit();
    // }
    //
    // queryBookingByOrgName = (org_name: string) => {
    //     let bookingOrgNameInput = this.getElementByCss('form input[name=organisation]');
    //     let bookingOrgNameForm = this.getParent(bookingOrgNameInput);
    //     bookingOrgNameInput.sendKeys(org_name);
    //     return bookingOrgNameForm.submit();
    // }
    // queryBookingBySuburb = (suburb: string) => {
    //     let bookingSuburbInput = this.getElementByCss('form input[name=suburb]');
    //     let bookingSuburbForm = this.getParent(bookingSuburbInput);
    //     bookingSuburbInput.sendKeys(suburb);
    //     return bookingSuburbForm.submit();
    // }
    //
    // querySearchWith = (value: string) => {
    //     let searchInput = this.getElementByCss('form input[name=search]');
    //     let searchForm = this.getParent(searchInput);
    //     value === 'empty' ? searchInput.click() : searchInput.sendKeys(value);
    //     return searchForm.submit();
    // }
    // querySearchWithEmptyDate = () => {
    //     this.getElementByName('date_from').sendKeys(protractor.Key.BACK_SPACE);
    // }
    // queryManualSearchWithFutureDate = () => {
    //     this.getElementByName('date_from').sendKeys(protractor.Key.ARROW_RIGHT,protractor.Key.ARROW_UP);
    // }
    // queryManualSearchWithCurrentDate = () => {
    //     this.getElementByName('date_from').sendKeys(protractor.Key.ARROW_RIGHT,protractor.Key.ARROW_DOWN);
    // }
    // enterPressed = () => {
    //     this.getElementByName('date_from').sendKeys(protractor.Key.ENTER);
    // }
    // emptyTheField = (elementName: string) => {
    //     this.getElementByName(elementName).clear();
    //     this.getElementByName(elementName).sendKeys('x');
    //     this.getElementByName(elementName).sendKeys(protractor.Key.BACK_SPACE);
    //     this.getElementByName('auslanLogo').click();
    // }
    // clickOutSide = () => {
    //     this.getElementByName('auslanLogo').click();
    // }
    // clickOnBooking = () => {
    //     return this.getElementByID('lnkBooking').click();
    // }
    // // Adds a '0' in the start if the date < 10
    // private prettyDate = (date: number|string): string => {
    //     date = date.toString();
    //     return ('00' + date).slice(date.length);
    // }
    //
    // filterBookingByDateRange = () => {
    //     let currentDate = new Date();
    //     let dateStart = new Date(new Date(currentDate).setDate(currentDate.getDate() + 12));
    //     let dateEnd = new Date(new Date(dateStart).setDate(dateStart.getDate() + 4));
    //     let dateFrom = {
    //         dd: this.prettyDate(dateStart.getDate()),
    //         mm: this.prettyDate(dateStart.getMonth() + 1),
    //         yy: dateStart.getFullYear().toString()
    //     };
    //     let dateTo = {
    //         dd: this.prettyDate(dateEnd.getDate()),
    //         mm: this.prettyDate(dateEnd.getMonth() + 1),
    //         yy: dateEnd.getFullYear().toString()
    //     };
    //     this.booking.setDateOnly('date_from', dateFrom);
    //     return this.booking.setDateOnly('date_to', dateTo);
    // }
    //
    // filterBookingByCurrentDate = () => {
    //     let today = new Date();
    //     let todayDate = {
    //         dd: this.prettyDate(today.getDate()),
    //         mm: this.prettyDate(today.getMonth() + 1), //January is 0!
    //         yy: today.getFullYear().toString()
    //     };
    //     let datefrom = this.getElementByName('date_from');
    //     datefrom.getAttribute('value').then((value)=> {
    //     return expect(value).to.be.eq(todayDate.yy + '-' + todayDate.mm + '-' + todayDate.dd);
    // });
    // }
    //
    // bookingExistsWithId = () => {
    //     let queriedID = this.queryIdBooking;
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     return this.getFirstBookingID().then(txt => {
    //         expect(tblRows.count()).to.eventually.be.least(1);
    //         return expect(queriedID).to.be.eq(txt[0]);
    //     });
    // }
    // bookingExistsWithLinkId = () => {
    //     const tblRows = this.getAllElementByCSS('table tbody tr');
    //     return this.getFirstBookingLinkID().then(txt => {
    //         const isTextLinkId = txt.length > 0 && !!txt[0].match(/#\d+/);
    //         expect(tblRows.count()).to.eventually.be.gte(1);
    //         return expect(isTextLinkId).to.be.true;
    //     });
    // }
    // bookingExistsWithClientName = (client_name: string) => {
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     expect(tblRows.count()).to.eventually.be.least(1);
    //     let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Client + ')');
    //     return clientNameTd.getText().then((txt) => {
    //         return expect(txt.split(' ')[0]).to.be.eq(client_name);
    //     });
    // }
    // bookingExistsWithClientLastName = (client_name: string) => {
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     expect(tblRows.count()).to.eventually.be.least(1);
    //     let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Client + ')');
    //     return clientNameTd.getText().then((txt) => {
    //         return expect(txt.split(' ')[1]).to.be.eq(client_name);
    //     });
    // }
    // bookingExistsWithInterpreterFirstName = (interpreter_name: string) => {
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     expect(tblRows.count()).to.eventually.be.least(1);
    //     let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(9)');
    //     return clientNameTd.getText().then((txt) => {
    //         return expect(txt).to.be.eq(interpreter_name);
    //     });
    // }
    // bookingExistsWithInterpreterLastName = (interpreter_name: string) => {
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     expect(tblRows.count()).to.eventually.be.least(1);
    //     let clientNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(9)');
    //     return clientNameTd.getText().then((txt) => {
    //         return expect(txt).to.be.eq(interpreter_name);
    //     });
    // }
    // bookingExistsWithOrgName = (org_name: string) => {
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     expect(tblRows.count()).to.eventually.be.least(1);
    //     let orgNameTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Org + ')');
    //     return orgNameTd.getText().then((txt) => {
    //         return expect(txt).to.be.eq(org_name);
    //     });
    // }
    // bookingExistsWithSuburb = (suburb: string) => {
    //     let tblRows = this.getAllElementByCSS('table tbody tr');
    //     expect(tblRows.count()).to.eventually.be.least(1);
    //     let suburbTd = this.getElementByCss('table tbody tr:first-child td:nth-child(' + BookingTableHeaders.Suburb + ')');
    //     return suburbTd.getText().then((txt) => {
    //         return expect(txt).to.be.eq(suburb);
    //     });
    // }
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
    checkInterpreterOrder = (ascending: string, tableHeader: string) => {
        let firstEl = this.getElementByCss('table tbody tr:first-child td:nth-child(' + InterpreterTableHeaders[tableHeader] + ')');
        let lastEl = this.getElementByCss('table tbody tr:last-child td:nth-child(' + InterpreterTableHeaders[tableHeader] + ')');
        let isAscending = ascending === 'ascending';

        let compareMethod = {
            Job: 'compareByText',
            Status: 'compareByIconClass', // red > green
            State: 'compareByText', // In Progress < Requested
            Date: 'compareByDate', // comparing only start times
            Org: 'compareByText', // Ted Bear > Adam Jones
            Client: 'compareByText', // John > Charles
            Suburb: 'compareByText', // Terabithia > Parkville
            Interpreter: 'compareByText', // Dragana < 'To be filled' - default text
            Nature: 'compareByText', // Dragana < 'To be filled' - default text
            Method: 'compareByText', // Dragana < 'To be filled' - default text
            'Service Type': 'compareByText' // Dragana < 'To be filled' - default text
        }[tableHeader];

        return this[compareMethod].call(InterpreterManagementPage, firstEl, lastEl, isAscending);
    }
}

