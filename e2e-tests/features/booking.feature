Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button

  @ignoreThis
  Scenario: Administrator can create a booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Booking Officer can create a booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Organisational Representative can create a booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Individual Client can create a booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Interpreter can NOT create a booking
    Given I exist as an Interpreter
    When I sign in with valid Interpreter credentials
    Then I am on the bookings page
    And I don't see any new New Booking link

  @ignoreThis
  Scenario: Booking Officer can create duplicate booking, a booking is created
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    Then I will be shown with bookings
    Then I store the booking count
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    Then I can see the button 'Save' is disabled
    And I click on BUTTON 'Duplicate'
    Then I will be taken to the 'New Booking' form
    When I click on BUTTON 'SAVE'
    Then I get a valid create booking notification
    Then I am on the bookings page
    Then I will be shown with bookings
    Then I expect the booking count to be greater then before

  @ignoreThis
  Scenario: Administrator can create a booking with pdf
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
#    Then I click on BUTTON name 'uploader'
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    And I will close the file upload
    And I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Booking Officer can create a booking with pdf
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
#    Then I click on BUTTON name 'uploader'
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    And I will close the file upload
    And I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Administrator can create a booking with doc
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
#    Then I click on BUTTON name 'uploader'
    When I will upload a document 'docu_not_sushi.doc'
    And I will see attachment 'docu_not_sushi.doc'
    And I will close the file upload
    And I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Booking Officer can create a booking with doc
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
#    Then I click on BUTTON name 'uploader'
    When I will upload a document 'docu_not_sushi.doc'
    And I will see attachment 'docu_not_sushi.doc'
    And I will close the file upload
    And I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Administrator can create a booking with doc
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
#    Then I click on BUTTON name 'uploader'
    When I will upload a document 'ppt_not_sushi.ppt'
    And I will see attachment 'ppt_not_sushi.ppt'
    And I will close the file upload
    And I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Booking Officer can create a booking with doc
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
#    Then I click on BUTTON name 'uploader'
    When I will upload a document 'ppt_not_sushi.ppt'
    And I will see attachment 'ppt_not_sushi.ppt'
    And I will close the file upload
    And I fill New Booking form fields correctly
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

# ---------------------------------------- AUSLAN1-252 -> START ----------------------------------------
  @runThis
  Scenario: Booking Officer can create a non-standard booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:00AM with 1 interpreters
    And I click the create booking button
    Then I will be shown a popup message

  @runThis
  Scenario: Administrator can create a non-standard booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:00AM with 1 interpreters
    And I click the create booking button
    Then I will be shown a popup message

  @ignoreThis
  Scenario: Organisational Representative can create a non-standard booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:00AM with 1 interpreters
    And I click the create booking button
    Then I will be shown a popup message

  @ignoreThis
  Scenario: Individual Client can create a non-standard booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:00AM with 1 interpreters
    And I click the create booking button
    Then I will be shown a popup message
# ---------------------------------------- AUSLAN1-252 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-254 -> START ----------------------------------------
  @ignoreThis
  Scenario: Booking Officer can create a non-standard booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'

  @ignoreThis
  Scenario: Administrator can create a non-standard booking
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'

  @ignoreThis
  Scenario: Organisational Representative can create a non-standard booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'

  @ignoreThis
  Scenario: Individual Client can create a non-standard booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'
# ---------------------------------------- AUSLAN1-254 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-242 -> START ----------------------------------------
  @ignoreThis
  Scenario: Organisational Representative can create a non-standard booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can see the ext_ref_num field

  @ignoreThis
  Scenario: Individual Client can create a non-standard booking
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can't see the ext_ref_num field
# ---------------------------------------- AUSLAN1-242 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-40 -> START ----------------------------------------
  @ignoreThis
  Scenario: Organisational Representative will have special instruction fields
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can see the txtSpecialInstruction field

  @ignoreThis
  Scenario: Individual Client can't have special instruction fields
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can't see the txtSpecialInstruction field
# ---------------------------------------- AUSLAN1-40 -> END ----------------------------------------
