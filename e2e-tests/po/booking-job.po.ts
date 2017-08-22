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
    bookingID = 0;
    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('booking-job');
        });
    }

    checkListofInterpreterIndividualBookingScreen = (num_of_user: string, verified: string) => {
        const interpreterRows = $$('section[id=invited-interpreters] tbody tr');
        return interpreterRows.count().then(interpereter_num => {
            expect(interpereter_num).to.eql(parseInt(num_of_user, 10));
        });
    }

    selectInterpreters = (num_of_interpreter: string) => {
        let int_count = parseInt(num_of_interpreter, 10);
        return $$('md-checkbox').each((ef, ind) => {
            if (ind < int_count) {
                // return browser.actions().mouseMove(ef).perform().then( () => {
                // browser.driver.executeScript("arguments[0].scrollIntoView(true);", ed.getWebElement());
                    return ef.click();
                // });

            }
        });
    }

    /* TODO: Also check here interpreter name */
    bookingAccepted = (numOfInterpreters: number) => {
        return this.getAll('span.interpreter-accepted').count().then( (cnt) => {
            expect(cnt).to.be.eq(numOfInterpreters);
        });
    }

    listofInterpreterDoesNotExists = () => {
        return browser.sleep(1000).then(() => {
            this.getElementByID('invited-interpreters').isPresent().then(val => {
                expect(val).to.be.false;
            });
        });

    }

    verifyPictureOfYourself = (src: string) => {
        browser.pause();
        let elm = this.getElementByCss('div.row.with-border > span.with-avatar > img');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 30000).then(() => {
            return elm.getAttribute('src').then((val) => {
                console.log(val);
                expect(val.startsWith(src)).to.be.true;
            });
        });

    }

    didFinishedRendering = () => {
        this.unableToServeBtn = this.getElementByCSSandText('button.pink', 'Unable to Service');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.unableToServeBtn), 30000).then(() => {
            expect(this.unableToServeBtn).to.exist;
        });
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

    isOnValidBookingJobDetails = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('/#/booking-management/' +
                this.bookingID + '/job-detail');
        });
    }
    isBookingJOBStateText = (booking_state_text: string) => {
        return this.getElementByCss('#steps nav > a.active').getText().then( (txt) => {
            expect(txt.trim()).to.be.eq(booking_state_text.trim());
        });
    }

    isBookingStateText = (booking_state_text: string) => {
        return this.getElementByCss('div.job-status > span').getText().then( (txt) => {
            expect(txt.trim()).to.be.eq(booking_state_text.trim());
        });
    }

    getSuccessNotificationContentForState = (state: string) => {
        return browser.sleep(1000).then(() => {
            NotificationObject.getNotificationContent('The booking has been transitioned to \"' + state + '\" state');
        });
    }
    getSuccessNotificationContentForInvite  = () => {
        return browser.sleep(1500).then(() => {
            NotificationObject.getNotificationContent('The interpreters have been invited');
        });
    }
    isValidBookingHeader  = () => {
        return $('#header-mobile > h1').getText().then( (txt) => {
            expect(txt.startsWith('JOB #')).to.be.true;
            txt = txt.replace('JOB #', '');
            this.bookingID = parseInt(txt, 10);
            expect(this.bookingID).to.be.greaterThan(0);
        });
    }
    confirmBookingState = (booking_state: string) => {
        return browser.sleep(3000).then(() => {
            $('#steps > nav > a.active').getText().then(val => {
                expect(val.toLowerCase()).to.be.eq(booking_state.toLowerCase());
            });
        });
    }
}

