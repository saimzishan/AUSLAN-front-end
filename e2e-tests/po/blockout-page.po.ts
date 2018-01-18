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
            this.didFinishedRendering();
            expect(currentPath).to.contain('block_out');

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
    createBlockoutWithBookingTime = () => {
        let today = new Date();
        today.setDate(today.getDate() + 5);
        const currentDate = [
            today.getFullYear().toString(),
            Heroku.prettyDate(today.getMonth() + 1), // January is 0!,
            Heroku.prettyDate(today.getDate())
        ].join('-');


        let st_input_field = this.getElementByCss('input[name="dpEventDate_st"]');
        st_input_field.sendKeys(currentDate);
        st_input_field.sendKeys('06:26 AM');

        let end_input_field = this.getElementByCss('input[name="dpEventDate_endtime"]');
        return end_input_field.sendKeys('07:26 AM');
    }


}

