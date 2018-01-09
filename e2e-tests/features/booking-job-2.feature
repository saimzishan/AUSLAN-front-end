Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

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