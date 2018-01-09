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

# ------------------------------ Organisational Representative ------------------------------

  @runThis
  Scenario: orgrep can can check an invalid first name gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'first_name' with value 'G'
    And I jump to 'last_name' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid last name gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'last_name' with value 'C'
    And I jump to 'password' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid password gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'password' with value 'C'
    And I jump to 'certainPassword' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid confirm password gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'password' with value 'Abcd#1234'
    And I fill the field 'certainPassword' with value 'A'
    And I jump to 'email' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid email gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'email' with value 'georgeorganisationalrepresentative'
    And I jump to 'phone' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid mobile gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'mobile' with value '1'
    And I jump to 'address_street_number' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid phone number number gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'phone' with value '1'
    And I jump to 'business_abn' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an business abn gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'business_abn' with value '1'
    And I jump to 'business_name' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an business name gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'business_name' with value ''
    And I jump to 'address_street_number' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid address street number gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'address_street_number' with value ''
    And I jump to 'address_street' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid address street name gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'address_street' with value 'F'
    And I jump to 'address_suburb' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid address suburb gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'address_suburb' with value 'S'
    And I jump to 'address_post_code' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid address post code gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'address_post_code' with value '1'
    And I jump to 'cn_first_name' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid contact first name gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'cn_first_name' with value 'G'
    And I jump to 'cn_last_name' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid contact last name gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'cn_last_name' with value 'C'
    And I jump to 'cn_email' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid contact email gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'cn_email' with value 'georgeorganisationalrepresentative'
    And I jump to 'cn_phone' element
    Then I will get a error notification

  @runThis
  Scenario: orgrep can check an invalid contact phone number gives a notification
    When I click on image of 'Organisational Representative'
    Then I will be taken to the 'ORGANISATION Signup' page
    When I fill the field 'cn_phone' with value '1'
    And I jump to 'address_unit_num' element
    Then I will get a error notification