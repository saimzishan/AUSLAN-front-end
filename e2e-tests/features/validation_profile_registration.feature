Feature: Validation of Profile Registration.
  - not password (cause password still accept one character eventhough it said 6 characters),
  - not drop down
  - not email
  - mobile still accept 1 digits


  Background: I as an all user should be able to see the profile page to create different
  types of accounts
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    When I click on button 'CREATE AN ACCOUNT'
    Then I will be taken to the 'Choose Profile' page

#    INVALIDATION ICON -> interpreter
  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'first_name' with value 'G'
    And I jump to 'last_name' element
    Then I will get a error notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'last_name' with value 'C'
    And I jump to 'mobile1' element
    Then I will get a error notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'mobile1' with value '1'
    And I jump to 'address_street' element
    Then I will get a error notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'address_street' with value 'F'
    And I jump to 'address_suburb' element
    Then I will get a error notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'address_suburb' with value 'S'
    And I jump to 'address_post_code' element
    Then I will get a error notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'address_post_code' with value '1'
    And I jump to 'address_state' element
    Then I will get a error notification

    #  VALIDATION ICON
  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'first_name' with value 'George'
    And I jump to 'last_name' element
    Then I will get a valid notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'last_name' with value 'Charalambous'
    And I jump to 'mobile1' element
    Then I will get a valid notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'mobile1' with value '0490000001'
    And I jump to 'address_street' element
    Then I will get a valid notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'address_street' with value 'Flemington'
    And I jump to 'address_suburb' element
    Then I will get a valid notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'address_suburb' with value 'Solly'
    And I jump to 'address_post_code' element
    Then I will get a valid notification

  @runThis
  Scenario: interp can be created
    When I click on image of 'Interpreter'
    Then I will be taken to the 'INTERPRETER Signup' page
    When I fill the field 'address_post_code' with value '3054'
    And I jump to 'address_unit_num' element
    Then I will get a valid notification