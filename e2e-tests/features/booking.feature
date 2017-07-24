Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings

  @runThis
  Scenario: Booking Officer can create a booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings

  @runThis
  Scenario: Organisational Representative can create a booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings

  @runThis
  Scenario: Individual Client can create a booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings


  @runThis
  Scenario: Interpreter can create a booking
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    Then I don't see any new New Booking link