Feature: As INTERPRETER, I can login on mobile

  Background: As INTERPRETER i am on mobile, before any steps
    Given I am on a mobile

  @runThis
  Scenario: As INTERPRETER, I can login on mobile
    And I go to the website
    And I am shown the login screen, with picture and sign-up button
    And I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page

  @runThis
  Scenario: As INTERPRETER and a booking created I can open the link directly even if i am logged out
    And I click on booking job detail page
    And I am shown the login screen, with picture and signup button
    And I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I will be shown the booking detail page
