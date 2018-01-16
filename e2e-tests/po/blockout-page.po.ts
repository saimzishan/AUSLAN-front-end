import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';
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

}

