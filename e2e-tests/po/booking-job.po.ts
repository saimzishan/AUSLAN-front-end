import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {CONSTANT, User} from '../helper';
import {NotificationObject} from './notification';

export class BookingJobPage extends PageObject {
    createBookingBtn;
    cancelCreateBooking;
    verify = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('booking-job');
            this.didFinishedRendering();
        });
    }
    didFinishedRendering = () => {
        this.createBookingBtn = this.getElementByID('job-details-responsive');
        this.cancelCreateBooking = this.getElementByName('btnCancelCreateBooking');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.createBookingBtn), 30000).then(() => {
            expect(this.createBookingBtn).to.exist;
            expect(this.cancelCreateBooking).to.exist;
        });
    }
    getAuthErrorNotificationContent = () => {
        NotificationObject.getNotificationContent('Email or Password not found');
    }
}

