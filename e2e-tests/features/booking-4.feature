Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

# ---------------------------------------- AUSLAN1-727 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-736, 737, 741, 901, 905 -> START ----------------------------------------
  @runThis
  Scenario: Given 1 verified Individual Client, Booking Officer can create a booking and travel cost should save
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields with address greater than 40 kilometers
    And I select the bookable for client
    And I click the create booking button
    Then I will get an error notification saying "Travel cost must be applicable as your booking distance is more than 40 kms"
    And I move to element name 'travel_cost_applicable'
    And I click on checkbox name 'travel_cost_applicable'
    When I click the create booking button
    Then I will get an error notification saying "Kindly accept Terms and Conditions"
    Then I move to element name 'lnkTC'
    Then I verify that the link with name 'lnkTC' href is 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions.pdf'
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    When I query search with empty date
    And I will be shown with bookings
    Then I am shown with 1 booking
# ---------------------------------------- AUSLAN1-736, 737, 741, 901, 905 -> END ----------------------------------------

  @runThis
  Scenario: Given an Individual Client, Booking Officer should get a popup when the booking needs more interpreters
    Given I exist as a Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with standard time from 09:00 AM to 11:00 AM with 1 'auslanInterpreters_count'
    And I select the bookable for client
    Then I move to element name 'tnc'
    And I click on checkbox name 'tnc'
    When I click the create booking button
    Then I will be shown a popup message 'This booking might require more than 1 professional. You've only requested 1. Are you sure you want to create this booking?'

  @runThis
  Scenario: As an Administrator, I should specify notes when I don't specify what will be discussed
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I select option OTHER from dropdown NATURE OF APPOINTMENT
    And I am shown a validation error with the text 'Please specify what the appointment is about'

  @runThis
  Scenario: As an Administrator, I should specify notes when I don't specify what will be discussed when duplicating a booking
    Given There exist 1 bookings
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    When I am on the bookings page
    And I click on an individual booking
    Then I am on the individual booking page
    Then I click on link 'Booking details'
    When I select option OTHER from dropdown NATURE OF APPOINTMENT
    Then I am shown a validation error with the text 'Please specify what the appointment is about'

  #--------------------------------- AUSLAN1-770 -----------------------------------------------------
  @ignoreThis
  Scenario: As a Booking Officer, I can create a booking for Organisational Representative
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    Then I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I select the bookable for org rep
    And I click on checkbox name 'tnc'
    When I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings
    And I am shown with 1 booking
    Then I click on my name
    And I click on logout
    Then I go to the website
    And I am shown the login screen, with picture and signup button
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    Then I am on the bookings page
    And I will be shown with bookings
    Then I am shown with 1 booking
    When I click on an individual booking
    Then I am on the individual booking page
    Then I click on link 'Booking details'
    When I change the street number to 154
    And I click on checkbox name 'tnc'
    And I click on BUTTON 'SAVE'
    And If I am shown a popup, I approve it
    Then I should get a valid booking update notification
# ---------------------------------------- AUSLAN1-711 -> START ----------------------------------------
  @ignoreThis
  Scenario: Individual Client can use their address to auto fill booking address
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the element with name 'lblQuestionBookAddr' has text 'Do you want to use your profile address for this booking?'
    And I can see the element with name 'rdBookingAddress' is 'visible'
    And I can see the booking address is 'auto populated'
    When I click on element by name 'rdBookingAddressNo'
    Then I can see the booking address is 'empty'
    And I click on element by name 'rdBookingAddressYes'
    Then I can see the booking address is 'auto populated'

  @ignoreThis
  Scenario: Organisational Representative can use their address to auto fill booking address
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the element with name 'lblQuestionBookAddr' has text 'Do you want to use your profile address for this booking?'
    And I can see the element with name 'rdBookingAddress' is 'visible'
    And I can see the booking address is 'auto populated'
    When I click on element by name 'rdBookingAddressNo'
    Then I can see the booking address is 'empty'
    And I click on element by name 'rdBookingAddressYes'
    Then I can see the booking address is 'auto populated'

# ---------------------------------------- AUSLAN1-711 -> END ----------------------------------------

#----------------------------------------- AUSLAN1-312 -> START ----------------------------------------

  @runThis
  Scenario: Given 1 verified Individual Client, Administrator can create a booking with all types of interpreters
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    Then I am on the bookings page
    And I am shown with 0 bookings
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    And I can see the element with name 'captioningAdditionalFields' is 'not visible'
    And I can see the element with name 'captioningAndVriAdditionalFields' is 'not visible'
    And I can see the element with name 'vriAdditionalFields' is 'not visible'
    And I can see the element with name 'how_would_you_like_to_receive_notes' is 'not visible'
    And I fill New Booking form fields correctly
    And I select the bookable for client
    When I click on BUTTON name 'btnVri'
    Then I can see the element with name 'vriAdditionalFields' is 'visible'
    And I can see the element with name 'captioningAndVriAdditionalFields' is 'visible'
    Then I click on checkbox name 'cbDeaf'
    And I fill the field 'deaf_count' with value '1'
    When I click on checkbox name 'cbDeafBlind'
    Then I can see the element with name 'deafBlindInterpreterTypes' is 'visible'
    When I click on checkbox name 'cbCaptioning'
    Then I can see the element with name 'captioningAdditionalFields' is 'visible'
    And I can see the element with name 'captioningAndVriAdditionalFields' is 'visible'
    And I fill the field 'captioner_count' with value '3'
    When I click on checkbox name 'cbNotetaking'
    Then I can see the element with name 'how_would_you_like_to_receive_notes' is 'visible'
    And I fill the field 'noteTaker_count' with value '1'
    When I click on checkbox name 'cbOtherLanguage'
    Then I can see the element with name 'otherLanguageTypes' is 'visible'
    Then I click on checkbox name 'cbVisualFrame'
    And I fill the field 'visualFrame_count' with value '2'
    Then I click on checkbox name 'cbTactile'
    And I fill the field 'tactile_count' with value '3'
    Then I click on checkbox name 'cbPlatform'
    And I fill the field 'platform_count' with value '1'
    Then I click on checkbox name 'cbAsl'
    And I fill the field 'asl_count' with value '2'
    Then I click on checkbox name 'cbBsl'
    And I fill the field 'bsl_count' with value '3'
    Then I click on checkbox name 'cbIsl'
    And I fill the field 'isl_count' with value '1'
    Then I click on checkbox name 'cbSignedEnglish'
    And I fill the field 'signedEnglish_count' with value '2'
    Then I click on checkbox name 'cbIndigenousSign'
    And I fill the field 'indigenousSign_count' with value '3'
    Then I move to element name 'tnc'
    And I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I am shown with 10 bookings
    And I can see the element with id 'displayTxt' has text 'Displaying 1 - 10 of 12 Bookings'
#----------------------------------------- AUSLAN1-312 -> END ----------------------------------------

#----------------------------------------- AUSLAN1-977 -> START ----------------------------------------
  @ignoreThis
  Scenario: Given 1 verified Individual Client, Booking Officer will get error notification when changing notetakers to less number than assigned. Interpreter and Interpreter1 exists.
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I am shown with 0 bookings
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I click on checkbox name 'cbAuslan'
    Then I click on checkbox name 'cbNotetaking'
    When I fill New Booking form fields correctly with standard time from 09:00 AM to 10:00 AM with 2 'noteTaker_count'
    And I select the bookable for client
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I am shown with 1 bookings
    And I wait for 2000 milli-seconds
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 2 Interpreter
    Then I wait for 1000 milli-seconds
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I fill the field 'noteTaker_count' with value '1'
    When I click on BUTTON 'SAVE'
    And If I am shown a popup, I approve it
    Then I wait for 1000 milli-seconds
    Then I will get an error notification saying "Oops! Too many notetakers already allocated. Please unassign first."

  @ignoreThis
  Scenario: Given 1 verified Individual Client, Booking Officer will get error notification when changing captioners to less number than assigned. Interpreter and Interpreter1 exists.
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I am shown with 0 bookings
    When I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    Then I click on checkbox name 'cbAuslan'
    Then I click on checkbox name 'cbCaptioning'
    When I fill New Booking form fields correctly with standard time from 09:00 AM to 10:00 AM with 2 'captioner_count'
    And I select the bookable for client
    Then I click on checkbox name 'tnc'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I am shown with 1 bookings
    And I wait for 2000 milli-seconds
    When I click on an individual booking
    Then I am on the individual booking page
    Then I select 2 Interpreter
    Then I wait for 1000 milli-seconds
    And I click on BUTTON name 'reassingBtn'
    And I click on BUTTON 'Save'
    Then I wait for 1000 milli-seconds
    Then I get valid message: 'The interpreter have been assigned'
    When I click on link 'Booking details'
    Then I should be on the edit booking page
    And I fill the field 'captioner_count' with value '1'
    When I click on BUTTON 'SAVE'
    And If I am shown a popup, I approve it
    Then I wait for 1000 milli-seconds
    Then I will get an error notification saying "Oops! Too many captioners already allocated. Please unassign first."

        #----------------------------------------- AUSLAN1-977 -> END ----------------------------------------
        
