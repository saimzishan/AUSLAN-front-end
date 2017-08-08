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
  @ignoreThis
  Scenario: Booking Officer can create a non-standard booking
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:00AM with 1 interpreters
    And I click the create booking button
    Then I will be shown a popup message

  @ignoreThis
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
<<<<<<< HEAD
  Scenario: Booking Officer can't create a less interpreter booking
=======
  Scenario: Booking Officer can create a non-standard booking
>>>>>>> e4986feaea3f5d1f8e33c5f1c9e525ef9f94ef65
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'

  @ignoreThis
<<<<<<< HEAD
  Scenario: Administrator can't create a less interpreter booking
=======
  Scenario: Administrator can create a non-standard booking
>>>>>>> e4986feaea3f5d1f8e33c5f1c9e525ef9f94ef65
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'

  @ignoreThis
<<<<<<< HEAD
  Scenario: Organisational Representative can't create a less interpreter booking
=======
  Scenario: Organisational Representative can create a non-standard booking
>>>>>>> e4986feaea3f5d1f8e33c5f1c9e525ef9f94ef65
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'

  @ignoreThis
<<<<<<< HEAD
  Scenario: Individual Client can't create a less interpreter booking
=======
  Scenario: Individual Client can create a non-standard booking
>>>>>>> e4986feaea3f5d1f8e33c5f1c9e525ef9f94ef65
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I fill New Booking form fields correctly with non-standard time from 04:00AM to 05:01AM with 1 interpreters
    Then I am shown a validation error with the text 'You may require more than 1 interpreter for this booking'
# ---------------------------------------- AUSLAN1-254 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-242 -> START ----------------------------------------
  @runThis
  Scenario: Organisational Representative can see ext_ref_num
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can see the ext_ref_num field

  @runThis
  Scenario: Organisational Representative can see ext_ref_num
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the ext_ref_num field
    When I fill New Booking form fields correctly
    And I fill the field 'ext_ref_num' with value '1234'
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings


  @runThis
  Scenario: Individual Client cant see ext_ref_num
    Given I exist as an Individual Client
    And I sign in with valid Individual Client credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I can't see the ext_ref_num field
# ---------------------------------------- AUSLAN1-242 -> END ----------------------------------------

# ---------------------------------------- AUSLAN1-40 -> START ----------------------------------------
  @ignoreThis
  Scenario: Special Organisational Representative have special instruction fields and see it in the booking creating
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    When I will be taken to the 'New Booking' form
    Then I can see the txtSpecialInstruction field

  @ignoreThis
  Scenario: Special Organisational Representative have special instruction fields and see it in the booking creating
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the txtSpecialInstruction field
    When I specify i have special instruction
    Then The field 'txtSpecialInstruction' will be populated with 'I am special'

  @ignoreThis
  Scenario: Special Organisational Representative will create a booking with special instructions
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the txtSpecialInstruction field
    When I fill New Booking form fields correctly with non-standard time from 07:00AM to 08:00AM with 1 interpreters
    And I specify i have special instruction
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings

  @ignoreThis
  Scenario: Special Organisational Representative will create a booking with special instructions,Administrator will login and check the special instruction field for the booking
    Given I exist as an Organisational Representative
    And I sign in with valid Organisational Representative credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    And I can see the txtSpecialInstruction field
    And I fill New Booking form fields correctly with non-standard time from 07:00AM to 08:00AM with 1 interpreters
    And I specify i have special instruction
    And The field 'txtSpecialInstruction' will be populated with 'I am special'
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
    And I can see the field '' will have the value 'I am special'

#  @ignoreThis
#  Scenario: Individual Client can't have special instruction fields
#    Given I exist as an Individual Client
#    And I sign in with valid Individual Client credentials
#    And I am on the bookings page
#    And I click on 'New Booking'
#    And I will be taken to the 'New Booking' form
#    Then I can't see the txtSpecialInstruction field
# ---------------------------------------- AUSLAN1-40 -> END ----------------------------------------
