Feature: Create Profile with prefered or blocked interpreters

  Background: I as an all user should be able to see the profile page to create different
  types of accounts
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    When I click on button 'CREATE AN ACCOUNT'
    Then I will be taken to the 'Choose Profile' page

# --------------------------------------- AUSLAN1-379 START ------------------------------------------------
  @runThis
  Scenario: INDIVIDUAL-CLIENT sign up with prefered-interpreters, Interpreter and Interpreter1 and Interpreter2 exists
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    Then I wait for 2000 milli-seconds
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I wait for 2000 milli-seconds
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    Then I can see the element with css 'div.row.ext' is 'visible'
    When I click on element with css '.btnYes_prefered'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then  I can see the element with css 'section#interpreters-list' is 'visible'
    Then I can see '3' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
    And I verify '3' interpreter is 'dragana_3'
    Then I can see the element with css 'section[name="interpreters"]' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '2'
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then 'INDIVIDUALCLIENT' will be created

  @runThis
  Scenario: An org rep can sign up with prefered-interpreters, Interpreter and Interpreter1 and Interpreter2 exists
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    Then I wait for 2000 milli-seconds
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I wait for 2000 milli-seconds
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    Then I can see the element with css 'div.row.ext' is 'visible'
    When I click on element with css '.btnYes_prefered'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then  I can see the element with css 'section#interpreters-list' is 'visible'
    Then I can see '3' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
    And I verify '3' interpreter is 'dragana_3'
    Then I can see the element with css 'section[name="interpreters"]' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '2'
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then 'ORGANISATIONALREPRESENTATIVE' will be created

  @runThis
  Scenario: INDIVIDUAL-CLIENT can sign up with blocked-interpreters, Interpreter and Interpreter1 and Interpreter2 exists
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    Then I wait for 2000 milli-seconds
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I wait for 2000 milli-seconds
    Then I can see the element with name 'interpreter_block_blocked' is 'visible'
    Then I can see the element with css '.btnYes_blocked' is 'visible'
    Then I can see the element with css 'div.row.ext' is 'visible'
    When I click on element with css '.btnYes_blocked'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then  I can see the element with css 'section#interpreters-list' is 'visible'
    Then I can see '3' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
    And I verify '3' interpreter is 'dragana_3'
    Then I can see the element with css 'section[name="interpreters"]' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '2'
    When I fill all the details correctly for -> 'INDIVIDUALCLIENT' with the pref communication is 'SMS AND EMAIL'
    Then 'INDIVIDUALCLIENT' will be created

  @runThis
  Scenario: An org rep can sign up with blocked-interpreters, Interpreter and Interpreter1 and Interpreter2 exists
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    Then I wait for 2000 milli-seconds
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I wait for 2000 milli-seconds
    Then I can see the element with name 'interpreter_block_blocked' is 'visible'
    Then I can see the element with css '.btnYes_blocked' is 'visible'
    Then I can see the element with css 'div.row.ext' is 'visible'
    When I click on element with css '.btnYes_blocked'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then  I can see the element with css 'section#interpreters-list' is 'visible'
    Then I can see '3' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
    And I verify '3' interpreter is 'dragana_3'
    Then I can see the element with css 'section[name="interpreters"]' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '2'
    When I fill all the details correctly for -> 'ORGANISATIONALREPRESENTATIVE' with the pref communication is 'SMS AND EMAIL'
    Then 'ORGANISATIONALREPRESENTATIVE' will be created

  @runThis
  Scenario: Selected Interpreter shows as unselectable in both prefered and blocked popups, Interpreter and Interpreter1 and Interpreter2 exists
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    Then I wait for 2000 milli-seconds
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    Then I wait for 2000 milli-seconds
    Then I can see the element with name 'interpreter_block_blocked' is 'visible'
    Then I can see the element with css '.btnYes_blocked' is 'visible'
    Then I can see the element with css 'div.row.ext' is 'visible'
    When I click on element with css '.btnYes_blocked'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then  I can see the element with css 'section#interpreters-list' is 'visible'
    Then I can see '3' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
    And I verify '3' interpreter is 'dragana_3'
    Then I can see the element with css 'section[name="interpreters"]' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then I can count the element with css 'section[name="interpreters"].added' to be '1'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'hidden'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    When I click on element with css '.btnYes_blocked'
    Then I can see the element with name 'booking-preferences' is 'visible'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then I can count the element with css 'section[name="interpreters"].added' to be '2'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'hidden'
    Then I click on BUTTON name 'noBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'


# --------------------------------------- AUSLAN1-379 END ------------------------------------------------
