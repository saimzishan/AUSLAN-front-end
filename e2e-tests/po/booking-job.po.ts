import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {CONSTANT, User} from '../helper';
import {NotificationObject} from './notification';

export class BookingJobPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    unableToServeBtn;
    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('booking-job');
        });
    }

    checkListofInterpreterIndividualBookingScreen = (num_of_user: string, verified: string) => {
        const interpreterRows = $$('section[id=invited-interpreters] tbody tr');
        return interpreterRows.count().then( interpereter_num => {
            expect(interpereter_num).to.eql(parseInt(num_of_user, 10));
        });
    }

    listofInterpreterDoesNotExists = () => {
        return browser.sleep(1000).then(() => {
            this.getElementByID('invited-interpreters').isPresent().then( val => {
            expect(val).to.be.false;
        });
    });

}

    didFinishedRendering = () => {
        this.unableToServeBtn = this.getElementByCSSandText('button.pink', 'Unable to Service');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.unableToServeBtn), 30000).then(() => {
            expect(this.unableToServeBtn).to.exist;
        });
    }


    clickOnResetPassword = () => {
        return this.getElementByName('lnkResetPass').click();
    }


    onBookingJobDetails = () => {
        return this.navigateTo(browser.baseUrl + '/#/booking-management/1/job-detail');
    }

    isOnBookingJobDetails = (id) => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('booking-management');
            expect(currentPath).to.contain('job-detail');
        });
    }

    showPopup = () => {
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.getElementByCss('app-popup')), 30000).then(() => {

        });
    }

    getAuthErrorNotificationContent = () => {
        NotificationObject.getNotificationContent('Email or Password not found');
    }
    getSuccessNotificationContentForState  = (state: string) => {
        return browser.sleep(3000).then( () => {
            NotificationObject.getNotificationContent('The booking has been transitioned to \"' + state + '\" state');
        }) ;
    }
}

