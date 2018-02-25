Feature: Create, read, update and delete a User
  In order to access the booking system
  A valid user needs to created

#  Background: list of users you can create  OrganisationalRepresentative= 1,
#  Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
  Background: List of users you can create  OrganisationalRepresentative= 1, Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Booking Officer should NOT be able to see Administrator
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Administrator should not be in the list
    And I click out of the text box
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and I do not see 'Administrator'


#
############################### New Interpreter ##############################
  @ignoreThis
  Scenario: Administrator should be able to add a new Interp.
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    And I click out of the text box
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    And I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then 'INTERPRETER' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 1 valid INTERPRETER should be in the list


  @runThis
  Scenario: Administrator should be able to update an Interpreter
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I update some Interpreter fields
    And I click on update
    And I wait for 3000 milli-seconds
    Then I see success notification

  @runThis
  Scenario: Administrator should be able to delete/disable an Interpreter
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I update Interpreter available field
    And I click on update
    Then I see success notification


  @runThis
  Scenario: Booking Officer  should be able to update an Interpreter
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I update some Interpreter fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Booking Officer  should be able to delete/disable an Interpreter
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I update Interpreter available field
    And I click on update
    Then I see success notification

############################### New Client ##############################
  @runThis
  Scenario: Administrator should be able to add a new Client
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    And I click out of the text box
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Individual Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then 'INDIVIDUALCLIENT' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 1 valid INDIVIDUAL CLIENT should be in the list

  @runThis
  Scenario: Administrator should be able to update an Individual Client
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Individual Client
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I update some Individual Client fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Administrator should be able to delete/disable an Individual Client
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Individual Client
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I update Individual Client available field
    And I click on update
    Then I see success notification


  @runThis
  Scenario: Booking Officer  should be able to update an Individual Client
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Individual Client
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I update some Individual Client fields
    And I click on update
    Then I see success notification
