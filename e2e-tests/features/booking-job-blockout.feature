Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given 1 verified Booking Officer, The invite, assign button should be hidden
    Given I exist as an Booking Officer
    Given I create the interpreter of type 'blocked'
    And I wait for 1200 milli-seconds
    And I verify all Interpreters
    And I wait for 1200 milli-seconds
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I can see the button state 'Assign' is visible
    Then I can see the button state 'Invite' is visible
    Then I select 1 Interpreter
    Then I can see the button state 'Invite' is hidden
    Then I can see the button state 'Assign' is hidden

  @runThis
  Scenario: Given 1 verified Booking Officer, The invite , assign button should be hidden
    Given I exist as an Booking Officer
    Given I create the interpreter of type 'booked'
    And I wait for 1200 milli-seconds
    And I verify all Interpreters
    And I wait for 1200 milli-seconds
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I can see the button state 'Assign' is visible
    Then I can see the button state 'Invite' is visible
    Then I select 1 Interpreter
    Then I can see the button state 'Invite' is hidden
    Then I can see the button state 'Assign' is hidden

  @runThis
  Scenario: Given 1 verified Booking Officer, The invite button should be hidden
    Given I exist as an Booking Officer
    Given I create the interpreter of type 'blockout'
    And I wait for 1200 milli-seconds
    And I verify all Interpreters
    And I wait for 1200 milli-seconds
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I can see the button state 'Assign' is visible
    Then I can see the button state 'Invite' is visible
    Then I select 1 Interpreter
    Then I can see the button state 'Invite' is hidden

  @runThis
  Scenario: Given 1 verified Booking Officer, The accept should show a dialogbox
    Given I exist as an Booking Officer
    Given I create the interpreter of type 'blockout'
    And I wait for 1200 milli-seconds
    And I verify all Interpreters
    And I wait for 1200 milli-seconds
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I can see the button state 'Assign' is visible
    Then I can see the button state 'Invite' is visible
    Then I select 1 Interpreter
    And I click on BUTTON name 'Assign'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'

  @runThis
  Scenario: Given 1 verified Booking Officer and INTERPRETER, INTERPRETER1 created, a booking is created then assign hides when select more then booking required
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I see one row with state 'Requested'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I can see the button state 'Assign' is visible
    Then I can see the button state 'Invite' is visible
    Then I select 2 Interpreter
    Then I can see the button state 'Invite' is visible
    Then I can see the button state 'Assign' is hidden
    Then I select 1 Interpreter
    Then I can see the button state 'Assign' is visible
