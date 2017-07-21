Feature: User Profile Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

################################## Can View the Profile ##################################
#  @ignoreThis
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
  Scenario: Be able to view the profile as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:

  @ignoreThis
#  Show profile page
  Scenario: Be able to view the profile as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:

  @ignoreThis
#  Show profile page
  Scenario: Be able to view the profile as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:

  @ignoreThis
#  Show profile page
  Scenario: Be able to view the profile as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:


################################## Can Edit and save the update ##################################
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
  Scenario: Be able to update the profile as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:
    When I change the input field FIRST NAME * with Yesman
    And I click on BUTTON 'SAVE'
    Then The input field FIRST NAME * will be updated with Yesman

  @ignoreThis
#  Show profile page
  Scenario: Be able to update the profile as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:
    When I change the input field FIRST NAME * with Yesman
    And I click on BUTTON 'SAVE'
    Then The input field FIRST NAME * will be updated with Yesman

  @ignoreThis
#  Show profile page
  Scenario: Be able to update the profile as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:
    When I change the input field FIRST NAME * with Yesman
    And I click on BUTTON 'SAVE'
    Then The input field FIRST NAME * will be updated with Yesman

   @ignoreThis
#  Show profile page
  Scenario: Be able to update the profile as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I can see the fields FIRST NAME *, LAST NAME *, EMAIL *, MOBILE *, STATUS, Change Picture:
    When I change the input field FIRST NAME * with Yesman
    And I click on BUTTON 'SAVE'
    Then The input field FIRST NAME * will be updated with Yesman

################################## Profile PASSWORD related ##################################
  @ignoreThis
#  Show profile pass page
  Scenario: Be able to show password password page as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @ignoreThis
#  Show profile pass page
  Scenario: Be able to show password password page as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @ignoreThis
#  Show profile pass page
  Scenario: Be able to show password password page as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @ignoreThis
#  Show profile pass page
  Scenario: Be able to show password password page as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @ignoreThis
#  Show profile pass page
  Scenario: Be able to show password password page as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is ABCD#1234
    And I type in the confirm password is ABCD#1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'Congrats! Password successfully changed.'

  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd1234
    And I type in the new password is ABCD#1234
    And I type in the confirm password is ABCD#1234
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Current password is not correct.'

  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Ab
    And I type in the confirm password is Ab
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Password needs to be at least 8 characters.'

  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is ABCD#1234
    And I type in the confirm password is ABCD#12
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Passwords don't match.'