Feature: Validation of Booking Management. Not mention about those unsure fields like Date, Street Number, Name,
  EAF, dropdown, and counting. But unsure why requested meeting still not accept if the name is 1 character.

#  Similar element in the booking form.
  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

#    INVALIDATION ICON
  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_street' with value 'F'
    And I jump to 'address_suburb' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_suburb' with value 'S'
    And I jump to 'address_post_code' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_post_code' with value '3'
    And I jump to 'raw_booking_requested_by' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by' with value 'G'
    And I jump to 'raw_booking_requested_by_ln' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by_ln' with value 'C'
    And I jump to 'attendee_count' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'deaf_person_name' with value 'G'
    And I jump to 'deaf_person_last_name' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'deaf_person_last_name' with value 'C'
    And I jump to 'deaf_person_email' element
    Then I will get a error notification


  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'deaf_person_mobile' with value '1'
    And I jump to 'cn_first_name' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'cn_first_name' with value 'G'
    And I jump to 'cn_last_name' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'cn_last_name' with value 'C'
    And I jump to 'cn_email' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'cn_email' with value 'georgeorganisationalrepresentative'
    And I jump to 'cn_phone' element
    Then I will get a error notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'cn_phone' with value '1'
    And I jump to 'cn_first_name' element
    Then I will get a error notification

#  VALIDATION ICON
  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_street' with value 'Flemington'
    And I jump to 'address_suburb' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_suburb' with value 'Solly'
    And I jump to 'address_post_code' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'address_post_code' with value '3054'
    And I jump to 'raw_booking_requested_by' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by' with value 'George'
    And I jump to 'raw_booking_requested_by_ln' element
    Then I will get a valid notification

  @runThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill the field 'raw_booking_requested_by_ln' with value 'Charalambous'
    And I jump to 'attendee_count' element
    Then I will get a valid notification
