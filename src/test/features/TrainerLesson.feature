@Reshma

Feature: Trainer Adds a Module to a Course

              Trainers should be able to open a course's Lessons tab and
  create a new module by providing a title, description, and optional
  summary content.

        Background:
            Given the trainer is on the WaveInit login page
              And the trainer selects the Trainer Login option
              And the trainer enters valid trainer credentials
              And the trainer clicks the Login button
              And the trainer should be logged in successfully
              And the trainer opens the course editor for "React"

        Scenario: Trainer creates a new module with all fields filled
             When the trainer navigates to the Lessons tab
              And the trainer clicks the Add Module button
              And the trainer enters the module title
              And the trainer enters the module description
              And the trainer enters the module summary
              And the trainer clicks the Create Module button
             Then the new module should appear in the Learning Content list

        Scenario: Trainer creates a new module with only the required title
             When the trainer navigates to the Lessons tab
              And the trainer clicks the Add Module button
              And the trainer enters the module title
              And the trainer clicks the Create Module button
             Then the new module should appear in the Learning Content list