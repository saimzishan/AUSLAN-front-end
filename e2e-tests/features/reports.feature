Feature: As an Admin, I can export booking data

  Background: As all I am on computer and on main website, before any steps
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button
    Given I sign in with valid Administrator credentials
    Then I will be shown the bookings page

  @runThis
  Scenario: Given an Individual Client, Interpreter and a booking is created, As Administrator, I can export cancelled claimed bookings
    Given I am shown with 1 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Are you sure you want to cancel the booking? The client will be notified of this. This is a permanent action.'
    And I click on BUTTON name 'yesBtn'
    And I wait for 1200 milli-seconds
    And I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    And I click on BUTTON name 'noBtn'
    And I get a valid 'Cancelled with Charge' notification for state
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    And I can see that form 'bookingPayrollFieldset' is 'enabled'
    When I click on link 'BOOKINGS'
    And I click on an individual booking
    Then I am on the individual booking page
    And I can see the element with name 'btnClaim' is 'visible'
    Then I click on BUTTON 'Claim'
    When I click on BUTTON 'Save'
    Then I get a valid 'Cancelled Claimed' notification for state
    When I click on link 'REPORTS'
    Then I am on the reports page
    When I select option Vicdeaf billing & payroll from dropdown SELECT EXPORT
    And I set date_from and date_to as today's date
    And I click on BUTTON 'EXPORT'
    When I click on link 'BOOKINGS'
    Then I wait for 1200 milli-seconds
    Then I see one row with state 'Cancelled claimed exported'
