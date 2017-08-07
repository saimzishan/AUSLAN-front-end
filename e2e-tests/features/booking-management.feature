Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button


# --------------------------------------  AUSLAN1-446 -> START --------------------------------------
  @runThis
  Scenario: Given 1 unverified Interpreter , 1 Administrator and a booking is created, as a Booking Officer i can see there are no one to be invited
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 0 verified interpreters

  @runThis
  Scenario: Given 1 verified Interpreter , 1 Administrator and a booking is created, as a Booking Officer i can see there is one to be invited
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 1 verified interpreters
# --------------------------------------  AUSLAN1-446 -> END --------------------------------------

  @runThis
  Scenario: Administrator can show a booking screen
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form

  @runThis
  Scenario: Booking Officer can show a booking screen
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form

  @runThis
  Scenario: Individual Client can show a booking screen
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form

  @runThis
  Scenario: Organisational Representative can show a booking screen
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form

#  Auto Populated -> not working with the return of the undefined ##############################
  @runThis
  Scenario: Sign in as Administrator, Auto populate details when specify as the client of booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

  @runThis
  Scenario: Sign in as Booking Officer, Auto populate details when specify as the client of booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

  @runThis
  Scenario: Sign in as Organisational Representative, Auto populate details when specify as the client of booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

  @runThis
  Scenario: Sign in as Individual Client, Auto populate details when specify as the client of booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

#  @runThis # -> Not working
#  Scenario: Popup when cancel after fill in one fields.
#    Given I exist as an Administrator
#    And I sign in with valid Administrator credentials
#    And I am on the bookings page
#    And I click on 'New Booking'
#    And I will be taken to the 'New Booking' form
#    And I filled in one field
#    When I press 'CANCEL'
#    Then A pop-up will display which will aks me if im sure to cancel

#    Can cancel
  @runThis
  Scenario: Sign in as Administrator, Can cancel booking and return to booking screen
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

  @runThis
  Scenario: Sign in as Booking Officer, Can cancel booking and return to booking screen
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

  @runThis
  Scenario: Sign in as Individual Client, Can cancel booking and return to booking screen
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

  @runThis
  Scenario: Sign in as Organisational Representative, Can cancel booking and return to booking screen
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

  @runThis #- AUSLAN1-448
#  Administrator can see bookings
  Scenario: Sign in as Administrator and a booking is created, Be able to view the booking page with summary details columns
    Given I exist as an Administrator
    When I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I will be shown with bookings

  @runThis #- AUSLAN1-448
  #  Booking Officer can see bookings
  Scenario: Sign in as Booking Officer and a booking is created, Be able to view the booking page with summary details columns
    Given I exist as an Booking Officer
    When I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I will be shown with bookings

#  Populated NATURE OF APPOINTMENT AND WHAT WILL BE DISCUSSED
  @runThis
  Scenario: Sign in as Administrator, Populate Both NATURE OF APPOINTMENT AND WHAT WILL BE DISCUSSED as User
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I click dropdown NATURE OF APPOINTMENT *
    And I click on option MEDICAL of NATURE OF APPOINTMENT * for WHAT WILL BE DISCUSSED *
    Then The cell of NATURE OF APPOINTMENT * will be populated with MEDICAL
    When I click dropdown WHAT WILL BE DISCUSSED *
    And I click on option GP of WHAT WILL BE DISCUSSED * for nothing
    Then The cell of WHAT WILL BE DISCUSSED * will be populated with GP

  @runThis
  Scenario: As a user, Booking Officer who can make a booking, I can't select from a list of 'What Will Be Discussed' if the 'Nature of Bookings' is not selected
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And The cell of NATURE OF APPOINTMENT * will be populated with NOTHING
    When I click dropdown WHAT WILL BE DISCUSSED *
    Then The dropdown WHAT WILL BE DISCUSSED * will have 0 item

  @runThis
  Scenario: As a user, Booking Officer who can make a booking, I can select from a list of 'Nature of Booking' and specifics of a booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And The cell of NATURE OF APPOINTMENT * will be populated with NOTHING
    And I click dropdown WHAT WILL BE DISCUSSED *
    And The dropdown WHAT WILL BE DISCUSSED * will have 0 item
    When I click dropdown NATURE OF APPOINTMENT *
    And I click on option MEDICAL of NATURE OF APPOINTMENT * for WHAT WILL BE DISCUSSED *
    Then The cell of NATURE OF APPOINTMENT * will be populated with MEDICAL
    When I click dropdown WHAT WILL BE DISCUSSED *
    Then The dropdown WHAT WILL BE DISCUSSED * will have 23 item
