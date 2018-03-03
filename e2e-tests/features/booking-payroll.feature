Feature: Booking Payroll and Billing

  Background: I as an all user should be able to see the website
    Given I go to the website
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
    When I fill the payroll field 'client_interpreterTime_0' with value '%4'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I clear the payroll input field 'client_interpreterTime_0'
    When I fill the payroll field 'client_prepTime_0' with value '#'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I clear the payroll input field 'client_prepTime_0'
    When I fill the payroll field 'interpreter_interpreterTime_0' with value 'asdf1234'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I clear the payroll input field 'interpreter_interpreterTime_0'
    When I fill the payroll field 'interpreter_prepTime_0' with value '=-09'
    Then I click out of the text box
    Then I am shown a validation error with the text 'Oops! Only numerical values, "." and ":" are allowed.'
    And I click on BUTTON 'Save'
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
    And I verify material checkbox name 'cbPayInterpreter_0' is checked 'true'
    When I click on material checkbox name 'cbPayInterpreter_0'
    Then I verify material checkbox name 'cbPayInterpreter_0' is checked 'false'
    And I verify material checkbox name 'cbPayTravel_0' is checked 'false'
    And I verify that payroll 'interpreter' input fields are non editable
    And I verify that payroll 'interpreter' input fields have zero value
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
    And I can see the payroll element 'interpreter_interpreterTime_0' has text '2:00'
    And I can see the payroll element 'interpreter_prepTime_0' has text '0:00'

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
    And I run all background jobs
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I verify material checkbox name 'cbPayTravel_0' is checked 'true'
    And I fill the payroll field 'interpreter_interpreterTime_0' with value '1:20'
    And I fill the payroll field 'interpreter_prepTime_0' with value '0:20'
    And I fill the payroll field 'interpreter_travelTime_0' with value '0:25'
    And I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'false'
    And I verify that payroll 'client' input fields have zero value
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    And I can see the payroll element 'client_interpreterTime_0' has text '1:20'
    And I can see the payroll element 'client_prepTime_0' has text '0:20'
    And I can see the payroll element 'client_travelTime_0' has text '0:25'

  @ignoreThis
  Scenario: Given 1 verified Booking Officer, When I check charge travel then km and travel time will be filled from the recommended values and when i save then I will get a success notification, INTERPRETER exists
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
    And I run all background jobs
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    And I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'false'
    And I verify that payroll 'client' input fields have zero value
    When I click on material checkbox name 'cbInvoiceClient_0'
    Then I verify material checkbox name 'cbInvoiceClient_0' is checked 'true'
    When I click on material checkbox name 'cbChargeTravel_0'
    Then I verify material checkbox name 'cbChargeTravel_0' is checked 'true'
    And I can see the payroll element 'client_kiloMeters_0' has text '8'
    And I can see the payroll element 'client_travelTime_0' has text '0:20'
    And I click on BUTTON 'Save'
    Then I should get a valid payroll save notification

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
  Scenario: Given 1 verified Administrator and Booking Officer, As an admin I can see the save and claim buttons when booking is in Cancelled charge state and I can not see the claim button as book officer, INTERPRETER exists
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
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    When I click on link 'Payroll & Billing'
    Then I can see the element with name 'btnSave' is 'visible'
    And I can see the element with name 'btnClaim' is 'visible'
    Then I click on my name in the top corner
    And I click on logout
    When I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Payroll & Billing'
    Then I can see the element with name 'btnSave' is 'visible'
    And I can see the element with name 'btnClaim' is 'not visible'

  @runThis
  Scenario: Given 1 verified Administrator, As an admin i will be moved to payroll tab when booking is in Cancelled charge, service completed or claimed state, INTERPRETER exists
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
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    Then I click on Bookings
    And I am on the bookings page
    When I click on an individual booking
    Then I should be on the payroll and billing page
    And I can see the element with name 'btnClaim' is 'visible'
    Then I wait for 3000 milli-seconds
    Then I click on BUTTON 'Claim'
    When I click on BUTTON 'Save'
    Then I get a valid 'Cancelled Claimed' notification for state
    Then I click on Bookings
    And I am on the bookings page
    When I click on an individual booking
    Then I should be on the payroll and billing page
    And I can see the element with name 'btnUndoClaim' is 'visible'
    Then I wait for 3000 milli-seconds
    Then I click on BUTTON 'Undo claim'
    When I click on BUTTON 'Save'
    Then I get a valid 'Cancelled Chargeable' notification for state
    Then I click on Bookings
    And I am on the bookings page
    When I click on an individual booking
    Then I should be on the payroll and billing page

  @runThis
  Scenario: Given 1 verified Administrator, I can move the booking to state claimed and back to service completed state, INTERPRETER exists
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
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    When I click on link 'Payroll & Billing'
    And I can see the element with name 'btnClaim' is 'visible'
    Then I click on BUTTON 'Claim'
    When I click on BUTTON 'Save'
    Then I get a valid 'Cancelled Claimed' notification for state
    And I can see the element with name 'btnClaim' is 'not visible'
    And I can see the element with name 'btnUndoClaim' is 'visible'
    Then I wait for 3000 milli-seconds
    Then I click on BUTTON 'Undo claim'
    When I click on BUTTON 'Save'
    Then I get a valid 'Cancelled Chargeable' notification for state

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
    Then I wait for 1200 milli-seconds
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    Then I click on material checkbox name 'cbPayTravel_0'
    When I click on link 'Booking details'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    And I click on BUTTON name 'yesBtn'
    Then I wait for 1500 milli-seconds
    When I click on link 'Booking info'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
