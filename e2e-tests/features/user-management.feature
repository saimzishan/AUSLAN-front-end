Feature: Create, read, update and delete a User
  In order to access the booking system
  A valid user needs to created

#  Background: list of users you can create  OrganisationalRepresentative= 1,
#  Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
  Background: List of users you can create  OrganisationalRepresentative= 1, Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page

############################## New Admin ##############################
  @ignoreThis
  Scenario: Administrator should be able to add a new Administrator
    When I click on 'Create New User'
    And I add a valid Administrator
    And I click on 'Create'
    Then I am on the 'User Management' list page
    And the valid Administrator should be in the list
#  @ignoreThis
#  Scenario: Administrator should be able to update an Administrator
#    Given There is 1 inactive Administrator
#    When I click on edit for an existing Administrator
#    And I update some Administrator fields
#    And I click on update
#    Then I am on the 'User Management' list page
#    And the updated Administrator should be in the list
#
#  Scenario: Administrator should be able to delete/disable an Administrator
#    Given There is 1 active Administrator
#    Given There is at least 1 Administrator
#    When I click on edit for an active existing Administrator
#    And I update Administrator available field
#    And I click on 'SAVE'
#    Then I am on the 'User Management' list page
#    And the Administrator should be disabled
#
#  Scenario: Administrator should not be able to add a new Administrator with invalid information and should receive a visible warning
#    When I click on 'Create New User'
#    And I add an invalid Administrator
#    Then I am shown a validation error
#    When I update the invalid Administrator information
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Administrator should be in the list
#
############################### New Booking Officer ##############################
#  Scenario: Administrator should be able to add a new Booking Officer
#    When I click on 'Create New User'
#    And I add a valid Booking Officer
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Booking Officer should be in the list
#
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
#  Scenario: Administrator should be able to add a new Interpreter
#    When I click on 'Create New User'
#    And I add a valid Interpreter
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Interpreter should be in the list
#
  @ignoreThis
  Scenario: Administrator should be able to update an Interpreter
    Given There is 1 inactive Interpreter
    When I click on edit for an existing Interpreter
    And I update some Interpreter fields
    And I click on update
    Then I am on the 'User Management' list page
    And the updated Interpreter should be in the list
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
#  Scenario: Administrator should be able to add a new Client
#    When I click on 'Create New User'
#    And I add a valid Client
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Client should be in the list
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
#  Scenario: Administrator should be able to add a new Organisational Representative
#    When I click on 'Create New User'
#    And I add a valid Organisational Representative
#    And I click on 'Create'
#    Then I am on the 'User Management' list page
#    And the valid Organisational Representative should be in the list
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
    When I click on reset password for an active existing Interpreter
    Then The password for the user should be reset
