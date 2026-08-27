@Rishwanth
Feature: Rishwanth_Adhishwar_K_27_08_2026 To Check the MyCourse Fuctionalities of learner

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button

  Scenario: To verify MyCourse Button in left drawer redirects to My enrolled Course page
    And the learner clicks on myCourse in left drawer
    Then the learner should redirected to My course page

  @MyCourse
  Scenario: To verify the Courses redirects to Specific Course page
    And the learner clicks on myCourse in left drawer
    And the learner clicks on first course in my Course
    Then the learner should be redirected to specific course
