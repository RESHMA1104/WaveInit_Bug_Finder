@Reshma @InviteParticipants
Feature: Trainer Invites Approved Participants to a Training

  Trainers should be able to open a course's Participants tab, launch the
  Invite Participants dialog, select one or more approved participants,
  and invite them to the training. Test data is sourced from an external
  JSON file rather than inline in the feature file.

  Background:
    Given the trainer is on the WaveInit login page
    And the trainer selects the Trainer Login option
    And the trainer enters valid trainer credentials
    And the trainer clicks the Login button
    And the trainer should be logged in successfully

  Scenario: Trainer invites a specific approved participant
    When the trainer navigates to My Trainings
    And the trainer opens the course for the "specificParticipant" test data
    And the trainer navigates to the Participants tab
    And the trainer clicks the Invite Participants button
    Then the trainer should see the Approved Participants dialog
    When the trainer searches for the participant from the "specificParticipant" test data
    And the trainer selects the participant from the "specificParticipant" test data
    And the trainer clicks the Invite Selected Participants button
    Then the participant should be added successfully

  Scenario: Trainer invites all approved participants at once
    When the trainer navigates to My Trainings
    And the trainer opens the course for the "selectAllParticipants" test data
    And the trainer navigates to the Participants tab
    And the trainer clicks the Invite Participants button
    Then the trainer should see the Approved Participants dialog
    When the trainer clicks the Select All button
    And the trainer clicks the Invite Selected Participants button
    Then the participant should be added successfully

  Scenario: Trainer refreshes the participants list
    When the trainer navigates to My Trainings
    And the trainer opens the course for the "refreshParticipants" test data
    And the trainer navigates to the Participants tab
    And the trainer clicks the Refresh Participants button
    Then the participant list should be refreshed successfully