Feature: Booking Payroll and Billing

  Background: I as an all user should be able to see the website
    Given I am on a computer
    And I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to visit the payroll and billing page
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page

  @runThis
  Scenario: Given 1 verified Booking Officer, I will see an explanation mark if I type incorrect value in input fields and error notification when saving, INTERPRETER exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I wait for 1500 milli-seconds
    When I fill the payroll field 'interpreterTime_client_0' with value '%4'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I clear the payroll input field 'interpreterTime_client_0'
    When I fill the payroll field 'prepTime_client_0' with value '#'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I clear the payroll input field 'prepTime_client_0'
    When I fill the payroll field 'interpreterTime_interpreter_0' with value 'asdf1234'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I clear the payroll input field 'interpreterTime_interpreter_0'
    When I fill the payroll field 'prepTime_interpreter_0' with value '=-09'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I click on BUTTON 'Claim'
    Then I will get an error notification saying "Oops! Only numbers and dots allowed. Please try again."

  @runThis
  Scenario: Given 1 verified Booking Officer, When I uncheck the pay interpreter and invoice client then their respective input fields should be non-editable and have zero value, INTERPRETER exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I wait for 1500 milli-seconds
    Then I click on material checkbox name 'cbPayTravel_0'
    And I verify material checkbox name 'cbPayTravel_0' is checked 'true'
    And I verify material checkbox name 'cbPayInterpreter_0' is checked 'true'
    When I click on material checkbox name 'cbPayInterpreter_0'
    Then I verify material checkbox name 'cbPayInterpreter_0' is checked 'false'
    And I verify material checkbox name 'cbPayTravel_0' is checked 'false'
    And I verify that payroll 'interpreter' input fields are non editable
    And I verify that payroll 'interpreter' input fields have zero value
    Then I click on material checkbox name 'cbChargeTravel_0'
    And I verify material checkbox name 'cbChargeTravel_0' is checked 'true'
    And I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'false'
    And I verify material checkbox name 'cbChargeTravel_0' is checked 'false'
    And I verify that payroll 'client' input fields are non editable
    And I verify that payroll 'client' input fields have zero value

  @runThis
  Scenario: Given 1 verified Booking Officer, When I check pay interpreter then interp time will be filled based on booking time and preperation time will set to zero, INTERPRETER exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I wait for 1500 milli-seconds
    And I verify material checkbox name 'cbPayInterpreter_0' is checked 'true'
    When I click on material checkbox name 'cbPayInterpreter_0'
    Then I verify material checkbox name 'cbPayInterpreter_0' is checked 'false'
    And I verify that payroll 'interpreter' input fields have zero value
    When I click on material checkbox name 'cbPayInterpreter_0'
    Then I verify material checkbox name 'cbPayInterpreter_0' is checked 'true'
    And I can see the payroll element 'interpreterTime_interpreter_0' has text '2:0'
    And I can see the payroll element 'prepTime_interpreter_0' has text '0'

  @runThis
  Scenario: Given 1 verified Booking Officer, When I check invoice client then time fields of client will be filled from the time fields of interpreter, INTERPRETER exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I wait for 1500 milli-seconds
    Then I click on material checkbox name 'cbPayTravel_0'
    And I fill the payroll field 'interpreterTime_interpreter_0' with value '1:20'
    And I fill the payroll field 'prepTime_interpreter_0' with value '0:20'
    And I fill the payroll field 'travelTime_interpreter_0' with value '0:25'
    And I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'false'
    And I verify that payroll 'client' input fields have zero value
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    And I can see the payroll element 'interpreterTime_client_0' has text '1:20'
    And I can see the payroll element 'prepTime_client_0' has text '0:20'
    And I can see the payroll element 'travelTime_client_0' has text '0:25'

  @runThis
  Scenario: Given 1 verified Booking Officer, When I check charge travel then km and travel time will be filled from the interpreter and when i save then I will get a success notification, INTERPRETER exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I wait for 1500 milli-seconds
    Then I click on material checkbox name 'cbPayTravel_0'
    And I fill the payroll field 'kiloMeters_interpreter_0' with value '1.4'
    And I fill the payroll field 'travelTime_interpreter_0' with value '0:05'
    And I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'false'
    And I verify that payroll 'client' input fields have zero value
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    When I click on material checkbox name 'cbChargeTravel_0'
    Then I verify material checkbox name 'cbChargeTravel_0' is checked 'true'
    And I can see the payroll element 'kiloMeters_client_0' has text '1.4'
    And I can see the payroll element 'travelTime_client_0' has text '0:05'
    And I click on BUTTON 'Claim'
    Then I should get a valid payroll save notification
    Then I can see the payroll element 'kiloMeters_interpreter_0' has text '1'
    And I can see the payroll element 'travelTime_interpreter_0' has text '0:05'

  @runThis
  Scenario: Given 1 verified Booking Officer, I can not see the the payroll link when booking moves to Cancelled no charge state
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see the element with name 'linkPayroll' is 'visible'
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Cancelled with No Charge' notification for state
    Then I can see the button state 'Cancel Booking' is hidden
    Then I can see the button state 'Unable to Service' is hidden
    And I can see the element with name 'linkPayroll' is 'not visible'

  @runThis
  Scenario: Given 1 verified Booking Officer, I will get a warning popup when I move to bookng info or booking detail if there are unsaved changes on payroll page, INTERPRETER exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    When I click on link 'Booking info'
    Then I am on the individual booking page
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I click on material checkbox name 'cbPayTravel_0'
    When I click on link 'Booking details'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    When I click on BUTTON name 'noBtn'
    When I click on link 'Booking info'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'