Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given a booking is created, As an Interpreter invited to the booking, I should see the correct suburb of the booking
    Given I exist as an Interpreter
    When I sign in with valid Interpreter credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    And I should see the value under Suburb column as 'Parkville'

  @runThis
  Scenario: As a Booking Officer I should see the correct type of the booking
    Given There exist 1 bookings
    Given I exist as a Booking Officer
    When I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I should see the value under Service Type column as 'Auslan'

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
    And I wait for 1000 milli-seconds
    And The value under the Job column is the same as I noted above

  @runThis
  Scenario: As a Booking Officer I should see an attchment icon if the booking has attachment
    Given There exist 1 bookings
    Given I exist as a Booking Officer
    When I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I should not see the attachment icons under Attached column number '14'
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will upload a document 'sushi.pdf'
    When I will see attachment 'sushi.pdf'
    Then I will close the file upload
    And I click on checkbox name 'tnc'
    And I click the create booking button
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to update booking?', I approve it
    Then I wait for 1200 milli-seconds
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
    Then I should get a valid booking update notification
    Then I am on the individual booking page
    Then I click on Bookings
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I should see the attachment icons under Attached column number '14'

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
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
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

  @ignoreThis
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

  @runThis
  Scenario: Booking Officer can CANCEL a booking having linked id with option Cancel only this booking and then Cancelled no charge for DSQ  with time greater then 24 hours
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I fill New Booking form fields correctly with DSQ state
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 24 hours.'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled with No Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled no charge'

  @runThis
  Scenario: Booking Officer can CANCEL a booking having linked id with option Cancel only this booking and then Cancelled charge for DSQ  with time greater then 24 hours
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I fill New Booking form fields correctly with DSQ state
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 24 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled chargeable'

  @ignoreThis
  Scenario: Booking Officer can CANCEL a booking having linked id with option Cancel only this booking and then Cancelled Chargeable for Vicdeaf with time less then 48 hours
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I update the booking to be within 48 hours with vicdeaf
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled Chargeable since the start date is within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled chargeable'

  @ignoreThis
  Scenario: Booking Officer can CANCEL a booking having linked id with option Cancel only this booking and then Cancelled No Charge for Vicdeaf with time less then 48 hours
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I update the booking to be within 48 hours with vicdeaf
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled Chargeable since the start date is within 48 hours.'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled with No Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled no charge'

  @runThis
  Scenario: Booking Officer can CANCEL a booking having linked id with option Cancel only this booking and then Cancelled Chargeable for Vicdeaf with time greater then 48 hours
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I fill New Booking form fields correctly with just vicdeaf
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled chargeable'

  @runThis
  Scenario: Booking Officer can CANCEL a booking having linked id with option Cancel only this booking and then Cancelled No Charge for Vicdeaf with time greater then 48 hours
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I fill New Booking form fields correctly with just vicdeaf
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled with No Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Cancelled no charge'
  
  @runThis
  Scenario: Booking Officer can Undo a booking having state Cancelled No chargeable
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I fill New Booking form fields correctly with DSQ state
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 24 hours.'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled with No Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    When I click on BUTTON 'Undo cancel'
    Then I can see the booking state 'Cancelled No Charge'

  @runThis
  Scenario: Booking Officer can Undo a booking having state Cancelled chargeable
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I fill New Booking form fields correctly with DSQ state
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 24 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    When I click on BUTTON 'Undo cancel'
    Then I can see the booking state 'In Progress'

  @runThis
  Scenario: Booking Officer can Unable to service a booking having linked id and can undo it
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
    When I click on BUTTON 'Undo cancel'
    Then I can see the booking state 'unable to service'

  @runThis
  Scenario: Booking Officer cannot Undo cancel booking if allocated interpreter is assign to another booking
    Given There exist 2 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    Then I click on Bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    Then I click on Bookings
    Then I click on an individual booking of type 'Cancelled chargeable'
    And I click on link 'Booking info'
    Then I will be shown the booking job page
    When I click on BUTTON 'Undo cancel'
    And I get error message: 'Existing booking or blockout during booking. Booking not changed'

  @runThis
  Scenario: Administrator will cancel booking with no charge, and all assign interpreters will remove
    Given There exist 1 booking with link id
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    When I click on BUTTON 'Cancel Booking'
    And If I am shown popups, I approve all of them
    Then I get a valid 'Cancelled with No Charge' notification for state
    And I can see the element with name 'unassingBtn_1' is 'not visible'

  @runThis
  Scenario: Administrator will cancel booking with charge, and all assign interpreters will shown
    Given There exist 1 booking with link id
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    And I can see the element with name 'unassingBtn_1' is 'visible'

  @runThis
  Scenario: Booking Officer can Undo cancel booking from cancelled chargeable and the interpreters should be allocated and their blockouts shown, exist Interpreter, Interpreter1, Interpreter2
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I can count the element with css 'span.pink' to be '0'
    Then I select 3 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'    
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    When I click on BUTTON 'Undo cancel'
    Then I get a valid 'Allocated' notification for state
    Then I can count the element with css 'span.badge_green' to be '3'

  @runThis
  Scenario: Booking Officer can Undo cancel booking from cancelled no charge and no interpreters are assigned, exist Interpreter, Interpreter1, Interpreter2
    Given There exist 1 booking with link id
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I see one row with the link id
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 3 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    Then I can see the booking state 'Allocated'
    And I can see the element with name 'unassingBtn_1' is 'visible'
    And I can see the element with name 'unassingBtn_2' is 'visible'
    And I can see the element with name 'unassingBtn_3' is 'visible'
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled with No Charge' notification for state
    When I click on BUTTON 'Undo cancel'
    And I can see the element with name 'unassingBtn_1' is 'not visible'
    And I can see the element with name 'unassingBtn_2' is 'not visible'
    And I can see the element with name 'unassingBtn_3' is 'not visible'
    Then I can count the element with css 'span.pink' to be '0'    

  @runThis
  Scenario: Given 1 verified Booking Officer and Interpreter, As a interpreter should see an attchment icon if the booking has attachment and I accept this booking
    Given There exist 1 bookings
    Given I exist as a Booking Officer
    When I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I should not see the attachment icons under Attached column number '14'
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will upload a document 'sushi.pdf'
    When I will see attachment 'sushi.pdf'
    Then I will close the file upload
    And I click on checkbox name 'tnc'
    And I click the create booking button
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to update booking?', I approve it
    Then I wait for 1200 milli-seconds
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
    Then I should get a valid booking update notification
    Then I am on the individual booking page
    Then I click on Bookings
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I should see the attachment icons under Attached column number '14'
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get a valid invite notification
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'
    And I hover on the 'Profile'
    And I click on logout
    And I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see the element with name '_attach' is 'not visible'
    Then I can see the button 'Accept' is enabled
    Then I click on button 'Accept'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    And I wait for 1000 milli-seconds
    And I can see the element with name '_attach' is 'visible'
    Then I should see the attachment icons under Attached column number '10'