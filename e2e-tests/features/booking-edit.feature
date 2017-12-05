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
    And All required booking fields should be filled

  @runThis
  Scenario: Given an Individual Client, As a Booking Officer I should be able to edit bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then All required booking fields should be filled
    When I change the street number to 154
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to create booking?', I approve it
    Then I should get a valid booking update notification

  @runThis
  Scenario: As an Individual Client, I should not be able to go to booking detail page
    Given Assigned all bookings to Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the bookings page

  @runThis
  Scenario: As an Organisational Representative, I should be able to only change certain fields
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
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

  @runThis
  Scenario: As an Organisational Representative, I should see an error notification when I click a non-editable field
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I click on one non-editable field
    Then I will get an error notification saying "In order to change this field, please contact the booking office"

  @runThis
  Scenario: As a Organisational Representative, I added a document on the booking detail page and press save then the document will be saved on the booking
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will upload a document 'sushi.pdf'
    When I will see attachment 'sushi.pdf'
    Then I will close the file upload
    And I click on checkbox name 'tnc'
    And I click the create booking button
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to create booking?', I approve it
    Then I should get a valid booking update notification
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will see attachment 'sushi.pdf'

  @runThis
  Scenario: As a Organisational Representative, I removed a document on the booking detail page and press save then the document will be removed from the booking
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will upload a document 'sushi.pdf'
    When I will see attachment 'sushi.pdf'
    Then I will close the file upload
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to create booking?', I approve it
    Then I should get a valid booking update notification
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will see attachment 'sushi.pdf'
    Then I click on BUTTON name 'btnRemoveOldDoc_1'
    Then I will see attachment 'sushi.pdf' is removed
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to create booking?', I approve it
    Then I should get a valid booking update notification
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I see attachment 'sushi.pdf' does 'not exists'
