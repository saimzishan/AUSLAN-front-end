Feature: Booking Sort

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 5 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to sort by job ids
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I click on table header 'Job'
    Then I should see the bookings in descending order of Job
    When I click on table header 'Job'
    Then I should see the bookings in ascending order of Job

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to sort by booking status
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I click on table header 'Status'
    Then I should see the bookings in ascending order of Status
    When I click on table header 'Status'
    Then I should see the bookings in descending order of Status

  @runThis
  Scenario: Given 1 verified Booking Officer, 1 verified Interpreter exists, I should be able to sort by booking state
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    Then I select 1 Interpreter
    And I click on BUTTON name 'inviteBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get a valid invite notification
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'
    When I click on table header 'State'
    Then I should see the bookings in ascending order of State
    When I click on table header 'State'
    Then I should see the bookings in descending order of State

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to filter by date range
    Given One booking has start and end dates as first and last days of next week
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    When I click on table header 'Date'
    Then I should see the bookings in ascending order of Date
    When I click on table header 'Date'
    Then I should see the bookings in descending order of Date