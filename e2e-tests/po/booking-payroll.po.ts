import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';
import {browser} from 'protractor';
import {NotificationObject} from './notification';

const FIELDS = [
    'interpreterTime_',
    'prepTime_',
    'kiloMeters_',
    'travelTime_'
];

export class BookingPayrollPage extends PageObject {
    verify = () => {
        return this.currentPath().then((url) => {
            let paths = url.split('/');
            let len = paths.length;
            return expect(paths[len - 1]).to.contain('payroll-billing');
        });
    }

    checkReadonlyFields = (interpClient: string) => {
        FIELDS.forEach((fieldName) => {
            let ele = this.getElementByCss('input[ng-reflect-name="'+fieldName+interpClient+'_0"]');;
            return ele.getAttribute('readonly').then(readonly => { 
                   return expect(readonly === 'true').to.be.true;
            });
        });
    }

    checkInputValues = (interpClient: string) => {
        FIELDS.forEach((fieldName) => {
            let ele = this.getElementByCss('input[ng-reflect-name="'+fieldName+interpClient+'_0"]');;
            return ele.getAttribute('value').then(val => { 
                   return expect(val).to.be.eq('0');
            });
        });
    }

    getSuccessNotificationContent = () => {
        return browser.sleep(1200).then(() => {
            NotificationObject.getNotificationContent('Hurray! Payroll & Billing details have been updated.');
        });
    }
}