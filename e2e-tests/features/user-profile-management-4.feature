Feature: User Profile Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

    @runThis
#  Change pass
  Scenario: Be able to change password as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@
    And I type in the confirm password is Pass@
    And I click on BUTTON 'SAVE'
    Then I get error message: 'is not secure; use letters (uppercase and downcase), numbers and special characters'


  @runThis
#  Change pass
  Scenario: Be able to change password as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@
    And I type in the confirm password is Pass@
    And I click on BUTTON 'SAVE'
    Then I get error message: 'is not secure; use letters (uppercase and downcase), numbers and special characters'


  @runThis
#  Change pass
  Scenario: Be able to change password as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@
    And I type in the confirm password is Pass@
    And I click on BUTTON 'SAVE'
    Then I get error message: 'is not secure; use letters (uppercase and downcase), numbers and special characters'
# ---------------------------------------- AUSLAN1-506 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-507 -> START ----------------------------------------
  @runThis
#  Change pass
  Scenario: Be able to change password as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Oops! Please fill in all the fields correctly.'

  @runThis
#  Change pass
  Scenario: Be able to change password as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Oops! Please fill in all the fields correctly.'

  @runThis
#  Change pass
  Scenario: Be able to change password as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Oops! Please fill in all the fields correctly.'

  @runThis
#  Change pass
  Scenario: Be able to change password as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Oops! Please fill in all the fields correctly.'

  @runThis
#  Change pass
  Scenario: Be able to change password as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Oops! Please fill in all the fields correctly.'
# ---------------------------------------- AUSLAN1-507 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-53 -> Start ----------------------------------------

  @runThis
#  Show profile page
  Scenario: Be able to update the prefComm as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I change the dropwdown field COMM. PREFERENCE * with SMS
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And The dropdown field COMM. PREFERENCE * will be updated with sms_only

  @runThis
#  Show profile page
  Scenario: Be able to update the prefComm as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    When I change the dropwdown field COMM. PREFERENCE * with SMS AND EMAIL
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And The dropdown field COMM. PREFERENCE * will be updated with email_and_sms
    
    