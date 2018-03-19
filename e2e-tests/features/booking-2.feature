Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Organisational Representative can create a non-standard booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I click on element by name 'rdBookingAddressNo'
    And I click on element by name 'rdStandardInvoiceNo'
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:00 AM with 1 'auslanInterpreters_count'
    And I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I will be shown a popup message

  @runThis
  Scenario: Individual Client can create a non-standard booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I click on element by name 'rdBookingAddressNo'
    And I click on element by name 'rdStandardInvoiceNo'
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:00 AM with 1 'auslanInterpreters_count'
    And I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I will be shown a popup message
# ---------------------------------------- AUSLAN1-252 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-254 -> START ----------------------------------------
  @runThis
  Scenario: Booking Officer can't create a less interpreter booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:01 AM with 1 'auslanInterpreters_count'
    Then I am shown a validation error with the text 'You may require more than 1 auslan interpreter for this booking.'

  @runThis
  Scenario: Administrator can't create a less interpreter booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:01 AM with 1 'auslanInterpreters_count'
    Then I am shown a validation error with the text 'You may require more than 1 auslan interpreter for this booking.'

  @runThis
  Scenario: Organisational Representative can't create a less interpreter booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:01 AM with 1 'auslanInterpreters_count'
    Then I am shown a validation error with the text 'You may require more than 1 auslan interpreter for this booking.'

  @runThis
  Scenario: Individual Client can't create a less interpreter booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:01 AM with 1 'auslanInterpreters_count'
    Then I am shown a validation error with the text 'You may require more than 1 auslan interpreter for this booking.'
# ---------------------------------------- AUSLAN1-254 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-242 -> START ----------------------------------------
  @runThis
  Scenario: Organisational Representative can see ext_ref_num
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can see the ext_ref_num field

  @runThis
  Scenario: Organisational Representative can see ext_ref_num
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the ext_ref_num field
    Then I click on element by name 'rdBookingAddressNo'
    And I click on element by name 'rdStandardInvoiceNo'
    When I fill New Booking form fields correctly
    And I fill the field 'ext_ref_num' with value '1234'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings


  @runThis
  Scenario: Individual Client cant see ext_ref_num
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can't see the ext_ref_num field
# ---------------------------------------- AUSLAN1-242 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-40 -> START ----------------------------------------
#
  @runThis
  Scenario: Special Organisational Representative have special instruction fields and see it in the booking creating
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    When I will be taken to the 'New Booking' form
    Then I can see the txtSpecialInstruction field

  @runThis
  Scenario: Given an Individual Client, as a Booking Officer I should be able to see a list of clients in autocomplete
    Given I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the bookable field
    When I search for 'ted' in autocomplete
    Then I am shown ted Individual Client as a suggestion

  @ignoreThis
  Scenario: Clicking on New Booking should reset the booking form for Administrator
    Given I sign in with valid Administrator credentials
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I fill the field 'ext_ref_num' with value '1234'
    When I click on 'New Booking'
    Then I can verify the input 'ext_ref_num' will have the value ''
