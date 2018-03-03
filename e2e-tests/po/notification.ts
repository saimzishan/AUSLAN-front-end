import {$, browser, by, element, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {PageObject} from './app.po';

const EC = protractor.ExpectedConditions;

export class NotificationObject {
    static getNotificationContent = (message) => {
        const notificationTextElement = $('div.notification__text');
        browser.wait(EC.visibilityOf(notificationTextElement), 5000);
        expect(notificationTextElement.getText()).to.eventually.contain(message);
        // Wait for previous notification to clear
        return browser.wait(EC.invisibilityOf(notificationTextElement), 5000);
    }
    static getNotificationTitle = (message) => {
        const notificationTitleElement = $('div.notification__title');
        browser.wait(EC.visibilityOf(notificationTitleElement), 5000);
        expect(notificationTitleElement.getText()).to.eventually.contain(message);
        // Wait for previous notification to clear
        return browser.wait(EC.invisibilityOf(notificationTitleElement), 5000);
    }
}

