# @Prasanna @Participate

# Feature: Participant Feature

#   # Admin creates a new participant "Jack", views the participant, searches and filters participants, and finally deletes the participant

#         Background:
#             Given the admin is on the WaveInit login page
#              When the admin selects the Admin Login option
#               And the admin enters valid admin credentials
#               And the admin clicks the Login button
#              Then the admin should be logged in successfully
#               And the admin should be redirected to the Admin Dashboard
#              When the admin clicks the Participants link in the left sidebar
#              Then the application should redirect to the Participants page


#         Scenario: Create new Participant
#              When the admin clicks the Add Participant button
#              Then a popup window "Add New Participant" should be displayed
#               And the admin enters the participant details "Jack", "jack@example.com", "9876543210" and "Jack@1234"
#               And the admin clicks the Save button
#              Then the newly created participant should be displayed "Participant created successfully"


#         Scenario Outline: Participant Search
#              When the admin clicks the search bar and searches for "<Keyword>"
#              Then the appropriate result for "<Keyword>" should be displayed

#         Examples:
#                   | Keyword |
#                   | Darshan |
#                   | Hari    |


#         Scenario: Participant details view
#              When the admin clicks the search bar and searches for "Jack"
#              Then the appropriate result for "Jack" should be displayed
#               And the admin clicks the eye icon in the displayed participant table row
#              Then the application should display the appropriate participant details


#         Scenario: Participant Delete
#              When the admin clicks the search bar and searches for "Jack"
#              Then the appropriate result for "Jack" should be displayed
#               And the admin clicks the delete icon in the displayed participant table row
#               And the admin clicks the Confirm button in the delete confirmation popup
#              Then the participant should be deleted successfully and the message "Participant removed successfully" should be displayed