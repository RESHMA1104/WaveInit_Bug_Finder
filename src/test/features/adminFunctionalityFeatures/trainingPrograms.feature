@Prasanna @TrainingPrograms
Feature: Training Programs Management

  # Admin creates a new training program and tests its functionality:
  # Create, Delete, View, Edit, and Filter in the Training Programs module.

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
             When the admin enters the training title and description
              And the admin selects the assigned trainer
              And the admin selects the start date & time and end date & time
              And the admin enters the capacity
              And the admin clicks the Create Training Session button
             Then the newly created training session should be displayed

        Scenario Outline: Search and filter training sessions
             When the admin clicks the search bar and enters "<keyword>"
             Then the appropriate training sessions should be displayed

        Examples:
                  | keyword    |
                  | playwright |
                  | React      |

        Scenario Outline: View detailed training session
             When the admin searches for "<keyword>"
             Then the appropriate training sessions should be displayed
             When the admin clicks the eye icon
             Then the detailed view of the training session should be visible

        Examples:
                  | keyword    |
                  | playwright |
                  | React      |

        Scenario Outline: Admin edits a training session
             When the admin searches for "<keyword>"
             Then the appropriate training sessions should be displayed
             When the admin clicks the Edit button
             Then the Edit Training Session page should be visible
             When the admin edits the "title"
              And the admin clicks the Save Changes button
             Then the popup message "Training data updated successfully." should be displayed

        Examples:
                  | keyword    |
                  | playwright |
                  | React      |

        Scenario Outline: Admin deletes a training session
             When the admin searches for "<keyword>"
             Then the appropriate training sessions should be displayed
             When the admin clicks the Delete button
              And the admin clicks the Delete Confirm button
             Then the popup message "Training data deleted successfully." should be displayed

        Examples:
                  | keyword    |
                  | playwright |
                  | React      |