import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {NotificationObject} from './notification';

enum BookingDetailTableHeaders {
    Job, Date, Time,
    Method, 'Service Type', Org, Suburb
}

export class BookingJobPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    bookingID = 0;
    _currentPath = '';
    private tableDetails = {};

    storePath = () =>  {
        return browser.getCurrentUrl().then((currentURL) => {
            this._currentPath = currentURL;
        });
    }
    gotoStorePath = () => {
        return this.navigateTo(this._currentPath);
    }
    gotoBasePath = () => {
        return this.navigateTo(browser.baseUrl);
    }
    browse = () => {
        return this.currentPath().then((currentPath) => {
            let EC = protractor.ExpectedConditions;
            let urlContainsBookingJob = EC.urlContains('booking-job');
            let urlContainsJobDetail = EC.urlContains('job-detail');
            return EC.or(urlContainsBookingJob, urlContainsJobDetail);
        });
    }

    checkListofInterpreterIndividualBookingScreen = (num_of_user: string, verified: string) => {
        const interpreterRows = $$('section[id=invited-interpreters] tbody tr');
        return interpreterRows.count().then(interpereter_num => {
            expect(interpereter_num).to.eql(parseInt(num_of_user, 10));
        });
    }

    checkListOfInterpretersOnBookingScreen = (num_of_user: string, verified: string) => {
        const interpreterRows = this.getAllElementByCSS('section#invited-interpreters table tbody tr');
        return interpreterRows.count().then(interpereter_num => {
            expect(interpereter_num).to.eql(parseInt(num_of_user, 10));
            interpreterRows.map((row) => {
                let cols = row.all(by.tagName('td'));
                cols.each((col, index) => {
                    if (index === 8) {
                        col.getText().then((txt) => {
                            expect(txt.trim()).to.be.eq('1.1 Km');
                        });
                    }

                    if (index === 9) {
                        col.getText().then((txt) => {
                            expect(txt.trim()).to.be.eq('No');
                        });
                    }
                });
            });
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
        return this.getAll('span.interpreter-accepted').count().then((cnt) => {
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
    attachmentIsPresent = (attachmentName, exists) => {
        let isPresent = exists.toLowerCase() === 'exists';
        return element(by.cssContainingText('a', attachmentName)).isPresent().then((elm) => {
            expect(elm).to.be.eq(isPresent);
        });
    }

    verifyPictureOfYourself = (src: string) => {
        let elm = this.getElementByCss('div.row.with-border > span.with-avatar > img');
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 30000).then(() => {
            return elm.getAttribute('src').then((val) => {
                expect(val.startsWith(src)).to.be.true;
            });
        });

    }

    verifyVersionInfo = (css_name, index, expected_text) => {
        let elm = this.getAllElementByName(css_name);

        return elm.get(index).getText().then( (txt) => {
            expect(txt).to.contain(expected_text);
         });
    }

    didFinishedRendering = () => {
        return expect(
            this.getElementByCSSandText('button.pink', 'Unable to Service')
            .isPresent()
        ).to.eventually.be.true;
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
        return this.getElementByCss('#steps nav > a.active').getText().then((txt) => {
            expect(txt.trim()).to.be.eq(booking_state_text.trim());
        });
    }

    isBookingStateText = (booking_state_text: string) => {
        booking_state_text = booking_state_text.replace(/_/g, ' ');
        return this.getElementByCss('div.job-status > span').getText().then((txt) => {
            expect(txt.trim()).to.be.eq(booking_state_text.trim());
        });
    }

    getSuccessNotificationContentForState = (state: string) => {
        return browser.sleep(1000).then(() => {
            NotificationObject.getNotificationContent('The booking has been transitioned to \"' + state + '\" state');
        });
    }
    getSuccessNotificationContentForInvite = () => {
        return browser.sleep(1500).then(() => {
            NotificationObject.getNotificationContent('The interpreters have been invited');
        });
    }
    isValidBookingHeader = () => {
        return $('#header-mobile > h1').getText().then((txt) => {
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
    errorPage = () => {
        return browser.sleep(1000).then(
            () => {
                $('div.error').isPresent().then(val => {
                    expect(val).to.be.true;
                });
            });
    }
    private getBookingDetailsForTableHeader = (tableHeader: string) => {
        let bookingDetails = this.getAllElementByCSS('table#job-details-responsive tbody tr td');
        let el = bookingDetails.get(BookingDetailTableHeaders[tableHeader]);
        return el.getText();
    }
    noteTableDetails = (tableHeader: string) => {
        return this.getBookingDetailsForTableHeader(tableHeader).then(value => {
            this.tableDetails[tableHeader] = value;
        });
    }
    checkNotedTableDetails = (tableHeader: string) => {
        return this.checkTableDetails(tableHeader, this.tableDetails[tableHeader]);
    }
    checkTableDetails = (tableHeader: string, value: string) => {
        return this.getBookingDetailsForTableHeader(tableHeader).then(elValue => {
            return expect(elValue).to.eq(value);
        });
    }
    checkLinkIdInTableDetails = (negate?: string) => {
        const bookingDetails = this.getAllElementByCSS('table#job-details-responsive tbody tr td');
        const el = bookingDetails.get(BookingDetailTableHeaders.Job);
        return el.$$('span.linkId').getText().then(linkId => {
            const isTextLinkId = linkId.length > 0 && !!linkId[0].match(/#\d+/);
            return expect(isTextLinkId).to.be.eq(!negate);
        });
    }
    checkAttachmentIcons = (negate: string) => {
        let shouldSee = !(negate === 'not');
        let bookingDetails = this.getAllElementByCSS('table#job-details-responsive tbody tr td');
        let el = bookingDetails.get(13);
        return this.getAllByCSSInElement(el, 'i.icon-attach').isPresent()
            .then(presence => {
                return expect(presence).to.be.eq(shouldSee);
            });
    }

    checkInterpreterStatus(status: string) {
        const interpreterRows = $$('section[id=invited-interpreters] table tbody tr');
        return interpreterRows.map((row) => {
            let cols = row.all(by.tagName('td'));
            cols.each((col, index) => {
                if (index === 1) {
                    if (status === 'blank') {
                        col.getText().then((txt) => {
                            expect(txt.trim()).to.be.empty;
                        });
                    } else {
                        col.element(by.css('img')).getAttribute('src').then(path => {
                            expect(path).to.include(status);
                        });
                    }
                }
            });
        });
    }
}

