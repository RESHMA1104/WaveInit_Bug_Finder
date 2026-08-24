@Reshma

Feature: Trainer Login Functionality

              Trainer Login functionality should allow authorized trainers
  to access the Trainer Dashboard with valid credentials and prevent
  unauthorized access with invalid or incomplete credentials.

        Background:
            Given the trainer is on the WaveInit login page

        Scenario: Trainer Login with valid credentials
             When the trainer selects the Trainer Login option
              And the trainer enters valid trainer credentials
              And the trainer clicks the Login button
             Then the trainer should be logged in successfully
              And the trainer should be redirected to the Trainer Dashboard

        Scenario Outline: Trainer Login with invalid or missing credentials
             When the trainer selects the Trainer Login option
              And the trainer enters "<username>" as username
              And the trainer enters "<password>" as password
              And the trainer clicks the Login button
             Then the trainer should not be logged in
              And the trainer should see "<expectedMessage>"

        Examples:
                  | username           | password  | expectedMessage             |
                  | invalid@test.com   | wrong123  | Invalid email or password   |
                  | trainer@test.com   | wrong123  | Invalid email or password   |
                  | wrong@test.com     | trainer123| Invalid email or password   |
                  |                    | trainer123| Please fill out this field. |
                  | trainer@test.com   |           | Please fill out this field. |
                  |                    |           | Please fill out this field. |