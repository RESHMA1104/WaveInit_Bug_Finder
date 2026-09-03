@Prasanna
Feature: Prasanna 03-09-2026 Register feature
        Background:
            Given the user launches the application
              And click the signup button
        Scenario: Register with valid credentials
             When I enter valid registration details
              And I submit the registration form
             Then I should see a confirmation message indicating successful registration
        Scenario Outline: User cannot register with invalid credentials
             When the user enters the "<Name>", "<Email>", "<Phone>", "<Password>" and "<ConfirmPassword>"
              And the user clicks the Create Account button
             Then the user should can see the "<ExpectedMessage>"

        Examples:
                  | Name     | Email              | Phone      | Password  | ConfirmPassword | ExpectedMessage             |
                  |          | Prasanna@gmail.com | 9087654321 | Kiot@1234 | Kiot@1234       | Please fill out this field. |
                  | Prasanna | Prasanna           | 9087654321 |           | Kiot@1234       | Passwords do not match      |
                  | Prasanna | Prasanna           |            | Kiot@1234 | Kiot@1234       | Please fill out this field. |
                  | Prasanna | Prasanna@gmail.com | 9087654321 | Kiot@1234 | Wrong@1234      | Passwords do not match      |
        Scenario: Register with existing email
             When the user enters the registration details with an existing email
              And I submit the registration form
             Then the user can see the message An account with this email already exists. Please sign in
        Scenario: Register with an email pending admin approval
             When the user enters the following registration details:
                  | Name     | Email                       | Phone      | password  | Retype_password |
                  | Prasanna | Prasannakumar0027@gmail.com | 9087654321 | Kiot@1234 | Kiot@1234       |
              And I submit the registration form
             Then the user should see the message An account with this email is already registered and pending admin approval.