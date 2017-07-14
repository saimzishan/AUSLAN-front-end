import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';

export class HomePage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    loginUserBtn;
    emailField;
    passField;
    browse = () => {
        return this.navigateTo(browser.baseUrl).then(() => {
            expect(browser.getCurrentUrl()).to.eventually.contain('/');
        });
    }

    didFinishedRendering = () => {
        this.loginUserBtn = this.getElementByName('login_user');
        this.emailField = this.getElementByName('email');
        this.passField = this.getElementByName('pass');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.loginUserBtn), 30000).then(() => {
            expect(this.loginUserBtn).to.exist;
            expect(this.emailField).to.exist;
            expect(this.passField).to.exist;
        });
    }

    getAuthErrorNotificationContent = () => {
        let elm = $('div.sn-content');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 10000).then(() => {
            expect(elm.getText()).to.eventually.contain('Email or Password not found');
        });
    }

    signInWithValidCredential = (type: string) => {

        let currentlyLoggedInUser = User.returnTypeAndUser(type).user;
        this.setValue(this.emailField, currentlyLoggedInUser.email);
        this.setValue(this.passField, currentlyLoggedInUser.pass);
        return this.loginUserBtn.click();

    }

    signInWithInValidCredential = (type: string) => {

        let currentlyLoggedInUser = User.returnTypeAndUser(type).user;


        this.setValue(this.emailField, currentlyLoggedInUser.email);
        this.setValue(this.passField, 'ABCD#1234');

        return this.loginUserBtn.click();

    }
}

