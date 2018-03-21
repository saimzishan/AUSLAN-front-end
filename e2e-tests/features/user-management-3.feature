Feature: Create, read, update and delete a User
  In order to access the booking system
  A valid user needs to created

#  Background: list of users you can create  OrganisationalRepresentative= 1,
#  Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
  Background: List of users you can create  OrganisationalRepresentative= 1, Accountant= 2, Client= 3, BookingOfficer= 4, Administrator= 5, Interpreter= 6
    Given I go to the website
    And I am shown the login screen, with picture and signup button

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
    And I click out of the text box
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
    And I click out of the text box
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
  Scenario: Administrator should be able to add a new orgrep and if uncheck 'IS YOUR BILLING ADDRESS THE SAME AS YOUR ORGANISATION'S ADDRESS' will remove address attributes from billing address
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    And I click out of the text box
    Then I click on element by name 'user-roles'
    When I hover on the userlist dropdown and select 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then I click on edit for an active existing Organisational Representative
    And I will be taken to the 'ORGANISATIONALREPRESENTATIVE Signup' page
    Then I click on checkbox name 'billingAddressIsDifferent_confirmation'
    Then I will check the address fields has value ''

  @runThis
  Scenario: As Administrator I can update approve date Interpreter
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on my admin home screen
    And I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then I click on edit for an active existing Interpreter
    And I will be taken to the 'INTERPRETER Signup' page
    And I enter approved date
    And I click on BUTTON name 'register_user'
    Then I see success notification
