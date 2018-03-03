Feature: Booking Management with bulk upload

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Administrator can bulk upload with an excel file for Individual Client and Organisational Representative
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a bulk upload spreadsheet 'bulk_booking_upload_with_wrong_bookable.xlsx'
    Then I get a valid create bulk upload booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @runThis
  Scenario: Booking Officer can bulk upload with an excel file for Individual Client and Organisational Representative
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a bulk upload spreadsheet 'bulk_booking_upload_with_wrong_bookable.xlsx'
    Then I get a valid create bulk upload booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @runThis
  Scenario: Organisational Representative can bulk upload with an excel file only for themselves
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a bulk upload spreadsheet 'bulk_booking_upload.xlsx'
    Then I get a valid create bulk upload booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @runThis
  Scenario: Organisational Representative can not bulk upload with an excel file that has an Individual Client
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a bulk upload spreadsheet 'bulk_booking_upload_with_wrong_bookable.xlsx'
    Then I get an booking error notification with Error on row 4. Email does not correspond to your account
    And I will be taken to the 'New Booking' form

  @runThis
  Scenario: Individual Client can not bulk upload with an excel file that has an Organisational Representative
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a bulk upload spreadsheet 'bulk_booking_upload_with_wrong_bookable.xlsx'
    Then I get an booking error notification with Error on row 3. Email does not correspond to your account
    And I will be taken to the 'New Booking' form

  @runThis
  Scenario: Individual Client can not bulk upload with an excel file that has an Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a bulk upload spreadsheet 'bulk_booking_upload_with_error_in_one_row.xlsx'
    Then I get an booking error notification with Error on row 4. Address post code can't be blank, Billing account address street name can't be blank, Start time can't be blank, End time can't be blank, Number of people attending is not a number
    And I will be taken to the 'New Booking' form

  @runThis
  Scenario: Organisational Representative can upload the same excel file twice
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a bulk upload spreadsheet 'bulk_booking_upload_with_wrong_bookable.xlsx'
    Then I get an booking error notification with Error on row 4. Email does not correspond to your account
    Then I wait for 5000 milli-seconds
    And I will upload a bulk upload spreadsheet 'bulk_booking_upload_with_wrong_bookable.xlsx'
    Then I get an booking error notification with Error on row 4. Email does not correspond to your account
