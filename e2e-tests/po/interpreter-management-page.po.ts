import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {BookingPage} from './create-booking.po';

enum InterpreterTableHeaders {
    None, Empty, Status, Name, Role, Lvl, Suburb, Km
}

export class InterpreterManagementPage extends PageObject {

    hoverOnInterpreterTableHeader = (headerTitle: string, selection: string) => {
        let headerCss = '.dropdown#' + {
            'Lvl': 'skill-level',
            'Pay Travel': 'travel-pay-status'
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

    searchInterpretersWithText = (value: string) => {
        let searchInput = this.getElementByCss('form input[name=search]');
        let searchForm = this.getParent(searchInput);
        value === 'empty' ? searchInput.click() : searchInput.sendKeys(value);
        return searchForm.submit();
    }

    clickOnInterpreterTableHeader = (text: string) => {
        let el = this.getElementByCSSandText('table thead tr th > span', text);
        return el.click();
    }

    checkInterpreterTableHeaderColumn = (text: string) => {
        let el = this.getElementByCSSandText('table thead tr th > span', text);
        return el.getText().then((txt) => {
            browser.wait(protractor.ExpectedConditions.presenceOf(el), 2000).then(() => {
                return expect(txt).to.be.eq(text);
            });
        });
    }

    comparisonExpectation = (firstRowText: any, lastRowText: any, isAscending: boolean) => {
        if (firstRowText === lastRowText) {
            throw new Error('Text found to be same for first row and last row. Probably the table is not updated with latest data.');
        }
        if (isAscending) {
            return expect(lastRowText > firstRowText).to.be.eq(true);
        } else {
            return expect(lastRowText < firstRowText).to.be.eq(true);
        }
    }
    compareByText = (firstEl, lastEl, isAscending) => {
        return firstEl.getText().then((firstRowText) => {
            return lastEl.getText().then((lastRowText) => {
                return this.comparisonExpectation(firstRowText, lastRowText, isAscending);
            });
        });
    }

    checkInterpreterOrder = (ascending: string, tableHeader: string) => {
        let firstEl = this.getElementByCss('.section-left table tbody tr:first-child td:nth-child(' + InterpreterTableHeaders[tableHeader] + ')');
        let lastEl = this.getElementByCss('.section-left table tbody tr:last-child td:nth-child(' + InterpreterTableHeaders[tableHeader] + ')');
        let isAscending = ascending === 'ascending';
        let compareMethod = {
            Name: 'compareByText',
            Lvl: 'compareByText',
            Suburb: 'compareByText', // Terabithia > Parkville
            Km: 'compareByText', // 50 Km > 10 Km
        }[tableHeader];
        return this[compareMethod].call(InterpreterManagementPage, firstEl, lastEl, isAscending);
    }

    checkStaffAvailabilityTime = (fullTime) => {
        let listItem = this.getElementByCss('table.fc-list-table tbody tr.fc-list-item td.fc-list-item-time');
        return listItem.getText().then((txt) => {
            return expect(txt).to.be.eq(fullTime);
        });
    }

    clickOnAllocatedLink = () => {
        this.getElementByID('lnk-recommended-interpreters').click();
        return browser.waitForAngular();
    }
}
