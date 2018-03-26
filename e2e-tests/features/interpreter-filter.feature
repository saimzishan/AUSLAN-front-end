Feature: Nearby Interpreter Filter

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @ignoreThis
  Scenario: Given 1 verified Administrator Officer, I can filter the list of interp's by Preferred column Yes and No
    Given There exist 5 verified interpreters
    Given The first 2 interpreters have preference 'Preferred'
    Given The last 3 interpreters have preference 'Blocked'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I hover on the Preferred dropdown on interpreter table header and select 'Yes'
    Then I can see a list of 2 verified interpreters
    When I hover on the Preferred dropdown on interpreter table header and select 'No'
    Then I can see a list of 3 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the list of interp's by some text of first name
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I query interpreter by form field name and value 'preter - 2'
    Then I can see a list of 1 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the list of interp's by some text of last name
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I query interpreter by form field name and value 'Hampt'
    Then I can see a list of 1 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the list of interp's by some combined text of first and last name
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I query interpreter by form field name and value 'ter - 2 Hampt'
    Then I can see a list of 1 verified interpreters

  @ignoreThis
  Scenario: Given 1 verified Administrator Officer, I can filter the list of interp's by Lvl column
    Given There exist 5 verified interpreters
    Given The first 2 interpreters have skill level 'Notetaking'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I hover on the Lvl dropdown on interpreter table header and select 'Notetaking'
    Then I can see a list of 2 verified interpreters
    When I hover on the Lvl dropdown on interpreter table header and select 'Recognised'
    Then I can see a list of 3 verified interpreters
    When I hover on the Lvl dropdown on interpreter table header and select 'All'
    Then I can see a list of 5 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the list of interp's by Suburb column
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I query interpreter by form field suburb and value 'Doncaster'
    Then I can see a list of 1 verified interpreters

  @ignoreThis
  Scenario: Given 1 verified Administrator Officer, I can filter the list of interp's by Pay Travel column
    Given There exist 5 verified interpreters
    Given The first 2 interpreters have travel pay status 'Y'
    Given The last 3 interpreters have travel pay status 'N'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I hover on the Pay Travel dropdown on interpreter table header and select 'Yes'
    Then I can see a list of 2 verified interpreters
    When I hover on the Pay Travel dropdown on interpreter table header and select 'No'
    Then I can see a list of 3 verified interpreters
    When I hover on the Pay Travel dropdown on interpreter table header and select 'All'
    Then I can see a list of 5 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can search the interp's by some text of first name
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I search interpreters with 'ter - 1'
    Then I can see a list of 1 verified interpreters
    When I search interpreters with 'empty'
    Then I can see a list of 5 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can search the interp's by some text of last name
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I search interpreters with 'Doncaster'
    Then I can see a list of 1 verified interpreters
    When I search interpreters with 'empty'
    Then I can see a list of 5 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can search the interp's by some combined text of first and last name
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I search interpreters with 'ter - 1 Don'
    Then I can see a list of 1 verified interpreters
    When I search interpreters with 'empty'
    Then I can see a list of 5 verified interpreters

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can search the interp's by text in suburb
    Given There exist 10 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see a list of 10 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    And I search interpreters with 'Preston'
    Then I can see a list of 2 verified interpreters
    When I search interpreters with 'empty'
    Then I can see a list of 10 verified interpreters