import {$, browser, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';

export class NotificationObject {
    static getNotificationContent = (message) => {
        let elm = $('div.sn-content');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 30000).then(() => {
            return expect(elm.getText()).to.eventually.contain(message);
        });
    }
}

