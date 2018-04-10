Feature: User Role and Permissions Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Default route for an Individual Client should be booking-management
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    Then I will be shown the bookings page

  @runThis
  Scenario: Default route for a Booking Officer should be booking-management
    Given I exist as a Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I will be shown the bookings page

  @runThis
  Scenario: Default route for an Administrator should be booking-management
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I will be shown the bookings page

  @runThis
  Scenario: Default route for an Interpreter should be booking-management
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page

  @runThis
  Scenario: Default route for an Organisational Representative should be booking-management
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    Then I will be shown the bookings page

    # I am not sure if this is the right test
  @ignoreThis
  Scenario: Given 1 verified Interpreter, as a Booking Officer I should not be able to visit block_out
    Given I exist as a Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list
    When I hover on the 'Actions' of the Interpreter
    And I click on 'Skill Matrix' for an active existing Interpreter
    Then I should be on the skill matrix page
    Then I should not be able to navigate to 'block_out'

  @runThis
  Scenario: As an Interpreter I should not be able to visit user-management
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'user-management'

  @runThis
  Scenario: As an Interpreter I should be able to visit user-management/profile
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I am on the bookings page
    Then I should be able to navigate to 'user-management/profile'

  @runThis
  Scenario: As an Interpreter I should be able to visit user-management/secure_pass
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I am on the bookings page
    Then I should be able to navigate to 'user-management/secure_pass'

  @runThis
  Scenario: As an Interpreter I should not be able to visit create-booking
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'booking-management/create-booking'

  @ignoreThis
  Scenario: As an unverified Organisational Representative, I should be able to visit certain url
    Given I sign in with valid Organisational Representative credentials
    Then I am shown the verify screen
    And I should not be able to navigate to 'user-management'
    And I should not be able to navigate to 'user-management/profile'
    And I should not be able to navigate to 'user-management/secure_pass'
    And I should not be able to navigate to 'user-management/1/skills'
    And I should not be able to navigate to 'user-management/1/block_out'
    And I should not be able to navigate to 'user-management/1/staff-availability'
    And I should not be able to navigate to 'user-management/2/staff_calendar'
    And I should not be able to navigate to 'user-management/payroll-billing'
    And I should not be able to navigate to 'booking-management'
    And I should not be able to navigate to 'booking-management/1/create-booking'
    And I should not be able to navigate to 'booking-management/create-booking'
    And I should not be able to navigate to 'booking-management/1/booking-job'
    And I should not be able to navigate to 'booking-management/1/job-detail'
    And I should not be able to navigate to 'booking-management/edit-booking'
    And I should not be able to navigate to 'booking-management/2/payroll-billing'
    And I should not be able to navigate to 'users/1/inbox'
    And I should not be able to navigate to 'users/1/inbox/2'
    And I should not be able to navigate to 'reports'
    And I should not be able to navigate to 'init'
    And I should not be able to navigate to 'bookings'
