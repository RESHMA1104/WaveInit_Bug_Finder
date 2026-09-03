@Reshmaa
Feature: Trainer Generates Course Structure via AI Prompt

  Trainers should be able to navigate to My Trainings, open the Course Editor
  for one of their courses, and generate a course structure automatically by
  describing it in a prompt.

  Background:
    Given the trainer is on the WaveInit login page
    And the trainer selects the Trainer Login option
    And the trainer enters valid trainer credentials
    And the trainer clicks the Login button
    And the trainer should be logged in successfully

  Scenario Outline: Trainer generates a course structure from a prompt
    When the trainer navigates to My Trainings
    And the trainer opens the course editor for "<courseTitle>"
    Then the trainer should see the Generate Course Structure page
    When the trainer enters a structure prompt "<prompt>"
    And the trainer clicks the Generate Structure button
    Then the course structure should be generated successfully

    Examples:
      | courseTitle       | prompt                                                                                                                  |
      | React             | Create a complete React course for beginners, from basics to advanced, for 1 month with 2 hours of learning every day.  |