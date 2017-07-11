Feature: Create Profile

#  Background: Can be able to show the booking form
  @ignoreThis
  Scenario: Can press the Create Account buttobuttonn
    Given I go to the website
    When I click on button 'CREATE AN ACCOUNT'
    Then I will be taken to the 'Choose Profile' page

#    go to the sign up page
  @ignoreThis
  Scenario: Can press the Interpreter
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    When I click on button 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page

  @ignoreThis
  Scenario: Can press the Client
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    When I click on button 'Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page

  @ignoreThis
  Scenario: Can press the Organisation Rep
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    When I click on button 'Organisation'
    Then I will be taken to the 'ORGANISATION Signup' page

##########    On the signup page for 3 different types of user
#  -> valid notification
  @ignoreThis
  Scenario: Can get the valid notification
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'FIRST NAME *' correctly
    Then I will get a valid notification

  @ignoreThis
  Scenario: Can get the valid notification
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'FIRST NAME *' correctly
    Then I will get a valid notification

  @ignoreThis
  Scenario: Can get the valid notification
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'FIRST NAME *' correctly
    Then I will get a valid notification

#  -> invalid notification
  @ignoreThis
  Scenario: Can get the invalid notification
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    And I click on button 'Interpreter'
    And I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'FIRST NAME *' incorrectly
    Then I will get a invalid notification

  @ignoreThis
  Scenario: Can get the invalid notification
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    And I click on button 'Client'
    And I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'FIRST NAME *' incorrectly
    Then I will get a invalid notification

  @ignoreThis
  Scenario: Can get the invalid notification
    Given I go to the website
    And I click on button 'CREATE AN ACCOUNT'
    And I will be taken to the 'Choose Profile' page
    And I click on button 'Organisation'
    And I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'FIRST NAME *' incorrectly
    Then I will get a invalid notification
