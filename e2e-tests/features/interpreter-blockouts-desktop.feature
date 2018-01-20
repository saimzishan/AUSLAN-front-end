Feature: As INTERPRETER, I can create blockout on desktop

  Background: As INTERPRETER i am on mobile, before any steps
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @ignoreThis
  Scenario: As INTERPRETER, I can create edit and delete blockout on desktop
    And I sign in with valid Interpreter credentials
    Then I will be shown the bookings page
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to my blockout page
    And I click on BUTTON name 'save_blockout'
    And I get error message: 'Oops! Please fill in all the fields correctly.'
    And I click on BUTTON name 'cancel_blockout'
    And I will be taken to my individual profile page
    And I click on BUTTON name 'modify_blockouts'
    And I will be taken to my blockout page
    And I enter blockout name 'singleEvent'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully added'
    And I click on my name in the top corner
    And I click on the option  profile
    And I will be taken to my individual profile page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent
    And I can click the element with css 'span.fc-title' and text singleEvent
    And I wait for 500 milli-seconds
    And I will be taken to my blockout page
    And I enter blockout name 'singleEvent1'
    And I click on BUTTON name 'save_blockout'
    And I get success message: 'Blockout successfully updated'
    And I will be taken to my individual profile page
    And I can count the element with css 'span.fc-title' to be '1'
    And I can see the element with css 'span.fc-title' and text singleEvent1
    And I can click the element with css 'span.fc-title' and text singleEvent1
    And I wait for 500 milli-seconds
    And I will be taken to my blockout page
    Then I wait for 5000 milli-seconds
    And I click on BUTTON name 'delete_blockout'
    And I will be shown a popup message 'Do you really want to delete this blockout?'
    And I click on BUTTON name 'yesBtn'
    And I get success message: 'Blockout successfully deleted'
    And I will be taken to my individual profile page
    And I can count the element with css 'span.fc-title' to be '0'

