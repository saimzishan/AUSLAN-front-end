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
    And I click out of the text box
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