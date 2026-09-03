@haritha
Feature: Haritha_S_R_01_09_2026 - Check Search Functionality in Learner Module

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button

  Scenario Outline: Verify searched learner names are displayed correctly
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button
    Then the learner should be successfully signed-in to the dashboard
    When the learner clicks on the Leaderboard option
    Then the learner should be redirected to the leaderboard page
    When the learner searches for the learner name "<name>"
    Then the learner should be displayed with the searched result "<name>"

    Examples:
      | name   |
      | jane   |
      | sriram |
      | Rishwa |

    Scenario Outline: Verify appropriate message when searched learner is not available
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button
    Then the learner should be successfully signed-in to the dashboard
    When the learner clicks on the Leaderboard option
    Then the learner should be redirected to the leaderboard page
    When the learner searches for the learner name "<name>"
    Then the learner should be displayed with the appropriate message "<msg>"

    Examples:
      | name | msg                       |
      | janu | No ranking data available |