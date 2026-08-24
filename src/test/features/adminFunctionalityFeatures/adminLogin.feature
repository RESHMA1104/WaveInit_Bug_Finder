@Prasanna @AdminDashboard

Feature: Admin Login Functionality

              Admin Login functionality should allow authorized administrators to successfully access the Admin Dashboard with valid credentials
              and prevent unauthorized access with invalid credentials.

        Background:
            Given the admin is on the WaveInit login page

        Scenario: Admin Login with valid credentials
             When the admin selects the Admin Login option
              And the admin enters valid admin username and password
              And the admin clicks the Login button
             Then the admin should be logged in successfully
              And the admin should be redirected to the Admin Dashboard