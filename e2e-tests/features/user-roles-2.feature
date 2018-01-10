Feature: User Role and Permissions Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given a booking is created, as an Interpreter I should not be able to visit create-booking
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'booking-management/1/create-booking'

  @runThis
  Scenario: Given a booking is created, as an Interpreter I should not be able to visit booking-job
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'booking-management/1/booking-job'

  @runThis
  Scenario: Given a booking is created, as an Organisational Representative I should not be able to visit booking-job
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'booking-management/1/booking-job'

  @runThis
  Scenario: As an Organisational Representative I should be able to visit user-management
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    Then I should be able to navigate to 'user-management'

  @runThis
  Scenario: As an Organisational Representative I should be able to visit user-management/profile
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    Then I should be able to navigate to 'user-management/profile'

  @runThis
  Scenario: As an Organisational Representative I should be able to visit user-management/secure_pass
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    Then I should be able to navigate to 'user-management/secure_pass'

  @runThis
  Scenario: Given 1 verified Interpreter, as an Organisational Representative I should not be able to visit block_out
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'user-management/2/block_out'

  @runThis
  Scenario: Given a booking is created, as an Individual Client I should not be able to visit booking-job
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'booking-management/1/booking-job'

  @runThis
  Scenario: Given 1 verified Individual Client, As an Individual Client I should not be able to visit user-management
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    Then I am on the bookings page
    Then I should not be able to navigate to 'user-management'

  @runThis
  Scenario: Given 1 verified Individual Client, As an Individual Client I should be able to visit user-management/profile
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    Then I am on the bookings page
    Then I should be able to navigate to 'user-management/profile'