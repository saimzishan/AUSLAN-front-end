Feature: Booking Admin Management

  Background: I as an ADMIN should be able to see version get to login page
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Administrator cancel the INPROGRESS to unable to service action, Interpreter exists and a booking is created, Version history is shown
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I see one row with state 'Requested'
    And I will be shown with bookings
    And I click on an individual booking of type 'Requested'
    And I will be shown the booking job page
    And I can see the button 'Save' is disabled
    And I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    And I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    And I get a valid invite notification
    And I click on Bookings
    And I am on the bookings page
    And I see one row with state 'In progress'
    And I click on an individual booking of type 'In progress'
    And I will be shown the booking job page
    And The version history with name 'data_action' at index '0' with text 'Created by'
    And The version history with name 'data_action' at index '0' with text 'System'
    And The version history with name 'data_action' at index '1' with text 'Updated by'
    And The version history with name 'data_action' at index '1' with text 'robin Administrator'
    And The version history with name 'data_changes' at index '1' with text 'State: Requested to In Progress'
    And The version history with name 'data_changes' at index '1' with text 'Invite Url: [blank] to http://localhost:49152/#/booking-management/'
    And The version history with name 'data_changes' at index '1' with text 'job-detail'