Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

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
    Then I wait for 1200 milli-seconds
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
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
    Then I get a valid 'Cancelled with No Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled no charge'

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