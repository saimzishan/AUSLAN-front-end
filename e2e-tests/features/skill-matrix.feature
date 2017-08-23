Feature: Skill Matrix 1.0

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Given 1 verified Interpreter, as a Booking Officer I can see the list of users
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list

  @runThis
  Scenario: Given 1 verified Interpreter, as a Booking Officer I can see his skills matrix
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list
    When I hover on the 'Actions' of the Interpreter
    And I click on 'Skill Matrix' for an active existing Interpreter
    Then I should be on the skill matrix page

  @runThis
  Scenario: Given 1 verified Interpreter, as a Booking Officer I can change skills of an Interpreter
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list
    When I hover on the 'Actions' of the Interpreter
    And I click on 'Skill Matrix' for an active existing Interpreter
    Then I should be on the skill matrix page
    And I can see the button 'Save' is disabled
    When I change one of the skills
    Then I can see the button 'Save' is enabled

  @runThis
  Scenario: Given 1 verified Interpreter, as a Administrator I can change skills of an Interpreter
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    When I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list
    When I hover on the 'Actions' of the Interpreter
    And I click on 'Skill Matrix' for an active existing Interpreter
    Then I should be on the skill matrix page
    Then I can see the button 'Save' is disabled
    When I change one of the skills
    Then I can see the button 'Save' is enabled
    When I click on button 'Save'
    Then I wait for 1000 milli-seconds
    Then I get a success message: 'User details updated Successfully'
    Then I click on Bookings
    And I am on the bookings page
    When I hover on the 'Profile'
    And I go to the 'User Management' list page
    Then The valid Interpreter should be in the list
    When I hover on the 'Actions' of the Interpreter
    And I click on 'Skill Matrix' for an active existing Interpreter
    Then I should see the updated skill
