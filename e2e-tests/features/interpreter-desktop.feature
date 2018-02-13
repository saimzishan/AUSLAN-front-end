Feature: As INTERPRETER, I can login on mobile

  Background: As INTERPRETER i am on mobile, before any steps
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: As INTERPRETER, I can accept the booking, if a booking with two interpreters is created and INTERPRETER Invited then
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'In progress'
    And  I click on an individual booking of type 'In progress'
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Accept' is visible
    Then I can see the button state 'Decline' is visible
    Then I click on BUTTON 'Accept'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Decline' is visible
    Then I can see the button state 'Accept' is hidden
    Then I click on BUTTON 'Decline'
    Then I will be shown a popup message 'Please contact the booking office to cancel this booking.'
    Then I click on BUTTON name 'yesBtn'
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Decline' is visible
    Then I can see the button state 'Accept' is hidden
    Then I click on BUTTON 'Decline'
    Then I will be shown a popup message 'Please contact the booking office to cancel this booking.'
    Then I click on BUTTON name 'noBtn'
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Decline' is visible
    Then I can see the button state 'Accept' is hidden


  @runThis
  Scenario: As INTERPRETER, I cannot accept/decline if the booking is allocated, if a booking is created and INTERPRETER Invited then
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'In progress'
    And  I click on an individual booking of type 'In progress'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Accept' is visible
    Then I can see the button state 'Decline' is visible
    Then I click on BUTTON 'Accept'
    Then If I am shown popups, I approve all of them
    Then I wait for 1000 milli-seconds
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden


  @runThis
  Scenario: As INTERPRETER, I cannot do anything after decline and allocated, if a booking is created and INTERPRETER_ALL Invited and INTERPRETER1 exists then
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'In progress'
    And  I click on an individual booking of type 'In progress'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Accept' is visible
    Then I can see the button state 'Decline' is visible
    Then I click on BUTTON 'Decline'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1000 milli-seconds
    Then I can see the booking state ' In Progress ' in booking job page
    And I click on my name
    And I click on logout
    And I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And I sign in with valid Interpreter1 credentials
    Then I will be shown the bookings page
    Then I see one row with state 'In progress'
    And  I click on an individual booking of type 'In progress'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Accept' is visible
    Then I can see the button state 'Decline' is visible
    Then I click on BUTTON 'Accept'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1500 milli-seconds
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden
    And I click on my name
    And I click on logout
    And I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I do not see any booking rows
