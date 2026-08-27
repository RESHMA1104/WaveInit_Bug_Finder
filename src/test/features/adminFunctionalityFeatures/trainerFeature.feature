@Prasanna @TrainerFeature
Feature: Trainer Feature

  # Admin creates a new trainer "Jack", and views, filters, and deletes trainer

        Background:
            Given the admin is on the WaveInit login page
             When the admin selects the Admin Login option
              And the admin enters valid admin credentials
              And the admin clicks the Login button
             Then the admin should be logged in successfully
              And the admin should be redirected to the Admin Dashboard
             When the admin clicks the Trainers link in the left sidebar
             Then the application should redirect to the trainer sessions page

        Scenario: Create a new trainer
             When the admin clicks the Add Trainer button
             Then the application should navigate to the Create Trainer page
              And the admin enters the fullname "fullname", email "email", and mobile number "mobileNumber"
              And the admin selects the department and designation for the new trainer
              And the admin selects the experience for the new trainer
              And the admin enters a new password "password" and retypes the same password to confirm
              And the admin clicks the Create Trainer button
            #  Then the newly created trainer should be displayed

        Scenario Outline: Search and filter trainer
             When the admin click the search bar and enters "<keyword>"
             Then the appropriate trainer details should be displayed

        Examples:
                  | keyword  |
                  | Adhiswar |
                  | Jack     |

        Scenario: Admin views detailed trainer information
             When the admin search for "Jack"
             Then the appropriate trainer details should be displayed
             When the admin click the eye icon
             Then the detailed view of the trainer should be visible

        Scenario: Admin deletes a trainer
             When the admin search for "Adhiswar"
             Then the appropriate trainer details should be displayed
             When the admin click the Delete button
              And the admin confirms the deletion by clicking the Delete button in the confirmation popup
             Then the message "Trainer deleted successfully." should be displayed