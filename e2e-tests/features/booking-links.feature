Feature: Linked Bookings

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: As Administrator, I should be able to see booking link id on the bookings list page
    Given There exist 1 booking with link id
    Given I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 1 booking
    And I see one row with the link id

  @runThis
  Scenario: As Administrator, I should be able to see booking link id on the bookings job page
    Given There exist 1 booking with link id
    Given I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 1 booking
    When I click on an individual booking
    Then I will be shown the booking job page
    And I should see the link id in booking details

  @runThis
  Scenario: As Administrator, I should be able to see unlink booking link on the bookings job page
    Given There exist 1 booking with link id
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

  @runThis
  Scenario: As Administrator, I should see a popup confirmation when editing a linked booking
    Given There exist 1 booking with link id
    Given I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 1 booking
    When I click on an individual booking
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I change the street number to 154
    And I click the create booking button
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to create booking?', I approve it
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Would you like to save these changes for all bookings or only for this one?'
    When I click on BUTTON name 'cancel-popup'
    Then I will be shown the booking job page
    When I click the create booking button
    And If I am shown popups, I approve all of them
    Then I wait for 1000 milli-seconds
    Then I should get a valid booking update notification

    @runThis
    Scenario: As Administrator, I should be able to link bookings
      Given There exist 1 booking without link id
      Given I sign in with valid Administrator credentials
      Then I am on the bookings page
      And I am shown with 1 booking
      When I click on an individual booking
      Then I will be shown the booking job page
      And I can see the button 'Save' is disabled
      And I can see the button state 'Unlink' is not visible
      And I can see the button state 'Link booking' is visible
      When I click on button 'Link booking'
      Then I will be shown a popup message 'Select the link-id for this booking'
      When I select option New linked booking from dropdown Link ID
      And I click on BUTTON name 'yesBtn'
      Then I should get a valid booking update notification
      And I should see the link id in booking details
