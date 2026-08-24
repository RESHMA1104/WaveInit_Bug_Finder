@Rishwanth
Feature: Rishwanth_Adhishwar_K_24_08_2026 To Check the Sign-in Functionality of an Learner
Description:Sign-In Functionality with both valid and invalid case

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button

  Scenario: As a registered learner i need to sign-in, to Wave Init LMS with valid username and Password
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button
    Then the learner should be successfully signed-in to the dashboard

  Scenario Outline: As a registered learner i need to get invalid email or password message with invalid Credentials
    And the learner enter the username as "<username>"
    And the learner enter the password as "<password>"
    And the learner clicks on sign-in as learner Button
    Then the learner should be displayed with an error message as "<errorMessage>"

    Examples:
      | username         | password   | errorMessage              |
      | rishwa@gmail.com | rishwatest | Invalid email or password |
      | aadhi@gmail.com  | RishwaTest | Invalid email or password |

  Scenario Outline: As a registered learner i need to be notified with fill the empty field warning while leaving email or password field empty
    And the learner enter the username as "<username>"
    And the learner enter the password as "<password>"
    And the learner clicks on sign-in as learner Button
    Then the learner should see a warning message as "<warning>"

    Examples:
      | username        | password   | warning                     |
      |                 | rishwatest | Please fill out this field. |
      | aadhi@gmail.com |            | Please fill out this field. |
