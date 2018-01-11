Feature: User Profile Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

    # ---------------------------------------- AUSLAN1-504 -> START ----------------------------------------
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
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

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
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

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
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

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
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

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
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@1234
    And I click on BUTTON 'SAVE'
    Then I get success message: 'User password updated Successfully'

# ---------------------------------------- AUSLAN1-504 -> END ----------------------------------------

################################## Can View the Profile ##################################
#  @runThis
#  Show profile page
  @runThis
  Scenario: Be able to view the profile as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I will be shown the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page

  @runThis
#  Show profile page
  Scenario: Be able to view the profile as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page

  @runThis
#  Show profile page
  Scenario: Be able to view the profile as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    And I can see the element with name 'interpreter_notes' is 'not visible'

  @runThis
#  Show profile page
  Scenario: Be able to view the profile as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page

  @runThis
#  Show profile page
  Scenario: Be able to view the profile as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    