import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';
import {NotificationObject} from './notification';

export class UserPasswordPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    currPassword;
    newPassword;
    confirmPassword;
    saveButton;
    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('secure_pass');

        });
    }

    didFinishedRendering = () => {
        this.currPassword = this.getElementByID('curr_pass');
        this.newPassword = this.getElementByID('pass');
        this.confirmPassword = this.getElementByID('certainPassword');
        this.saveButton = this.getButtonByText('SAVE');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.saveButton), 30000).then(() => {
            expect(this.currPassword).to.exist;
            expect(this.newPassword).to.exist;
            expect(this.confirmPassword).to.exist;
        });
    }

    getNotificationContent = (notificationMessage: string) => {
        return NotificationObject.getNotificationContent(notificationMessage);
    }

    enterCurrentPassword = (currPassword: string) => {
        return this.setValue(this.currPassword, currPassword);
    }

    enterNewPassword = (newPassword: string) => {
        return this.setValue(this.newPassword, newPassword);
    }

    enterConfirmPassword = (confirmPassword: string) => {
        return this.setValue(this.confirmPassword, confirmPassword);
    }
}

