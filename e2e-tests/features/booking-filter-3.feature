Feature: Booking Filter

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 5 bookings

  @runThis
  Scenario: As a Booking Officer, I should be able to search bookings by external ref number and when I remove the external ref number then all bookings should be displayed
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I am shown with 5 booking
    And I click on an individual booking
    Then I am on the individual booking page
    And I click on link 'Booking details'
    Then I should be on the edit booking page
    And I change the input field EXT. REFERENCE NUM with INV-909
    And I click the create booking button
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to create booking?', I approve it
    Then I wait for 1200 milli-seconds
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
    Then I should get a valid booking update notification
    Then I am on the individual booking page
    Then I click on Bookings
    When I am on the bookings page
    Then I am shown with 5 booking
    When I query search with 'INV-909'
    Then I am shown with 1 booking
    And I click on an individual booking
    Then I am on the individual booking page
    And I click on link 'Booking details'
    Then I should be on the edit booking page
    And The field 'ext_ref_num' will be populated with 'INV-909'
    Then I click on Bookings
    When I am on the bookings page
    Then I am shown with 1 booking
    And The field 'search' will be populated with 'INV-909'
    When I query search with 'empty'
    Then I am shown with 5 booking

  @runThis
  Scenario: As a Organisational Representative, I should be able to search bookings by external ref number and when I remove the external ref number then all bookings should be displayed
    Given Assigned all bookings to Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 5 booking
    And I click on an individual booking
    Then I am on the individual booking page
    And I click on link 'Booking details'
    Then I should be on the edit booking page
    And I change the input field EXT. REFERENCE NUM with INV-909
    And I click the create booking button
    And If I am shown a popup, I approve it
    Then I should get a valid booking update notification
    Then I am on the individual booking page
    Then I click on Bookings
    When I am on the bookings page
    Then I am shown with 5 booking
    When I query search with 'INV-909'
    Then I am shown with 1 booking
    And I click on an individual booking
    Then I am on the individual booking page
    And I click on link 'Booking details'
    Then I should be on the edit booking page
    And The field 'ext_ref_num' will be populated with 'INV-909'
    Then I click on Bookings
    When I am on the bookings page
    Then I am shown with 1 booking
    And The field 'search' will be populated with 'INV-909'
    When I query search with 'empty'
    Then I am shown with 5 booking

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by job ids
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I am shown with 5 booking
    When I hover on the Status dropdown and select 'Red'
    Then I am shown with 1 booking
    Then I see one row with status 'red'
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    Then I click on Bookings
    And I am on the bookings page
    Then I am shown with 1 booking
    Then I see one row with status 'red'

  @runThis
  Scenario: As Administrator, I should be able to filter bookings when I click on linked id
    Given I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I am shown with 5 booking
    When I click on table header 'Job'
    And I click on element by id 'linkId_0'
    Then I am shown with 1 booking
    And I can see the input with name 'booking_ids' has text '#1'

  @runThis
  Scenario: As a Administrator, I should be able to see filtered bookings from today to future automaticaly when login
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    Then I can see that date_from is preseleted with current date

  @ignoreThis
  Scenario: As a Booking Officer, I can create a booking for Organisational Representative with old date and I should be able to filter the bookings by today's date onward
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with yesterday date
    And I select the bookable for org rep
    And I click on checkbox name 'tnc'
    When I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    When I query search with empty date
    Then I am shown with 6 booking

  @runThis
  Scenario: As a Administrator, I should be able to submit the search when i change the text and i click out of the text box
    Given I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I am shown with 5 booking
    Then I fill the field 'organisation' with value 'Ted'
    And I click out of the text box
    Then I am shown with 5 booking
    Then I fill the field 'organisation' with value 'thisiswrongvalue'
    And I click out of the text box
    Then I am shown with 0 booking
    And I empty the search field 'organisation'
    And I click out of the text box
    Then I am shown with 5 booking
    Then I fill the field 'client_name' with value 'Charles Barkley'
    And I click out of the text box
    Then I am shown with 5 booking
    Then I fill the field 'client_name' with value 'thisiswrongvalue'
    And I click out of the text box
    Then I am shown with 0 booking
    And I empty the search field 'client_name'
    Then I am shown with 5 booking
    Then I fill the field 'suburb' with value 'Parkville'
    And I click out of the text box
    Then I am shown with 5 booking
    Then I fill the field 'suburb' with value 'thisiswrongvalue'
    And I click out of the text box
    Then I am shown with 0 booking
    And I empty the search field 'suburb'
    Then I am shown with 5 booking
    Then I fill the field 'interpreter_name' with value 'thisiswrongvalue'
    And I click out of the text box
    Then I am shown with 0 booking
    And I empty the search field 'interpreter_name'
    Then I am shown with 5 booking
    Then I fill the field 'booking_ids' with value 'thisiswrongvalue'
    And I click out of the text box
    Then I am shown with 0 booking
    And I empty the search field 'booking_ids'
    Then I am shown with 5 booking
    Then I fill the field 'search' with value 'INV-909'
    Then I am shown with 5 booking
    Then I fill the field 'search' with value 'thisiswrongvalue'
    And I click out of the text box
    Then I am shown with 0 booking

      @runThis
  Scenario: As a Administrator, filter for date should only submit date after clicked out or pressed enter
    Given I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I am shown with 5 booking
    When I query search with future date
    And I click out of the text box
    Then I am shown with 0 booking
    When I query search with current date manually
    And I press enter
    Then I am shown with 5 booking