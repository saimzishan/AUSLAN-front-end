import {PageObject} from './app.po';
import {BookingPage} from './create-booking.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {Heroku, User} from '../helper';
import {NotificationObject} from './notification';

export class BlockoutPagePo extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    saveBtn;
    createBookingPO = new BookingPage();

    browse = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('block_out');

        });
    }

    browseStaff = () => {
        const EC = protractor.ExpectedConditions;
        return this.currentPath().then((currentPath) => {
            const urlMatchCondition = EC.or(EC.urlContains('staff-availability'), EC.urlContains('staff_calendar'))
            browser.wait(urlMatchCondition, 30000);
        });
    }
    browseMessages = () => {
        const EC = protractor.ExpectedConditions;
        return this.currentPath().then((currentPath) => {
            const urlMatchCondition = EC.or(EC.urlContains('inbox'), EC.urlContains('inbox'));
            browser.wait(urlMatchCondition, 30000);
        });
    }

    enterBlockoutName = (blockout_name: string) => {

        let input_field = this.getElementByName('blockout_name');
        input_field.clear();
        return this.setValue(input_field, blockout_name);
    }
    checkEndTimeAgainstStartTime = () => {
        let startTime = this.getElementByCss('input[name="dpEventDate_st"]');
        startTime.clear();
        startTime.sendKeys(this.createBookingPO.getDateAfterNDays(2) + ' 06:25 AM');
        let endTime = this.getElementByCss('input[name="dpEventDate_endtime"]');
        this.clickOutSide();
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('07:25 AM');
        });
    }
    chengeEndTimeAgainstStartTime = () => {
        let startTime = this.getElementByCss('input[name="dpEventDate_st"]');
        let today = new Date();
        today.setDate(today.getDate() + 7);
        const currentDate = [
            Heroku.prettyDate(today.getDate()),
            Heroku.prettyDate(today.getMonth() + 1), // January is 0!,
            today.getFullYear().toString()
        ].join('/');
        startTime.clear();
        startTime.sendKeys(currentDate + ' 08:00 PM');
        let endTime = this.getElementByCss('input[name="dpEventDate_endtime"]');
        this.clickOutSide();
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('09:00 PM');
        });
    }

    changeStartTimeWithWrongInput = (input) => {
        let startTime = this.getElementByCss('input[name="dpEventDate_st"]');

        const currentDate = input;
        startTime.clear();
        startTime.sendKeys(currentDate + ' 08:00 PM');
        this.clickOutSide();
        return startTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('');
        });
    }
    checkStartTimeShouldBe = (input) => {
        let startTime = this.getElementByCss('input[name="dpEventDate_st"]');

        const currentDate = input;
        startTime.clear();
        startTime.sendKeys(currentDate + ' 08:00 PM');
        this.clickOutSide();
        return startTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('');
        });
    }
    changeEndTimeOFBlockout = () => {
        let endTime = this.getElementByCss('input[name="dpEventDate_endtime"]');
        endTime.clear();
        endTime.sendKeys('09:25 AM');
        this.clickOutSide();
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('09:25 AM');
        });
    }
    changeEndTime = (value) => {
        let endTime = this.getElementByCss('input[name="dpEventEndTime"]');
        endTime.clear();
        endTime.sendKeys(value);
        this.clickOutSide();
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('01:02 AM');
        });
    }
    changeEndTimeWithWrongInput = (value) => {
        let endTime = this.getElementByCss('input[name="dpEventEndTime"]');
        endTime.clear();
        endTime.sendKeys(value);
        this.clickOutSide();
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('');
        });
    }
    checkEndTime = (value) => {
        let endTime = this.getElementByCss('input[name="dpEventEndTime"]');
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq(value);
        });
    }

    checkEndTimeOFBlockoutAgainstStartTime = (value) => {
        let endTime = this.getElementByCss('input[name="dpEventDate_endtime"]');
        endTime.clear();
        endTime.sendKeys('10:00 PM');
        this.clickOutSide();

        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq(value);
        });
    }

    checkEndTimeOFBlockout = (value) => {
        let endTime = this.getElementByCss('input[name="dpEventDate_endtime"]');
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq(value);
        });
    }
    checkValuOFBlockoutName = (value) => {
        let endTime = this.getElementByCss('input[name="blockout_name"]');
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq(value);
        });
    }

    changeEndDateOFBlockout = () => {
        let endDate = this.getElementByCss('input[name="dpEventDate_end"]');
        endDate.clear();
        endDate.sendKeys(this.createBookingPO.getDateAfterNDays(28));
    }
    clickOutSide = () => {
        this.getElementByName('auslanLogo').click();
    }
    createBlockoutWithBookingTime = () => {
        let today = new Date();
        today.setDate(today.getDate() + 5);
        const currentDate = [
            Heroku.prettyDate(today.getMonth() + 1), // January is 0!,
            Heroku.prettyDate(today.getDate()),
            today.getFullYear().toString()
        ].join('/');


        let st_input_field = this.getElementByCss('input[name="dpEventDate_st"]');
        st_input_field.clear();
        st_input_field.sendKeys(currentDate + ' 06:26 AM'); // 23/01/2018 06:26 AM //01/23/2018 06:34 AM

        return browser.sleep(100).then( () => {
            this.getElementByName('blockout_name').click();
        });
    }
}

