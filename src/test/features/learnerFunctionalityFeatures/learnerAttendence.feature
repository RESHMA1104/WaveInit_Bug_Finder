@Rishwanth 
Feature: Rishwanth_Adhishwar_K_01_09_2026 To check the Attendence functianlities in WAVE INIT LMS Works as expected

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button

  Scenario: To checck whether Attendence Button in left drawer redirects to my Attendence page
    And the learner clicks on Attendence Button in left drawer
    Then the learner should redirected to MyAttendence and session page

  Scenario: To check whether refresh button in the Attendence and session page
    And the learner clicks on Attendence Button in left drawer
    And the learner clciks on refresh Button
    Then the learner should see a message refreshed successfully
