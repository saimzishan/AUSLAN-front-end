import { expect } from '../config/helpers/chai-imports';
// import * from 'chai';
// import {} from 'jasmine';
import { defineSupportCode } from 'cucumber';
import { browser, by, element, $, $$ } from 'protractor';
import { PageHelper } from '../app.po';
import { User } from '../app.user';
import { Administrator } from '../app.admin';
import { Organisation } from '../app.org';
import { Client } from '../app.client';
import { Interpreter } from '../app.interpreter';
import { BookingOfficer } from '../app.bookofficer';
import {bufferWhen} from 'rxjs/operator/bufferWhen';

defineSupportCode(({Given, Then, When }) => {

    let page = new PageHelper();

    // let nauman_admin = new Administrator('admin@auslan.com.au', 'Abcd#1234');

    let cnt = 0;

    const YES = 0;
    const NO = 1;

    const OPTION_NUM = 1;

    const mandatory_label_fields = [

    ];

    const mandatory_radio_button_related_label_fields = [

    ];

    const mandatory_dropdown_related_label_fields = [

    ];
    // Given(/^I am on the bookings page$/, onBookinManagementScreen);
    // async function onBookinManagementScreen(): Promise<void>{
    //     await browser.driver.sleep(2000); // waiting for the elements to be loaded
    //     expect(page.currentPath()).to.eventually.contain('booking-management');
    // }

    When(/^I click on 'New Booking'$/, newBookingClick);
    async function newBookingClick(): Promise<void> {
        await browser.driver.sleep(5000);
        let newUserBtn = page.getElementByID('lnkNewBooking');
        let click = await newUserBtn.click();
    }

    Then(/^I will be taken to the 'New Booking' form$/, showBookingForm);
    async function showBookingForm(): Promise<void> {
        expect(page.currentPath()).to.eventually.contain('create-booking');
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
    async function haventFilledAllMandatory(mandatory_tag: string): Promise<void>{
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
        for (let dropdown_i = 0; dropdown_i < all_required_drop_down.length ; dropdown_i++) {
            let dropdown = all_required_drop_down[dropdown_i];
            let dropdown_parent = page.getParent(dropdown);
            let dropdown_label = page.getElementInsideByTag(dropdown_parent, 'label');
            let dropdown_label_text = await dropdown_label.getText().then( (text) => {
                // console.log(text);
                return text;
            });
            // expect(mandatory_dropdown_related_label_fields).to.include(dropdown_label_text);
            if (dropdown_label_text !== mandatory_tag) {
                await dropdown.click();
                let all_options = await $$('md-option');
                // console.log('get all options');
                await all_options[OPTION_NUM].click();
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
            let radio_label_text = await radio_label.getText().then( (text) => {
                // console.log(text);
                return text;
            });
            // expect(mandatory_radio_button_related_label_fields).to.include(radio_label_text);
            if (radio_label_text !== mandatory_tag) {
                let all_radio_btn_in_group = await page.getAllByTagNameInElement(radio_group, 'md-radio-button');
                all_radio_btn_in_group[NO].click();
            } else {
                console.log('=========>' + radio_label_text + '<==========');
            }
        }

        // INPUT FIELDS

        // console.log(input_list);
        // expect(input_length).to.be.equal(mandatory_label_fields.length);
        for (let i = 0; i < all_required_input_fields.length; i ++) {
            console.log(i);
            // page.setValue(input_list[i], '123123');
            if ( i > 1 ) {
                let input_field = all_required_input_fields[i];
                let isText = false;
                await input_field.getAttribute('type').then( (val) => {
                  isText = val  === 'text';
                  console.log(val);
                });
                let parent = page.getParent(input_field);
                let input_label = page.getElementInsideByTag(parent, 'label');
                let label_text = await input_label.getText().then( (text) => {
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
                        page.setValue(input_field, isText ? 'Abcde' : '123')
                        // if input_field has a next sibiling with span.inline-icon error  means its an error

                    }
                } else {
                    console.log('=========>' + label_text + '<==========');
                }
                // }
            }
        }
        await browser.driver.sleep(2000);
        // await all_required_input_fields.then((input_list) => {
        //
        // })
    }
});
