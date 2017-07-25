Feature: User Profile Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

################################## Can View the Profile ##################################
#  @ignoreThis
#  Show profile page
  @ignoreThis
  Scenario: Be able to view the profile as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I will be shown the bookings page
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
  @runThis
#  Show profile pass page
  Scenario: Be able to show password password page as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
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
    And I will be taken to my individual profile page
    When I click on Profile 'Change Password'
    Then I will be taken to my individual secure_pass page

# ---------------------------------------- AUSLAN1-504 -> START ----------------------------------------
  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

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
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

  @ignoreThis
#  Change pass
  Scenario: Be able to change password as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

# ---------------------------------------- AUSLAN1-504 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-505 -> START ----------------------------------------
  @runThis
#  Change pass
  Scenario: Be able to change password as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get error message: 'password authentication failed'

  @runThis
#  Change pass
  Scenario: Be able to change password as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get error message: 'password authentication failed'

  @runThis
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
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get error message: 'password authentication failed'

  @runThis
#  Change pass
  Scenario: Be able to change password as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get error message: 'password authentication failed'

  @runThis
#  Change pass
  Scenario: Be able to change password as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get error message: 'password authentication failed'
# ---------------------------------------- AUSLAN1-505 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-506 -> START ----------------------------------------
  @runThis
#  Change pass
  Scenario: Be able to change password as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@
    And I type in the confirm password is Pass@
    And I click on BUTTON 'SAVE'
    Then I get error message: 'is not secure; use letters (uppercase and downcase), numbers and special characters'


  @runThis
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
    And I type in the new password is Pass@
    And I type in the confirm password is Pass@
    And I click on BUTTON 'SAVE'
    Then I get error message: 'is not secure; use letters (uppercase and downcase), numbers and special characters'


  @runThis
#  Change pass
  Scenario: Be able to change password as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
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
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
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
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
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
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Kindly fill all the required (*) fields'

  @runThis
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
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Kindly fill all the required (*) fields'

  @runThis
#  Change pass
  Scenario: Be able to change password as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Kindly fill all the required (*) fields'

  @runThis
#  Change pass
  Scenario: Be able to change password as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Kindly fill all the required (*) fields'

  @runThis
#  Change pass
  Scenario: Be able to change password as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current pass word is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Kindly fill all the required (*) fields'
# ---------------------------------------- AUSLAN1-507 -> END ----------------------------------------
