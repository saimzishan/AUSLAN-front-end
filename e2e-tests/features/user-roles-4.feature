Feature: User Role and Permissions Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given an Organisational Representative, As an Individual Client I should not be able to see bookings created by Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I select the bookable for org rep
    And I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Individual Client credentials
    Then I am on the bookings page
    Then I do not see any booking rows

  @runThis
  Scenario: Given an Organisational Representative, As an Individual Client I should not be able to see bookings created by Booking Officer
    Given I exist as a Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I select the bookable for org rep
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Individual Client credentials
    Then I am on the bookings page
    Then I do not see any booking rows

  @runThis
  Scenario: Given 1 verified Organisational Representative, 1 verified Interpreter, 1 verified Administrator, 1 verified Individual Client and a booking is created, as an Individual Client I should not be able to see bookings of Interpreter
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    Then I see one row with state 'Requested'
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
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Individual Client credentials
    Then I am on the bookings page
    Then I do not see any booking rows

  @runThis
  Scenario: Given 1 verified Individual Client, As an Individual Client I should be able to see bookings created by me
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    Then I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I click on element by name 'rdBookingAddressNo'
    And I click on element by name 'rdStandardInvoiceNo'
    Then I fill New Booking form fields correctly
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
