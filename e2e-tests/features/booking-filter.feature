Feature: Booking Filter

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 5 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by job ids
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I query booking with booking id
    Then I am shown with 1 booking
    Then I see one row with the booking id

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by booking status
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I hover on the Status dropdown and select 'Red'
    Then I am shown with 1 booking
    Then I see one row with status 'red'
