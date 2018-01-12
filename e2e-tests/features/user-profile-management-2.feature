Feature: User Profile Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

################################## Can Edit and save the update ##################################
  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I change some input text fields of the BOOKINGOFFICER
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the BOOKINGOFFICER is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I change some input text fields of the ADMINISTRATOR
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the ADMINISTRATOR is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I change some input text fields of the INTERPRETER
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the INTERPRETER is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I change some input text fields of the ORGANISATIONALREPRESENTATIVE
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the ORGANISATIONALREPRESENTATIVE is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I change some input text fields of the INDIVIDUALCLIENT
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the INDIVIDUALCLIENT is updated

################################## Profile PASSWORD related ##################################
  @runThis
#  Show profile pass page
  Scenario: Be able to show password password page as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @runThis
#  Show profile pass page
  Scenario: Be able to show password password page as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @runThis
#  Show profile pass page
  Scenario: Be able to show password password page as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @runThis
#  Show profile pass page
  Scenario: Be able to show password password page as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @runThis
#  Show profile pass page
  Scenario: Be able to show password password page as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page