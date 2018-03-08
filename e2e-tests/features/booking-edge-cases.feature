Feature: Booking Management edge cases
  Background: All users should be able to visit the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Administrator cannot assign two bookings with same timing to the same Interpreter
    Given There exist 2 bookings
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    Then I see 2 rows with state 'Requested'
    And I will be shown with bookings
    When I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I can see the button 'Save' is disabled
    When I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    When I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    When I click on Bookings
    And I am on the bookings page
    Then I see one row with state 'In progress'
    And I see one row with state 'Requested'
    When I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I can see the button 'Save' is disabled
    When I select 1 Interpreter
    Then I can see the element with name 'reassingBtn' is 'not visible'
    And I can see the element with name 'inviteBtn' is 'not visible'
