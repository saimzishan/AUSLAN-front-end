Feature: As INTERPRETER OR BOOKING OFFICER OR ADMIN,  I can send messages and can see my messages history

    Background: I as an all user should be able to see the website
        Given I am on a computer
        And I go to the website
        And I am shown the login screen, with picture and signup button
        Given There exist 1 bookings

    @runThis
    Scenario: Given 1 verified Administrator Booking Officer and INTERPRETER exists
        Given I exist as an Administrator
        And I sign in with valid Administrator credentials
        And I am on the bookings page
        When I click on an individual booking
        Then I am on the individual booking page
        Then I select 1 Interpreter
        And I click on BUTTON name 'reassingBtn'
        Then I can see the button 'Save' is enabled
        And I click on BUTTON 'Save'
        Then I wait for 1000 milli-seconds
        Then I get valid message: 'The interpreter have been assigned'
        Then I click on my name in the top corner
        And I click on logout
        And I am shown the login screen, with picture and signup button
        Given I exist as an Interpreter
        When I sign in with valid Interpreter credentials
        And I am on the bookings page
        #Then I click on Messages
        When I click on an individual booking
        Then I am on the individual booking page
        Then I click on element by id 'lnkMessages'
        Then I will be taken to message page
        Then I fill the field 'message_body' with value 'Test message'
        Then I wait for 10000 milli-seconds
        Then I click on BUTTON name 'messages__formSend'
        And I get success message: 'Message sent successfully..'
        #Then I click on button with css '.messages__formButton'
        #And I can see the element with name 'messages__Xtag' is 'not visible'

    @runThis
    Scenario: Given 1 verified Administrator and INTERPRETER exists I am able to search interpreters in text search box
        Given I exist as an Administrator
        And I sign in with valid Administrator credentials
        And I am on the bookings page
        Then I click on element by id 'lnkMessages'
        Then I will be taken to message page
        Then I fill the field 'search' with value 'Ted'
        And I click on BUTTON name 'btnSearch'
        Then I wait for 1000 milli-seconds
        And I can count the element with css 'section.messages__conversation_active' to be '1'
        Then I fill the field 'search' with value 'papu'
        And I click on BUTTON name 'btnSearch'
        Then I wait for 1000 milli-seconds
        And I can count the element with css 'section.messages__conversation' to be '0'