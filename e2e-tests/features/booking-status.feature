Feature: Booking Status

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @ignoreThis
  Scenario: Administrator can see a list of booking and their status
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I can see a list of bookings

