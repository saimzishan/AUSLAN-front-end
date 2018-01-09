Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button



  @runThis
  Scenario: Booking Officer can see  list of org reps, when making a booking, Organisational Representative , Individual Client exists
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can see the booking_for field
    And I see an option 'ted Individual Client' in 'booking_for' dropdown
    Then I click on element by name 'OrganisationalRepresentative'
    And I see an option 'CURVE TOMORROW - alana Organisational' in 'booking_for' dropdown

# ---------------------------------------- AUSLAN1-727 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-736, 737 -> START ----------------------------------------
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
# ---------------------------------------- AUSLAN1-736, 737 -> END ----------------------------------------

  @runThis
  Scenario: Given an Individual Client, Booking Officer should get a popup when the booking needs more interpreters
    Given I exist as a Booking Officer
    And I sign in with valid Booking Officer credentials
    When I am on the bookings page
    And I click on 'New Booking'
    Then I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with standard time from 09:00 AM to 11:00 AM with 1 interpreters
    And I select the bookable for client
    Then I move to element name 'tnc'
    And I click on checkbox name 'tnc'
    When I click the create booking button
    Then I will be shown a popup message 'This booking might require more than 1 interpreter. You've only requested 1 interpreter. Are you sure you want to create this booking?'

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