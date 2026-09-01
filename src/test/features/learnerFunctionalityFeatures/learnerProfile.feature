@Rishwanth @MyCourse
Feature: To validate all functionalities in Learner Profile Add,Edit,and Delete Operations

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button

  Scenario: To verify whether Clicking on Profile Button redirects to learners profile page
    And the learner clicks on profile Button
    Then the learner should redirected to his Profile page
