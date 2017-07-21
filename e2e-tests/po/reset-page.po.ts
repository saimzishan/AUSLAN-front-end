import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';
import {NotificationObject} from './notification';

export class ResetPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    resetUserBtn;
    emailField;
    loggedInUser;
    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('reset');

        });
    }

    didFinishedRendering = () => {
        this.resetUserBtn = this.getElementByName('reset_user');
        this.emailField = this.getElementByCss('input[name="email"]');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.emailField), 30000).then(() => {
            expect(this.resetUserBtn).to.exist;
            expect(this.emailField).to.exist;

        });
    }

    getErrorNotificationContent = () => {
        return NotificationObject.getNotificationContent('The email address is not registered with us.');
    }

    getSuccessNotificationContent = () => {
        return NotificationObject.getNotificationContent('The password has been reset for '
            + this.loggedInUser.email);
    }

    enterEmailAddress= (type: string) => {
        let currentlyLoggedInUser = User.returnTypeAndUser(type).user;
        this.loggedInUser = currentlyLoggedInUser;
        return this.setValue(this.emailField, currentlyLoggedInUser.email);
    }

    enterInValidEmailAddress= (type: string) => {
        let currentlyLoggedInUser = User.returnTypeAndUser(type).user;
        this.loggedInUser = currentlyLoggedInUser;
        return this.setValue(this.emailField, 'a' + currentlyLoggedInUser.email);
    }

    pressSubmit = () => {
        return this.resetUserBtn.click();
    }
}

