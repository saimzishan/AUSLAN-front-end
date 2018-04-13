Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Special Organisational Representative have special instruction fields and see it in the booking creating
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the txtSpecialInstruction field
    When I specify i have special instruction
    Then The field 'txtSpecialInstruction' will be populated with 'I am special'

  @runThis
  Scenario: Special Organisational Representative will create a booking with special instructions
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the txtSpecialInstruction field
    Then I click on element by name 'rdBookingAddressNo'
    And I click on element by name 'rdStandardInvoiceNo'
    When I fill New Booking form fields correctly with non-standard time from 07:00 AM to 08:00 AM with 1 'auslanInterpreters_count'
    And I specify i have special instruction
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @runThis
  Scenario: Special Organisational Representative will create a booking with special instructions,Administrator will login and check the special instruction field for the booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the txtSpecialInstruction field
    Then I click on element by name 'rdBookingAddressNo'
    And I click on element by name 'rdStandardInvoiceNo'
    And I fill New Booking form fields correctly with non-standard time from 07:00 AM to 08:00 AM with 1 'auslanInterpreters_count'
    And I specify i have special instruction
    And The field 'txtSpecialInstruction' will be populated with 'I am special'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    And I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings
    And I click on my name
    And I click on logout
    And I go to the website
    And I am shown the login screen, with picture and signup button
    And I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can verify the field 'Special Instruction' will have the value 'I am special'

  @runThis
  Scenario: Given 1 verified Individual Client, Booking Officer can create a booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I select the bookable for client
    And I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings
    Then I am shown with 1 booking

  @runThis
  Scenario: Individual Client can see special instruction fields
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can see the txtSpecialInstruction field
 # ---------------------------------------- AUSLAN1-40 -> END ----------------------------------------

  @runThis
  Scenario: As a Booking Officer, Given that I opened new booking page and select a Individual Client for booking then I can see the auto populate changes
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the rdBookingFor field
    And I select the bookable for client
    Then I can see the 'CONTACT DETAILS' auto populated
    And I can see the 'CLIENT DETAILS' auto populated
    And I can see the 'INVOICE DETAILS' auto populated
    And I can see the element with name 'serviceMsg' has text 'What kind of services does the client need? Select multiple if relevant'
    And I can see the element with name 'interpreterMsg' has text 'What kind of interpreter(s) does the client need? Select multiple if relevant'
    And I can see the element with name 'contactMsg' has text 'DO YOU WANT TO USE THE STANDARD CONTACT PERSON FOR THIS BOOKING? *'
    And I can see the element with name 'invoiceMsg' has text 'Do you want to use standard invoice details for this booking? *'

  @runThis
  Scenario: As a Booking Officer, Given that I opened new booking page and select a Organisational Representative for booking then I can see the auto populate changes
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the rdBookingFor field
    And I select the bookable for org rep
    Then I can see the 'CONTACT DETAILS' auto populated
    And I can see the 'CLIENT DETAILS' auto populated
    And I can see the 'INVOICE DETAILS' auto populated
    And I can see the element with name 'serviceMsg' has text 'What kind of services does the organisation need? Select multiple if relevant'
    And I can see the element with name 'interpreterMsg' has text 'What kind of interpreter(s) does the organisation need? Select multiple if relevant'
    And I can see the element with name 'contactMsg' has text 'DO YOU WANT TO USE THE STANDARD CONTACT PERSON FOR THIS BOOKING? *'
    And I can see the element with name 'invoiceMsg' has text 'Do you want to use standard invoice details for this booking? *'

  @runThis
  Scenario: As a Administrator , Given that I opened new booking page and select a Individual Client for booking then I can see the auto populate changes
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the rdBookingFor field
    And I select the bookable for client
    Then I can see the 'CONTACT DETAILS' auto populated
    And I can see the 'CLIENT DETAILS' auto populated
    And I can see the 'INVOICE DETAILS' auto populated
    And I can see the element with name 'serviceMsg' has text 'What kind of services does the client need? Select multiple if relevant'
    And I can see the element with name 'interpreterMsg' has text 'What kind of interpreter(s) does the client need? Select multiple if relevant'
    And I can see the element with name 'contactMsg' has text 'DO YOU WANT TO USE THE STANDARD CONTACT PERSON FOR THIS BOOKING? *'
    And I can see the element with name 'invoiceMsg' has text 'Do you want to use standard invoice details for this booking? *'

  @runThis
  Scenario: As a Administrator, Given that I opened new booking page and select a Organisational Representative for booking then I can see the auto populate changes
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the rdBookingFor field
    And I select the bookable for org rep
    Then I can see the 'CONTACT DETAILS' auto populated
    And I can see the 'CLIENT DETAILS' auto populated
    And I can see the 'INVOICE DETAILS' auto populated
    And I can see the element with name 'serviceMsg' has text 'What kind of services does the organisation need? Select multiple if relevant'
    And I can see the element with name 'interpreterMsg' has text 'What kind of interpreter(s) does the organisation need? Select multiple if relevant'
    And I can see the element with name 'contactMsg' has text 'DO YOU WANT TO USE THE STANDARD CONTACT PERSON FOR THIS BOOKING? *'
    And I can see the element with name 'invoiceMsg' has text 'Do you want to use standard invoice details for this booking? *'

  @runThis
  Scenario: Given 1 verified Individual Client, Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I change the value of end time of booking '01:02'
    Then I check the value of endTime should be '01:02 AM'
    Then I wait for 1000 milli-seconds
    Then I change the value of end time of booking '01:02am'
    Then I check the value of endTime should be '01:02 AM'
    Then I wait for 1000 milli-seconds
    Then I change the value of end time of booking '01:02am'
    Then I check the value of endTime should be '01:02 AM'
    Then I change the value of end time of booking with wrong value 'as:as pm'
    Then I check the value of endTime should be ''
    Then I change the value of end time of booking with wrong value 'abcd pm'
    Then I check the value of endTime should be ''
    Then I change the value of end time of booking with wrong value '12:as pm'
    Then I check the value of endTime should be ''

# ---------------------------------------- AUSLAN1-727 -> START ----------------------------------------

  @runThis
  Scenario: As Individual Client, I should be able to create booking with multiple interp types
    Given I sign in with valid Individual Client credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I click on material checkbox name 'cbNotetaking'
    When I fill New Booking form fields correctly without address
    And I fill the field 'auslanInterpreters_count' with value '2'
    And I fill the field 'noteTaker_count' with value '1'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    And If I am shown popups, I approve all of them
    Then I get a valid create booking notification

  @runThis
  Scenario: Given an Organisational Representative, As Administrator, I can duplicate a booking and see the billing details are same
    Given There exist 1 bookings
    Given Assigned all bookings to Organisational Representative
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    Then I am shown with 1 booking
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I click on BUTTON 'Duplicate'
    Then I will be taken to the 'New Booking' form
    Then I verify radiobutton name 'OrganisationalRepresentative' and is checked
    And I can see the input with name 'contact_first_name' has text 'Jimmy'
    And I can see the input with name 'contact_last_name' has text 'Donavan'
    And I can see the input with name 'deaf_person_name' has text 'Charles'
    And I can see the input with name 'deaf_person_last_name' has text 'Barkley'

  @runThis
  Scenario: As Administrator, When duplicating a booking, the attchments should not carry over the new booking
    Given There exist 1 bookings
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    Then I am shown with 1 booking
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will upload a document 'sushi.pdf'
    When I will see attachment 'sushi.pdf'
    Then I will close the file upload
    And I click on checkbox name 'tnc'
    And I click the create booking button
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    And I am on the individual booking page
    And I click on BUTTON 'Duplicate'
    Then I will be taken to the 'New Booking' form
    And I will see attachment 'sushi.pdf' is removed

  @runThis
  Scenario: Given 1 verified Individual Client, Administrator can create a booking, an Organisational Representative
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I verify radiobutton name 'IndividualClient' and is checked
    And I can see the element with name 'client_availability_search_btn' is 'not visible'
    Then I click on element by name 'OrganisationalRepresentative'
    Then I verify radiobutton name 'OrganisationalRepresentative' and is checked
    And I can see the element with name 'client_availability_search_btn' is 'visible'
    Then I select the bookable for org rep
    And I can see the input with name 'deaf_person_name' has text 'alana'
    And I can see the input with name 'deaf_person_email' has text 'alana@auslan.com.au'
 
