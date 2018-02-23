import {PageObject} from './app.po';
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
    browse = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('block_out');

        });
    }

    browseStaff = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('staff-availability');

        });
    }

    didFinishedRendering = () => {
        this.saveBtn = this.getButtonByText('SAVE');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.saveBtn), 30000).then(() => {
            expect(this.saveBtn).to.exist;
        });
    }
    enterBlockoutName = (blockout_name: string) => {

        let input_field = this.getElementByName('blockout_name');
        input_field.clear();
        return this.setValue(input_field, blockout_name);
    }
    checkEndTimeAgainstStartTime = () => {
        let startTime = this.getElementByCss('input[name="dpEventDate_st"]');
        let today = new Date();
        today.setDate(today.getDate() + 5);
        const currentDate = [
            Heroku.prettyDate(today.getDate()),
            Heroku.prettyDate(today.getMonth() + 1), // January is 0!,
            today.getFullYear().toString()
        ].join('/');
        startTime.clear();
        startTime.sendKeys(currentDate + ' 06:25 AM'); 
        let endTime = this.getElementByCss('input[name="dpEventDate_endtime"]');
        this.clickOutSide();
        return endTime.getAttribute('value').then((val) => {
            expect(val).to.be.eq('07:25 AM');
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

