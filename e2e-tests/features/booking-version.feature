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
    And The booking has a created version entry