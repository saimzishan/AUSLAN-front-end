Feature: Create Profile with prefered or blocked interpreters

  Background: I as an all user should be able to see the profile page to create different
  types of accounts
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    When I click on button 'CREATE AN ACCOUNT'
    Then I will be taken to the 'Choose Profile' page

# --------------------------------------- AUSLAN1-379 START ------------------------------------------------
  @runThis
  Scenario: INDIVIDUAL-CLIENT sign up with prefered-interpreters, Interpreter and Interpreter1  exists
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
    Then I can see '2' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
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
  Scenario: An org rep can sign up with prefered-interpreters, Interpreter and Interpreter1  exists
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
    Then I can see '2' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
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
  Scenario: INDIVIDUAL-CLIENT can sign up with blocked-interpreters, Interpreter and Interpreter1  exists
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
    Then I can see '2' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
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
  Scenario: An org rep can sign up with blocked-interpreters, Interpreter and Interpreter1  exists
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
    Then I can see '2' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
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
  Scenario: Selected Interpreter shows as unselectable in both prefered and blocked popups, Interpreter and Interpreter1 exists
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
    Then I can see '2' validated interpreters
    And I can see interpreters in alphabetical order
    And I verify '1' interpreter is 'dragana'
    And I verify '2' interpreter is 'dragana_2'
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
    Then I can count the element with css 'section[name="interpreters"].interpreter_added' to be '1'
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
    Then I can count the element with css 'section[name="interpreters"].interpreter_added' to be '2'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'hidden'
    Then I click on BUTTON name 'noBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can remove '2' , 'prefered' interpreter
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '0'
    Then I can remove '1' , 'blocked' interpreter
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    Then I can count the element with css 'section[name="interpreters"].interpreter_added' to be '0'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'

  @runThis
  Scenario: Individual Client can edit prefered-interpreters once logs in, Interpreter , Interpreter2 and Interpreter1 exists
    And I go to the website
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'


  @runThis
  Scenario: Organisational Representative can edit prefered-interpreters once logs in, Interpreter , Interpreter2 and Interpreter1 exists
    And I go to the website
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'

  @runThis
  Scenario: Individual Client can delete their prefered-interpreters once logs in, Interpreter , Interpreter2 and Interpreter1 exists
    And I go to the website
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    Then I can remove '1' , 'prefered' interpreter
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '0'


  @runThis
  Scenario: Organisational Representative can delete their prefered-interpreters once logs in, Interpreter , Interpreter2 and Interpreter1 exists
    And I go to the website
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    Then I can remove '1' , 'prefered' interpreter
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on my name in the top corner
    Then I will be taken to my individual profile page
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '0'


# --------------------------------------- AUSLAN1-379 END ------------------------------------------------
