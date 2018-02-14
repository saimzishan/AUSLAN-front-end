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
  Scenario: As a Booking Officer i can see the blank status when Interpreter is not invited
    Given There exist 1 bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    