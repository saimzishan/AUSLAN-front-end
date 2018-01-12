Feature: User Profile Management

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button

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
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
      And I sign in with valid Individual Client credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page


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
      And I click on BUTTON 'SAVE'
      Then I get valid message: 'User details updated Successfully'
      Then I scroll to top
      And I click on my name in the top corner
      Then I click on logout
      And I sign in with valid Organisational Representative credentials
      And I am on the bookings page
      And I click on my name in the top corner
      And I will be taken to my individual profile page
# ---------------------------------------- AUSLAN1-53 -> End ----------------------------------------


# --------------------------------------------- AUSLAN1-165 -> START ---------------------------------------------
  @runThis
#  Show profile page
  Scenario: Be able to check the profile picture as Administrator
    Given I exist as an Administrator
    When I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I can verify my profile pic is same with link 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/missing.svg'

  @runThis
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

  @runThis
#  Show profile page
  Scenario: Be able to update the profile picture as Organisational Representative with different picture
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I can verify my profile pic is same with link 'missing.svg'
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I will upload a document 'sanji_not_sushi.png'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I can verify my profile pic is different with link 'missing.svg'
    When I will upload a document 'sanji_not_sushi.jpg'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I can verify my profile pic is different with link 'missing.svg'

  @runThis
#  Show profile page
  Scenario: Be able to update the profile picture as Individual Client with different picture
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I can verify my profile pic is same with link 'missing.svg'
    And I click on my name in the top corner
    And I will be taken to my individual profile page
    When I will upload a document 'sanji_not_sushi.png'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I can verify my profile pic is different with link 'missing.svg'
     When I will upload a document 'sanji_not_sushi.jpg'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    And I can verify my profile pic is different with link 'missing.svg'
# --------------------------------------------- AUSLAN1-165 -> END ---------------------------------------------
