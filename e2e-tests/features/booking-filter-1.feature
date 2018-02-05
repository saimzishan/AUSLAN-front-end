Feature: Booking Filter

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 5 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by job ids
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I query booking with booking id
    Then I am shown with 1 booking
    Then I see one row with the booking id

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by job ids
    Given There exist 7 bookings
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I am shown with 10 booking
    Then I can count the element with css 'span.show-for-sr' to be '4'
    Then I click on parent of '3' element with css 'span.show-for-sr'
    When I hover on the Status dropdown and select 'Red'
    Then I am shown with 1 booking
    Then I see one row with status 'red'
    Then I can see the element with css 'span.show-for-sr' is 'hidden'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by job ids
    Given There exist 7 bookings
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I am shown with 10 booking
    Then I can count the element with css 'span.show-for-sr' to be '4'
    When I hover on the Status dropdown and select 'Red'
    Then I am shown with 1 booking
    Then I see one row with status 'red'
    Then I can see the element with css 'span.show-for-sr' is 'hidden'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by booking status
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I hover on the Status dropdown and select 'Red'
    Then I am shown with 1 booking
    Then I see one row with status 'red'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by booking status
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I hover on the Status dropdown and select 'Green'
    Then I am shown with 4 bookings
    Then I see 4 rows with status 'green'

  @runThis
  Scenario: Given 1 verified Booking Officer, 1 verified Interpreter exists, I should be able to filter by booking state
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
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
    Then I see one row with state 'In progress'
    When I hover on the State dropdown and select 'In progress'
    Then I am shown with 1 booking
    Then I see one row with state 'In progress'

  @runThis
  Scenario: Given 1 verified Booking Officer, 1 verified Interpreter exists, I should be able to filter by booking state
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
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

  @runThis
  Scenario: Given 1 verified Booking Officer, 1 verified Organisational Representative, I should be able to filter by org name
    Given One booking has org name as 'Agen'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I query booking with org name 'Agen'
    Then I am shown with 1 booking
    Then I see one row with org name 'Agen'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by client first name
    Given One booking has client name as 'Siyu'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I query booking with client name 'Siyu'
    Then I am shown with 1 booking
    Then I see one row with client name 'Siyu'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by client last name
    Given One booking has client last name as 'Papu'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I query booking with client name 'Papu'
    Then I am shown with 1 booking
    Then I see one row with client last name 'Papu'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by booking method
    Given The booking has method type 'VRI'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I am shown with 5 bookings
    When I hover on the Method dropdown and select 'VRI'
    Then I am shown with 1 booking
    Then I see one row with method 'VRI'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by booking status
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I am shown with 5 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I click on checkbox name 'cbCaptioning'
    And I verify checkbox name 'cbCaptioning' is checked 'true'
    And I verify checkbox name 'cbAuslan' is checked 'false'
    Then I fill the field 'captioner_count' with value '2'
    When I click on BUTTON 'SAVE'
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
    Then I should get a valid booking update notification
    When I click on Bookings
    Then I am on the bookings page
    And I am shown with 5 bookings
    When I hover on the Service Type dropdown and select 'CAPTIONING'
    Then I am shown with 1 booking
#    Then I see one row with status 'VRI'