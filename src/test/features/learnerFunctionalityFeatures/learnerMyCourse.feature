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

  Scenario: To verify the Courses redirects to Specific Course page
    And the learner clicks on myCourse in left drawer
    And the learner clicks on first course in my Course
    Then the learner should be redirected to specific course

  Scenario: To verify the search functionality in My Courses with valid course
    And the learner clicks on myCourse in left drawer
    And the learner enter the valid course in search Bar
    Then the learner should see results based on searched Course

  Scenario: To verify the search functionality in My Courses with invalid course
    And the learner clicks on myCourse in left drawer
    And the learner enter the invalid course in search Bar
    Then the learner should displayed with No course found text

  Scenario: To verify that lesson tab in specific course redirects to its sub tab
    And the learner clicks on myCourse in left drawer
    And the learner clicks on first course in my Course
    And the learner clicks on lessons tab
    Then the learner should redirected to learning content sub tab

  Scenario: To verify that AI-Quiz tab in specific course redirects to its sub tab
    And the learner clicks on myCourse in left drawer
    And the learner clicks on first course in my Course
    And the learner clicks on quiz tab
    Then the learner should redirected to Quizzes  sub tab

  Scenario: To verify that Discussion tab in specific course redirects to its sub tab
    And the learner clicks on myCourse in left drawer
    And the learner clicks on first course in my Course
    And the learner clicks on discussion tab
    Then the learner should redirected to join discussion sub tab
