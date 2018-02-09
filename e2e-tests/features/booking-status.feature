Feature: Booking Status

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button


  # ================ Admin / BO can see all bookings ====================
  @runThis
  Scenario: Given a booking is created, Administrator can see a list of booking and their status
    Given The booking has status 'green'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
    Then I see one row with status 'green'

  @runThis
  Scenario: Given a booking is created, Administrator can see a list of booking and their status
    Given The booking has status 'red'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
    Then I see one row with status 'red'

  @runThis
  Scenario: Given a booking is created, Booking Officer can see a list of booking and their status
    Given The booking has status 'green'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
    Then I see one row with status 'green'

  @runThis
  Scenario: Given a booking is created, Booking Officer can see a list of booking and their status
    Given The booking has status 'red'
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
    Then I see one row with status 'red'

  # ================= Org Rep can only see bookings created by himself ===================
  @runThis
  Scenario: Organisational Representative can see red bookings created by himself and their status
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    Then I fill New Booking form fields correctly
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click the create booking button
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I see one row with state 'Requested'
    Then I see one row with status 'red'

  @runThis
  Scenario: Given a booking is created, Organisational Representative cannot see a list of booking and their status
    Given The booking has status 'red'
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    When I am on the bookings page
    Then I am shown with 0 Bookings
