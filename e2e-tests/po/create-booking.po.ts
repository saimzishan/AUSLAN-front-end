import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {CONSTANT, User} from '../helper';
import {NotificationObject} from './notification';

export class BookingPage extends PageObject {
    createBookingBtn;
    cancelCreateBooking;
    verify = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('create-booking');
            this.didFinishedRendering();
        });
    }
    didFinishedRendering = () => {
        this.createBookingBtn = this.getElementByName('btnCreateBooking');
        this.cancelCreateBooking = this.getElementByName('btnCancelCreateBooking');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.createBookingBtn), 5000).then(() => {
            expect(this.createBookingBtn).to.exist;
            expect(this.cancelCreateBooking).to.exist;
        });
    }
    getSuccessNotificationContent = () => {
        NotificationObject.getNotificationContent('The Booking has been created.');
    }
    specifyAsClientOfBooking = () => {
        const clientOptionLabel = this.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
        const divClientDetails = this.getNextSibling(clientOptionLabel, 'div');
        const clientRadioGroup = this.getElementInsideByTag(divClientDetails, 'md-radio-group');
        let all_radio_btn_in_group = this.getAllByTagNameInElement(clientRadioGroup, 'md-radio-button');
        return all_radio_btn_in_group[CONSTANT.YES].click();
    }

    createBooking = () => {
        this.getElementByName('dpEventDate').sendKeys('12/30/2017');
        this.getElementByName('dpEventDate').sendKeys(protractor.Key.TAB);
        this.getElementByName('dpEventDate').sendKeys('11:15AM');

        this.getElementByName('dpEventEndTime').sendKeys('12/30/2017');
        this.getElementByName('dpEventEndTime').sendKeys(protractor.Key.TAB);
        this.getElementByName('dpEventEndTime').sendKeys('05:15PM');


        this.setElementsValueByName('address_street_number', '162');
        this.setElementsValueByName('address_street', 'Dave');
        this.setElementsValueByName('address_post_code', '3064');
        this.setElementsValueByName('address_suburb', 'Parkville');
        this.setElementsValueByName('address_state', 'VIC'); // dropdown

        this.getElementByName('attendee_count').sendKeys('1');
        this.getElementByName('interpreters_count').sendKeys('2');

        this.getElementByName('nature_of_appointment').sendKeys('COURT');
        this.getElementByName('specific_nature_of_appointment').sendKeys('DHS ORDER');

        this.getElementByName('raw_booking_requested_by').sendKeys('Luke');
        this.getElementByName('raw_booking_requested_by_ln').sendKeys('Orange');

        // this.getElementByName('md-radio-1').click();
        // this.getElementByName('contact_first_name').sendKeys('Rema');
        // this.getElementByName( 'contact_last_name').sendKeys('Ansa');
        // this.getElementByName('email').sendKeys('rema@ansa.com.au');
        this.getElementByName('ext_ref_num').sendKeys('321');

        this.getElementByName('cn_first_name').sendKeys('John');
        this.getElementByName('cn_last_name').sendKeys('Travolta');
        this.getElementByName('cn_email').sendKeys('jt@star.com.au');
        this.getElementByName('cn_phone').sendKeys('0490394512');

        /*this.getElementByName('deaf_person_first_name').sendKeys('Tom');
        this.getElementByName('deaf_person_last_name').sendKeys('Cruise');
        this.getElementByName('deaf_person_email').sendKeys('crusing@tom.com.au');
        this.getElementByName('deaf_person_mobile').sendKeys('0490394511');
        */
        this.getElementByName('deaf_person_eaf').sendKeys('123');
        return this.getElementByName('btnCreateBooking').click();

    }
}

