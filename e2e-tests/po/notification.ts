import {$, browser, by, element, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {PageObject} from './app.po';

export class NotificationObject {
    static getNotificationContent = (message) => {
        /*
        let elm = element(by.cssContainingText('notification__text', message));
        return browser.sleep(1000).then( () => {
            element.all(by.tagName('div')).each(function(element, index) {
                // Will print 0 First, 1 Second, 2 Third.
                element.getAttribute('class').then(function (text) {
                    console.log(index, text);
                });
            });

        });*/
        return browser.wait(protractor.ExpectedConditions.presenceOf($('div.notification__text')), 10000).then(() => {
            return expect($('div.notification__text').getText()).to.eventually.contain(message);
        });

    }
    static getNotificationTitle = (message) => {
       return browser.wait(protractor.ExpectedConditions.presenceOf($('div.notification__title')), 10000).then(() => {
            return expect($('div.notification__title').getText()).to.eventually.contain(message);
        });

    }
}

