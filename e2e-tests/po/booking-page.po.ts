import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';

export class BookingPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    logoutLink;
    profileLink;
    verify = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('booking-management');
            // this.didFinishedRendering();
        });
    }

    logoutClick = () => {
        return this.getElementByID('lnkLogout').click();
    }

    hoverOnProfile = (insideElementCss) => {
        let el = this.getElementByID('lnkProfile');
        return browser.actions().mouseMove(el).perform().then(() => {
            let elm = this.getElementByID(insideElementCss);
            this.currentPath().then((path) => {
                browser.wait(protractor.ExpectedConditions.presenceOf(elm), 5000).then(() => {
                    expect(elm).to.be.exist;
                });
            });
        });
    }

    clickOnProfile = () => {
        return this.getElementByID('lnkProfile').click();
    }

    didFinishedRendering = () => {
        this.logoutLink = this.getElementByName('lnkLogout');
        this.profileLink = this.getElementByName('lnkProfile');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.logoutLink), 30000).then(() => {
            expect(this.logoutLink).to.exist;
            expect(this.profileLink).to.exist;
        });
    }

    getAuthErrorNotificationContent = () => {
        let elm = $('div.sn-content');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
            expect(elm.getText()).to.eventually.contain('Email or Password not found');
        });
    }
}

