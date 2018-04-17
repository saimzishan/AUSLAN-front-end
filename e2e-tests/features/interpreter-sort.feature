Feature: Nearby Interpreter Sort by columns

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @ignoreThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of interp by Preferred column
    Given There exist 5 verified interpreters
    Given The first 1 interpreters have preference 'Preferred'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 5 verified interpreters
    When I click on the interpreter table header 'Preferred'
    Then I should see the verified interpreters in descending order of Preferred
    When I click on the interpreter table header 'Preferred'
    Then I should see the verified interpreters in ascending order of Preferred

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of interp by Name
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    Then I should see the verified interpreters in ascending order of Name
    When I click on the interpreter table header 'Name'
    Then I should see the verified interpreters in descending order of Name

  @runThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of interp by Lvl column
    Given There exist 5 verified interpreters
    Given The first 1 interpreters have skill level 'NoteTaking'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    When I click on the interpreter table header 'Lvl'
    Then I should see the verified interpreters in ascending order of Lvl
    When I click on the interpreter table header 'Lvl'
    Then I should see the verified interpreters in descending order of Lvl


  @runThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of interp by Suburb column
    Given There exist 5 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 5 verified interpreters
    When I click on the 'Recommended' link
    And I wait for 2000 milli-seconds
    When I click on the interpreter table header 'Suburb'
    Then I should see the verified interpreters in ascending order of Suburb
    When I click on the interpreter table header 'Suburb'
    Then I should see the verified interpreters in descending order of Suburb

  @ignoreThis
  Scenario: Given 1 verified Administrator Officer, I can sort the list of interp by Km column
    Given There exist 5 verified interpreters
    Given The first 1 interpreters have travel pay status 'Yes'
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    Then I run all background jobs
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see a list of 5 verified interpreters
    When I click on the interpreter table header 'Km'
    Then I should see the verified interpreters in ascending order of Km
    When I click on the interpreter table header 'Km'
    Then I should see the verified interpreters in descending order of Km
