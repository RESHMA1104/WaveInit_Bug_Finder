@Reshma

Feature: Trainer Creates a Quiz Manually

              Trainers should be able to open the AI Quiz tab for a course,
  create a quiz manually with a title and two or more questions, and
  save it as a draft.

        Background:
            Given the trainer is on the WaveInit login page
              And the trainer selects the Trainer Login option
              And the trainer enters valid trainer credentials
              And the trainer clicks the Login button
              And the trainer should be logged in successfully
              And the trainer opens the course editor for "React Fundamental"
              And the trainer navigates to the AI Quiz tab

        Scenario: Trainer creates a manual quiz with two questions and saves as draft
             When the trainer clicks the Create Manually button
              And the trainer enters the quiz title
              And the trainer fills in all quiz questions
              And the trainer clicks the Save as Draft button
             Then the quiz should be saved as a draft