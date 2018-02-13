Feature: As INTERPRETER OR BOOKING OFFICER OR ADMIN, I can CRUD INTERPRETER BOOKING ON DESKTOP


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
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'

  @ignoreThis
  Scenario: As Administrator I can crud INTERPRETER blockouts on desktop
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
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent
    And I can click the element with css 'span.fc-title' and text singleEvent
    And I wait for 500 milli-seconds
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent1'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully updated'
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent1
    And I can click the element with css 'span.fc-title' and text singleEvent1
    And I wait for 500 milli-seconds
    And I will be taken to blockout page
    Then I wait for 5000 milli-seconds
    And I click on BUTTON name 'delete_blockout'
    And I will be shown a popup message 'Do you really want to delete this blockout?'
    And I click on BUTTON name 'yesBtn'
    And I get success message: 'Blockout successfully deleted'
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I can count the element with css 'span.fc-title' to be '0'

  @ignoreThis
  Scenario: As Booking Officer I can crud INTERPRETER blockouts on desktop
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And I sign in with valid Booking Officer credentials
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
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent
    And I can click the element with css 'span.fc-title' and text singleEvent
    And I wait for 500 milli-seconds
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent1'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully updated'
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent1
    And I can click the element with css 'span.fc-title' and text singleEvent1
    And I wait for 500 milli-seconds
    And I will be taken to blockout page
    Then I wait for 5000 milli-seconds
    And I click on BUTTON name 'delete_blockout'
    And I will be shown a popup message 'Do you really want to delete this blockout?'
    And I click on BUTTON name 'yesBtn'
    And I get success message: 'Blockout successfully deleted'
    And I am on the 'User Management' list page
    When I hover on the 'Actions' of the Interpreter
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I can count the element with css 'span.fc-title' to be '0'

  @ignoreThis
  Scenario: As INTERPRETER, I can create edit and delete blockout on desktop
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I click on BUTTON name 'save_blockout'
    And I get error message: 'Oops! Please fill in all the fields correctly.'
    And I click on BUTTON name 'cancel_blockout'
    And I will be taken to my individual profile page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent
    And I can click the element with css 'span.fc-title' and text singleEvent
    And I wait for 500 milli-seconds
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent1'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully updated'
    And I will be taken to my individual profile page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent1
    And I can click the element with css 'span.fc-title' and text singleEvent1
    And I wait for 500 milli-seconds
    And I will be taken to blockout page
    Then I wait for 5000 milli-seconds
    And I click on BUTTON name 'delete_blockout'
    And I will be shown a popup message 'Do you really want to delete this blockout?'
    And I click on BUTTON name 'yesBtn'
    And I get success message: 'Blockout successfully deleted'
    And I will be taken to my individual profile page
    And I can count the element with css 'span.fc-title' to be '0'

  @ignoreThis
  Scenario: As INTERPRETER, I cannot create a blockout and if i have accepted same time booking alread, a booking is created and Booking Officer, Individual Client exists
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I see one row with state 'Requested'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I hover on the 'Profile'
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I can see the booking state 'In Progress'
    Then I can see the button 'Accept' is enabled
    Then I click on button 'Accept'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I can see the booking state 'Allocated'
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I enter blockout details with booking time same as booking
    And I enter blockout name 'singleEvent'
    And I wait for 300 milli-seconds
    And I click on BUTTON name 'save_blockout'
    And I get error message: 'Existing booking during blockout time. Blockout not changed'

  @ignoreThis
  Scenario: As INTERPRETER, I can create a blockout and cannot be allocated to a booking, a booking is created and Booking Officer, Individual Client exists
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I enter blockout details with booking time same as booking
    And I enter blockout name 'singleEvent'
    And I wait for 300 milli-seconds
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent
    And I click on my name in the top corner
    And I click on logout
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
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
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    And I click on my name
    And I click on logout
    And I go to the website
    And I am shown the login screen, with picture and signup button
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
    And I wait for 3000 milli-seconds
    And I get error message: 'Unprocessable Entity You have a blockout at this time. Please remove the blockout before accepting the booking'

@runThis
  Scenario: As INTERPRETER, I can create edit blockout on desktop to check whether the end time changes or not
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to blockout page
    And I enter blockout name 'singleEvent'
    Then I check that the end time is greater then start time
    Then I change the value of end time
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'