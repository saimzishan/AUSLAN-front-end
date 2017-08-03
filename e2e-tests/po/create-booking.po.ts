import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {CONSTANT, Booking} from '../helper';
import {NotificationObject} from './notification';

export class BookingPage extends PageObject {
    list_of_object = {};
    createBookingBtn;
    cancelCreateBooking;
    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('create-booking');
        });
    }

    didFinishedRendering = () => {
        this.createBookingBtn = this.getButtonByText('SAVE');
        this.cancelCreateBooking = this.getButtonByText('CANCEL');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.createBookingBtn), 5000).then(() => {
            expect(this.createBookingBtn).to.exist;
            expect(this.cancelCreateBooking).to.exist;
        });
    }

    getSuccessNotificationContent = () => {
        return browser.sleep(500).then( () => {
            NotificationObject.getNotificationContent('The Booking has been created.');
        });
    }

    clickOnSave = () => {
        return this.createBookingBtn.click();
    }

    clickOnCancel = () => {
        return this.cancelCreateBooking.click();
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
                // console.log(val);
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

    setStartEndTime = (field: string, date: string, time: string) => {
        let elementName = {
            'start': 'dpEventDate',
            'end': 'dpEventEndTime'
        }[field];
        this.getElementByName(elementName).sendKeys(date);
        this.getElementByName(elementName).sendKeys(protractor.Key.TAB);
        this.getElementByName(elementName).sendKeys(time);
    }

    createBooking = () => {

        this.setStartEndTime('start', '30/12/2017', '11:15AM');
        this.setStartEndTime('end', '30/12/2017', '05:15AM');

        this.setElementsValueByName('address_street_number', '162');
        this.setElementsValueByName('address_street', 'Dave');
        this.setElementsValueByName('address_post_code', '3064');
        this.setElementsValueByName('address_suburb', 'Parkville');
        this.setElementsValueByName('address_state', 'VIC'); // dropdown

        this.getElementByName('attendee_count').sendKeys('1');
        this.getElementByName('interpreters_count').sendKeys('2');

        this.getElementByName('nature_of_appointment').sendKeys('COURT');
        this.getElementByName('specific_nature_of_appointment').sendKeys('DHS ORDER');

        this.getElementByName('raw_booking_requested_by').sendKeys('Luke');
        this.getElementByName('raw_booking_requested_by_ln').sendKeys('Orange');

        this.getElementByName('ext_ref_num').sendKeys('321');

        this.getElementByName('cn_first_name').sendKeys('John');
        this.getElementByName('cn_last_name').sendKeys('Travolta');
        this.getElementByName('cn_email').sendKeys('jt@star.com.au');
        this.getElementByName('cn_phone').sendKeys('0490394512');

        this.getElementByName('deaf_person_eaf').sendKeys('123');
    }

    clickCreateBtn = () => {
        return this.getElementByName('btnCreateBooking').click();
    }

    setTime = (field: string, days: number, hours?: number) => {
        let date = new Date(Date.now() + (1000 * 60 * 60 * (hours || 0)) + (1000 * 60 * 60 * 24 * (days || 0)));
        let dd = ('0' + date.getDate()).slice(-2);
        let mm = ('0' + (date.getMonth() + 1)).slice(-2);
        let yy = date.getFullYear();
        let hh: any = date.getHours();
        let min = ('0' + date.getMinutes()).slice(-2);
        let tt = 'AM';
        if (hh - 12 > 0) {
            hh -= 12;
            tt = 'PM';
        }
        hh = ('0' + hh).slice(-2);
        let dateString = [dd, mm, yy].join('/');
        let timeString = hh + ':' + min + tt;
        this.setStartEndTime(field, dateString, timeString);
    }
}

