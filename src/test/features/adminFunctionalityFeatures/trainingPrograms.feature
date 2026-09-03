@Prasanna @TrainingPrograms
Feature: Training Programs Management

  # Admin creates a training session titled "Python", then views, edits, and
  # finally deletes that same session — fully self-contained per run, no
  # dependency on pre-seeded QA data.

        Background:
            Given the admin is on the WaveInit login page
             When the admin selects the Admin Login option
              And the admin enters valid admin credentials
              And the admin clicks the Login button
             Then the admin should be logged in successfully
              And the admin should be redirected to the Admin Dashboard
             When the admin clicks the Training Programs link in the left sidebar
             Then the application should redirect to the training sessions page

        Scenario: Create a new training session
             When the admin clicks the Add Training button
             Then the application should navigate to the Create Training page
             When the admin enters the training title "Python" and description "Python programming training"
              And the admin selects the assigned trainer
              And the admin selects the start date & time and end date & time
              And the admin enters the capacity
              And the admin clicks the Create Training Session button
             Then the newly created training session should be displayed

        Scenario Outline: Search and filter training sessions
             When the admin clicks the search bar and enters "<keyword>"
             Then the appropriate training sessions should be displayed

        Examples:
                  | keyword |
                  | React   |
                  | Java    |

        Scenario: View detailed training session
             When the admin searches for "Python"
             Then the appropriate training sessions should be displayed
             When the admin clicks the eye icon
             Then the detailed view of the training session should be visible

        Scenario: Admin edits a training session
             When the admin searches for "Python"
             Then the appropriate training sessions should be displayed
             When the admin clicks the Edit button
             Then the Edit Training Session page should be visible
             When the admin edits the "title" to "Pytest-Behave"
              And the admin clicks the Save Changes button
             Then the popup message "Training updated successfully." should be displayed

        Scenario: Admin deletes a training session
             When the admin searches for "Pytest-Behave"
             Then the appropriate training sessions should be displayed
             When the admin clicks the Delete button
              And the admin clicks the Delete Confirm button
<<<<<<< HEAD
             Then the popup message "Training deleted successfully" should be displayed
=======
             Then the popup message "Training deleted successfully" should be displayed
>>>>>>> a9453ffb6cd28b93b1833e2e8086c1fa6f96573b
