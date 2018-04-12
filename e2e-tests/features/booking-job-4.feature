Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to see the availbility blocks
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: As a Booking Officer I should see the correct suburb of the booking
    Given I exist as a Booking Officer
    When I sign in with valid Booking Officer credentials

  @runThis
  Scenario: As an Interpreter I can see the interpreter section when I open any booking, Booking Officer
    Given There exist 1 bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    Then I click on an individual booking
    Then I am on the individual booking page
    And I can see the element with name 'manage-interpreters-a' is 'visible'

  @runThis
  Scenario: As an Individual Client and Organisational Representative I can not see the invite interpreter section
    Given There exist 1 bookings
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    Then I click on an individual booking
    Then I am on the individual booking page
    And I can see the element with name 'invite-interpreters' is 'not visible'
    And I can see the element with name 'invited-interpreters' is 'not visible'
    And I click on my name in the top corner
    Then I click on logout
    Then Assigned all bookings to Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I click on an individual booking
    Then I am on the individual booking page
    And I can see the element with name 'invite-interpreters' is 'not visible'
    And I can see the element with name 'invited-interpreters' is 'not visible'

  @runThis
  Scenario: As a Booking Officer I can see the blank status when Interpreter is not invited
    Given There exist 1 bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the Interpreter status is 'blank'

  @runThis
  Scenario: As a Booking Officer I can see the Invited status when Interpreter is invited
    Given There exist 1 bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreters have been invited'
    When I click on Booking
    Then I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the Interpreter status is 'invited'

  @runThis
  Scenario: As a Booking Officer I can see the Accepted and booking/blockout status when Interpreter is allocated to the booking
    Given There exist 2 bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on Booking
    Then I am on the bookings page
    When I click on an individual booking of type 'In progress'
    Then I will be shown the booking job page
    And I can see the Interpreter status is 'accepted'
    When I click on Booking
    Then I am on the bookings page
    When I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I can see the Interpreter status is 'booking'

  @runThis
  Scenario: As a Booking Officer I can see the Declined status when Interpreter has Declined the invitation
    Given There exist 1 bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreters have been invited'
    Then I click on my name in the top corner
    And I click on logout
    Then I sign in with valid Interpreter credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on BUTTON 'Decline'
    Then I will be shown a popup message 'Do you want to decline the invitation?'
    And I click on BUTTON name 'yesBtn'
    And I wait for 1200 milli-seconds
    Then I click on my name in the top corner
    And I click on logout
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the Interpreter status is 'declined'

  @runThis
  Scenario: As an Administrator when I cancel a booking which has no linked booking then I would see a pop up to which state I want to cancel the booking
    Given There exist 1 bookings
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the button 'Save' is disabled
    And I can see the button 'Unlink' is enabled
    When I click on button 'Unlink'
    Then I can see the button 'Save' is enabled
    When I click on button 'Save'
    Then I should get a valid booking update notification
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Are you sure you want to cancel the booking? The client will be notified of this. This is a permanent action.'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled with No Charge' notification for state
    
  @runThis
  Scenario: As an Administrator when I can see certification columns in interpreters list
    Given There exist 1 bookings
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I click on material checkbox name 'cb_yellow_card'
    And I verify checkbox name 'cb_yellow_card' is checked 'true'
    Then I click on checkbox name 'cb_police_check'
    And I verify checkbox name 'cb_police_check' is checked 'true'
    Then I click on element by name 'rdbookingRecordedYes'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I will be shown the booking job page
    And I can see the interpreter table header has column 'Yellow'
    And I can see the interpreter table header has column 'Police'
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I click on material checkbox name 'cb_yellow_card'
    Then I click on material checkbox name 'cb_imminisations'
    And I verify checkbox name 'cb_imminisations' is checked 'true'
    And I verify checkbox name 'cb_yellow_card' is checked 'false'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I will be shown the booking job page
    And I can see the interpreter table header has column 'Immun.'
    And I can see the interpreter table header has not column 'Yellow'

 @runThis
  Scenario: As an Administrator when I assign Interpreter, Interpreter1 of differ state to booking should be in same span
    Given There exist 1 bookings
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I select 2 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    Then I can count the element with css 'span.badge_green' to be '2'
    
  @runThis
  Scenario: Given Administrator exists, I can check that non-Admin users should not be able to see Unassign button
    # This step refers to a task in api which creates
    # Ind Client, booking, and an interpreter all assigned to the booking
    Given I create the interpreter of type 'booked'
    And I sign in with valid Individual Client credentials
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the element with name 'unassingBtn_1' is 'not visible'
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Administrator credentials
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the element with name 'unassingBtn_1' is 'visible'
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Interpreter credentials
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the element with name 'unassingBtn_1' is 'not visible'
