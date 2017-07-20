Feature: As INTERPRETER, I can login on mobile

  Background: As INTERPRETER i am on mobile, before any steps
    Given I am on a mobile
    And I go to the website
    And I am on the mobile login screen without a hero picture

  @ignoreThis
  Scenario: As Interpreter, I can login on mobile
    And I go to the website
    And I am shown the login screen, with picture and signup button
    And I exist as an Interpreter

  @ignoreThis
  Scenario: As INTERPRETER, I can login on mobile
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page

  @ignoreThis
  Scenario: As INTERPRETER, I can accept the booking, if a booking is created and INTERPRETER Invited then
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    And I am shown with 1 In Progress Bookings
    And  I click at the 1st one of 1 In Progress Bookings
    Then I will be shown the booking detail page with id 0

  @ignoreThis
  Scenario: As INTERPRETER and a booking is created and INTERPRETER can open the link directly even if i am logged out
    And I click on booking job detail page
    And I sign in with valid Interpreter credentials
    Then I will be shown the booking detail page with id 1
