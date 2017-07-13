Feature: As all, I can login/logout, change profile, cannot login with invalid password (BR001/BR007)

  Background: As all i am on computer and on main website, before any steps
    Given I exist as an Booking Officer
    And I am on a computer
    And I go to the website
    Then I am shown the login screen, with picture and signup button

  @ignoreThis
  Scenario: As all, I can login/logout
    And I sign in with valid Booking Officer credentials
    Then I will be shown the bookings page
    And I click on my name
    And I click on logout
    Then I won't be logged in anymore and will be taken back to the loging screen

  @ignoreThis
  Scenario: As all, I cannot login without valid password
    And I sign in with invalid Booking Officer credentials
    Then I will get an error message saying "Email or password not found"
