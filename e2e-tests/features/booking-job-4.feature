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
    
