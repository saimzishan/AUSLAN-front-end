Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @runThis
  Scenario: Administrator cannot create a booking without selecting a bookable
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I will get an error notification saying "Oops! Please fill in all the fields correctly."
    

  @runThis
  Scenario: Given 1 verified Individual Client, Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
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

  @runThis
  Scenario: Given 1 verified Organisational Representative, Administrator can duplicate a booking
    Given There exist 1 bookings
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I query booking with org name 'Curve'
    Then I am shown with 1 booking
    Then I see one row with org name 'Curve Tomorrow'
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    And I click on BUTTON 'Duplicate'
    Then I will be taken to the 'New Booking' form
    Then I verify radiobutton name 'OrganisationalRepresentative' and is checked
    And I click on my name
    And I click on logout
    And I go to the website
    And I am shown the login screen, with picture and signup button
    And I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I will be shown with bookings
    Then I am shown with 1 booking
    When I query booking with org name 'Curve'
    Then I am shown with 1 booking
    Then I see one row with org name 'Curve Tomorrow'

# ---------------------------------------- AUSLAN1-903 -> START ----------------------------------------
  @runThis
  Scenario: Given 1 verified Individual Client, Administrator can duplicate a booking then original booking travel cost status should be apply
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields with address greater than 40 kilometers
    And I select the bookable for client
    And I click on checkbox name 'travel_cost_applicable'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    And I click on BUTTON 'Duplicate'
    Then I will be taken to the 'New Booking' form
    Then I can see the travel_cost_applicable field

# ---------------------------------------- AUSLAN1-903 -> END ----------------------------------------

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
    And I click on my name
    And I click on logout
    And I go to the website
    And I am shown the login screen, with picture and signup button
    And I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I will be shown with bookings
    Then I am shown with 1 booking

  @runThis
  Scenario: Organisational Representative can create a booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    When I fill New Booking form fields correctly
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

  @runThis
  Scenario: Individual Client can create a booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I click on element by name 'rdBookingAddressNo'
    When I fill New Booking form fields correctly
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

  @runThis
  Scenario: Interpreter can NOT create a booking
    Given I exist as an Interpreter
    When I sign in with valid Interpreter credentials
    Then I am on the bookings page
    And I don't see any new New Booking link

  @runThis
  Scenario: Given an Individual Client, A Booking Officer can create duplicate booking
    Given There exist 1 bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    And I click on BUTTON 'Duplicate'
    Then I will be taken to the 'New Booking' form
    And I can see that the bookable is set
    When I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    And If I am shown a popup, I approve it
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I am shown with 2 bookings


# ---------------------------------------- AUSLAN1-252 -> START ----------------------------------------
  @runThis
  Scenario: Given 1 verified Individual Client, Booking Officer can create a non-standard booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:00 AM with 1 'auslanInterpreters_count'
    And I select the bookable for client
    And I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I will be shown a popup message

  @runThis
  Scenario: Given 1 verified Individual Client, Administrator can create a non-standard booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00 AM to 05:00 AM with 1 'auslanInterpreters_count'
    And I select the bookable for client
    And I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I will be shown a popup message
# ---------------------------------------- AUSLAN1-252 -> END ----------------------------------------
