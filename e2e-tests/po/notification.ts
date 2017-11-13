import {$} from 'protractor';
import {expect} from '../config/helpers/chai-imports';

export class NotificationObject {
    static getNotificationContent = (message) => {
        let elm = $('div.sn-content');
        return elm.isPresent().then(() => {
            return expect(elm.getText()).to.eventually.contain(message);
        });
    }
}

