import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';

export class BookingEditPage extends PageObject {
    verify = () => {
        return this.currentPath().then((url) => {
           let paths = url.split('/');
           let len = paths.length;
           return expect(paths[len - 1]).to.contain('edit-booking');
        });
    }
    checkValueInAllRequiredFields = () => {
        let flag = false;
        this.getAllElementByCSS('input[required]').reduce(function (acc, ele) {
            return ele.getAttribute('value').then((value) => {
                return acc && !!value;
            });
        }, true).then((condition) => {
            expect(condition).to.eq(true);
        });
        return this.getAllElementByCSS('select[required]').reduce(function (acc, ele) {
            return ele.getAttribute('value').then((value) => {
                return acc && !!value;
            });
        }, true).then((condition) => {
            return expect(condition).to.eq(true);
        });
    }
}
