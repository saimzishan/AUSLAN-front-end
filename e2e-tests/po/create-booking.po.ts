import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor, ExpectedConditions} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {CONSTANT, Booking} from '../helper';
import {NotificationObject} from './notification';

interface TestDateFormat {
    mm: string;
    dd: string;
    yy: string;
}

export class BookingPage extends PageObject {
    previousDate: Boolean = false;
    tommorowDate: Boolean = false;
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
    private getDropdownFromLabel = (label: string) => {
        const selected_label = this.getElementByCSSandText('label', label);
        const div = this.getParent(selected_label);
        return this.getElementInsideByTag(div, 'select');
    }

    clickOnDropDown = (label_text: string) => {
        const select_dropdown = this.getDropdownFromLabel(label_text);
        expect(select_dropdown.isPresent()).to.eventually.be.true;
        return select_dropdown.click();
    }
    selectOptionFromDropdown = (option: string, label: string) => {
        const dropdown = this.getDropdownFromLabel(label).click();
        return this.getElementInsideByCSSandText(dropdown, 'option', option).click();
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

    theInputInBookingFormWillHaveValue = (inputName: string, value: string) => {
        const input = this.getElementByName(inputName);
        return expect(input.getAttribute('value')).to.eventually.eq(value);
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
                    if (['ext_ref_num', 'deaf_person_eaf', 'search_address'].indexOf(nam) === -1) {
                        expect(!!val).to.be.true;
                    }

                });

            });
        });
    }

    bookingAddressPopulated = (populated: string) => {
        let condition = populated.toLowerCase() === 'auto populated';
        const optionLabel = this.getAllElementByName('bookingAddress');
        const divDetails = this.getAllByTagNameInElement(optionLabel, 'div');
        const all_input_in_div = this.getAllByTagNameInElement(divDetails, 'input');
        return all_input_in_div.each(function (single_input, index) {
            return single_input.getAttribute('name').then((name) => {
                if (name !== 'search_address') {
                    return single_input.getAttribute('value').then((val) => {
                        expect(!!val).to.be.eq(condition);
                    });
                }
            });
        });
    }

    setStartEndTime = (field: string, time: string) => {
        let elementName = {
            'start': 'dpEventDate',
            'end': 'dpEventEndTime'
        }[field];
        this.getElementByCss('input[name=' + elementName + ']').sendKeys(time);
    }
    setDateOnly = (field: string, date: TestDateFormat) => {
        this.getElementByName(field).sendKeys(protractor.Key.BACK_SPACE);
        this.getElementByName(field).sendKeys(date.mm);
        this.getElementByName(field).sendKeys(date.dd);
        this.getElementByName(field).sendKeys(date.yy);
    }
    setDate= (date: string) => {
        this.getElementByCss('input[name="dpDate"]').sendKeys(date);
    }
    createBooking = () => {
        return this.createBookingWithTimeAndInterpreter('standard', '10:15 AM', '11:15 AM', '2', 'auslanInterpreters_count');
    }
    createBookingWithYesterdayDate = () => {
        this.previousDate = true;
        return this.createBookingWithTimeAndInterpreter('standard', '10:15 AM', '11:15 AM', '2', 'auslanInterpreters_count');
    }
    editBookingWithDayAfterTomorrowDateWith_VICDEAF_STATE = () => {
        this.getElementByCss('input[name="dpDate"]').clear();
        this.setDate( this.getDateAfterNDays(2));
        this.setElementsValueByName('address_state', 'VIC');
    }
    editBookingWith_DSQ_STATES = () => {
        this.setElementsValueByName('address_state', 'ACT');
    }
    editBookingWith_VICDEAF_STATE = () => {
        this.setElementsValueByName('address_state', 'VIC');
    }
    createBookingForPerth = () => {
        return this.createBookingWithAddressTimeAndInterpreter('standard', '10:15 AM', '11:15 AM', '2');
    }

    private autocompleteAndChooseFirstWith(searchTerm: string) {
        this.enterSearchTermInAutocomplete(searchTerm);
        const suggestions = this.getAllElementByCSS('ul.ui-autocomplete-items.ui-autocomplete-list li');
        return suggestions.first().click();
    }

    enterSearchTermInAutocomplete(searchTerm: string) {
        const autocompleteEl = element(by.css('input.ui-autocomplete-input'));
        return autocompleteEl.sendKeys(searchTerm);
    }

    selectClientAsBookbable = () => {
        return this.autocompleteAndChooseFirstWith('ted');
    }

    selectOrgRepAsBookbable = () => {
        element(by.name('rdBookingFor')).all(by.tagName('md-radio-button')).get(1).click();
        return this.autocompleteAndChooseFirstWith('Curve');
    }

    checkTheFieldExist = (cant: string, fieldName: string) => {
        let canSee = cant !== 'can\'t';
        return expect(this.getElementByName(fieldName).isPresent()).to.eventually.be.eq(canSee);
    }
    setUnitNumber = (stNumber: string) => {
        this.setElementsValueByName('address_unit_num', stNumber);
    }
    setStreetNumber = (stNumber: string) => {
        this.setElementsValueByName('address_street_number', stNumber);
    }
    // Adds a '0' in the start if the date < 10
    private prettyDate = (date: number|string): string => {
        date = date.toString();
        return ('00' + date).slice(date.length);
    }
    private getDateAfterNDays = (n: number): string => {
        const currentDate = new Date();
        const dateStart = new Date(new Date(currentDate).setDate(currentDate.getDate() + n));
        return [
            this.prettyDate(dateStart.getDate()),
            this.prettyDate(dateStart.getMonth() + 1),
            dateStart.getFullYear().toString()
        ].join('/');
    }
    createBookingWithTimeAndInterpreter = (standard: string, startTime: string, endTime: string, interpreterNum: string, interpreterFieldName: string) => {
        const dateToSend = this.previousDate ? this.getDateAfterNDays(-1) : this.getDateAfterNDays(8);
        this.setDate(dateToSend);
        this.setStartEndTime('start', startTime);
        this.setStartEndTime('end', endTime);
        this.setStreetNumber('162');
        this.setElementsValueByName('address_street', 'Dave');
        this.setElementsValueByName('address_post_code', '3064');
        this.setElementsValueByName('address_suburb', 'Parkville');
        this.setElementsValueByName('address_state', 'VIC'); // dropdown

        this.getElementByName('attendee_count').sendKeys('1');
        this.getElementByName(interpreterFieldName).clear();
        this.getElementByName(interpreterFieldName).sendKeys(interpreterNum);

        this.getElementByName('nature_of_appointment').sendKeys('COURT');
        this.getElementByName('specific_nature_of_appointment').sendKeys('DHS ORDER');

        this.getElementByName('raw_booking_requested_by').sendKeys('Luke');
        this.getElementByName('raw_booking_requested_by_ln').sendKeys('Orange');

        // this.getElementByName('ext_ref_num').sendKeys('321');

        this.getElementByName('cn_first_name').sendKeys('John');
        this.getElementByName('cn_last_name').sendKeys('Travolta');
        this.getElementByName('cn_email').sendKeys('jt@star.com.au');
        this.getElementByName('cn_phone').sendKeys('0490394512');

        let deaf_person_values = {
            'deaf_person_name': 'Frank',
            'deaf_person_last_name': 'Castle',
            'deaf_person_email': 'petecastiligone@gmail.com',
            'deaf_person_mobile': '0918273645'
        };

        Object.keys(deaf_person_values).forEach(field => {
            this.getElementByName(field).getAttribute('value').then(value => {
                if (!value) {
                    this.getElementByName(field).sendKeys(deaf_person_values[field]);
                }
            });
        });

        this.getElementByName('deaf_person_eaf').sendKeys('123');
    }
    createBookingWithAddressTimeAndInterpreter = (standard: string, startTime: string, endTime: string, interpreterNum: string) => {
        const dateToSend = this.getDateAfterNDays(7);
        this.setDate(dateToSend);
        this.setStartEndTime('start', startTime);
        this.setStartEndTime('end', endTime);
        this.setUnitNumber('F-Space');
        this.setStreetNumber('18/27');
        this.setElementsValueByName('address_street', 'Market St Fremantle');
        this.setElementsValueByName('address_post_code', '6160');
        this.setElementsValueByName('address_suburb', 'Perth');
        this.setElementsValueByName('address_state', 'WA'); // dropdown

        this.getElementByName('attendee_count').sendKeys('1');
        this.getElementByName('auslanInterpreters_count').clear();
        this.getElementByName('auslanInterpreters_count').sendKeys(interpreterNum);

        this.getElementByName('nature_of_appointment').sendKeys('COURT');
        this.getElementByName('specific_nature_of_appointment').sendKeys('DHS ORDER');

        this.getElementByName('raw_booking_requested_by').sendKeys('Luke');
        this.getElementByName('raw_booking_requested_by_ln').sendKeys('Orange');

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
        let dateString = [dd, mm, yy].join('/');
        let timeString = hh.toString() + ':00PM';
        this.setDate(dateString);
        this.setStartEndTime(field, timeString);
    }
}
