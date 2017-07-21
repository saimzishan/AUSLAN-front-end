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
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.createBookingBtn), 30000).then(() => {
            expect(this.createBookingBtn).to.exist;
            expect(this.cancelCreateBooking).to.exist;
        });
    }
    getAuthErrorNotificationContent = () => {
        NotificationObject.getNotificationContent('Email or Password not found');
    }
    specifyAsClientOfBooking = () => {
        const clientOptionLabel = this.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
        const divClientDetails = this.getNextSibling(clientOptionLabel, 'div');
        const clientRadioGroup = this.getElementInsideByTag(divClientDetails, 'md-radio-group');
        let all_radio_btn_in_group = this.getAllByTagNameInElement(clientRadioGroup, 'md-radio-button');
        return all_radio_btn_in_group[CONSTANT.YES].click();
    }
}

