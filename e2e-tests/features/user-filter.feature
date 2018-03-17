Feature: All Users Filter

  Background: I as an all user should be able to filter and search the users list
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the user list by first name
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I query user by form field first_name and value 'eliss'
    Then I can see a list of 1 records on the page

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the user list by last name
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I query user by form field last_name and value 'jokovi'
    Then I can see a list of 1 records on the page

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the user list by user type
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I hover on the Type dropdown on user list table header and select 'Accountant'
    Then I can see a list of 1 records on the page
    When I hover on the Type dropdown on user list table header and select 'Administrator'
    Then I can see a list of 1 records on the page
    When I hover on the Type dropdown on user list table header and select 'All'
    Then I can see a list of 6 records on the page

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the user list by organisation
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I query user by form field organisation and value 'curve'
    Then I can see a list of 1 records on the page

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can filter the user list by status
    Given There exist all types of verified users
    And I unverified the last Booking Officer
    And I disabled the last Interpreter
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I hover on the Status dropdown on user list table header and select 'Active'
    Then I can see a list of 5 records on the page
    When I hover on the Status dropdown on user list table header and select 'Disabled'
    Then I can see a list of 1 records on the page
    When I hover on the Status dropdown on user list table header and select 'Unverified'
    Then I can see a list of 1 records on the page
    When I hover on the Status dropdown on user list table header and select 'All'
    Then I can see a list of 6 records on the page

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can search the user list by some text of first name
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I search users with 'ragan'
    Then I can see a list of 1 records on the page
    When I search interpreters with 'empty'
    Then I can see a list of 6 records on the page

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can search the user list by some text of last name
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I search users with 'tthews'
    Then I can see a list of 1 records on the page
    When I search interpreters with 'empty'
    Then I can see a list of 6 records on the page

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can search the user list by some text of organisation
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I search users with 'tomorro'
    Then I can see a list of 1 records on the page
    When I search interpreters with 'empty'
    Then I can see a list of 6 records on the page