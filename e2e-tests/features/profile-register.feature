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
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Unprocessable Entity "email":"has already been taken""

  @runThis
  Scenario: With An Interpreter created before, can't create another interp with same email
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Unprocessable Entity "email":"has already been taken""

  @runThis
  Scenario: With An Organisational Representative created before, can't create another org rep with same email
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Unprocessable Entity "email":"has already been taken""

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

# --------------------------------------- AUSLAN1-174, AUSLAN1-53 START ------------------------------------------------

  @runThis
  Scenario: An interp can be created
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click on BUTTON name 'register_user'
    Then 'INTERPRETER' will be created

  @runThis
  Scenario: An org rep can be created
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click on BUTTON name 'register_user'
    Then 'ORGANISATIONALREPRESENTATIVE' will be created


  @runThis
  Scenario: An individual-client can be created
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click on BUTTON name 'register_user'
    Then 'INDIVIDUALCLIENT' will be created
# --------------------------------------- AUSLAN1-174, AUSLAN1-53 END ------------------------------------------------


# --------------------------------------- AUSLAN1-472 START ------------------------------------------------
  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS'
    Then 'INTERPRETER' will be created

  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I fill all the details correctly for -> 'INTERPRETER' with the pref communication is 'SMS AND EMAIL'
    Then 'INTERPRETER' will be created
# --------------------------------------- AUSLAN1-472 END ------------------------------------------------

# --------------------------------------- AUSLAN1-53 START ------------------------------------------------
  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS'
    Then 'INDIVIDUALCLIENT' will be created

  @runThis
  Scenario: interp sign up with prefer communication
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then 'INDIVIDUALCLIENT' will be created
# --------------------------------------- AUSLAN1-53 END ------------------------------------------------

# --------------------------------------- AUSLAN1-379 START ------------------------------------------------
  @runThis
  Scenario: INDIVIDUAL-CLIENT sign up with prefered-interpreters, Interpreter and Interpreter1 and Interpreter2 exists
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    Then I wait for 1000 milli-seconds
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    Then I can see the element with css 'div.row ext' is 'visible'
    When I click on element with css '.btnYes_prefered'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter'
    Then  I can see the element with css 'section#interpreters-list' is 'visible'
    Then I can see '3' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
    And I verify '3' interpreter is 'dragana_3'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then I can see the element with css 'section[name="interpreters"]' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    And  I click on BUTTON name 'btnManageInterpreter'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I can see the element with css '.md-dialog.add-interpreters' is 'hidden'
    And  I click on BUTTON name 'btnManageInterpreter'
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then 'INDIVIDUALCLIENT' will be created

  @runThis
  Scenario: An org rep can be created
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    Then I can see the element with name 'interpreter_block' is 'visible'
    When I click on BUTTON name 'btnYes'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter'
    Then  I can see the element with css 'section.interpreters-list' is 'visible'
    Then I can see '3' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'Dragana'
    And I verify '2' interpreter is 'Dragana_2'
    And I verify '3' interpreter is 'Dragana_3'
    When I click on '1' interpreter
    Then I can see the element with css 'md-dialog.select_interpreter > div.interpreter.block.checked' is 'visible'
    Then I can see the element with css 'div.interpreter.block.checked' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'md-dialog.select_interpreter > div.interpreter.block.checked' is 'visible'
    Then I can see the element with css 'div.interpreter.block.checked' is 'visible'
    When I click on '3' interpreter
    Then I can see the element with css 'md-dialog.select_interpreter > div.interpreter.block.checked' is 'visible'
    Then I can see the element with css 'div.interpreter.block.checked' is 'visible'
    Then I can see the element of type 'div'  with text 'Add Interpreter'
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I click on BUTTON name 'register_user'
    Then 'ORGANISATIONALREPRESENTATIVE' will be created

# --------------------------------------- AUSLAN1-379 END ------------------------------------------------
