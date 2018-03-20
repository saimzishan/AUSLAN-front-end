Feature: As INTERPRETER OR BOOKING OFFICER OR ADMIN,  I can send messages and can see my messages history

    Background: I as an all user should be able to see the website
        Given I am on a computer
        And I go to the website
        And I am shown the login screen, with picture and signup button
        Given There exist 1 bookings

    @runThis
    Scenario: Given 1 verified Administrator and Booking Officer, As an admin I can see the save and claim buttons when booking is in Cancelled charge state and I can not see the claim button as book officer, STAFF INTERPRETER exists
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
        When I sign in with valid Interpreter credentials
        And I am on the bookings page
        Then I click on Messages
        And I get error message: 'Oops! Please select any booking before'
        When I click on an individual booking
        Then I am on the individual booking page
        Then I click on element by id 'lnkMessages'
        Then I will be taken to messages page
        Then I fill the field 'message_body' with value 'Test message'
        Then I click on BUTTON name 'messages__formSend'
        And I get success message: 'Message sent successfully..'