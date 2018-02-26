Feature: As INTERPRETER OR BOOKING OFFICER OR ADMIN, I can CRUD INTERPRETER STAFF-AVAILABILITY ON DESKTOP
  @runThis
  Scenario: As Administrator I can add INTERPRETER STAFF-AVAILABILITY on desktop
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And I sign in with valid Administrator credentials
    Then I will be shown the bookings page
    When I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    When I click on the option  staff calender
    When I click on BUTTON 'ADD STAFF AVAILABILITY'
    And I wait for 1000 milli-seconds
    Then I will be taken to staff-calendar page
    And I enter blockout name 'singleEvent'
    And I click on BUTTON 'SAVE'
    And I get success message: 'Staff Availability successfully added'
