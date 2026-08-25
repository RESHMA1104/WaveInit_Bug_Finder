@Rishwanth
Feature: Rishwanth_Adhishwar_K_25_08_2026 To Check the Course_Enrollment Functionality of an Learner
Description:To check Whether the Functionality of Courses Searching,Enrolling.

  Background:
    Given the learner is in sign-in page
    When the learner clicks on learner Button
    And the learner enters the valid username
    And the learner enters the valid password
    And the learner clicks on sign-in as learner Button

  Scenario: Verify the enrollment of new course
    And the learner clicks on explore Course Button
    And te learner choose open course in filter
    And the learner clicks on join training on listed courses
    Then the learner should displayed with Success message

  Scenario: verify the Search Functionality of valid courses
    And the learner clicks on explore Course Button
    And the learner enter the Course name in Search input field
    Then the learner should be dispalyed with search results matches to searched course name

  Scenario: verify the search Functionality with invalid Courses
    And the learner clicks on explore Course Button
    And the learner enter the invalid course name in search input field
    Then the learner should be displayed with No matches found

  Scenario: verify the filter open shows only unregistered courses
    And the learner clicks on explore Course Button
    And te learner choose open course in filter
    Then the learner should see only courses that are not enrolled

  Scenario: verify the filter open shows only unregistered courses
    And the learner clicks on explore Course Button
    And te learner choose joined course in filter
    Then the learner should see only courses that are enrolled
