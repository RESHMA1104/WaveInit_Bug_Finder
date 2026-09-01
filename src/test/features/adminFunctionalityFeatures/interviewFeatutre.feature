@Prasanna @Interview
Feature: Interview
              Admin schedules a new interview for a participant

        Background:
            Given the admin is on the WaveInit login page
             When the admin selects the Admin Login option
              And the admin enters valid admin credentials
              And the admin clicks the Login button
             Then the admin should be logged in successfully
              And the admin should be redirected to the Admin Dashboard
             When the admin clicks the Interviews link in the left sidebar
             Then the application should redirect to the Interviews page

        Scenario: Schedule an interview
             When the admin clicks the Schedule Interview button
             Then the Schedule Interview page should be visible
              And the admin clicks the interview title field and enters the interview title
              And the admin selects the interview date and interview time
              And the admin chooses which candidate to schedule the interview for
              And the admin chooses the HR representative to conduct the interview
              And the admin chooses the time duration for the interview
              And the admin adds notes/description about the interview
              And the admin clicks the Schedule Interview button
             Then the newly scheduled interview should be created

        Scenario Outline: Interview search
             When the admin clicks the search bar and searches for "<Keyword>"
             Then the appropriate result for "<Keyword>" should be displayed

        Examples:
                  | Keyword |
                  | Tamil   |
                  | Dummy   |

        Scenario: Edit an interview
             When the admin clicks the search bar and searches for "Tamil"
             Then the appropriate result for "Tamil" should be displayed
              And the admin clicks the Edit button
             Then the Edit Interview popup should be visible
              And the admin changes the interview title to "Manual Testing"
              And the admin clicks the Save Changes button
             Then the interview should be updated successfully

        Scenario: View an interview
             When the admin clicks the search bar and searches for "Tamil"
             Then the appropriate result for "Tamil" should be displayed
              And the admin clicks the View button
             Then the interview details should be visible

        Scenario: Delete an interview
             When the admin clicks the search bar and searches for "Tamil"
             Then the appropriate result for "Tamil" should be displayed
              And the admin clicks the Delete button on the appropriate scheduled interview
              And the admin clicks the Delete Interview confirmation button
             Then the interview should be deleted successfully