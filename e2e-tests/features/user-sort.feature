Feature: User list sorting

  Background: I as an all user should be able to sort the users list
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of users by First Name column
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I click on the user list table header 'First Name'
    Then I can see the user list in descending order of First Name
    When I click on the user list table header 'First Name'
    Then I can see the user list in ascending order of First Name

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of users by Last Name column
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I click on the user list table header 'Last Name'
    Then I can see the user list in ascending order of Last Name
    When I click on the user list table header 'Last Name'
    Then I can see the user list in descending order of Last Name

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of users by Type column
    Given There exist all types of verified users
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I click on the user list table header 'Type'
    Then I can see the user list in ascending order of Type
    When I click on the user list table header 'Type'
    Then I can see the user list in descending order of Type

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of users by Status column
    Given There exist all types of verified users
    And I unverified the last Booking Officer
    And I disabled the last Interpreter
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    When I hover on the 'Profile'
    Then I go to the 'User Management' list page
    And I can see a list of 6 records on the page
    When I click on the user list table header 'Status'
    Then I can see the user list in ascending order of Status
    When I click on the user list table header 'Status'
    Then I can see the user list in descending order of Status