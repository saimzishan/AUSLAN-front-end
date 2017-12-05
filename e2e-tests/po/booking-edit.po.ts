import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';
import {NotificationObject} from './notification';

// Editable and Readonly is only applicable for Org Rep
// when they are editing a booking
const EDITABLE_FIELDS = [
    'raw_venue_address',
    'attendee_count',
    'parking_type',
    'important_notes',
    'rdcurrentUserIsContact',
    'email',
    'mobile',
    'deaf_person_email',
    'deaf_person_mobile',
    'ext_ref_num',
    'uploader'
];

const READONLY_FIELDS = [
    'dpEventDate',
    'dpEventEndTime',
    'interpreters_count',
    'nature_of_appointment',
    'specific_nature_of_appointment',
    'rdcurrentUserIsClient',
    'rdStandardInvoice',
    'raw_booking_requested_by',
    'raw_booking_requested_by_ln',
    'interpreters_count',
    'txtSpecialInstruction',
    'deaf_person_eaf',
    'deaf_person_name',
    'deaf_person_last_name',
    'contact_first_name',
    'contact_last_name'
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
        return NotificationObject.getNotificationContent('The Booking has been Updated.');
    }
    checkEditableFields = () => {
        EDITABLE_FIELDS.forEach((fieldName) => {
            let ele = this.getElementByName(fieldName);
            return ele.getAttribute('readonly').then(readonly => {
                return ele.getAttribute('disabled').then(disabled => {
                    expect(readonly).to.be.null;
                    return expect(disabled).to.be.null;
                });
            });
        });
    }
    checkNonEditableFields = () => {
        READONLY_FIELDS.forEach((fieldName) => {
            let ele = this.getElementByName(fieldName);
            return ele.getAttribute('readonly').then(readonly => {
                return ele.getAttribute('disabled').then(disabled => {
                    return expect(disabled === 'true' || readonly === 'true').to.be.true;
                });
            });
        });
    }
    clickOnNonEditableField = () => {
        return this.getElementByName(READONLY_FIELDS[2]).click();
    }
}
