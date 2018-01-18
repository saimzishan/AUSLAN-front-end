Feature: Create Booking with preferred or blocked interpreters

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Organisational Representative can create new booking with prefered interpreters, Interpreter , Interpreter1 and Interpreter2 exists
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    When I click on my name in the top corner
    When I click on the option  profile
    Then I will be taken to my individual profile page
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    Then I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
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
    And I can see the element with name 'btnManageInterpreter_prefered' is 'visible'
    When I click on element by name 'rdProfilePreferredInterpretersYes'
    Then I can see the element with name 'btnManageInterpreter_prefered' is 'visible'
    And I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'not visible'
    And I will get an error notification saying "Oops! This interpreter is already selected as a preferred interpreter. Please remove this interpreter first."
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '2'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_prefered' to be '2'

  @runThis
  Scenario: Organisational Representative can create new booking with blocked interpreters, Interpreter, Interpreter1 and Interpreter2 exists
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    When I click on my name in the top corner
    When I click on the option  profile
    Then I will be taken to my individual profile page
    Then I can see the element with name 'interpreter_block_blocked' is 'visible'
    Then I can see the element with css '.btnYes_blocked' is 'visible'
    When I click on element with css '.btnYes_blocked'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    And I fill New Booking form fields correctly
    And I can see the element with name 'blockInterHeading' has text 'Blocked interpreters'
    And I can see the element with name 'blockInterQuestion1' is 'visible'
    And I can see the element with name 'blockInterQuestion1' has text 'Do you have blocked interpreters for this booking?'
    And I can see the element with name 'blockInterQuestion2' is 'not visible'
    When I click on element by name 'rdBlockedInterpretersNo'
    Then I can see the element with name 'blockInterQuestion2' is 'not visible'
    When I click on element by name 'rdBlockedInterpretersYes'
    Then I can see the element with name 'blockInterQuestion2' is 'visible'
    And I can see the element with name 'blockInterQuestion2' has text 'Do you want to set the blocked interpreters that you have set in your profile?'
    And I can see the element with name 'btnManageInterpreter_blocked' is 'visible'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    And I can see the element with name 'btnManageInterpreter_blocked' is 'visible'
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'not visible'
    And I will get an error notification saying "Oops! This interpreter is already selected as a blocked interpreter. Please remove this interpreter first."
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '2'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_blocked' to be '2'

  @runThis
  Scenario: Organisational Representative can check no overlap between preferred and blocked interpreters while creating new booking, Interpreter, Interpreter1 and Interpreter2 exists
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    When I click on my name in the top corner
    When I click on the option  profile
    Then I will be taken to my individual profile page
    Then I can see the element with name 'interpreter_block_prefered' is 'visible'
    And I can see the element with css '.btnYes_prefered' is 'visible'
    When I click on element with css '.btnYes_prefered'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    Then I can see the element with name 'interpreter_block_blocked' is 'visible'
    Then I can see the element with css '.btnYes_blocked' is 'visible'
    When I click on element with css '.btnYes_blocked'
    And  I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '2' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    And I click on BUTTON 'SAVE'
    Then I get valid message: 'User details updated Successfully'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    And I fill New Booking form fields correctly
    And I can see the element with name 'preferInterHeading' has text 'Preferred interpreters'
    And I can see the element with name 'preferInterQuestion1' is 'visible'
    When I click on element by name 'rdPreferredInterpretersYes'
    Then I can see the element with name 'preferInterQuestion2' is 'visible'
    And I can see the element with name 'btnManageInterpreter_prefered' is 'visible'
    When I click on element by name 'rdProfilePreferredInterpretersYes'
    Then I can see the element with name 'btnManageInterpreter_prefered' is 'visible'
    And I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'not visible'
    And I will get an error notification saying "Oops! This interpreter is already selected as a preferred interpreter. Please remove this interpreter first."
    Then I click on BUTTON name 'noBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    And I can see the element with name 'blockInterHeading' has text 'Blocked interpreters'
    And I can see the element with name 'blockInterQuestion1' is 'visible'
    When I click on element by name 'rdBlockedInterpretersYes'
    Then I can see the element with name 'blockInterQuestion2' is 'visible'
    And I can see the element with name 'btnManageInterpreter_blocked' is 'visible'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    Then I can see the element with name 'btnManageInterpreter_blocked' is 'visible'
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    When I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'not visible'
    And I will get an error notification saying "Oops! This interpreter is already selected as a preferred interpreter. Please remove this interpreter first."
    Then I click on '2' interpreter
    And I can see the element with css 'section[name="interpreters"].selected' is 'not visible'
    And I will get an error notification saying "Oops! This interpreter is already selected as a blocked interpreter. Please remove this interpreter first."
    Then I click on BUTTON name 'noBtn'
    And I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    And I click on checkbox name 'tnc'
    And I click the create booking button
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'

  @runThis
  Scenario: Given Individual Client, Interpreter, Interpreter1 exist, As an Administrator I should be able to see preferred interpreters of the client
    Given Assign Individual Client with preferred Interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I select the bookable for client
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
    And I can count the element with css 'section.interpreter_selected_prefered' to be '2'



  @runThis
  Scenario: Administrator can add/remove the same interpreter into same preference, created by Organisational Representative , Interpreter  exists
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    And I fill New Booking form fields correctly
    When I click on element by name 'rdBlockedInterpretersYes'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    And I can see the element with name 'btnManageInterpreter_blocked' is 'visible'
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I click on element by name 'rdBlockedInterpretersYes'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    And I will get an error notification saying "Oops! This interpreter is already selected as a blocked interpreter. Please remove this interpreter first."
    Then I click on BUTTON name 'noBtn'
    Then I wait for 2000 milli-seconds
    Then I can remove '1' , 'blocked' interpreter
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'



  @runThis
  Scenario: Administrator can add/remove the same interpreter into different preference, created by Organisational Representative , Interpreter  exists
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    And I fill New Booking form fields correctly
    When I click on element by name 'rdBlockedInterpretersYes'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    And I can see the element with name 'btnManageInterpreter_blocked' is 'visible'
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I click on element by name 'rdBlockedInterpretersYes'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    And I will get an error notification saying "Oops! This interpreter is already selected as a blocked interpreter. Please remove this interpreter first."
    Then I click on BUTTON name 'noBtn'
    Then I wait for 2000 milli-seconds
    Then I can remove '1' , 'blocked' interpreter
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    When I click on element by name 'rdPreferredInterpretersYes'
    When I click on element by name 'rdProfilePreferredInterpretersYes'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    And I can count the element with css 'section.interpreter_selected_prefered' to be '1'



  @runThis
  Scenario: Administrator can add/remove the same interpreter into different preference, created by Individual Client , Interpreter  exists
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    And I fill New Booking form fields correctly
    When I click on element by name 'rdBlockedInterpretersYes'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    And I can see the element with name 'btnManageInterpreter_blocked' is 'visible'
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_blocked' to be '1'
    Then I scroll to top
    And I click on my name in the top corner
    Then I click on logout
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I click on element by name 'rdBlockedInterpretersYes'
    When I click on element by name 'rdProfileBlockedInterpretersYes'
    And I click on BUTTON name 'btnManageInterpreter_blocked'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    And I will get an error notification saying "Oops! This interpreter is already selected as a blocked interpreter. Please remove this interpreter first."
    Then I click on BUTTON name 'noBtn'
    Then I wait for 2000 milli-seconds
    Then I can remove '1' , 'blocked' interpreter
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    When I click on element by name 'rdPreferredInterpretersYes'
    When I click on element by name 'rdProfilePreferredInterpretersYes'
    And  I click on BUTTON name 'btnManageInterpreter_prefered'
    Then I can see the element with css 'div.md-dialog' is 'visible'
    When I click on '1' interpreter
    Then I can see the element with css 'section[name="interpreters"].selected' is 'visible'
    Then I click on BUTTON name 'selectBtn'
    Then I wait for 2000 milli-seconds
    Then I can see the element with css 'div.md-dialog' is 'hidden'
    Then I can count the element with css 'section.interpreter_selected_prefered' to be '1'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I am on the individual booking page
    Then I wait for 500 milli-seconds
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can count the element with css 'section.interpreter_selected_blocked' to be '0'
    And I can count the element with css 'section.interpreter_selected_prefered' to be '1'
