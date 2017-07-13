import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';

export class HomePage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    browse = () => {
        return this.navigateTo(browser.baseUrl).then(() => {
            expect(browser.getCurrentUrl()).to.eventually.contain('/');
        });
    }

    isRender = () => {
        let el = this.getElementByName('login_user');
        return browser.wait(protractor.ExpectedConditions.presenceOf(el), 30000).then(() => {
            expect(el).to.exist;
        });
    }
}
