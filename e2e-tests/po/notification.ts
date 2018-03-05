import {$, browser, by, element, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {PageObject} from './app.po';

const EC = protractor.ExpectedConditions;

export class NotificationObject {
    static getNotificationContent = (message: string) => {
        const notificationTextElement = $('div.notification__text');
        return browser.wait(EC.textToBePresentInElement(notificationTextElement, message), 5000, `A notification with text '${message}' was expected but was not seen`);
    }
    static getNotificationTitle = (message) => {
        const notificationTitleElement = $('div.notification__title');
        return browser.wait(EC.textToBePresentInElement(notificationTitleElement, message), 5000, `A notification with title '${message}' was expected but was not seen`);
    }
}

