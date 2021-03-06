Feature: Edit Booking

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am shown the login screen, with picture and signup button
    Given There exist 1 bookings

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to visit the booking edit page
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page

  @runThis
  Scenario: Given 1 verified Individual Client, I should be able to set ndis, eaf and ur ids auto if set in my profile
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on my name in the top corner
    When I click on the option  profile
    And I will be taken to my individual profile page
    And I fill the field 'ur_id' with value 'UR-123'
    And I fill the field 'eaf_id' with value 'EAF-567'
    And I fill the field 'ndis_id' with value 'NDIS-123'
    And I click on BUTTON 'SAVE'
    Then I see success notification
    And I click on 'New Booking'
    Then I can verify the input 'deaf_person_ndis' will have the value 'NDIS-123'
    Then I can verify the input 'deaf_person_eaf' will have the value 'EAF-567'
    Then I can verify the input 'deaf_person_ur' will have the value 'UR-123'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should be able to verify that EAF, NDIS and UR number are being saved properly
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I fill the field 'deaf_person_ndis' with value '123-ndis'
    And I fill the field 'deaf_person_eaf' with value '987-eaf'
    And I fill the field 'deaf_person_ur' with value '456-ur'
    And I click on BUTTON 'SAVE'
    And If I am shown popups, I approve all of them
    Then I should get a valid booking update notification
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I can verify the input 'deaf_person_ndis' will have the value '123-ndis'
    Then I can verify the input 'deaf_person_eaf' will have the value '987-eaf'
    Then I can verify the input 'deaf_person_ur' will have the value '456-ur'

  @runThis
  Scenario: Given 1 verified Booking Officer, I should see the booking details filled in
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And All required booking fields should be filled

  @runThis
  Scenario: Given an Individual Client, As a Booking Officer I should be able to edit bookings
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then All required booking fields should be filled
    When I change the street number to 154
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to update booking?', I approve it
    Then I wait for 1200 milli-seconds
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
    Then I should get a valid booking update notification

  @runThis
  Scenario: As an Individual Client, I should be able to go to booking detail page
    Given Assigned all bookings to Individual Client
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page

  @runThis
  Scenario: As an Organisational Representative, I should be able to only change certain fields
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I should be able to edit only specific fields
    And I should not be able to edit other fields

  @runThis
  Scenario: As a Booking Officer, Given that I made changes on the booking detail page and I click on booking info then I will get a warning and stay on the same page
    Given Assigned all bookings to Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I change the street number to 154
    And I click on link 'Booking info'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    When I click on BUTTON name 'yesBtn'
    Then I should be on the edit booking page

  @runThis
  Scenario: As a Booking Officer, Given that I made changes on the booking detail page and I click on booking info then I will get a warning and move to other page
    Given Assigned all bookings to Booking Officer
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I change the street number to 154
    And I click on link 'Booking info'
    Then I will be shown a popup message 'There are unsaved changes on this page. Are you sure you want to leave?'
    When I click on BUTTON name 'noBtn'
    And I wait for 2000 milli-seconds
    Then I am on the individual booking page

  @runThis
  Scenario: As an Organisational Representative, I should see an error notification when I click a non-editable field
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I click on one non-editable field
    Then I will get an error notification saying "In order to change this field, please contact the booking office"

  @runThis
  Scenario: As a Organisational Representative, I added a document on the booking detail page and press save then the document will be saved on the booking
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will upload a document 'sushi.pdf'
    When I will see attachment 'sushi.pdf'
    Then I will close the file upload
    And I click on checkbox name 'tnc'
    And I click the create booking button
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to update booking?', I approve it
    Then I should get a valid booking update notification
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will see attachment 'sushi.pdf'

  @runThis
  Scenario: As a Organisational Representative, I removed a document on the booking detail page and press save then the document will be removed from the booking
    Given Assigned all bookings to Organisational Representative
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will upload a document 'sushi.pdf'
    When I will see attachment 'sushi.pdf'
    Then I will close the file upload
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to update booking?', I approve it
    Then I should get a valid booking update notification
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I will see attachment 'sushi.pdf'
    Then I click on BUTTON name 'btnRemoveOldDoc_1'
    Then I will see attachment 'sushi.pdf' is removed
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown a popup message 'This booking is not within the standard booking hours (8AM - 6PM). Do you still want to update booking?', I approve it
    Then I should get a valid booking update notification
    And I wait for 1000 milli-seconds
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I see attachment 'sushi.pdf' does 'not exists'

    # Auslan1-843
    # The bookings in this file are created using Factory Girl
    # The configuration and values are as defined in the api project
    # Following values have been assigned as of now
    # Contact first name: Jimmy
    # Contact last name: Donavan
    # Contact email: jimmy@donavan.com
    # Contact phone number: 03 9876 4321
  @ignoreThis
  Scenario: As a Booking Officer, When editing a booking, I should see the contact details as given by api
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I can verify the input 'contact_first_name' will have the value 'Jimmy'
    And I can verify the input 'contact_last_name' will have the value 'Donavan'
    When I change the input field CONTACT FIRST NAME * with Frank
    And I change the input field CONTACT LAST NAME with Castle
    And I click on BUTTON 'SAVE'
    Then I should get a valid booking update notification
    And I am on the bookings page
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I can verify the input 'contact_first_name' will have the value 'Frank'
    And I can verify the input 'contact_last_name' will have the value 'Castle'

    #----------------------------------------- AUSLAN1-978 -> START ----------------------------------------
  @ignoreThis
  Scenario: Booking Officer can change the booking method
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I am shown with 1 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see the button 'btnOnsite' is 'active'
    And I can see the button 'btnVri' is 'not active'
    When I click on BUTTON name 'btnVri'
    Then I can see the button 'btnOnsite' is 'not active'
    And I can see the button 'btnVri' is 'active'
    When I click on BUTTON 'SAVE'
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
    Then I should get a valid booking update notification
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see the button 'btnVri' is 'active'
    #----------------------------------------- AUSLAN1-978 -> END ----------------------------------------

    #----------------------------------------- AUSLAN1-979 -> START ----------------------------------------
  @ignoreThis
  Scenario: Booking Officer can select only 1 service type at a time and is able to change the service type of booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I am shown with 1 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I verify checkbox name 'cbAuslan' is checked 'true'
    Then I click on checkbox name 'cbAuslan'
    And I verify checkbox name 'cbAuslan' is checked 'true'
    Then I click on checkbox name 'cbDeaf'
    And I verify checkbox name 'cbDeaf' is checked 'true'
    And I verify checkbox name 'cbAuslan' is checked 'false'
    Then I click on checkbox name 'cbDeaf'
    And I verify checkbox name 'cbDeaf' is checked 'true'
    And I verify checkbox name 'cbAuslan' is checked 'false'
    Then I click on checkbox name 'cbCaptioning'
    And I verify checkbox name 'cbCaptioning' is checked 'true'
    And I verify checkbox name 'cbDeaf' is checked 'false'
    Then I click on checkbox name 'cbCaptioning'
    And I verify checkbox name 'cbCaptioning' is checked 'true'
    And I verify checkbox name 'cbDeaf' is checked 'false'
    Then I fill the field 'captioner_count' with value '2'
    When I click on BUTTON 'SAVE'
    Then If I am shown a popup message 'Would you like to save these changes for all bookings or only for this one?', I approve it
    Then I should get a valid booking update notification
    And I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I verify checkbox name 'cbAuslan' is checked 'false'
    And I verify checkbox name 'cbCaptioning' is checked 'true'
    And I can verify the field 'captioner_count' will have the value '2'

    #----------------------------------------- AUSLAN1-979 -> END ----------------------------------------

  @runThis
  Scenario: Booking Officer will get error notification while changing the service type of booking which has allocated interpreters
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I am shown with 1 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    Then I wait for 2000 milli-seconds
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    When I click on checkbox name 'cbDeaf'
    Then I will get an error notification saying "Oops. Deallocate interpreters before changing the service type."
    And I verify checkbox name 'cbDeaf' is checked 'false'
    And I verify checkbox name 'cbAuslan' is checked 'true'
    When I click on checkbox name 'cbOtherLanguage'
    Then I will get an error notification saying "Oops. Deallocate interpreters before changing the service type."
    And I verify checkbox name 'cbOtherLanguage' is checked 'false'
    And I verify checkbox name 'cbAuslan' is checked 'true'

  @runThis
  Scenario: As a Booking Officer, Individual Client and Organisational Representative I can see that booking form is disabled when booking is in state Unable to service
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I am shown with 1 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on BUTTON 'Unable to Service'
    Then I wait for 1000 milli-seconds
    Then I will be shown a popup message
    Then I click on BUTTON name 'yesBtn'
    Then I get a valid 'Unable to Service' notification for state
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see that form 'bookingDetailFieldset' is 'disabled'
    Then I click on my name in the top corner
    And I click on logout
    When I sign in with valid Individual Client credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see that form 'bookingDetailFieldset' is 'disabled'
    Then I click on my name in the top corner
    And I click on logout
    Then Assigned all bookings to Organisational Representative
    When I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see that form 'bookingDetailFieldset' is 'disabled'

  @runThis
  Scenario: As a Booking Officer, Individual Client and Organisational Representative I can see that booking form and payroll is disabled when booking is in state Claimed, INTERPRETER and Administrator exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I am shown with 1 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 1 Interpreter
    And I click on BUTTON name 'reassingBtn'
    Then I can see the button 'Save' is enabled
    And I click on BUTTON 'Save'
    Then I get valid message: 'The interpreter have been assigned'
    When I click on BUTTON 'Cancel Booking'
    Then I will be shown a popup message 'Would you like to cancel only this booking, or all linked bookings?'
    Then I click on BUTTON name 'yesBtn'
    Then I wait for 1200 milli-seconds
    Then I will be shown a popup message 'Are you sure you want to cancel this booking? This is permanent. We recommend to cancel this booking as Cancelled No Charge since the start date is not within 48 hours.'
    Then I click on BUTTON name 'noBtn'
    Then I get a valid 'Cancelled with Charge' notification for state
    When I click on link 'Payroll & Billing'
    Then I should be on the payroll and billing page
    And I can see that form 'bookingPayrollFieldset' is 'enabled'
    Then I click on my name in the top corner
    And I click on logout
    Then I sign in with valid Administrator credentials
    And I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    And I can see the element with name 'btnClaim' is 'visible'
    Then I click on BUTTON 'Claim'
    When I click on BUTTON 'Save'
    Then I get a valid 'Cancelled Claimed' notification for state
    Then I click on my name in the top corner
    And I click on logout
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I should be on the payroll and billing page
    And I can see that form 'bookingPayrollFieldset' is 'disabled'
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see that form 'bookingDetailFieldset' is 'disabled'
    Then I click on my name in the top corner
    And I click on logout
    When I sign in with valid Individual Client credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see that form 'bookingDetailFieldset' is 'disabled'
    Then I click on my name in the top corner
    And I click on logout
    Then Assigned all bookings to Organisational Representative
    When I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I can see that form 'bookingDetailFieldset' is 'disabled'

  @runThis
  Scenario: As a Booking Officer, I can see that recurrsion button is not vissible via edit 
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I am shown with 1 bookings
    When I click on an individual booking
    Then I am on the individual booking page
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    Then I can see the element with name 'recurring-booking' is 'not visible'
    Then I click on Bookings
    And I am on the bookings page
    When I click on an individual booking
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    And I click on BUTTON 'Duplicate'
    Then I will be taken to the 'New Booking' form
    Then I can see the element with name 'recurring-booking' is 'visible'
