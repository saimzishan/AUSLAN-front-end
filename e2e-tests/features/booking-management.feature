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
  @runThis
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
