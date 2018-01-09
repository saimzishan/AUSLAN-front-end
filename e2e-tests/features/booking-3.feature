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
    When I click on element by name 'rdBookingAddressNo'
    When I fill New Booking form fields correctly with non-standard time from 07:00 AM to 08:00 AM with 1 interpreters
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
    When I click on element by name 'rdBookingAddressNo'
    And I fill New Booking form fields correctly with non-standard time from 07:00 AM to 08:00 AM with 1 interpreters
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

  @ignoreThis
  Scenario: Individual Client can't have special instruction fields
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can't see the txtSpecialInstruction field
 # ---------------------------------------- AUSLAN1-40 -> END ----------------------------------------

  @runThis
  Scenario: As a Booking Officer, Given that I opened new booking page and select a Individual Client for booking then I can see the auto populate changes
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the rdBookingFor field
    And I can see the booking_for field
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
    And I can see the booking_for field
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
    And I can see the booking_for field
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
    And I can see the booking_for field
    And I select the bookable for org rep
    And I see an option 'CURVE TOMORROW - alana Organisational' in 'booking_for' dropdown
    Then I can see the 'CONTACT DETAILS' auto populated
    And I can see the 'CLIENT DETAILS' auto populated
    And I can see the 'INVOICE DETAILS' auto populated
    And I can see the element with name 'serviceMsg' has text 'What kind of services does the organisation need? Select multiple if relevant'
    And I can see the element with name 'interpreterMsg' has text 'What kind of interpreter(s) does the organisation need? Select multiple if relevant'
    And I can see the element with name 'contactMsg' has text 'DO YOU WANT TO USE THE STANDARD CONTACT PERSON FOR THIS BOOKING? *'
    And I can see the element with name 'invoiceMsg' has text 'Do you want to use standard invoice details for this booking? *'
# ---------------------------------------- AUSLAN1-727 -> START ----------------------------------------
  @runThis
  Scenario: Given an Organisational Representative and an Individual Client, Administrator can see list of org reps, when making a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can see the booking_for field
    And I see an option 'ted Individual Client' in 'booking_for' dropdown
    Then I click on element by name 'OrganisationalRepresentative'
    And I see an option 'CURVE TOMORROW - alana Organisational' in 'booking_for' dropdown