Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

    ########### IN PROGRESS TO UNABLE TO SERVICE #######################################
  @runThis
  Scenario: Administrator can INPROGRESS to unable to service a booking, Interpreter exists and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
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
  Scenario: Administrator cancel the INPROGRESS to unable to service action, Interpreter exists and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
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
  Scenario: Booking Officer can INPROGRESS to unable to service a booking, Interpreter exists and a booking is created
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
  Scenario: Booking Officer cancel the INPROGRESS to unable to service action, Interpreter exists and a booking is created
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
  Scenario: Administrator can REQUESTED to unable to service a booking, Interpreter exists and a booking is created and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
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
  Scenario: Administrator can cancel REQUESTED to the unable to service action, Interpreter exists and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
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


  @ignoreThis
  Scenario: Booking Officer can REQUESTED to the unable to service a booking, Interpreter exists and a booking is created
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
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
  Scenario: Booking Officer cancel the REQUESTED to the unable to service action, Interpreter exists and a booking is created
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
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
  Scenario: Administrator can the REQUESTED to Cancel Booking action, Interpreter exists and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
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
  Scenario: Administrator cancel the REQUESTED to Cancel Booking action, Interpreter exists and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
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
  Scenario: Booking Officer can REQUESTED to Cancel Booking action, Interpreter exists and a booking is created
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
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
  Scenario: Booking Officer cancel the REQUESTED to Cancel Booking action, Interpreter exists and a booking is created
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
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
  Scenario: Administrator can the INPROGRESS to Cancel Booking action, Interpreter exists and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
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
  Scenario: Administrator cancel the INPROGRESS to Cancel Booking action, Interpreter exists and a booking is created
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
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
  Scenario: Booking Officer can INPROGRESS to Cancel booking, Interpreter exists and a booking is created
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
  Scenario: Booking Officer cancel the INPROGRESS to Cancel Booking action, Interpreter exists  and a booking is created
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
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

    @runThis
    Scenario: As an Organisational Representative, I should see the correct details of the booking
      Given There exist 1 bookings
      And Assigned all bookings to Organisational Representative
      Given I exist as an Organisational Representative
      When I sign in with valid Organisational Representative credentials
      Then I am on the bookings page
      When I click on an individual booking
      Then I will be shown the booking job page
      Then I should see the value under Org column as 'Curve Tomorrow'

    @runThis
    Scenario: As a Booking Officer I should see the correct org name of the booking
      Given There exist 1 bookings
      Given I exist as a Booking Officer
      When I sign in with valid Booking Officer credentials
      Then I am on the bookings page
      When I click on an individual booking
      Then I will be shown the booking job page
      Then I should see the value under Org column as 'Ted Bear'

    @runThis
    Scenario: As a Booking Officer I should see the correct suburb of the booking
      Given There exist 1 bookings
      Given I exist as a Booking Officer
      When I sign in with valid Booking Officer credentials
      Then I am on the bookings page
      When I click on an individual booking
      Then I will be shown the booking job page
      Then I should see the value under Suburb column as 'Parkville'

    @runThis
    Scenario: As a Booking Officer I should see the correct suburb of the booking
      Given There exist 1 bookings
      Given I exist as a Booking Officer
      When I sign in with valid Booking Officer credentials
      Then I am on the bookings page
      When I click on an individual booking
      Then I will be shown the booking job page
      Then I should see the value under Type column as 'Medical'

    @runThis
    Scenario: As a Booking Officer I should see the correct Job number of the booking
      Given There exist 1 bookings
      Given I exist as a Booking Officer
      When I sign in with valid Booking Officer credentials
      Then I am on the bookings page
      When I click on an individual booking
      Then I will be shown the booking job page
      And I note the value under Job column
      When I click on link 'Booking details'
      Then I should be on the edit booking page
      When I click on link 'Booking info'
      Then I am on the individual booking page
      And The value under the Job column is the same as I noted above

    @runThis
    Scenario: As a Booking Officer I should see an attchment icon if the booking has attachment
      Given There exist 1 bookings
      Given I exist as a Booking Officer
      When I sign in with valid Booking Officer credentials
      Then I am on the bookings page
      When I click on an individual booking
      Then I am on the individual booking page
      And I should not see the attachment icons under Attached column
      When I click on link 'Booking details'
      Then I should be on the edit booking page
      And I will upload a document 'sushi.pdf'
      When I will see attachment 'sushi.pdf'
      Then I will close the file upload
      And I click on checkbox name 'tnc'
      And I click the create booking button
      And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to create booking?', I approve it
      Then I should get a valid booking update notification
      Then I am on the individual booking page
      Then I click on Bookings
      And I am on the bookings page
      When I click on an individual booking
      Then I am on the individual booking page
      Then I should see the attachment icons under Attached column

  ########### REQUESTED TO CANCEL for linked bookings #######################################

  @runThis
  Scenario: Booking Officer can CANCEL a booking having linked id
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled'

  ########### REQUESTED TO Unable to service for linked bookings ###############################

  @runThis
  Scenario: Booking Officer can Unable to service a booking having linked id
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message 'Would you like to mark this booking as unable to service, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Unable to service'

  @runThis
  Scenario: Given 1 verified Interpreter, Interpreter1 and Interpreter2 exists and a booking is created, Administrator can see distance and travel pay status
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I see one row with state 'Requested'
    And I click on an individual booking of type 'Requested'
    And I will be shown the booking job page
    And I can see the button 'Save' is disabled
    And I can see a list of 3 verified interpreters with distance and travel pay
    And I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get a valid invite notification
    Then I can see the booking state 'In Progress'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'