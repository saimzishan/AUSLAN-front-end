Feature: As INTERPRETER, I can login on mobile

  Background: As INTERPRETER i am on mobile, before any steps
    Given I am on a mobile
    And I go to the website
    And I am on the mobile login screen without a hero picture
    And I exist as an Interpreter

  @runThis
  Scenario: As INTERPRETER, I can login on mobile
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page

  @runThis
  Scenario: As INTERPRETER and a booking is created and INTERPRETER can open the link directly even if i am logged out
    And I click on booking job detail page
    And I sign in with valid Interpreter credentials
    Then I will be shown the booking detail page
