Feature: Pagination

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given 1 verified Administrator Officer,  I should be able to see paginated result on booking list page
    Given There exist 12 bookings
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I am shown with 10 booking
    Then I can count the element with css 'span.show-for-sr' to be '4'


  @runThis
  Scenario: Given 1 verified Administrator Officer,  I should be able to see paginated result on booking list page
    Given There exist 8 bookings
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    Then I will be shown with bookings
    Then I am shown with 8 booking
    Then I can count the element with css 'span.show-for-sr' to be '3'


  @runThis
  Scenario: Given 1 verified Administrator Officer, I should be able to see paginated result on user list page
    Given There exist 12 admins
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 10 valid Administrator should be in the list
    Then I can count the element with css 'span.show-for-sr' to be '4'



  @runThis
  Scenario: Given 1 verified Administrator Officer, I should be able to see paginated result on user list page
    Given There exist 7 admins
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 9 valid Administrator should be in the list
    Then I can count the element with css 'span.show-for-sr' to be '3'