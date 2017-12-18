Feature: Booking Management

  Background: I as an all user should be able to see the website
    Given I go to the website
    And I am on a computer
    And I am shown the login screen, with picture and signup button


  @runThis
  Scenario: Administrator can create a booking with pdf for Individual Client
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    And I will close the file upload
    And I fill New Booking form fields correctly
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
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'sushi.pdf' does 'exists'

  @runThis
  Scenario: Administrator can create a booking with pdf for Organisational Representative
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    And I will close the file upload
    And I fill New Booking form fields correctly
    And I select the bookable for org rep
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
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'sushi.pdf' does 'exists'


  @runThis
  Scenario: Booking Officer can create a booking with pdf for Individual Client
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    And I will close the file upload
    And I fill New Booking form fields correctly
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
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'sushi.pdf' does 'exists'

  @runThis
  Scenario: Administrator can create a booking with doc for Individual Client
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a document 'docu_not_sushi.doc'
    And I will see attachment 'docu_not_sushi.doc'
    And I will close the file upload
    And I fill New Booking form fields correctly
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
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'docu_not_sushi.doc' does 'exists'


  @runThis
  Scenario: Booking Officer can create a booking with doc for Individual Client
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a document 'docu_not_sushi.doc'
    And I will see attachment 'docu_not_sushi.doc'
    And I will close the file upload
    And I fill New Booking form fields correctly
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
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'docu_not_sushi.doc' does 'exists'

  @runThis
  Scenario: Administrator can create a booking with ppt for Individual Client
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a document 'ppt_not_sushi.ppt'
    And I will see attachment 'ppt_not_sushi.ppt'
    And I will close the file upload
    And I fill New Booking form fields correctly
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
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'ppt_not_sushi.ppt' does 'exists'

  @runThis
  Scenario: Booking Officer can create a booking with ppt for Individual Client
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    When I will upload a document 'ppt_not_sushi.ppt'
    And I will see attachment 'ppt_not_sushi.ppt'
    And I will close the file upload
    And I fill New Booking form fields correctly
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
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'ppt_not_sushi.ppt' does 'exists'

  @runThis
  Scenario: Booking Officer can remove booking documents for Individual Client
    Given I exist as an Booking Officer
    And I sign in with valid Booking Officer credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I will upload a document 'ppt_not_sushi.ppt'
    And I will see attachment 'ppt_not_sushi.ppt'
    When I will upload a document 'docu_not_sushi.doc'
    And I will see attachment 'docu_not_sushi.doc'
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    Then I click on BUTTON name 'btnRemoveDocument_3'
    Then I will see attachment 'sushi.pdf' is removed
    Then I click on BUTTON name 'btnRemoveDocument_1'
    Then I will see attachment 'ppt_not_sushi.ppt' is removed
    And I fill New Booking form fields correctly
    And I select the bookable for client
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'docu_not_sushi.doc' does 'exists'
    Then I see attachment 'ppt_not_sushi.ppt' does 'not exists'
    Then I see attachment 'sushi.pdf' does 'not exists'


  @ignoreThis
    # https://github.com/valor-software/ng2-file-upload/issues/906
  Scenario: Administrator can remove booking documents for Individual Client
    Given I exist as an Administrator
    And I sign in with valid Administrator credentials
    And I am on the bookings page
    And I click on 'New Booking'
    And I will be taken to the 'New Booking' form
    Then I move to element name 'tnc'
    Then I click on checkbox name 'tnc'
    When I will upload a document 'ppt_not_sushi.ppt'
    And I will see attachment 'ppt_not_sushi.ppt'
    When I will upload a document 'docu_not_sushi.doc'
    And I will see attachment 'docu_not_sushi.doc'
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    Then I click on BUTTON name 'btnRemoveDocument_3'
    Then I will see attachment 'sushi.pdf' is removed
    Then I click on BUTTON name 'btnRemoveDocument_1'
    Then I will see attachment 'ppt_not_sushi.ppt' is removed
    When I will upload a document 'sushi.pdf'
    And I will see attachment 'sushi.pdf'
    When I click on element by name 'rdBookingAddressNo'
    And I fill New Booking form fields correctly
    And I select the bookable for client
    And I click the create booking button
    Then I get a valid create booking notification
    And I am on the bookings page
    And I will be shown with bookings
    Then I click on an individual booking of type 'Requested'
    Then I will be shown the booking job page
    And I see attachment 'docu_not_sushi.doc' does 'exists'
    Then I see attachment 'ppt_not_sushi.ppt' does 'not exists'
    Then I see attachment 'sushi.pdf' does 'exists'
