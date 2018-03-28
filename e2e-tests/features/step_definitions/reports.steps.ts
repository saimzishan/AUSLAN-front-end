import {expect} from '../../config/helpers/chai-imports';
import {defineSupportCode} from 'cucumber';
import {browser, protractor} from 'protractor';
import * as ReportPage from '../../po/reports.po';

const EC = protractor.ExpectedConditions;

// Adds a '0' in the start if the date < 10
const prettyDate = (date: number|string): string => {
    date = date.toString();
    return ('00' + date).slice(date.length);
}

defineSupportCode(({ Given, When, Then }) => {

    When(/^I set date_from and date_to as today's date$/, () => {
        const currentDate = Date.now();
        const fromDate = new Date(currentDate - (7 * 24 * 60 * 60 * 1000));
        const toDate = new Date(currentDate + (10 * 24 * 60 * 60 * 1000));
        const dateFrom = [
            prettyDate(fromDate.getDate()),
            prettyDate(fromDate.getMonth() + 1),
            fromDate.getFullYear().toString()
        ].join('/');
        const dateTo = [
            prettyDate(toDate.getDate()),
            prettyDate(toDate.getMonth() + 1),
            toDate.getFullYear().toString()
        ].join('/');
        ReportPage.dateFromFeild.sendKeys(dateFrom);
        return ReportPage.dateToField.sendKeys(dateTo);
    })

    Then(/^I am on the reports page$/, () => {
        expect(browser.getCurrentUrl()).to.eventually.contain(ReportPage.url);
    });
});
