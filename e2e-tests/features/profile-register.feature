Feature: Create Profile

 Background: I as an all user should be able to see the profile page to create different
    types of accounts
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    When I click on button 'CREATE AN ACCOUNT'
    Then I will be taken to the 'Choose Profile' page


#  -> invalid notification
  @ignoreThis
  Scenario: Can get the invalid notification for interpreter
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'FIRST NAME *' incorrectly
    Then I will get a error notification

  @ignoreThis
  Scenario: Can get the invalid notification for individual client
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'FIRST NAME *' incorrectly
    Then I will get a error notification

  @ignoreThis
  Scenario: Can get the invalid notification for organisation
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'FIRST NAME *' incorrectly
    Then I will get a error notification

  @ignoreThis
  Scenario: Can press the Interpreter
    When I click on button 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page

  @ignoreThis
  Scenario: Can press the Client
    When I click on button 'Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page

  @ignoreThis
  Scenario: Can press the Organisation Rep
    When I click on button 'Organisation'
    Then I will be taken to the 'ORGANISATION Signup' page

##########    On the signup page for 3 different types of user
#  -> valid notification

  @ignoreThis
  Scenario: Can get the valid notification for Individual Client
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'FIRST NAME *' correctly
    Then I will get a valid notification


  @ignoreThis
  Scenario: Can get the valid notification for interpreter page
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'FIRST NAME *' correctly
    Then I will get a valid notification

  @ignoreThis
  Scenario: Can get the valid notification for organisation
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'FIRST NAME *' correctly
    Then I will get a valid notification
