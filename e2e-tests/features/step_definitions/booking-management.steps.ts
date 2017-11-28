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
    Given(/^There exist (\d+) admins/, Heroku.createBulkAdministrator);
    Given(/^I have preloaded bookings with different org values$/, Heroku.preloadOrgBookings);
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

    Given(/^I can see the '(.*)' auto populated$/, createBookingPO.sectionAutoPopulated);
    // Filling in specific fields in the booking form
    Then(/^I set the (\w+) time as (\d+) days (?:(\d+) hours?)?\s?from now$/, createBookingPO.setTime)

    //    CANCEL BOOKING
    When(/^I press '(.*)'$/, createBookingPO.clickOnButton);

    // ---------------------------------   INDIVIDUAL BOOKING PAGE

    Then(/^The version history with name '(.*)' at index '(.*)' with text '(.*)'$/, bookingJobPO.verifyVersionInfo);
    Then(/^I am on the individual booking page$/, bookingJobPO.browse);

    Then(/^I can see a list of (.*) (.*) interpreters$/, bookingJobPO.checkListofInterpreterIndividualBookingScreen);
    Then(/^I can not see a list of interpreters$/, bookingJobPO.listofInterpreterDoesNotExists);

    Then(/^I can verify the image of myself in the list of interpreter start with '(.*)'$/, bookingJobPO.verifyPictureOfYourself);

//    POPULATE DROP DOWN
    When(/^I click dropdown (.*)$/, createBookingPO.clickOnDropDown);
    When(/^I select option (.*) from dropdown (.*)$/, createBookingPO.selectOptionFromDropdown);

    When(/^I click on option (.*) of (.*) for (.*)/, createBookingPO.clickOnOption);
    When(/^I query booking with booking id$/, bookingManagementPO.queryBookingWithID);
    When(/^I query booking with client name '(.*)'$/, bookingManagementPO.queryBookingByClientName);
    When(/^I query booking with interpreter name '(.*)'$/, bookingManagementPO.queryBookingByInterpreterName);
    When(/^I query booking with org name '(.*)'$/, bookingManagementPO.queryBookingByOrgName);
    When(/^I query booking with suburb '(.*)'$/, bookingManagementPO.queryBookingBySuburb);
    When(/^I filter booking by date range first and last days of next week$/, bookingManagementPO.filterBookingByDateRange);
    When(/^I hover on the (.*) dropdown and select '(.*)'$/, bookingManagementPO.hoverOnTableHeader);
    When(/^I hover on the (.*) dropdown and I do not see '(.*)'$/, bookingManagementPO.selectionNotPresent);
    When(/^I change the street number to (\d+)$/, createBookingPO.setStreetNumber);
    When(/^I click on one non-editable field$/, bookingEditPO.clickOnNonEditableField);
    When(/^I query search with '(.*)'$/, bookingManagementPO.querySearchWith);

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
    Then(/^I see an option '(.*)' in '(.*)' dropdown$/, createBookingPO.optionExistsInDropDown);
    Then(/^I should see the value under (.*) column as '(.*)'$/, bookingJobPO.checkTableDetails);
    Then(/^I should\s?(not)? see the attachment icons under Attached column$/, bookingJobPO.checkAttachmentIcons)
    // Then(/^I get the popup warning that is the non-standard booking$/, createBookingPO.popupForNonStandard)

});
