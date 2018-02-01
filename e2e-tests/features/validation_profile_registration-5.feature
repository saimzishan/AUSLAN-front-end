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

# -----------------------------------------------------------------------------------------
#
#                                      INVALIDATION ICON
#
# -----------------------------------------------------------------------------------------

# ------------------------------ Individual Client ------------------------------

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'first_name' with value 'George'
    And I jump to 'last_name' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'last_name' with value 'Charalambous'
    And I jump to 'password' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'password' with value 'Abcd#1234'
    And I fill the field 'certainPassword' with value 'Abcd#1234'
    And I jump to 'email' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'email' with value 'georgeindividualclient@auslan.comm.au'
    And I jump to 'phone' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'phone' with value '0946300001'
    And I jump to 'address_street_number' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'address_street_number' with value '22'
    And I jump to 'address_street' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'address_street' with value 'Flemington'
    And I jump to 'address_suburb' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'address_suburb' with value 'Solly'
    And I jump to 'address_post_code' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'address_post_code' with value '3000'
    And I jump to 'cn_first_name' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'cn_first_name' with value 'George'
    And I jump to 'cn_last_name' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'cn_last_name' with value 'Charamlambous'
    And I jump to 'cn_email' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'cn_email' with value 'georgeindividualclient@auslan.com.au'
    And I jump to 'cn_phone' element
    Then I will get a valid notification

  @runThis
  Scenario: cli can check validation
    When I click on image of 'Individual Client'
    Then I will be taken to the 'INDIVIDUALCLIENT Signup' page
    When I fill the field 'cn_phone' with value '0946300001'
    And I jump to 'address_unit_num' element
    Then I will get a valid notification
    