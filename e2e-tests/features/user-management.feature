Feature: Create, read, update and delete a User
  In order to access the booking system
  A valid user needs to created

#  Background: list of users you can create  OrganisationalRepresentative= 1,
#  Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
  Background: List of users you can create  OrganisationalRepresentative= 1, Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
    Given I go to the website
    And I am shown the login screen, with picture and signup button



############################## New Admin ##############################
  @runThis
  Scenario: Administrator should be able to add a new Admin
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Administrator'
    And I will be taken to the 'ADMINISTRATOR Signup' page
    And I fill in all the details correctly for -> 'ADMINISTRATOR'
    Then 'ADMINISTRATOR' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 3 valid Administrator should be in the list

  @runThis
  Scenario: Administrator should be able to update an Admin
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Administrator
    And I will be taken to the 'ADMINISTRATOR Signup' page
    And I update some Administrator fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Administrator should be able to delete/disable an Administrator
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Administrator
    And I will be taken to the 'ADMINISTRATOR Signup' page
    And I update Administrator available field
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Administrator should not be able to add a new Administrator with invalid information and should receive a visible warning
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Administrator'
    And I will be taken to the 'ADMINISTRATOR Signup' page
    And I add an invalid Administrator
    And I click on update
    Then I see validation errors

############################### New Booking Officer ##############################
  @runThis
  Scenario: Administrator should be able to add a new Booking-Officer
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Booking Officer'
    And I will be taken to the 'BOOKINGOFFICER Signup' page
    And I fill in all the details correctly for -> 'BOOKINGOFFICER'
    Then 'BOOKINGOFFICER' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 1 valid BOOKING OFFICER should be in the list
#  Scenario: Administrator should be able to update an Booking Officer
#    Given There is 1 inactive Booking Officer
#    When I click on edit for an existing Booking Officer
#    And I update some Booking Officer fields
#    And I click on update
#    Then I am on the 'User Management' list page
#    And the updated Booking Officer should be in the list
#
#  Scenario: Administrator should be able to delete/disable an Booking Officer
#    Given There is 1 active Booking Officer
#    When I click on edit for an existing Booking Officer
#    And I update Booking Officer available field
#    And I click on 'SAVE'
#    Then I am on the 'User Management' list page
#    And the Booking Officer should be disabled
#
#  Scenario: Administrator should not be able to add a new Booking Officer with invalid information and should receive a visible warning
#    When I click on 'Create New User'
#    And I add an invalid Booking Officer
#    Then I am shown a validation error
#    When I update the invalid Booking Officer information
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Booking Officer should be in the list
#
############################### New Interpreter ##############################
  @runThis
  Scenario: Administrator should be able to add a new Interp.
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    And I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then 'INTERPRETER' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 1 valid INTERPRETER should be in the list
#  @ignoreThis
#  Scenario: Administrator should be able to update an Interpreter
#    Given There is 1 inactive Interpreter
#    When I click on edit for an existing Interpreter
#    And I update some Interpreter fields
#    And I click on update
#    Then I am on the 'User Management' list page
#    And the updated Interpreter should be in the list
#
#  Scenario: Administrator should be able to delete/disable an Interpreter
#    Given There is 1 active Interpreter
#    When I click on edit for an active existing Interpreter
#    And I update Interpreter available field
#    And I click on 'SAVE'
#    Then I am on the 'User Management' list page
#    And the Interpreter should be disabled
#
#  Scenario: Administrator should not be able to add a new Interpreter with invalid information and should receive a visible warning
#    When I click on 'Create New User'
#    And I add an invalid Interpreter
#    Then I am shown a validation error
#    When I update the invalid Interpreter information
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Interpreter should be in the list
#
############################### New Client ##############################
  @runThis
  Scenario: Administrator should be able to add a new Client
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Individual Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then 'INDIVIDUALCLIENT' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 1 valid INDIVIDUAL CLIENT should be in the list
#  @ignoreThis
#  Scenario: Administrator should be able to update an Client
#    Given There is 1 inactive Client
#    When I click on edit for an existing Client
#    And I update some Client fields
#    And I click on update
#    Then I am on the 'User Management' list page
#    And the updated Client should be in the list
#
#  Scenario: Administrator should be able to delete/disable an Client
#    Given There is 1 active Client
#    When I click on edit for an active existing Client
#    And I update Client available field
#    And I click on 'SAVE'
#    Then I am on the 'User Management' list page
#    And the Client should be disabled
#
#  Scenario: Administrator should not be able to add a new Client with invalid information and should receive a visible warning
#    When I click on 'Create New User'
#    And I add an invalid Client
#    Then I am shown a validation error
#    When I update the invalid Client information
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Client should be in the list
#
############################### New Organisational Representative ##############################
  @runThis
  Scenario: Administrator should be able to add a new orgrep
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then 'ORGANISATIONALREPRESENTATIVE' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 1 valid ORGANISATIONAL REPRESENTATIVE should be in the list
#
#  Scenario: Administrator should be able to update an Organisational Representative
#    Given There is 1 inactive Organisational Representative
#    When I click on edit for an existing Organisational Representative
#    And I update some Organisational Representative fields
#    And I click on update
#    Then I am on the 'User Management' list page
#    And the updated Organisational Representative should be in the list
#
#  Scenario: Administrator should be able to delete/disable an Organisational Representative
#    Given There is 1 inactive Organisational Representative
#    When I click on edit for an active existing Organisational Representative
#    And I update Organisational Representative available field
#    And I click on 'SAVE'
#    Then I am on the 'User Management' list page
#    And the Organisational Representative should be disabled
#
#  Scenario: Administrator should not be able to add a new Organisational Representative with invalid information and should receive a visible warning
#    When I click on 'Create New User'
#    And I add an invalid Organisational Representative
#    Then I am shown a validation error
#    When I update the invalid Organisational Representative information
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Organisational Representative should be in the list

# Trigger
  @runThis
  Scenario: Administrator should be able to trigger password reset for Interpreter
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list
    When I hover on the 'Actions' of the Interpreter
    When I click on reset password for an active existing Interpreter
    Then The password for the user should be reset

  @runThis
  Scenario: Administrator should be able to trigger password reset for Individual Client
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Individual Client should be in the list
    When I hover on the 'Actions' of the Individual Client
    When I click on reset password for an active existing Individual Client
    Then The password for the user should be reset

  @runThis
  Scenario: Administrator should be able to trigger password reset for Organisational Representative
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Organisational Representative should be in the list
    When I hover on the 'Actions' of the Organisational Representative
    When I click on reset password for an active existing Organisational Representative
    Then The password for the user should be reset

  @runThis
  Scenario: Administrator should be able to trigger password reset for Booking Officer
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Booking Officer should be in the list
    When I hover on the 'Actions' of the Booking Officer
    When I click on reset password for an active existing Booking Officer
    Then The password for the user should be reset
