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
            expect(currentPath).to.contain('create-booking');
            this.didFinishedRendering();
        });
    }

    didFinishedRendering = () => {
        this.createBookingBtn = this.getElementByName('btnCreateBooking');
        this.cancelCreateBooking = this.getElementByName('btnCancelCreateBooking');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.createBookingBtn), 30000).then(() => {
            expect(this.createBookingBtn).to.exist;
            expect(this.cancelCreateBooking).to.exist;
        });
    }

    getAuthErrorNotificationContent = () => {
        NotificationObject.getNotificationContent('Email or Password not found');
    }

    specifyAsClientOfBooking = () => {
        const clientOptionLabel = this.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
        const divClientDetails = this.getNextSibling(clientOptionLabel, 'div');
        const clientRadioGroup = this.getElementInsideByTag(divClientDetails, 'md-radio-group');
        let all_radio_btn_in_group = this.getAllByTagNameInElement(clientRadioGroup, 'md-radio-button');
        return all_radio_btn_in_group[CONSTANT.YES].click();
    }


    clickOnSave = () => {
        return this.saveButton.click();
    }

    clickOnCancel = () => {
        return this.cancleButton.click();
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
            const selected_label_val = select_dropdown.getAttribute('ng-reflect-model').then((val) => {
                // console.log(val);
                return val.toUpperCase();
            });
            return expect(selected_label_val).to.equal(option_text);
        }
    }

    listTheIteminDropDown = (type_of_dropdown: string, num_of_item: string) => {
        const item_num = parseInt(num_of_item, 10);
        const selected_label = this.getElementByCSSandText('label', type_of_dropdown);
        const div = this.getParent(selected_label);
        const all_option = this.getAllByTagNameInElement(div, 'option');
        let final_arr = [];
        return all_option.then( (allOption) => {
            for (let i = 0; i < allOption.length; i++) {
                let text = this.getText(all_option[i]);
                text = text.replace(/^\s+|\s+$/g, '');
                // console.log(text);
                final_arr.push(text);
            }
            const expected_option_list = this.list_of_object[type_of_dropdown];
            expect(JSON.stringify(final_arr)).to.be.equal(JSON.stringify(expected_option_list));
        });
    }
    //
    // specifyAsClientOfBooking = () => {
    //     const clientOptionLabel = this.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
    //     const divClientDetails = this.getNextSibling(clientOptionLabel, 'div');
    //     const clientRadioGroup = this.getElementInsideByTag(divClientDetails, 'md-radio-group');
    //     let all_radio_btn_in_group = this.getAllByTagNameInElement(clientRadioGroup, 'md-radio-button');
    //     return all_radio_btn_in_group.then( (all_radio) => {
    //         return all_radio_btn_in_group[CONSTANT.YES].click();
    //     });
    // }

    populatedUserDetails = () => {
        const clientOptionLabel = this.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
        const divClientDetails = this.getNextSibling(clientOptionLabel, 'div');
        const all_input_in_div = this.getAllByTagNameInElement(divClientDetails, 'input');
        return all_input_in_div.then( (inputDiv) => {
            let all_filled = true;
            for (let i = 0; i < inputDiv.length; i++) {
                const single_input = all_input_in_div[i];
                all_filled = false;
                single_input.getAttribute('ng-reflect-model').then((val) => {
                    all_filled = true;
                });
                expect(all_filled).to.equal(true);
            }
        });
    }
}

