Feature: Booking Management

#  Background: Can be able to show the booking form
  @ignoreThis
  Scenario: Administrator can show a booking screen
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form

#  Scenario: Booking Officer can show a booking screen
#    Given I exist as an Booking Officer
#    And I sign in with valid Booking Officer credentials
#    And I am on the bookings page
#    When I click on 'New Booking'
#    Then I will be taken to the 'New Booking' form

#  Scenario: Client can show a booking screen
#    Given I exist as an Client
#    And I sign in with valid Client credentials
#    And I am on the bookings page
#    When I click on 'New Booking'
#    Then I will be taken to the 'New Booking' form

#  Scenario: Organisational Representative can show a booking screen
#    Given I exist as an Organisational Representative
#    And I sign in with valid Organisational Representative credentials
#    And I am on the bookings page
#    When I click on 'New Booking'
#    Then I will be taken to the 'New Booking' form

###############################    Adding Date

  @ignoreThis
  Scenario: Administrator can add day on booking screen
#    Given I am on the booking page as a Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on Date-Month-Year
    And I type in the date: 13/06/2017 by hand
#    Then It will be displayed in the cell

###############################    Save without all mandatory fields
  @ignoreThis
  Scenario: Can't save without mandatory fields are not filled
#    Given that I am on the new booking page as a Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
#    And I haven't filled all mandatory fields
    And I filled all mandatory fields except WHO REQUESTED THIS MEETING *
#    When I press Save
#    Then I am show with red explanation mark
#    When I filled those missing fields
#    Then Then the red explaination mark will be disappeared

#  Auto Populated
  @ignoreThis
  Scenario: Auto populate details when specify as the client of booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

  @ignoreThis
  Scenario: Auto populate details when specify as the client of booking
    Given I exist as an Booking Officer
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

  @ignoreThis
  Scenario: Auto populate details when specify as the client of booking
    Given I exist as an Organisational Representative
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

  @ignoreThis
  Scenario: Auto populate details when specify as the client of booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I specify i am the client of this booking
    Then The booking form will be automatically populated with the details.

  @ignoreThis # -> Not working
  Scenario: Popup when cancel after fill in one fields.
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I filled in one field
    When I press 'CANCEL'
    Then A pop-up will display which will aks me if im sure to cancel

#    Can cancel
  @ignoreThis
  Scenario: Can cancel booking and return to booking screen
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

  @ignoreThis
  Scenario: Can cancel booking and return to booking screen
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

  @ignoreThis
  Scenario: Can cancel booking and return to booking screen
    Given I exist as an Client
    And I sign in with valid Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

  @ignoreThis
  Scenario: Can cancel booking and return to booking screen
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I press 'CANCEL'
    Then I am back on booking page

#  Only see the verified interpreter
  @ignoreThis
  Scenario: Can check the list of intepreter in booking
    Given I exist as an Booking Officer
#    And There is 1 active Interpreter
#    And There is 1 inactive Interpreter
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 1 verified interpreters
#    And I don't see 1 unverified interpreters

#  On mobile
  @ignoreThis
  Scenario: Interpreter login into using mobile
    Given I use mobile phone
    And I exist as an Interpreter
    And I am on the mobile login screen without a hero picture
    And I sign in with valid Interpreter credentials
    And I am on the bookings page

  @ignoreThis
#  Administrator can see bookings
  Scenario: Be able to view the booking page with summary details columns
    Given I exist as an Administrator
    And A booking is created
    When I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I will be shown with bookings

  @runThis
  #  Booking Officer can see bookings
  Scenario: Be able to view the booking page with summary details columns
    Given I exist as an Booking Officer
    And A booking is created
    When I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
#  Show profile page
  Scenario: Be able to view the profile as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:

#  Populated NATURE OF APPOINTMENT AND WHAT WILL BE DISCUSSED
  @ignoreThis
  Scenario: Populate Both NATURE OF APPOINTMENT AND WHAT WILL BE DISCUSSED as User
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I click dropdown NATURE OF APPOINTMENT *
    And I click on option MEDICAL
    Then The cell of NATURE OF APPOINTMENT * will be populated with MEDICAL
    When I click dropdown WHAT WILL BE DISCUSSED *
    And I click on option GP
    Then The cell of WHAT WILL BE DISCUSSED * will be populated with GP

#  UNABLE TO SERVICE on Requested
  @ignoreThis
  Scenario: Able to click on the Requested booking as Admin
    Given I exist as an Administrator
#    And There is 3 requested booking
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I am shown with 3 Requested Bookings
    When I click at the 1st one of 3 Requested Bookings
    Then I am on the individual booking page

  @ignoreThis
  Scenario: Able to click on the Requested booking as Booking Officer
    Given I exist as an Booking Officer
#    And There is 3 requested booking
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I am shown with 3 Requested Bookings
    When I click at the 1st one of 3 Requested Bookings
    Then I am on the individual booking page

  @runThis
  Scenario: Unable to service on the Requested booking as Admin
    Given I exist as an Administrator
#    And There is 3 requested booking
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I am shown with 3 Requested Bookings
    And I click at the 1st one of 3 Requested Bookings
    And I am on the individual booking page
    When I click on button 'Unable to Service'
    Then I will be shown a popup message

    @runThis
  Scenario: Unable to service on the Requested booking as Booking Officer
    Given I exist as an Booking Officer
#    And There is 3 requested booking
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I am shown with 3 Requested Bookings
    And I click at the 1st one of 3 Requested Bookings
    And I am on the individual booking page
    When I click on button 'Unable to Service'
    Then I will be shown a popup message
