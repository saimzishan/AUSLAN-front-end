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
    Then The valid Administrator should be in the list are more than one

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

  @runThis
  Scenario: Booking Officer should be able to add a new Booking-Officer
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
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
    Then The valid BOOKING OFFICER should be in the list are more than one

  @runThis
  Scenario: Administrator should be able to update an Booking Officer
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Booking Officer
    And I will be taken to the 'BOOKINGOFFICER Signup' page
    And I update some Booking Officer fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Administrator should be able to delete/disable an Booking Officer
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Booking Officer
    And I will be taken to the 'BOOKINGOFFICER Signup' page
    And I update Booking Officer available field
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Booking Officer should be able to update an Booking-Officer
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Booking Officer
    And I will be taken to the 'BOOKINGOFFICER Signup' page
    And I update some Booking Officer fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Booking Officer should be able to delete/disable an Booking Officer
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Booking Officer
    And I will be taken to the 'BOOKINGOFFICER Signup' page
    And I update Booking Officer available field
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Booking Officer should NOT be able to see Administrator
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Administrator should not be in the list
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and I do not see 'Administrator'


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

  @runThis
  Scenario: Booking Officer  should be able to delete/disable an Individual Client
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Individual Client
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I update Individual Client available field
    And I click on update
    Then I see success notification

############################### New Accountant ##############################
  @runThis
  Scenario: Administrator should be able to add a new Account person
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Accountant'
    And I will be taken to the 'ACCOUNTANT Signup' page
    And I fill in all the details correctly for -> 'ACCOUNTANT'
    Then 'ACCOUNTANT' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 1 valid ACCOUNTANT should be in the list

  @runThis
  Scenario: Administrator should be able to update an Accountant
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Accountant
    And I will be taken to the 'ACCOUNTANT Signup' page
    And I update some Accountant fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Administrator should be able to delete/disable an Accountant
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Accountant
    And I will be taken to the 'ACCOUNTANT Signup' page
    And I update Accountant available field
    And I click on update
    Then I see success notification


  @runThis
  Scenario: Booking Officer  should be able to update an Accountant
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Accountant
    And I will be taken to the 'ACCOUNTANT Signup' page
    And I update some Accountant fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Booking Officer  should be able to delete/disable an Accountant
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Accountant
    And I will be taken to the 'ACCOUNTANT Signup' page
    And I update Accountant available field
    And I click on update
    Then I see success notification
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

  @runThis
  Scenario: Administrator should be able to update an Organisational Representative
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    And I update some Organisational Representative fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Administrator should be able to delete/disable an Organisational Representative
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    And I update Organisational Representative available field
    And I click on update
    Then I see success notification


  @runThis
  Scenario: Booking Officer  should be able to update an Organisational Representative
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    And I update some Organisational Representative fields
    And I click on update
    Then I see success notification

  @runThis
  Scenario: Booking Officer  should be able to delete/disable an Organisational Representative
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    And I update Organisational Representative available field
    And I click on update
    Then I see success notification

    ############################### Duplicate Organisational Representative ##############################

  @runThis
  Scenario: Administrator should be able to duplicate an Organisational Representative
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on duplicate for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    When I fill in basic details correctly for duplicate -> 'ORGANISATIONALREPRESENTATIVE'
    Then I click on update
    Then 'ORGANISATIONALREPRESENTATIVE' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 2 valid ORGANISATIONAL REPRESENTATIVE should be in the list


  @runThis
  Scenario: Booking Officer  should be able to duplicate an Organisational Representative
    And I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on duplicate for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    When I fill in basic details correctly for duplicate -> 'ORGANISATIONALREPRESENTATIVE'
    Then I click on update
    Then 'ORGANISATIONALREPRESENTATIVE' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 2 valid ORGANISATIONAL REPRESENTATIVE should be in the list


  @runThis
  Scenario: Organisational Representative should be able to duplicate an Organisational Representative, Booking Officer, Administrator
    And I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on my dashboard screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Administrator should not be in the list
    Then The valid Booking Officer should not be in the list
    Then I can see the element with name 'user-roles' is 'hidden'
    Then I click on duplicate for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    When I fill in basic details correctly for duplicate -> 'ORGANISATIONALREPRESENTATIVE'
    Then I click on update
    Then 'ORGANISATIONALREPRESENTATIVE' will be created
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The 2 valid ORGANISATIONAL REPRESENTATIVE should be in the list



# Trigger
############################### Trigger ##############################
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

  @runThis
  Scenario: Booking Officer can see the interpreter notes when add or edit the interpreter
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    And I can see the element with name 'interpreter_notes' is 'visible'
    Then I hover on the 'Profile'
    And I go to the 'User Management' list page
    When I click on edit for an active existing Interpreter
    Then I will be taken to the 'INTERPRETER Signup' page
    And I can see the element with name 'interpreter_notes' is 'visible'