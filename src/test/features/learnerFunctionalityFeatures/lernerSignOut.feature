@Rishwanth @signout
Feature: Rishwanth_Adhishwar_K_25_08_2026 To Check the Sign-out Functionality of an Learner

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button

  Scenario: To check Sign-out Functionality is redirected to Sig-in page
    And the learner clicks on learner name in left drawer
    And the learner clicks on Sign-out Button
    Then the learner should be redirected to Sign-in page
