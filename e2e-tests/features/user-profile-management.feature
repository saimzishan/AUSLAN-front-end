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

################################## Can Edit and save the update ##################################
  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I change some input text fields of the BOOKINGOFFICER
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the BOOKINGOFFICER is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Administrator
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I change some input text fields of the ADMINISTRATOR
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the ADMINISTRATOR is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I change some input text fields of the INTERPRETER
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the INTERPRETER is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I change some input text fields of the ORGANISATIONALREPRESENTATIVE
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the ORGANISATIONALREPRESENTATIVE is updated

  @runThis
#  Show profile page
  Scenario: Be able to update the profile as Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I change some input text fields of the INDIVIDUALCLIENT
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I click on Bookings
    And I am on the bookings page
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    And I verify input text fields of the INDIVIDUALCLIENT is updated

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
    When I type in current password is Abcd1234
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
    When I type in current password is Abcd1234
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
    When I type in current password is Abcd1234
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
    When I type in current password is Abcd1234
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
    When I type in current password is Abcd1234
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
    When I type in current password is Abcd#1234
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
    When I type in current password is Abcd#1234
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
    And I will be taken to my individual profile page
    And I click on Profile 'Change Password'
    And I will be taken to my individual secure_pass page
    When I type in current password is Abcd#1234
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
    When I type in current password is Abcd#1234
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
    When I type in current password is Abcd#1234
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
    When I type in current password is Abcd#1234
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
    When I type in current password is Abcd#1234
    And I type in the new password is Pass@1234
    And I type in the confirm password is Pass@123
    And I click on BUTTON 'SAVE'
    Then I get error message: 'Kindly fill all the required (*) fields'
# ---------------------------------------- AUSLAN1-507 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-53 -> Start ----------------------------------------

  @runThis
#  Show profile page
  Scenario: Be able to update the prefComm as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
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
    And I will be taken to my individual profile page
    And The dropdown field COMM. PREFERENCE * will be updated with sms_only

  @runThis
#  Show profile page
  Scenario: Be able to update the prefComm as Interpreter
    Given I exist as an Interpreter
    And I sign in with valid Interpreter credentials
    And I am on the bookings page
    And I click on my name in the top corner
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
    And I will be taken to my individual profile page
    And The dropdown field COMM. PREFERENCE * will be updated with email_and_sms


  @runThis
#  Show profile page
    Scenario: Be able to update the prefComm as Individual Client to Email only
      Given I exist as an Individual Client
      And I sign in with valid Individual Client credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      When I change the dropwdown field COMM. PREFERENCE * with EMAIL
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
    And I sign in with valid Individual Client credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      And The dropdown field COMM. PREFERENCE * will be updated with email_only

    @runThis
#  Show profile page
    Scenario: Be able to update the prefComm as Individual Client to Email and SMS
      Given I exist as an Individual Client
      And I sign in with valid Individual Client credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      When I change the dropwdown field COMM. PREFERENCE * with SMS AND EMAIL
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
      And I sign in with valid Individual Client credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      And The dropdown field COMM. PREFERENCE * will be updated with email_and_sms

       @runThis
#  Show profile page
    Scenario: Be able to update the pref Billing Method as Individual Client to email
      Given I exist as an Individual Client
      And I sign in with valid Individual Client credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      When I click on checkbox name 'preferred_billing_method_email'
      Then I verify checkbox name 'preferred_billing_method_email' and is checked 'false'
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
      And I sign in with valid Individual Client credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      Then I verify checkbox name 'preferred_billing_method_email' and is checked 'false'


  @runThis
#  Show profile page
    Scenario: Be able to update the prefComm as Organisational Representative
      Given I exist as an Organisational Representative
      And I sign in with valid Organisational Representative credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      When I change the dropwdown field COMM. PREFERENCE * with EMAIL
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
    And I sign in with valid Organisational Representative credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      And The dropdown field COMM. PREFERENCE * will be updated with email_only

    @runThis
#  Show profile page
    Scenario: Be able to update the prefComm as Organisational Representative
      Given I exist as an Organisational Representative
      And I sign in with valid Organisational Representative credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      When I change the dropwdown field PREFFERED CONTACT METHOD with PHONE
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
      And I sign in with valid Organisational Representative credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      And The dropdown field PREFFERED CONTACT METHOD will be updated with phone

       @runThis
#  Show profile page
    Scenario: Be able to update the prefComm as Organisational Representative
      Given I exist as an Organisational Representative
      And I sign in with valid Organisational Representative credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      When I click on checkbox name 'preferred_billing_method_email'
      Then I verify checkbox name 'preferred_billing_method_email' and is checked 'false'
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
      And I sign in with valid Organisational Representative credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
      Then I verify checkbox name 'preferred_billing_method_email' and is checked 'false'
# ---------------------------------------- AUSLAN1-53 -> End ----------------------------------------


# --------------------------------------------- AUSLAN1-165 -> START ---------------------------------------------
  @ignoreThis
#  Show profile page
  Scenario: Be able to check the profile picture as Administrator
    Given I exist as an Administrator
    When I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I can verify my profile pic is same with link 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/missing.svg'

  @ignoreThis
#  Show profile page
  Scenario: Be able to update the profile picture as Administrator with different picture
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I can verify my profile pic is same with link 'missing.svg'
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I will upload a document 'sanji_not_sushi.png'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I can verify my profile pic is different with link 'missing.svg'
# --------------------------------------------- AUSLAN1-165 -> END ---------------------------------------------