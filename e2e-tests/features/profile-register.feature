Feature: Create Profile

 Background: I as an all user should be able to see the profile page to create different
    types of accounts
   Given I go to the website
    And I am shown the login screen, with picture and signup button
    When I click on button 'CREATE AN ACCOUNT'
    Then I will be taken to the 'Choose Profile' page

  @runThis
  Scenario: An org rep can be created
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page

  @runThis
  Scenario: An cli can be created
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page

  @runThis
  Scenario: An interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page

  @runThis
  Scenario: With An Individual Client created before, can't create another cli with same email
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Unprocessable Entity "email":"has already been taken""

  @runThis
  Scenario: With An Interpreter created before, can't create another interp with same email
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Unprocessable Entity "email":"has already been taken""

  @runThis
  Scenario: With An Organisational Representative created before, can't create another org rep with same email
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Unprocessable Entity "email":"has already been taken""

##  -> invalid notification
#  @runThis
#  Scenario: Can get the invalid notification for interp
#    And I click on button 'Interpreter'
#    And I will be taken to the 'INTERPRETER Signup' page
#    When I fill the field 'first_name' incorrectly
#    And I jump to 'last_name' element
#    Then I will get a error notification
#
#  @runThis
#  Scenario: Can get the invalid notification for cli
#    And I click on button 'Client'
#    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
#    When I fill the field 'first_name' incorrectly
#    And I jump to 'last_name' element
#    Then I will get a error notification
#
#  @runThis
#  Scenario: Can get the invalid notification for org rep
#    And I click on button 'Organisation'
#    And I will be taken to the 'ORGANISATION Signup' page
#    When I fill the field 'first_name' incorrectly
#    And I jump to 'last_name' element
#    Then I will get a error notification
#
#  @runThis
#  Scenario: Can get the valid notification for cli
#    And I click on button 'Client'
#    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
#    When I fill the field 'first_name' correctly
#    And I jump to 'last_name' element
#    Then I will get a valid notification
#
#  @runThis
#  Scenario: Can get the valid notification for interp page
#    And I click on button 'Interpreter'
#    And I will be taken to the 'INTERPRETER Signup' page
#    When I fill the field 'first_name' correctly
#    And I jump to 'last_name' element
#    Then I will get a valid notification
#
#  @runThis
#  Scenario: Can get the valid notification for org rep
#    And I click on button 'Organisation'
#    And I will be taken to the 'ORGANISATION Signup' page
#    When I fill the field 'first_name' correctly
#    And I jump to 'last_name' element
#    Then I will get a valid notification
#

  @runThis
  Scenario: An org rep can be show the sign up page
    And I click on button 'Organisation'
    Then I will be taken to the 'ORGANISATION Signup' page

  @runThis
  Scenario: An interp can be show the sign up page
    And I click on button 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page

  @runThis
  Scenario: An cli can be show the sign up page
    And I click on button 'Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page

  @runThis
  Scenario: An org rep can be created
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then 'ORGANISATIONALREPRESENTATIVE' will be created

  @runThis
  Scenario: An cli can be created
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then 'INDIVIDUALCLIENT' will be created

  @runThis
  Scenario: An interp can be created
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then 'INTERPRETER' will be created

# --------------------------------------- AUSLAN1-472 START ------------------------------------------------
  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS'
    Then 'INTERPRETER' will be created

  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then 'INTERPRETER' will be created
# --------------------------------------- AUSLAN1-472 END ------------------------------------------------

# --------------------------------------- AUSLAN1-53 START ------------------------------------------------
  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS'
    Then 'INTERPRETER' will be created

  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then 'INTERPRETER' will be created
# --------------------------------------- AUSLAN1-53 END ------------------------------------------------