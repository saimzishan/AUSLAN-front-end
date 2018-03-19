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
    Then I will be taken to staff-calendar page
    And I enter blockout name 'singleEvent'
    And I click on BUTTON 'SAVE'
    And I get success message: 'Staff Availability successfully added'

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
    Then I will be taken to staff-calendar page
    Then I fill the field 'blockout_name' with value 'test-blockout'
    Then I click on BUTTON name 'sldRecurring'
    When I select option WEEKLY from dropdown FREQUENCY
    Then I wait for 2000 milli-seconds
    Then I click on material checkbox name 'Monday'
    Then I click on material checkbox name 'Tuesday'
    Then I change the value of end date
    And I click on BUTTON 'SAVE'
    And I get success message: 'Staff Availability successfully added'
    Then I click on button with css '.fc-listYear-button'
    Then I can count the element with css '.fc-list-heading-main' to be greater than '6'

  @runThis
  Scenario: As Administrator I can add INTERPRETER blockouts on desktop
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
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I click on BUTTON name 'save_blockout'
    And I get error message: 'Oops! Please fill in all the fields correctly.'
    And I click on BUTTON name 'cancel_blockout'
    And I will be taken to the 'INTERPRETER Signup' page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    Then I fill the field 'blockout_name' with value 'test-blockout'
    Then I click on BUTTON name 'sldRecurring'
    When I select option WEEKLY from dropdown FREQUENCY
    Then I wait for 2000 milli-seconds
    Then I change the value of end date
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'
    Then I click on element with css 'button.fc-listYear-button.fc-button.fc-state-default'
    Then I can count the element with css 'tr.fc-list-item' to be greater than '2'
