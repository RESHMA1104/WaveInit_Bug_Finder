@Rishwanth @Login
Feature: Rishwanth_Adhishwar_K_24_08_2026 To Check the Sign-in Functionality of an Learner
Description:Sign-In Functionality with both valid and invalid case

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button

  Scenario: Signin Functionality with valid credentials
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button
    Then the learner should be successfully signed-in to the dashboard

  Scenario Outline: Signin Functionality with invalid credentials
    And the learner enter the username as "<username>"
    And the learner enter the password as "<password>"
    And the learner clicks on sign-in as learner Button
    Then the learner should be displayed with an error message as "<errorMessage>"

    Examples:
      | username         | password   | errorMessage              |
      | rishwa@gmail.com | rishwatest | Invalid email or password |
      | aadhi@gmail.com  | RishwaTest | Invalid email or password |

  Scenario Outline: Signin Functionality with leaving field empty
    And the learner enter the username as "<username>"
    And the learner enter the password as "<password>"
    And the learner clicks on sign-in as learner Button
    Then the learner should see a warning message as "<warning>"

    Examples:
      | username        | password   | warning                     |
      |                 | rishwatest | Please fill out this field. |
      | aadhi@gmail.com |            | Please fill out this field. |
