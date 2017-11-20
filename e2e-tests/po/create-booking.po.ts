import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {CONSTANT, Booking} from '../helper';
import {NotificationObject} from './notification';

interface TestDateFormat {
    mm: string;
    dd: string;
    yy: string;
}

export class BookingPage extends PageObject {
    list_of_object = {};
    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            return expect(currentPath).to.contain('create-booking');
        });
    }

    didFinishedRendering = () => {
        expect(this.getElementByName('btnCreateBooking').isPresent()).to.eventually.be.true;
        return expect(this.getElementByName('btnCancelBooking').isPresent()).to.eventually.be.true;
    }

    getSuccessNotificationForBulkUploadContent = () => {
        return browser.sleep(2500).then(() => {
            NotificationObject.getNotificationContent('The Bookings in your bulk upload file have been created.');
        });
    }

    getErrorNotificationContentForBulkUpload = (message: string) => {
        return NotificationObject.getNotificationContent(message);
    }

    getSuccessNotificationContent = () => {
        return browser.sleep(2500).then(() => {
            NotificationObject.getNotificationContent('The Booking has been created.');
        });
    }

    clickOnSave = () => {
        return this.getElementByName('btnCreateBooking').click();
    }

    clickOnCancel = () => {
        return this.getElementByName('btnCancelBooking').click();
    }

    clickOnButton = (type: string) => {
        if (type === 'SAVE') {
            return this.clickOnSave();
        } else {
            return this.clickOnCancel();
        }
    }

    clickOnDropDown = (label_text: string) => {
        const selected_label = this.getElementByCSSandText('label', label_text);
        const div = this.getParent(selected_label);
        const select_dropdown = this.getElementInsideByTag(div, 'select');
        return select_dropdown.click();
    }
    optionExistsInDropDown = (option_text: string, dropdown_name: string) => {
        let sel = this.getElementByName(dropdown_name);
        return sel.element(by.cssContainingText('option', option_text)).isPresent().then(val => {
            expect(val).to.be.eq(true);
        });
    }
    clickOnOption = (option_text: string, drop_down: string, for_type: string) => {
        const selected_label = this.getElementByCSSandText('label', drop_down);
        const div = this.getParent(selected_label);
        const option_selected = this.getElementInsideByCSSandText(div, 'option', option_text);
        this.list_of_object[for_type] = Booking.getWhatWillBeDiscussed(option_text);
        return option_selected.click();
    }

    checkTheDropDown = (label_text: string, option_text: string) => {
        const selected_label = this.getElementByCSSandText('label', label_text);
        const div = this.getParent(selected_label);
        const select_dropdown = this.getElementInsideByTag(div, 'select');
        if (option_text === 'NOTHING') {
            const selected_label_attr = select_dropdown.getAttribute('ng-reflect-model');
            let expected = false;
            if (typeof selected_label_attr !== typeof undefined && selected_label_attr !== false) {
                expected = true;
            }
            this.list_of_object['WHAT WILL BE DISCUSSED *'] = Booking.getWhatWillBeDiscussed('');
            return expect(expected).to.be.true;
        } else {
            return select_dropdown.getAttribute('ng-reflect-model').then((val) => {
                expect(val.toUpperCase()).to.equal(option_text);
            });
        }
    }

    listTheIteminDropDown = (type_of_dropdown: string, num_of_item: string) => {
        const item_num = parseInt(num_of_item, 10);
        const selected_label = this.getElementByCSSandText('label', type_of_dropdown);
        const div = this.getParent(selected_label);
        const all_option = this.getAllByTagNameInElement(div, 'option');
        return all_option.then((allOption) => {
            const expected_option_list = this.list_of_object[type_of_dropdown];
            expect(allOption.length).to.be.equal(expected_option_list.length);
        });
    }

    specifyAsClientOfBooking = () => {
        const clientRadioGroup = this.getElementByName('rdcurrentUserIsContact');
        let all_radio_btn_in_group = this.getAllByTagNameInElement(clientRadioGroup, 'md-radio-button');
        return all_radio_btn_in_group.then((all_radio) => {
            return all_radio[CONSTANT.YES].click();
        });
    }

    specifyAsHavingSepcialInstruction = () => {
        const clientRadioGroup = this.getElementByName('rdSpecialInstruction');
        let all_radio_btn_in_group = this.getAllByTagNameInElement(clientRadioGroup, 'md-radio-button');
        return all_radio_btn_in_group.then((all_radio) => {
            return all_radio[CONSTANT.YES].click();
        });
    }

    theFieldWillBePopulated = (fieldName: string, value: string) => {
        let theField = this.getElementByName(fieldName);
        return theField.getAttribute('value').then((val) => {
            expect(val).to.be.equal(value);
        });
    }

    theFieldInBookingWillHaveValue = (fieldName: string, value: string) => {
        let allTds = $$('table.custom-small-table > tbody > tr > td');
        allTds.filter((td, ind) => {
            return td.getText().then((t) => t === value);
        }).count().then((tot) => expect(tot).to.be.greaterThan(0));

    }

    populatedUserDetails = () => {
        const clientOptionLabel = this.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
        const divClientDetails = this.getNextSibling(clientOptionLabel, 'div');
        const all_input_in_div = this.getAllByTagNameInElement(divClientDetails, 'input');
        return all_input_in_div.then((inputDiv) => {
            for (let i = 0; i < inputDiv.length; i++) {
                const single_input = inputDiv[i];
                return single_input.getAttribute('value').then((val) => {
                    expect(val).to.not.equal('');
                });
            }
        });
    }

    sectionAutoPopulated = (sectionName: string) => {
        const optionLabel = this.getElementByCSSandText('.text-center', sectionName);
        const divDetails = this.getNextSibling(optionLabel, 'div');
        const all_input_in_div = this.getAllByTagNameInElement(divDetails, 'input');
        return all_input_in_div.each(function (single_input, index) {
            return single_input.getAttribute('value').then((val) => {

                return single_input.getAttribute('name').then((nam) => {
                    if (['ext_ref_num', 'deaf_person_eaf'].indexOf(nam) === -1) {
                        expect(!!val).to.be.true;
                    }

                });

            });
        });
    }

    setStartEndTime = (field: string, date: string, time: string) => {
        let elementName = {
            'start': 'dpEventDate',
            'end': 'dpEventEndTime',
            'date_from': 'date_from',
            'date_to': 'date_to'
        }[field];
        this.getElementByName(elementName).sendKeys(date);
        this.getElementByName(elementName).sendKeys(protractor.Key.TAB);
        this.getElementByName(elementName).sendKeys(time);
    }
    setDateOnly = (field: string, date: TestDateFormat) => {
        this.getElementByName(field).sendKeys(date.mm);
        this.getElementByName(field).sendKeys(date.dd);
        this.getElementByName(field).sendKeys(date.yy);
    }
    createBooking = () => {
        return this.createBookingWithTimeAndInterpreter('standard', '10:15AM', '11:15AM', '2');
    }

    selectClientAsBookbable = () => {
        return this.getElementByName('booking_for').sendKeys('ted');
    }

    selectOrgRepAsBookbable = () => {
        element(by.name('rdBookingFor')).all(by.tagName('md-radio-button')).get(1).click();
        return this.getElementByName('booking_for').sendKeys('Curve');
    }

    checkTheFieldExist = (cant: string, fieldName: string) => {
        let canSee = cant !== 'can\'t';
        return expect(this.getElementByName(fieldName).isPresent()).to.eventually.be.eq(canSee);
    }
    setStreetNumber = (stNumber: string) => {
        this.setElementsValueByName('address_street_number', stNumber);
    }
    createBookingWithTimeAndInterpreter = (standard: string, startTime: string, endTime: string, interpreterNum: string) => {
        this.setStartEndTime('start', '12/12/2017', startTime);
        this.setStartEndTime('end', '12/12/2017', endTime);
        this.setStreetNumber('162');
        this.setElementsValueByName('address_street', 'Dave');
        this.setElementsValueByName('address_post_code', '3064');
        this.setElementsValueByName('address_suburb', 'Parkville');
        this.setElementsValueByName('address_state', 'VIC'); // dropdown

        this.getElementByName('attendee_count').sendKeys('1');
        this.getElementByName('interpreters_count').clear();
        this.getElementByName('interpreters_count').sendKeys(interpreterNum);

        this.getElementByName('nature_of_appointment').sendKeys('COURT');
        this.getElementByName('specific_nature_of_appointment').sendKeys('DHS ORDER');

        this.getElementByName('raw_booking_requested_by').sendKeys('Luke');
        this.getElementByName('raw_booking_requested_by_ln').sendKeys('Orange');

        // this.getElementByName('ext_ref_num').sendKeys('321');

        this.getElementByName('cn_first_name').sendKeys('John');
        this.getElementByName('cn_last_name').sendKeys('Travolta');
        this.getElementByName('cn_email').sendKeys('jt@star.com.au');
        this.getElementByName('cn_phone').sendKeys('0490394512');

        this.getElementByName('deaf_person_eaf').sendKeys('123');
    }

    clickCreateBtn = () => {
        return this.getElementByName('btnCreateBooking').click();
    }

    setTime = (field: string, days: number, hours: number) => {
        // add logic for business days
        // this is a quick fix, improve this
        // TODO: refactor this to use a standard method
        let dayOfTheWeek = new Date(Date.now()).getDay();
        if (dayOfTheWeek >= 4) {
            days = 5 - dayOfTheWeek;
        }
        let date = new Date(Date.now() + (1000 * 60 * 60 * (Number(hours) || 0)) + (1000 * 60 * 60 * 24 * (days || 0)));
        let dd = ('0' + date.getDate()).slice(-2);
        let mm = ('0' + (date.getMonth() + 1)).slice(-2);
        let yy = date.getFullYear();
        let hh = Number(14 + Number(hours)); // date.getHours();
        let dateString = [mm, dd, yy].join('/');
        let timeString = hh.toString() + ':00PM';
        this.setStartEndTime(field, dateString, timeString);
    }
}
