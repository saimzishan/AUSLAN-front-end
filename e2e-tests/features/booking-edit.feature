Feature: Edit Booking

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to visit the booking edit page
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page

  @runThis
  Scenario: Given 1 verified Booking Officer, I should see the booking details filled in
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I select the bookable for client
    And All required booking fields should be filled

  @ignoreThis
  Scenario: Given 1 verified Booking Officer, I should see the booking details filled in
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I select the bookable for client
    And All required booking fields should be filled
    When I change the street number to 154
    Then I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    Then I should get a valid booking update notification

  @ignoreThis
  Scenario: Given 1 verified Individual Client, I should be able to only change certain fields
    Given Assigned all bookings to Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I select the bookable for client
    Then I should be able to edit only specific fields
    And I should not be able to edit other fields

  @ignoreThis
  Scenario: Given 1 verified Organisational Representative, I should be able to only change certain fields
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I select the bookable for client
    Then I should be able to edit only specific fields
    And I should not be able to edit other fields

  @runThis
  Scenario: As a Booking Officer, Given that I made changes on the booking detail page and I click on booking info then I will get a warning and stay on the same page
    Given Assigned all bookings to Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I change the street number to 154
    And I click on link 'Booking info'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    When I click on BUTTON name 'yesBtn'
    Then I should be on the edit booking page

    @runThis
  Scenario: As a Booking Officer, Given that I made changes on the booking detail page and I click on booking info then I will get a warning and move to other page
    Given Assigned all bookings to Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I change the street number to 154
    And I click on link 'Booking info'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    When I click on BUTTON name 'noBtn'
    And I wait for 2000 milli-seconds
    Then I am on the individual booking page