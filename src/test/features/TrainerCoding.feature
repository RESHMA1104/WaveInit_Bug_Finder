@Reshma @CodingAssessment
Feature: Trainer Generates Coding Assessment via AI

  Trainers should be able to open the Coding tab for one of their courses,
  launch the AI Coding Wizard, fill in the generation details, and generate
  a coding assessment automatically.

  Background:
    Given the trainer is on the WaveInit login page
    And the trainer selects the Trainer Login option
    And the trainer enters valid trainer credentials
    And the trainer clicks the Login button
    And the trainer should be logged in successfully

  Scenario Outline: Trainer generates a coding assessment using AI
    When the trainer opens the course "<courseTitle>"
    And the trainer navigates to the Coding tab
    And the trainer clicks the Generate with AI button
    Then the trainer should see the AI Coding Wizard
    When the trainer enters a coding topic prompt "<prompt>"
    And the trainer selects "<numberOfProblems>" as the number of problems
    And the trainer selects "<difficulty>" as the difficulty
    And the trainer enters languages "<languages>"
    And the trainer clicks the Generate Assessment button
    Then the coding assessment should be generated successfully

    Examples:
      | courseTitle           | prompt                                                     | numberOfProblems | difficulty | languages           |
      | Rishwa-SDET-c550c908  | JavaScript array methods and Python data structures        | 3 Problems        | Medium     | javascript, python  |