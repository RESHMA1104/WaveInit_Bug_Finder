@Prasanna @AdminDashboard

Feature: Admin Login Functionality

              Admin Login functionality should allow authorized administrators
  to access the Admin Dashboard with valid credentials and prevent
  unauthorized access with invalid or incomplete credentials.

        Background:
            Given the admin is on the WaveInit login page

        Scenario: Admin Login with valid credentials
             When the admin selects the Admin Login option
              And the admin enters valid admin credentials
              And the admin clicks the Login button
             Then the admin should be logged in successfully
              And the admin should be redirected to the Admin Dashboard

        Scenario Outline: Admin Login with invalid or missing credentials
             When the admin selects the Admin Login option
              And the admin enters "<username>" as username
              And the admin enters "<password>" as password
              And the admin clicks the Login button
             Then the admin should not be logged in
              And the admin should see "<expectedMessage>"

        Examples:
                  | username         | password | expectedMessage             |
                  | invalid@test.com | wrong123 | Invalid email or password   |
                  | admin@test.com   | wrong123 | Invalid email or password   |
                  | wrong@test.com   | admin123 | Invalid email or password   |
                  |                  | admin123 | Please fill out this field. |
                  | admin@test.com   |          | Please fill out this field. |
                  |                  |          | Please fill out this field. |