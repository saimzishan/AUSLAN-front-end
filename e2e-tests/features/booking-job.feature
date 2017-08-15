Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

    ########### IN PROGRESS TO UNABLE TO SERVICE #######################################
  @runThis
  Scenario: Administrator can INPROGRESS to unable to service a booking, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Unable to Service'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Unable to service'

  @runThis
  Scenario: Administrator cancel the INPROGRESS to unable to service action, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Unable to Service' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'


  @runThis
  Scenario: Booking Officer can INPROGRESS to unable to service a booking, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Unable to Service'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Unable to service'

  @runThis
  Scenario: Booking Officer cancel the INPROGRESS to unable to service action, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Unable to Service' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'

    ########### REQUESTED TO UNABLE TO SERVICE #######################################

  @runThis
  Scenario: Administrator can REQUESTED to unable to service a booking, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Unable to Service'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Unable to service'

  @runThis
  Scenario: Administrator can cancel REQUESTED to the unable to service action, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Unable to Service' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Requested'


  @runThis
  Scenario: Booking Officer can REQUESTED to the unable to service a booking, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Unable to Service'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Unable to service'

  @runThis
  Scenario: Booking Officer cancel the REQUESTED to the unable to service action, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Unable to Service' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Requested'

    ########### REQUESTED TO CANCEL #######################################

  @runThis
  Scenario: Administrator can the REQUESTED to Cancel Booking action, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Cancelled'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled'

  @runThis
  Scenario: Administrator cancel the REQUESTED to Cancel Booking action, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Cancel Booking' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Requested'

  @runThis
  Scenario: Booking Officer can REQUESTED to Cancel Booking action, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Cancelled'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled'

  @runThis
  Scenario: Booking Officer cancel the REQUESTED to Cancel Booking action, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I see one row with state 'Requested'
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Cancel Booking' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Requested'


    ########### IN PROGRESS TO CANCEL #######################################


  @runThis
  Scenario: Administrator can the INPROGRESS to Cancel Booking action, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Cancelled'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled'

  @runThis
  Scenario: Administrator cancel the INPROGRESS to Cancel Booking action, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Cancel Booking' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'

  @runThis
  Scenario: Booking Officer can INPROGRESS to Cancel booking, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Cancelled'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled'

  @runThis
  Scenario: Booking Officer cancel the INPROGRESS to Cancel Booking action, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
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
    Then I will be shown the booking job page
    Then I can see the booking state 'In Progress'
    Then I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Cancel Booking' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'

  @runThis
  Scenario: Given 1 verified Interpreter and a booking is created, Administrator can transition a booking from Requested to In Progress
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
    Then I get a valid invite notification
    Then I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'

  @runThis
  Scenario: Given 1 verified Interpreter and a booking is created, Booking Officer can transition a booking from Requested to In Progress
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I see one row with state 'Requested'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get a valid invite notification
    Then I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'

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

  # =================== ALLOCATED to IN PROGRESS ===============================
  @runThis
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
    And I click on BUTTON name 'unassingBtn_01'
    Then I wait for 1000 milli-seconds
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been Un-Assigned'
    Then I wait for 5000 milli-seconds
    Then I see 0 interpreter has accepted the booking
    And I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'


  # =================== ALLOCATED to IN PROGRESS to ALLOCATED ===============================
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
    And I click on BUTTON name 'unassingBtn_01'
    Then I wait for 1000 milli-seconds
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been Un-Assigned'
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
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been Re-Assigned'
    Then I can see the booking state 'Allocated'
    Then I wait for 5000 milli-seconds
    Then I see 1 interpreter has accepted the booking
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Allocated'