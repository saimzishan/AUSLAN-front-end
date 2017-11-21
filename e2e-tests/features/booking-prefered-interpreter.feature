Feature: Create Booking with preferred or blocked interpreters

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @runThis
  Scenario: Given 1 verified Organisational Representative, I should be able to create new booking with prefered interpreters
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I fill New Booking form fields correctly
    And I can see the element with name 'preferInterHeading' has text 'Preferred interpreters'
    And I can see the element with name 'preferInterQuestion1' is 'visible'
    And I can see the element with name 'preferInterQuestion1' has text 'Do you have preferred interpreters for this booking?'
    And I can see the element with name 'preferInterQuestion2' is 'not visible'
    When I click on element by name 'rdPreferredInterpretersNo'
    Then I can see the element with name 'preferInterQuestion2' is 'not visible'
    When I click on element by name 'rdPreferredInterpretersYes'
    Then I can see the element with name 'preferInterQuestion2' is 'visible'
    And I can see the element with name 'preferInterQuestion2' has text 'Do you want to set the preferred interpreters that you have set in your profile?'
    When I click on element by name 'rdProfilePreferredInterpretersYes'
    Then I can see the element with name 'btnManageInterpreter_prefered' is 'visible'
    Then I click on checkbox name 'tnc'
    And I click the create booking button