import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';

export class ProfileChoosingPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    clientPic;
    orgrepPic;
    interpreterPic;

    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('register');
        });
    }

    didFinishedRendering = () => {
        this.interpreterPic = this.getElementByName('lnkInterpreter');
        this.clientPic = this.getElementByName('lnkClient');
        this.orgrepPic = this.getElementByName('lnkOrganization');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.interpreterPic), 30000).then(() => {
            expect(this.interpreterPic).to.exist;
            expect(this.clientPic).to.exist;
            expect(this.orgrepPic).to.exist;
        });
    }

    clickOnImage = (type: string) => {
        switch (type) {
            case 'Interpreter':
                return this.interpreterPic.click();
            case 'Individual Client':
                return this.clientPic.click();
            case 'Organisational Representative':
                return this.orgrepPic.click();
        }
    }
}

