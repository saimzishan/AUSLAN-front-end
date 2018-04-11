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
    When I refresh
    And I enter blockout name 'singleEvent'
    And I click on BUTTON 'SAVE'
    And I get success message: 'Staff Availability successfully added'

  @runThis
  Scenario: As Administrator I can add recurring INTERPRETER STAFF-AVAILABILITY on desktop
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
    When I refresh
    Then I can see the button state 'ADD STAFF AVAILABILITY' is enabled
    Then I fill the field 'blockout_name' with value 'test-blockout'
    Then I check that the start time and end time is 6:25am - 7:25am
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
    When I refresh
    When I wait for 5000 milli-seconds
    Then I click on button with css '.fc-listYear-button'
    Then I can count the element with css '.fc-list-heading-main' to be greater than '6'
    Then I can see the time in full calendar is '6:25am - 7:25am'
    Then I click on element with css '.fc-list-item-title'
    Then I will be taken to staff-calendar page
    When I wait for 10000 milli-seconds
    Then I check the value of endTime is '07:25 AM'
    Then I check the value of availability is 'test-blockout'
    Then I see selected option 'WEEKLY' in dropdown
    When I verify material checkbox name 'Monday' is checked 'true'
    When I verify material checkbox name 'Tuesday' is checked 'true'
    When I verify material slide-toggle name 'sldRecurring' is disabled 'true'
    And I can see the element with name 'save_blockout' is 'not visible'

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
    Then I check that the start time and end time is 6:25am - 7:25am
    Then I click on BUTTON name 'sldRecurring'
    When I select option WEEKLY from dropdown FREQUENCY
    Then I change the value of end date
    And I click on BUTTON name 'save_blockout'
    And I get error message: 'Oops! Please fill in all the fields correctly.'
    Then I click on material checkbox name 'Monday'
    Then I click on material checkbox name 'Tuesday'
    Then I change the value of end date
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'
    Then I click on element with css 'button.fc-listYear-button.fc-button.fc-state-default'
    Then I can count the element with css 'tr.fc-list-item' to be greater than '2'
    Then I can see the time in full calendar is '6:25am - 7:25am'
    Then I click on element with css '.fc-list-item-title'
    And I will be taken to blockout page
    Then I check the value of endTime is '07:25 AM'
    Then I check the value of availability is 'test-blockout'
    Then I see selected option 'WEEKLY' in dropdown
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
    Then I check that the start time and end time is 6:25am - 7:25am
    Then I wait for 1000 milli-seconds
    Then I set the start time without year
    Then I wait for 1000 milli-seconds
    Then I set the start time with wrong month
    Then I wait for 1000 milli-seconds
    Then I set the start time with wrong day
    Then I wait for 1000 milli-seconds
    Then I set the start time with wrong year
    Then I wait for 1000 milli-seconds
    Then I set the start time with wrong input
