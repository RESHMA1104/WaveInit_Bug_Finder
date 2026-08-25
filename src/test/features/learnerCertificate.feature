@haritha
Feature: Haritha_25_08_2026 To Check the certificate Functionality of an Learner
  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button

  Scenario: Certificate Functionality of a Learner
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button
    Then the learner should be successfully signed-in to the dashboard
    When the learner clicks on the Certificate option
    Then the learner should be navigated to the certificate page
    And the learner should see the certificare image
