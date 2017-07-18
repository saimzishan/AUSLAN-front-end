Feature: User Profile Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @ignoreThis
#  Show profile page
  Scenario: Be able to view the profile as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:


  @ignoreThis
#  Show profile page
  Scenario: Be able to update the profile as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:
    When I change the input field FIRST NAME * with Yesman
    And I click on BUTTON 'SAVE'
    Then The input field FIRST NAME * will be updated with Yesman

  @ignoreThis
#  Show profile page
  Scenario: Be able to view the profile as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture: