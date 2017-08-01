Feature: Validation of Booking Management. Not mention about those unsure fields like Date, Street Number, Name,
  EAF, dropdown, and counting. But unsure why requested meeting still not accept if the name is 1 character.

#  Similar element in the booking form.
  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

#    INVALIDATION ICON
  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_street' incorrectly
    And I jump to 'address_suburb' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_suburb' incorrectly
    And I jump to 'address_post_code' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_post_code' incorrectly
    And I jump to 'raw_booking_requested_by' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by' incorrectly
    And I jump to 'raw_booking_requested_by_ln' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by_ln' incorrectly
    And I jump to 'attendee_count' element
    Then I will get a error notification

#  VALIDATION ICON
  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_street' correctly
    And I jump to 'address_suburb' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_suburb' correctly
    And I jump to 'address_post_code' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_post_code' correctly
    And I jump to 'raw_booking_requested_by' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by' correctly
    And I jump to 'raw_booking_requested_by_ln' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by_ln' correctly
    And I jump to 'attendee_count' element
    Then I will get a valid notification