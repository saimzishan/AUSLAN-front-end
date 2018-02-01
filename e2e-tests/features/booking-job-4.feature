Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to see the availbility blocks
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: As a Booking Officer I should see the correct suburb of the booking
    Given I exist as a Booking Officer
    When I sign in with valid Booking Officer credentials
