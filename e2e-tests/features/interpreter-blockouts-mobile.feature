Feature: As INTERPRETER, I can create blockout on mobile

  Background: As INTERPRETER i am on mobile, before any steps
    Given I am on a mobile
    And I go to the website
    And I am on the mobile login screen without a hero picture

  @runThis
  Scenario: As INTERPRETER, I can create edit and delete blockout on desktop
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    