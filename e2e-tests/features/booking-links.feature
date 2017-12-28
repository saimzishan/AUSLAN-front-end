Feature: Linked Bookings

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button
    And There exist 1 booking with link id

  @runThis
  Scenario: As Administrator, I should be able to see booking link id on the bookings list page
    Given I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 1 booking
    And I see one row with the link id

  @runThis
  Scenario: As Administrator, I should be able to see booking link id on the bookings job page
    Given I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 1 booking
    When I click on an individual booking
    Then I will be shown the booking job page
    And I should see the link id in booking details

  @runThis
  Scenario: As Administrator, I should be able to see unlink booking link on the bookings job page
    Given I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 1 booking
    When I click on an individual booking
    Then I will be shown the booking job page
    And I can see the button 'Save' is disabled
    And I can see the button 'Unlink' is enabled
    When I click on button 'Unlink'
    Then I can see the button 'Save' is enabled
    When I click on button 'Save'
    Then I should get a valid booking update notification
    And I should not see the link id in booking details