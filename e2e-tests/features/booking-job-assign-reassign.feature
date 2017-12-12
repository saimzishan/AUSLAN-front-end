Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button


  # =================== IN PROGRESS to ALLOCATED ===============================
  @runThis
  Scenario: Given 1 verified Administrator, 1 verified Interpreter and a booking is created, Booking should transition to allocated when Interpreter accepts the invitation
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
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

    # =================== IN PROGRESS to ALLOCATED ===============================
  @runThis
  Scenario: As INTERPRETER, I have not accept or decline, but admin can Assign directly, if a booking is created and INTERPRETER Invited and Administrator exists then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 1 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden


  # =================== ALLOCATED to IN PROGRESS ===============================
  @runThis
  Scenario: As INTERPRETER, I have accepted e, but admin can UnAssign directly, if a booking is created and INTERPRETER Invited and Administrator exists then
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
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1000 milli-seconds
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden
    Then I click on my name
    And I click on logout
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on an individual booking of type 'Allocated'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 1 interpreter has accepted the booking
    And I click on BUTTON name 'unassingBtn_1'
    Then I wait for 1000 milli-seconds
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been unassigned'
    Then I wait for 5000 milli-seconds
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'


  # =================== ALLOCATED to IN PROGRESS to ALLOCATED SINGLE INTERPRETER ===============================
  @runThis
  Scenario: As INTERPRETER, I cannot accept booking to allocated, but admin can UnAssign and ReAssign that, if a booking is created and INTERPRETER Invited and Administrator exists then
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
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1500 milli-seconds
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden
    Then I click on my name
    And I click on logout
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on an individual booking of type 'Allocated'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 1 interpreter has accepted the booking
    And I click on BUTTON name 'unassingBtn_1'
    Then I wait for 1000 milli-seconds
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 100 milli-seconds
    Then I get valid message: 'The interpreter have been unassigned'
    Then I wait for 5000 milli-seconds
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 100 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 1 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'


  # =================== ALLOCATED to IN PROGRESS to ALLOCATED MULTIPLE INTERPRETER ===============================
  @runThis
  Scenario: As INTERPRETER, I cannot accept booking to allocated, but admin can UnAssign and ReAssign that, if a booking with two interpreters is created and INTERPRETER_ALL Invited INTERPRETER1 and Administrator exists then
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
    Then I wait for 1000 milli-seconds
    Then I can see the booking state ' In Progress ' in booking job page
    Then I can see the button state 'Decline' is visible
    Then I can see the button state 'Accept' is hidden
    Then I click on my name
    And I click on logout
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
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden
    Then I click on my name
    And I click on logout
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on an individual booking of type 'Allocated'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 2 interpreter has accepted the booking
    And I click on BUTTON name 'unassingBtn_1'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been unassigned'
    Then I wait for 5000 milli-seconds
    Then I see 1 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    And I click on BUTTON name 'unassingBtn_1'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been unassigned'
    Then I wait for 5000 milli-seconds
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I can see the button 'Save' is disabled
    Then I select 2 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 2 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'

  ########### ERROR HANDLING #######################################
  @runThis
  Scenario: As Administrator, I cannot assign two interpreter if booking need one and if a booking is created and INTERPRETER_ALL Invited and INTERPRETER1 exists then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I can see the button 'Save' is disabled
    Then I select 2 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get invalid message: 'You can only allocate 1 interpreter(s)'
    And I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'

  ########### REQUESTED TO ALLOCATED SINGLE INTERPRETER WITH INVITE #######################################

  @runThis
  Scenario: As Administrator, I can assign  uninvited with invite interpreter if a booking is created and INTERPRETER exists then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Requested'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'Requested'
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get a valid invite notification
    Then I can see the booking state 'In Progress'
    Then I can see the button 'Save' is disabled
    Then I wait for 1500 milli-seconds
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 1 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden

  ########### REQUESTED TO ALLOCATED MULTIPLE INTERPRETER WITH INVITE  #######################################
  @runThis
  Scenario: As Administrator, I can assign  multiple uninvited with invite interpreter if a booking with two interpreters is created and INTERPRETER and INTERPRETER1 exists then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Requested'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'Requested'
    Then I can see the button 'Save' is disabled
    Then I select 2 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get a valid invite notification
    Then I can see the booking state 'In Progress'
    Then I can see the button 'Save' is disabled
    Then I wait for 1500 milli-seconds
    Then I select 2 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 2 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden

  ########### REQUESTED TO ALLOCATED SINGLE INTERPRETER WITHOUT INVITE #######################################

  @runThis
  Scenario: As Administrator, I can assign uninvited with invite interpreter if a booking is created and INTERPRETER exists then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Requested'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'Requested'
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 1 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden

  ########### REQUESTED TO ALLOCATED MULTIPLE INTERPRETER WITHOUT INVITE  #######################################
  @runThis
  Scenario: As Administrator, I can assign multiple uninvited with invite interpreter if a booking with two interpreters is created and INTERPRETER and INTERPRETER1 exists then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Requested'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'Requested'
    Then I can see the button 'Save' is disabled
    Then I select 2 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 2 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden

  ########### IN PROGRESS TO ALLOCATED SINGLE INTERPRETER #######################################

  @runThis
  Scenario: As INTERPRETER, I have not accept or decline, but admin can Assign directly, if a booking is created and INTERPRETER Invited and Administrator exists then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 1 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden

  ########### IN PROGRESS TO ALLOCATED MULTIPLE INTERPRETER #######################################

  @runThis
  Scenario: As INTERPRETER, I have not accept or decline, but Administrator can Assign directly, if a booking with two interpreters is created and INTERPRETER and INTERPRETER1 exists and INTERPRETER_ALL Invited then
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'In progress'
    Then I click on an individual booking of type 'In progress'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I can see the button 'Save' is disabled
    Then I select 2 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 2 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden
    Then I click on my name
    And I click on logout
    And I sign in with valid Interpreter1 credentials
    Then I will be shown the bookings page
    Then I see one row with state 'Allocated'
    And  I click on an individual booking of type 'Allocated'
    Then I wait for 2000 milli-seconds
    Then I will be shown the booking detail page with id -1
    Then I can see the booking state ' Allocated ' in booking job page
    Then I can see the button state 'Decline' is hidden
    Then I can see the button state 'Accept' is hidden
    Then I click on my name
    And I click on logout
    # TODO - Once we have a way in UI to see which interpreter has been invited and which are not, we should add more case above in context of selecting uninvited ones for assign
