Feature: Booking Filter

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 5 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, 1 verified Interpreter, I should be able to filter by interpreter first name
    Given One booking has interpreter first name as 'Rebecca'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I am shown with 5 booking
    When I query booking with interpreter name 'Rebecca'
    Then I am shown with 1 booking
    Then I see one row with interpreter first name 'Needs to be filled (1/3)'

  @runThis
  Scenario: Given 1 verified Booking Officer, 1 verified Interpreter, I should be able to filter by interpreter last name
    Given One booking has interpreter last name as 'Jones'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I am shown with 5 booking
    When I query booking with interpreter name 'Jones'
    Then I am shown with 1 booking
    Then I see one row with interpreter last name 'Needs to be filled (1/3)'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by suburb
    Given One booking has suburb as 'Terabithia'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I query booking with suburb 'Terabithia'
    Then I am shown with 1 booking
    Then I see one row with suburb 'Terabithia'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to reset status filter
    Given The booking has status 'green'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I hover on the Status dropdown and select 'Green'
    Then I am shown with 1 booking
    Then I see one row with status 'green'
    When I hover on the Status dropdown and select 'All'
    Then I am shown with 5 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, 1 verified Interpreter exists, I should be able to reset filter by booking state
    Given I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get a valid invite notification
    Then I click on Bookings
    And I am on the bookings page
    Then I see 4 rows with state 'Requested'
    When I hover on the State dropdown and select 'Requested'
    Then I am shown with 4 bookings
    Then I see 4 rows with state 'Requested'
    When I hover on the State dropdown and select 'All'
    Then I am shown with 5 bookings

    # Problem with the first Given is not setting the category correctly, will fix in future card
  @ignoreThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by booking type
    Given The booking has assignment category 'Police'
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I hover on the Type dropdown and select 'Medical'
    Then I am shown with 5 booking
    When I hover on the Type dropdown and select 'Police'
    And I wait for 5000 milli-seconds
    Then I am shown with 1 booking
    Then I see one row with type 'Police'
    When I hover on the Type dropdown and select 'All'
    Then I am shown with 5 bookings

  @ignoreThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by date range
    Given One booking has start and end dates as first and last days of next week
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I filter booking by date range first and last days of next week
    Then I am shown with 2 booking

  @ignoreThis
  Scenario: As an Individual Client, I should be able to filter by date range
    Given One booking has start and end dates as first and last days of next week
    And I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I filter booking by date range first and last days of next week
    Then I am shown with 2 booking

  @ignoreThis
  Scenario: As a Organisational Representative, I should be able to filter by date range
    Given Assigned all bookings to Organisational Representative
    And One booking has start and end dates as first and last days of next week
    And I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I am shown with 5 booking
    When I filter booking by date range first and last days of next week
    Then I am shown with 2 booking

  @runThis
  Scenario: As a Administrator, I should be able to search bookings by external ref number and when I remove the external ref number then all bookings should be displayed
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    Then I am shown with 5 booking
    And I click on an individual booking
    And I click on link 'Booking details'
    Then I should be on the edit booking page
    And I change the input field EXT. REFERENCE NUM with INV-909
    And I click the create booking button
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to update booking?', I approve it
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
