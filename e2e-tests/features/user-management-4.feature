Feature: Create, read, update and delete a User
  In order to access the booking system
  A valid user needs to created

#  Background: list of users you can create  OrganisationalRepresentative= 1,
#  Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
  Background: List of users you can create  OrganisationalRepresentative= 1, Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
    Given I go to the website
    And I am shown the login screen, with picture and signup button


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
    Given I sign in with valid Administrator credentials
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
    Given I sign in with valid Booking Officer credentials
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
    Given I sign in with valid Organisational Representative credentials
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

  @ignoreThis
  Scenario: Booking Officer can see the interpreter notes when add or edit the interpreter
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    When I click on my name in the top corner
    Then I go to the 'User Management' list page
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    And I can see the element with name 'interpreter_notes' is 'visible'
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Interpreter
    Then I will be taken to the 'INTERPRETER Signup' page
    And I can see the element with name 'interpreter_notes' is 'visible'

  @runThis
  Scenario: Booking Officer can save the interpreter notes when editing the interpreter
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Interpreter
    Then I will be taken to the 'INTERPRETER Signup' page
    And I can see the element with name 'interpreter_notes' is 'visible'
    Then I fill the field 'interpreter_notes' with value 'testing notes'
    And I click on update
    Then I see success notification
    When I click on edit for an active existing Interpreter
    Then I will be taken to the 'INTERPRETER Signup' page
    And I can verify the input 'interpreter_notes' will have the value 'testing notes'

  @runThis
  Scenario: Administrator can save the interpreter payroll settings and will get the unsaved changes warning when changing tabs if changes has been made
    Given I exist as an Administrator
    Given The user 'Administrator' is of type dsq
    Given The user 'Interpreter' is of type dsq
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Interpreter
    Then I will be taken to the 'INTERPRETER Signup' page
    And I click on link 'Payroll'
    Then I fill the field 'ordinaryHours' with value '10.2'
    And I fill the field 'weekend' with value '5.0'
    When I click on link 'Manage Users'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    And I click on BUTTON name 'yesBtn'
    Then I wait for 1000 milli-seconds
    When I click on BUTTON 'Save'
    Then I get valid message: 'Details have been updated.'

  @runThis
  Scenario: Administrator can save the individual client billing settings and will get the unsaved changes warning when changing tabs if changes has been made 
    Given I exist as an Administrator
    Given The user 'Administrator' is of type dsq
    Given The user 'IndividualClient' is of type dsq
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Individual Client
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I click on link 'Payroll'
    Then I fill the field 'ordinaryHours' with value '10.2'
    And I fill the field 'weekend' with value '5.0'
    When I click on link 'Manage Users'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    And I click on BUTTON name 'yesBtn'
    Then I wait for 1000 milli-seconds
    When I click on BUTTON 'Save'
    Then I get valid message: 'Details have been updated.'
  
  @runThis
  Scenario: Administrator can save the organisational representative billing settings and will get the unsaved changes warning when changing tabs if changes has been made
    Given I exist as an Administrator
    Given The user 'Administrator' is of type dsq
    Given The user 'OrganisationalRepresentative' is of type dsq
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Organisational Representative
    Then I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    And I click on link 'Payroll'
    Then I fill the field 'ordinaryHours' with value '10.2'
    And I fill the field 'weekend' with value '5.0'
    When I click on link 'Manage Users'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    And I click on BUTTON name 'yesBtn'
    Then I wait for 1000 milli-seconds
    When I click on BUTTON 'Save'
    Then I get valid message: 'Details have been updated.'
  Scenario: Booking Officer can save the account number of Individual Client
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Individual Client
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I can see the element with name 'linked_account_number' is 'visible'
    Then I fill the field 'linked_account_number' with value '1234567'
    And I click on update
    Then I see success notification
    When I click on edit for an active existing Individual Client
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    And I can verify the input 'linked_account_number' will have the value '1234567'

  @runThis
  Scenario: Booking Officer can save the account number of Organisational Representative
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    And I can see the element with name 'linked_account_number' is 'visible'
    Then I fill the field 'linked_account_number' with value '0987659'
    And I click on update
    Then I see success notification
    When I click on edit for an active existing Organisational Representative
    Then I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    And I can verify the input 'linked_account_number' will have the value '0987659'

  @runThis
  Scenario: Booking Officer can save the account number of interpreter
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on my admin home screen
    Then I click on my name in the top corner
    And I go to the 'User Management' list page
    When I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I can see the element with name 'linked_account_number' is 'visible'
    Then I fill the field 'linked_account_number' with value '12121211'
    And I click on update
    Then I see success notification
    When I click on edit for an active existing Interpreter
    Then I will be taken to the 'INTERPRETER Signup' page
    And I can verify the input 'linked_account_number' will have the value '12121211'
