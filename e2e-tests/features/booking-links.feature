Feature: Linked Bookings

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And There exist 1 booking with link id

  @runThis
  Scenario: As Administrator, I should be able to see booking link id on the bookings list page
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 1 booking
    And I see one row with the link id