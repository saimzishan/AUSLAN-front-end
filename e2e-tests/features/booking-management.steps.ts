import {expect} from '../config/helpers/chai-imports';
// import * from 'chai';
// import {} from 'jasmine';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$} from 'protractor';
import {PageHelper} from '../app.po';
import {Booking, CONSTANT} from '../helper';


defineSupportCode(({Given, Then, When}) => {

    let list_of_object = {};

    let page = new PageHelper();
//  BE ABLE TO VIEW BOOKING PAGE
    Then(/^I will be shown with bookings$/, showSummaryDetails);
    async function showSummaryDetails(): Promise<void> {
        let tblRows = await $$('#jobs-responsive tbody tr');
        expect(tblRows.length).to.be.greaterThan(0);
        let span = await $('#jobs-responsive tbody > tr:first-child td.bookingID > div > span');
        expect(span.getText()).to.eventually.equal('0001');
    }

    When(/^I click on 'New Booking'$/, newBookingClick);
    async function newBookingClick(): Promise<void> {
        let newUserBtn = page.getElementByID('lnkNewBooking');
        let click = await newUserBtn.click();
    }

    Then(/^I will be taken to the 'New Booking' form$/, showBookingForm);
    async function showBookingForm(): Promise<void> {
        let currentPath = await page.currentPath();
        expect(currentPath).to.contain('create-booking');
    }

    ////////////////////////////////////// Adding Date
    // Given(/^I am on the booking page as a (.*)$/, givenOnBookingAsValid);
    // async function givenOnBookingAsValid(type: string): Promise<void>{
    //     // await browser.driver.sleep(2000); // waiting for the elements to be loaded
    //     // expect(page.currentPath()).to.eventually.contain('booking-management');
    // }

    // When(/^I click on Date-Month-Year$/, clickOnDate);
    // async function clickOnDate(): Promise<void>{
    //     await browser.driver.sleep(2000); // waiting for the elements to be loaded
    //     let eventDate = page.getElementByName('dpEventDate');
    //     expect(eventDate).to.be.exist;
    //     eventDate.click();
    // }
    //
    // When(/^I type in the date: (.*) by hand$/, typeDateByHand);
    // async function typeDateByHand(date: string): Promise<void>{
    //     await browser.driver.sleep(2000); // waiting for the elements to be loaded
    //     let eventDate = page.getElementByName('dpEventDate');
    //     eventDate.sendKeys(date);
    // }
    //
    // // Then(/^It will be displayed in the cell$/, displayInCell);
    // // async function displayInCell(): Promise<void>{
    // //     await browser.driver.sleep(2000); // waiting for the elements to be loaded
    // //     expect(page.currentPath()).to.eventually.contain('booking-management');
    // // }
    //
    When(/^I filled all mandatory fields except (.*)$/, haventFilledAllMandatory);
    async function haventFilledAllMandatory(mandatory_tag: string): Promise<void> {
        let all_required_input_fields = await $$('input[required]');
        let all_required_radio_buttons = await $$('md-radio-group');
        let all_required_drop_down = await $$('md-select');
        let all_required_simple_drop_down = await $$('select[required]');
        // let all_fields = page.getAll('.form-field');
        const input_length = all_required_input_fields.length;
        console.log(input_length);
        console.log(all_required_radio_buttons.length);

        // SIMPLE DROPDOWN MENU
        // for (let simple_dropdown_i = 0; simple_dropdown_i < all_required_simple_drop_down.length ; simple_dropdown_i++) {
        //     let simple_dropdown = all_required_simple_drop_down[simple_dropdown_i];
        //     let simple_dropdown_parent = page.getParent(simple_dropdown);
        //     let simple_dropdown_label = page.getElementInsideByTag(simple_dropdown_parent, 'label');
        //     let simple_dropdown_label_text = await simple_dropdown_label.getText().then( (text) => {
        //         // console.log(text);
        //         return text;
        //     });
        //     // expect(mandatory_dropdown_related_label_fields).to.include(dropdown_label_text);
        //     if (simple_dropdown_label_text !== mandatory_tag) {
        //         await simple_dropdown.click();
        //         let all_simple_options = await $$('option');
        //         all_simple_options[Math.floor(Math.random() * (all_simple_options.length - 1))].click();
        //     } else {
        //         console.log('=========>' + simple_dropdown_label_text + '<==========');
        //     }
        // }

        // DROPDOWN MENU
        for (let dropdown_i = 0; dropdown_i < all_required_drop_down.length; dropdown_i++) {
            let dropdown = all_required_drop_down[dropdown_i];
            let dropdown_parent = page.getParent(dropdown);
            let dropdown_label = page.getElementInsideByTag(dropdown_parent, 'label');
            let dropdown_label_text = await dropdown_label.getText().then((text) => {
                // console.log(text);
                return text;
            });
            // expect(mandatory_dropdown_related_label_fields).to.include(dropdown_label_text);
            if (dropdown_label_text !== mandatory_tag) {
                await dropdown.click();
                let all_options = await $$('md-option');
                // console.log('get all options');
                await all_options[CONSTANT.OPTION_NUM].click();
                // console.log('click 1 option');
            } else {
                console.log('=========>' + dropdown_label_text + '<==========');
            }
        }

        // RADIO BUTTONS

        for (let radio_group_i = 0; radio_group_i < all_required_radio_buttons.length - 1; radio_group_i++) {
            let radio_group = all_required_radio_buttons[radio_group_i];
            let radio_parent = page.getParent(radio_group);
            let radio_label = page.getElementInsideByTag(radio_parent, 'label');
            let radio_label_text = await radio_label.getText().then((text) => {
                // console.log(text);
                return text;
            });
            // expect(mandatory_radio_button_related_label_fields).to.include(radio_label_text);
            if (radio_label_text !== mandatory_tag) {
                let all_radio_btn_in_group = await page.getAllByTagNameInElement(radio_group, 'md-radio-button');
                all_radio_btn_in_group[CONSTANT.NO].click();
            } else {
                console.log('=========>' + radio_label_text + '<==========');
            }
        }

        // INPUT FIELDS

        // console.log(input_list);
        // expect(input_length).to.be.equal(mandatory_label_fields.length);
        for (let i = 0; i < all_required_input_fields.length; i++) {
            console.log(i);
            // page.setValue(input_list[i], '123123');
            if (i > 1) {
                let input_field = all_required_input_fields[i];
                let isText = false;
                await input_field.getAttribute('type').then((val) => {
                    isText = val === 'text';
                    console.log(val);
                });
                let parent = page.getParent(input_field);
                let input_label = page.getElementInsideByTag(parent, 'label');
                let label_text = await input_label.getText().then((text) => {
                    // console.log(text);
                    return text;
                });
                // console.log('-----------');
                console.log(label_text);
                // expect(mandatory_label_fields).to.include(label_text);
                // if (mandatory_radio_button_related_fields.includes(label_text)) {
                //
                // } else {
                if (label_text !== mandatory_tag) {
                    if (label_text.includes('EMAIL')) {
                        page.setValue(input_field, 'curve@auslan.com.au');
                    } else {
                        page.setValue(input_field, isText ? 'Abcde' : '123');
                        // if input_field has a next sibiling with span.inline-icon error  means its an error

                    }
                } else {
                    console.log('=========>' + label_text + '<==========');
                }
                // }
            }
        }
        // await browser.driver.sleep(2000);
        // await all_required_input_fields.then((input_list) => {
        //
        // })
    }

    // --------------------------------- AUTO POPULATE CLIENT DETAILS
    When(/^I specify i am the client of this booking$/, specifyAsClientOfBooking);
    async function specifyAsClientOfBooking(): Promise<void> {
        const clientOptionLabel = page.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
        const divClientDetails = page.getNextSibling(clientOptionLabel, 'div');
        const clientRadioGroup = page.getElementInsideByTag(divClientDetails, 'md-radio-group');
        let all_radio_btn_in_group = await page.getAllByTagNameInElement(clientRadioGroup, 'md-radio-button');
        all_radio_btn_in_group[CONSTANT.YES].click();
    }

    Then(/^The booking form will be automatically populated with the details.$/, populatedUserDetails);
    async function populatedUserDetails(): Promise<void> {
        const clientOptionLabel = page.getElementByCSSandText('.text-center', 'CLIENT DETAILS');
        const divClientDetails = page.getNextSibling(clientOptionLabel, 'div');
        const all_input_in_div = page.getAllByTagNameInElement(divClientDetails, 'input');
        let all_filled = true;
        for (let i = 0; i < all_input_in_div.length; i++) {
            const single_input = all_input_in_div[i];
            all_filled = false;
            await single_input.getAttribute('ng-reflect-model').then((val) => {
                all_filled = true;
            });
            expect(all_filled).to.equal(true);
        }
        // expect(all_filled).to.equal(true);
        // expect(btn.isEnabled()).to.eventually.to.equal(true);
    }

    //    CANCEL BOOKING
    When(/^I press '(.*)'$/, pressButtonOnNewBookingScreen);
    async function pressButtonOnNewBookingScreen(buttonLabel: string): Promise<void> {
        const button = page.getButtonByText(buttonLabel);
        await button.click();
    }

    Then(/^I am back on booking page$/, backToBookinManagementScreen);
    async function backToBookinManagementScreen(): Promise<void> {
        let currentPath = await page.currentPath();
        expect(currentPath).to.contain('booking-management');
    }

    // ---------------------------------   INDIVIDUAL BOOKING PAGE
    When(/^I click on an individual booking$/, clickOnIndividualBooking);
    async function clickOnIndividualBooking(): Promise<void> {
        const bookingRows = await $$('tbody tr');
        if (bookingRows.length > 1) {
            let one_row = bookingRows[0];
            await one_row.click();
        }
    }

    Then(/^I am on the individual booking page$/, onIndividualBookingScreen);
    async function onIndividualBookingScreen(): Promise<void> {
        let currentPath = await page.currentPath();
        expect(currentPath).to.contain('booking-job');
    }

    Then(/^I can see a list of (.*) (.*) interpreters$/, checkListofInterpreterIndividualBookingScreen);
    async function checkListofInterpreterIndividualBookingScreen(num_of_user: string, verified: string): Promise<void> {
        const interpreterRows = await $$('section[id=invited-interpreters] tbody tr');
        const interpereter_num = interpreterRows.length;
        expect(interpereter_num).to.eql(parseInt(num_of_user, 10));
    }

//    VIEW PROFILE
    When(/^I click on my name in the top corner$/, clickOnMyName);
    async function clickOnMyName(): Promise<void> {
        const profile = page.getElementByID('lnkProfile');
        profile.click();
    }

    Then(/^I will be taken to my individual profile page$/, takeToIndividualPage);
    async function takeToIndividualPage(): Promise<void> {
        let currentPath = await page.currentPath();
        expect(currentPath).to.contain('profile');
    }

    Then(/^I can see the fields (.*)$/, showAllTheFields);
    async function showAllTheFields(fields_string: string): Promise<void> {
        const fields = fields_string.split(', ');
        const all_fields = await $$('form div.form-field label');
        const all_fields_length = all_fields.length;
        expect(fields.length).to.equal(all_fields_length);
        for (let i = 0; i < all_fields_length; i++) {
            let label_text = await page.getText(all_fields[i]);
            expect(fields).to.includes(label_text);
        }
    }

//    POPULATE DROP DOWN
    When(/^I click dropdown (.*)$/, clickOnDropDown);
    async function clickOnDropDown(label_text: string): Promise<void> {
        const selected_label = await page.getElementByCSSandText('label', label_text);
        const div = page.getParent(selected_label);
        const select_dropdown = page.getElementInsideByTag(div, 'select');
        await select_dropdown.click();
    }

    When(/^I click on option (.*)/, clickOnOption);
    async function clickOnOption(option_text: string): Promise<void> {
        const option_selected = await page.getElementByCSSandText('option', option_text);
        await option_selected.click();
    }

    Then(/^The cell of (.*) will be populated with (.*)$/, checkTheDropDown);
    async function checkTheDropDown(label_text: string, option_text: string): Promise<void> {
        const selected_label = await page.getElementByCSSandText('label', label_text);
        const div = page.getParent(selected_label);
        const select_dropdown = page.getElementInsideByTag(div, 'select');
        if (option_text === 'NOTHING') {
            const selected_label_attr = await select_dropdown.getAttribute('ng-reflect-model');
            let expected = false;
            if (typeof selected_label_attr !== typeof undefined && selected_label_attr !== false) {
                expected = true;
            }
            expect(expected).to.be.true;
            list_of_object['WHAT WILL BE DISCUSSED *'] = Booking.getWhatWillBeDiscussed('');
        } else {
            const selected_label_val = await select_dropdown.getAttribute('ng-reflect-model').then((val) => {
                console.log(val);
                return val.toUpperCase();
            });
            expect(selected_label_val).to.equal(option_text);
        }
    }

//    CLick on Request bookings
    Then(/^I am shown with (.*) (.*) Bookings$/, showTheNumberofBooking);
    async function showTheNumberofBooking(num_of_booking: string, type_of_booking: string): Promise<void> {
        let numBooking = parseInt(num_of_booking, 10);
        let allTypeBooking = await page.getAllByCSSandText('tbody td',  type_of_booking);
        const totalNumofType = allTypeBooking.length;
        expect(totalNumofType).to.equal(numBooking);
    }

    When(/^I click at the (.*) one of (.*) (.*) Bookings$/, clickAtOneofTheBooking);
    async function clickAtOneofTheBooking(pos: string, num_of_booking: string, type_of_booking: string): Promise<void> {
        let numBooking = parseInt(num_of_booking, 10);
        let posth = parseInt(pos, 10);
        let allTypeBooking = await page.getAllByCSSandText('tbody td',  type_of_booking);
        const totalNumofType = allTypeBooking.length;
        expect(posth).to.be.lessThan(totalNumofType);
        let row = page.getParent(allTypeBooking[posth - 1]);
        await row.click();
    }

    Then(/^I will be shown a popup message$/, showThePopup);
    async function showThePopup(): Promise<void> {
        let app_popup = page.getElementByCss('app-popup');
        expect(app_popup).to.be.exist;
    }

    // Can't click on drop down
    Then(/^The dropdown (.*) will have (.*) item$/, listTheIteminDropDown);
    async function listTheIteminDropDown(type_of_dropdown: string, num_of_item: string): Promise<void> {
        const item_num = parseInt(num_of_item, 10);
        const selected_label = await page.getElementByCSSandText('label', type_of_dropdown);
        const div = page.getParent(selected_label);
        const all_option = await page.getAllByTagNameInElement(div, 'option');
        const expected_option_list = list_of_object[type_of_dropdown];
        expect(JSON.stringify(all_option)).to.be.equal(JSON.stringify(expected_option_list));
    }
});
