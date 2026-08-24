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
