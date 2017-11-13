import {expect} from '../../config/helpers/chai-imports';
// import * from 'chai';
// import {} from 'jasmine';
import {defineSupportCode} from 'cucumber';
import {browser, by, element, $, $$} from 'protractor';

import {PageObject} from '../../po/app.po';
import {BookingManagementPage} from '../../po/booking-management-page.po';
import {CONSTANT, Booking, Heroku} from '../../helper';
import {BookingPage} from '../../po/create-booking.po';
import {BookingJobPage} from '../../po/booking-job.po';
import {BookingEditPage} from "../../po/booking-edit.po";

defineSupportCode(({Given, Then, When}) => {

    // let list_of_object = {};
    let bookingManagementPO = new BookingManagementPage();
    let createBookingPO = new BookingPage();
    let bookingJobPO = new BookingJobPage();
    let bookingEditPO = new BookingEditPage();

    Given(/^The booking has status '(.*)'$/, Heroku.updateBookingWithStatus);
    Given(/^The booking has assignment category '(.*)'$/, Heroku.updateBookingWithCategory);
    Given(/^There exist (\d+) bookings$/, Heroku.createBulkBookings);
    Given(/^I have preloaded (\d+) bookings with different org values$/, Heroku.preloadOrgBookings);
    Given(/^One booking has client name as '(.*)'$/, Heroku.updateBookingWithClientName)
    Given(/^One booking has client last name as '(.*)'$/, Heroku.updateBookingWithLastClientName)
    Given(/^One booking has interpreter first name as '(.*)'$/, Heroku.updateBookingWithInterpreterFirstName)
    Given(/^One booking has interpreter last name as '(.*)'$/, Heroku.updateBookingWithInterpreterLastName)
    Given(/^One booking has org name as '(.*)'$/, Heroku.updateBookingWithOrgName)
    Given(/^One booking has suburb as '(.*)'$/, Heroku.updateBookingWithSuburb)
    Given(/^One booking has start and end dates as first and last days of next week$/, Heroku.updateBookingStartAndEndDateTime)
//  BE ABLE TO VIEW BOOKING PAGE
    Then(/^I will be shown with bookings$/, bookingManagementPO.atleastABookingExists);
    Then(/^I store the current url$/, bookingJobPO.storePath);
    Then(/^I go to stored url$/, bookingJobPO.gotoStorePath);
    Then(/^I see the error page$/, bookingJobPO.errorPage);
//    CLick on Request bookings
    Then(/^I am shown with (\d+) (.*[^\s])?\s?[bB]ookings?$/, bookingManagementPO.showTheNumberofBooking);

    When(/^I click at the (.*) one of (.*) (.*) Bookings$/, bookingManagementPO.clickAtOneofTheBooking);

    When(/^I click on 'New Booking'$/, bookingManagementPO.clickOnNewBooking);
    // When(/^I click on Bookings$/, bookingManagementPO.clickOnBookings);
    When(/^I see (one|\d+) rows? with state '(.*)'$/, bookingManagementPO.bookingWithStateExists);
    When(/^I see (one|\d+) rows? with status '(.*)'$/, bookingManagementPO.bookingWithStatusExists);
    When(/^I see (one|\d+) rows? with type '(.*)'$/, bookingManagementPO.bookingWithTypeExists);
    When(/^I do not see any row with state '(.*)'$/, bookingManagementPO.noBookingWithStateExists);

    When(/^I click on an individual booking of type '(.*)'$/, bookingManagementPO.clickOnIndividualBookingOfType);
    When(/^I do not see any booking rows$/, bookingManagementPO.noBookingExists);

    When(/^I click on an individual booking$/, bookingManagementPO.clickOnIndividualBooking);
    Then(/^I am back on booking page$/, bookingManagementPO.onBookingListPage);

    // --------------------------------- AUTO POPULATE CLIENT DETAILS
    Then(/^I will be taken to the 'New Booking' form$/, createBookingPO.browse);

    When(/^I specify i am the client of this booking$/, createBookingPO.specifyAsClientOfBooking);
    When(/^I specify i have special instruction$/, createBookingPO.specifyAsHavingSepcialInstruction);

    Then(/^The field '(.*)' will be populated with '(.*)'$/, createBookingPO.theFieldWillBePopulated);

    Then(/^I can verify the field '(.*)' will have the value '(.*)'$/, createBookingPO.theFieldInBookingWillHaveValue);

    Then(/^The booking form will be automatically populated with the details.$/, createBookingPO.populatedUserDetails);

    // Filling in specific fields in the booking form
    Then(/^I set the (\w+) time as (\d+) days (?:(\d+) hours?)?\s?from now$/, createBookingPO.setTime)

    //    CANCEL BOOKING
    When(/^I press '(.*)'$/, createBookingPO.clickOnButton);

    // ---------------------------------   INDIVIDUAL BOOKING PAGE

    Then(/^The version history with name '(.*)' at index '(.*)' with text '(.*)'$/, bookingJobPO.verifyVersionInfo);
    Then(/^I am on the individual booking page$/, bookingJobPO.browse);

    Then(/^I can see a list of (.*) (.*) interpreters$/, bookingJobPO.checkListofInterpreterIndividualBookingScreen);
    Then(/^I can not see a list of interpreters$/, bookingJobPO.listofInterpreterDoesNotExists);

    Then(/^I can verify the image of myself in the list of interpreter start with '(.*)'$/, bookingJobPO.verifyPictureOfYourself)

//    POPULATE DROP DOWN
    When(/^I click dropdown (.*)$/, createBookingPO.clickOnDropDown);

    When(/^I click on option (.*) of (.*) for (.*)/, createBookingPO.clickOnOption);
    When(/^I query booking with booking id$/, bookingManagementPO.queryBookingWithID);
    When(/^I query booking with client name '(.*)'$/, bookingManagementPO.queryBookingByClientName);
    When(/^I query booking with interpreter name '(.*)'$/, bookingManagementPO.queryBookingByInterpreterName);
    When(/^I query booking with org name '(.*)'$/, bookingManagementPO.queryBookingByOrgName);
    When(/^I query booking with suburb '(.*)'$/, bookingManagementPO.queryBookingBySuburb);
    When(/^I filter booking by date range first and last days of next week$/, bookingManagementPO.filterBookingByDateRange);
    When(/^I hover on the (.*) dropdown and select '(.*)'$/, bookingManagementPO.hoverOnTableHeader);
    When(/^I change the street number to (\d+)$/, createBookingPO.setStreetNumber);

    Then(/^All required booking fields should be filled$/, bookingEditPO.checkValueInAllRequiredFields);

    Then(/^The cell of (.*) will be populated with (.*)$/, createBookingPO.checkTheDropDown);

    // Can't click on drop down
    Then(/^The dropdown (.*) will have (.*) item$/, createBookingPO.listTheIteminDropDown);

    // Click the create booking button
    Then(/^I click the create booking button$/, createBookingPO.clickCreateBtn);

    Then(/^I (.*) see the (.*) field$/, createBookingPO.checkTheFieldExist);
    Then(/^I see one row with the booking id$/, bookingManagementPO.bookingExistsWithId);
    Then(/^I see one row with client name '(.*)'$/, bookingManagementPO.bookingExistsWithClientName);
    Then(/^I see one row with client last name '(.*)'$/, bookingManagementPO.bookingExistsWithClientLastName);
    Then(/^I see one row with interpreter first name '(.*)'$/, bookingManagementPO.bookingExistsWithInterpreterFirstName);
    Then(/^I see one row with interpreter last name '(.*)'$/, bookingManagementPO.bookingExistsWithInterpreterLastName);
    Then(/^I see one row with org name '(.*)'$/, bookingManagementPO.bookingExistsWithOrgName);
    Then(/^I see one row with suburb '(.*)'$/, bookingManagementPO.bookingExistsWithSuburb);
    Then(/^I should see the bookings in (ascending|descending) order of (.*)$/, bookingManagementPO.checkBookingOrder);
    Then(/^I should be on the edit booking page$/, bookingEditPO.verify);
    Then(/^I should get a valid booking update notification$/, bookingEditPO.getSuccessNotificationContent);
    Then(/^I should be able to edit only specific fields$/, bookingEditPO.checkEditableFields);
    Then(/^I should not be able to edit other fields$/, bookingEditPO.checkNonEditableFields);

    // Then(/^I get the popup warning that is the non-standard booking$/, createBookingPO.popupForNonStandard)

//    WORKING ON BELOW

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
    /*
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
     }*/
});
