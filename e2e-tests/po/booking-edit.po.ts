import {browser} from 'protractor';
import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';
import {NotificationObject} from './notification';

const EDITABLE_FIELDS = [
    'raw_venue_address',
    'attendee_count',
    'parking_type',
    'important_notes',
    'rdcurrentUserIsContact',
    'contact_first_name',
    'contact_last_name',
    'contact_email',
    'contact_mobile'
];
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
    getSuccessNotificationContent = () => {
        return browser.sleep(2500).then(() => {
            NotificationObject.getNotificationContent('The Booking has been Updated.');
        });
    }
    checkEditableFields = () => {
        EDITABLE_FIELDS.forEach((fieldName) => {
            let ele = this.getElementByName(fieldName);
            ele.getAttribute('readonly').then(readonly => {
                expect(readonly).to.be.null;
            });
            ele.getAttribute('disabled').then(disabled => {
                expect(disabled).to.be.null;
            });
        });
    }
    checkNonEditableFields = () => {}
}
