@Rishwanth @MyCourse
Feature: Rishwanth_Adhishwar_K_01_09_2026 To check the Progress And Analytics functianlities in WAVE INIT LMS Works as expected

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button

  Scenario: To checck whether Progress Analytics Button in left drawer redirects to my Learning Progress page
    And the learner clicks on progress analytics Button in left drawer
    Then the learner should redirected to My Learning progress and Performance page

  Scenario: To check whether refresh button in the Progress and Analytics page
    And the learner clicks on progress analytics Button in left drawer
    And the learner clciks on refresh Button in Progress Analytics
    Then the learner should see a message Progress metrices refreshed
