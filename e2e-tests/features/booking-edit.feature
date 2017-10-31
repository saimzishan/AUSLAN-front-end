Feature: Edit Booking

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to visit the booking edit page
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page

  @runThis
  Scenario: Given 1 verified Booking Officer, I should see the booking details filled in
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And All required booking fields should be filled
