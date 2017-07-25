Feature: Booking Admin Management

  Background: I as an ADMIN OR BOOKING OFFICER should be able to change booking status to unable to serve or cancel
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button


  @runThis
  Scenario: Administrator can create a booking, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I click on an individual booking
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Unable to Service'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Unable to service'

  @runThis
  Scenario: Administrator cancel the unable to service action, Interpreter exists
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I click on an individual booking
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Unable to Service' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Requested'

  @runThis
  Scenario: Booking Officer can create a booking, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I click on an individual booking
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    And I can not see a list of interpreters
    Then I can see the button state 'Unable to Service' is hidden
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the booking state 'Unable to Service'
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Unable to service'


  @runThis
  Scenario: Booking Officer cancel the unable to service action, Interpreter exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I fill New Booking form fields correctly
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I click on an individual booking
    Then I will be shown the booking job page
    Then I click on BUTTON 'Unable to Service'
    Then I will be shown a popup message
    Then I click on BUTTON name 'noBtn'
    Then I can see the button 'Unable to Service' is enabled
    And I can see a list of 1 verified interpreters
    Then I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'Requested'