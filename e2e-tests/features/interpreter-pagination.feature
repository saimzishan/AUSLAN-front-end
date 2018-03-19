Feature: Interpreter Pagination

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @runThis
  Scenario: Given 1 verified Administrator Officer, I should be able to see paginated interp list on booking detail page
    Given There exist 22 verified interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I can see the element with id 'displayTxt' has text 'Displaying 1 - 20 of 22 Interpreters'
    Then I can see a list of 20 verified interpreters
    Then I can count the element with css 'span.show-for-sr' to be '4'
    Then I click on parent of '3' element with css 'span.show-for-sr'
    Then I can see a list of 2 verified interpreters
    Then I can see the element with id 'displayTxt' has text 'Displaying 21 - 22 of 22 Interpreters'

