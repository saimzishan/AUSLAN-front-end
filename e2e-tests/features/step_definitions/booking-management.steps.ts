import {defineSupportCode} from 'cucumber';
import {BookingManagementPage} from '../../po/booking-management-page.po';
import {Heroku} from '../../helper';
import {BookingPage} from '../../po/create-booking.po';
import {BookingJobPage} from '../../po/booking-job.po';
import {BookingEditPage} from '../../po/booking-edit.po';
import {BookingPayrollPage} from '../../po/booking-payroll.po';

defineSupportCode(({Given, Then, When}) => {

    // let list_of_object = {};
    let bookingManagementPO = new BookingManagementPage();
    let createBookingPO = new BookingPage();
    let bookingJobPO = new BookingJobPage();
    let bookingEditPO = new BookingEditPage();
    let bookingPayrollPO = new BookingPayrollPage();

    Given(/^The booking has status '(.*)'$/, Heroku.updateBookingWithStatus);
    Given(/^The booking has method type '(.*)'$/, Heroku.updateBookingWithMethodType);
    Given(/^The booking has service type '(.*)'$/, Heroku.updateBookingWithServiceType);
    Given(/^The booking has assignment category '(.*)'$/, Heroku.updateBookingWithCategory);
    Given(/^There exist (\d+) bookings$/, Heroku.createBulkBookings);
    Given(/^There exist (\d+) bookings? with(out)? link id$/, Heroku.createBulkBookingsWithLinkId);
    Given(/^There exist (\d+) admins/, Heroku.createBulkAdministrator);
    Given(/^I have preloaded bookings with different org values$/, Heroku.preloadOrgBookings);
    Given(/^One booking has client name as '(.*)'$/, Heroku.updateBookingWithClientName);
    Given(/^One booking has client last name as '(.*)'$/, Heroku.updateBookingWithLastClientName);
    Given(/^One booking has interpreter first name as '(.*)'$/, Heroku.updateBookingWithInterpreterFirstName);
    Given(/^One booking has interpreter last name as '(.*)'$/, Heroku.updateBookingWithInterpreterLastName);
    Given(/^One booking has org name as '(.*)'$/, Heroku.updateBookingWithOrgName);
    Given(/^One booking has suburb as '(.*)'$/, Heroku.updateBookingWithSuburb);
    Given(/^One booking has start and end dates as first and last days of next week$/, Heroku.updateBookingStartAndEndDateTime);
    Given(/^One booking has created date as of yesterday$/, Heroku.updateBookingCreatedDateTime);
    Given(/^I can see the '(.*)' auto populated$/, createBookingPO.sectionAutoPopulated);
    Given(/^I can see the booking address is '(.*)'$/, createBookingPO.bookingAddressPopulated);
    Given(/^There exist (\d+) verified interpreters$/, Heroku.preloadVerifiedInterpreters);
    Given(/^The user '(.*)' is of type dsq$/, Heroku.changeUserBusiness);
    When(/^I click at the (.*) one of (.*) (.*) Bookings$/, bookingManagementPO.clickAtOneofTheBooking);
    When(/^I click on 'New Booking'$/, bookingManagementPO.clickOnNewBooking);
    When(/^I see (one|\d+) rows? with state '(.*)'$/, bookingManagementPO.bookingWithStateExists);
    When(/^I see (one|\d+) rows? with status '(.*)'$/, bookingManagementPO.bookingWithStatusExists);
    When(/^I see (one|\d+) rows? with type '(.*)'$/, bookingManagementPO.bookingWithTypeExists);
    When(/^I see (one|\d+) rows? with method '(.*)'$/, bookingManagementPO.bookingWithMethodExists);
    When(/^I see (one|\d+) rows? with service type '(.*)'$/, bookingManagementPO.bookingWithServiceTypeExists);
    When(/^I do not see any row with state '(.*)'$/, bookingManagementPO.noBookingWithStateExists);
    When(/^I click on an individual booking of type '(.*)'$/, bookingManagementPO.clickOnIndividualBookingOfType);
    When(/^I do not see any booking rows$/, bookingManagementPO.noBookingExists);
    When(/^I click on an individual booking$/, bookingManagementPO.clickOnIndividualBooking);
    When(/^I click on an booking of index (.*)$/, bookingManagementPO.clickOnIndividualBookingWithIndex);

    // --------------------------------- AUTO POPULATE CLIENT DETAILS
    When(/^I specify i am the client of this booking$/, createBookingPO.specifyAsClientOfBooking);
    When(/^I specify i have special instruction$/, createBookingPO.specifyAsHavingSepcialInstruction);

    //  CANCEL BOOKING
    When(/^I press '(.*)'$/, createBookingPO.clickOnButton);

    //  POPULATE DROP DOWN
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
    When(/^I query search with empty date$/, bookingManagementPO.querySearchWithEmptyDate);
    When(/^I enter approved date$/, bookingManagementPO.pickApprovedCurrentDate);
    When(/^I query search with future date$/, bookingManagementPO.queryManualSearchWithFutureDate);
    When(/^I query search with current date manually$/, bookingManagementPO.queryManualSearchWithCurrentDate);
    When(/^I press enter$/, bookingManagementPO.enterPressed);
    When(/^I can see that date_from is preseleted with current date$/, bookingManagementPO.filterBookingByCurrentDate);
    When(/^I empty the search field '(.*)'$/, bookingManagementPO.emptyTheField);
    When(/^I click out of the text box$/, bookingManagementPO.clickOutSide);
    When(/^I click on Booking$/, bookingManagementPO.clickOnBooking);
    When(/^I change the bookable type/, createBookingPO.changeBookableType);
    When(/^I query search with future date after '(\d+)' Days manually$/, bookingManagementPO.querySearchWithManualFutureDate);

    Then(/^I will be taken to the 'New Booking' form$/, createBookingPO.browse);
    Then(/^The field '(.*)' will be populated with '(.*)'$/, createBookingPO.theFieldWillBePopulated);
    Then(/^I can verify the field '(.*)' will have the value '(.*)'$/, createBookingPO.theFieldInBookingWillHaveValue);
    Then(/^I can verify the input '(.*)' will have the value '(.*)'$/, createBookingPO.theInputInBookingFormWillHaveValue);
    Then(/^The booking form will be automatically populated with the details.$/, createBookingPO.populatedUserDetails);

    // ---------------------------------   INDIVIDUAL BOOKING PAGE
    Then(/^The version history with name '(.*)' at index '(.*)' with text '(.*)'$/, bookingJobPO.verifyVersionInfo);
    Then(/^I am on the individual booking page$/, bookingJobPO.browse);
    Then(/^I can see a list of (.*) (.*) interpreters with distance and travel pay$/, bookingJobPO.checkListOfInterpretersOnBookingScreen);
    Then(/^I can see a list of (.*) (.*) interpreters$/, bookingJobPO.checkListofInterpreterIndividualBookingScreen);
    Then(/^I can not see a list of interpreters$/, bookingJobPO.listofInterpreterDoesNotExists);
    Then(/^I can verify the image of myself in the list of interpreter start with '(.*)'$/, bookingJobPO.verifyPictureOfYourself);
    Then(/^I can see the Interpreter status is '(.*)'$/, bookingJobPO.checkInterpreterStatus);
    When(/^I click on Messages$/, bookingManagementPO.clickOnMessages);

    // Filling in specific fields in the booking form
    Then(/^I set the (\w+) time as (\d+) days (?:(\d+) hours?)?\s?from now$/, createBookingPO.setTime);
    Then(/^All required booking fields should be filled$/, bookingEditPO.checkValueInAllRequiredFields);
    Then(/^The cell of (.*) will be populated with (.*)$/, createBookingPO.checkTheDropDown);

    // Can't click on drop down
    Then(/^The dropdown (.*) will have (.*) item$/, createBookingPO.listTheIteminDropDown);

    // Click the create booking button
    Then(/^I click the create booking button$/, createBookingPO.clickCreateBtn);

    //  BE ABLE TO VIEW BOOKING PAGE
    Then(/^I will be shown with bookings$/, bookingManagementPO.atleastABookingExists);
    Then(/^I store the current url$/, bookingJobPO.storePath);
    Then(/^I go to stored url$/, bookingJobPO.gotoStorePath);
    Then(/^I see the error page$/, bookingJobPO.errorPage);
    Then(/^I go to base url$/, bookingJobPO.gotoBasePath);

    //  Click on Request bookings
    Then(/^I am shown with (\d+) (.*[^\s])?\s?[bB]ookings?$/, bookingManagementPO.showTheNumberofBooking);
    Then(/^I am back on booking page$/, bookingManagementPO.onBookingListPage);
    Then(/^I (.*) see the (.*) field$/, createBookingPO.checkTheFieldExist);
    Then(/^I see one row with the booking id$/, bookingManagementPO.bookingExistsWithId);
    Then(/^I see one row with the link id$/, bookingManagementPO.bookingExistsWithLinkId);
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
    Then(/^I see selected option '(.*)' in dropdown$/, createBookingPO.selectedOptionExistsInDropDown);
    Then(/^I should see the value under (.*) column as '(.*)'$/, bookingJobPO.checkTableDetails);
    Then(/^I should (not)?\s?see the link id in booking details$/, bookingJobPO.checkLinkIdInTableDetails);
    Then(/^I note the value under (.*) column$/, bookingJobPO.noteTableDetails);
    Then(/^The value under the (.*) column is the same as I noted above$/, bookingJobPO.checkNotedTableDetails);
    Then(/^I should\s?(not)? see the attachment icons under Attached column number '(.*)'$/, bookingJobPO.checkAttachmentIcons);
    Then(/^I should be on the payroll and billing page$/, bookingPayrollPO.verify);
    Then(/^I verify that payroll '(.*)' input fields are non editable$/, bookingPayrollPO.checkReadonlyFields);
    Then(/^I verify that payroll '(.*)' input fields have zero value$/, bookingPayrollPO.checkInputValues);
    Then(/^I should get a valid payroll save notification$/, bookingPayrollPO.getSuccessNotificationContent);
    Then(/^I can see that the bookable is (not)?\s?set/, createBookingPO.checkPresenceOfBookable);
});
