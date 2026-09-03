@Rishwanth  @MyCourse 
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
    

  Scenario:To verify whether the addSkills functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on addSkill Button in Profile page
  And the learner enters the skill name in the skill text box
  And the learner clicks on add skill confirm button
  Then the skill should be added successfully in the profile page
  
  Scenario:To verify whether the adding Skills in Suggested skills Functionality
  And the learner clicks on profile Button
  And the learner clicks on addSkill Button in Profile page
  And the learner clicks on suggested skills addskill popup
  And the learner clicks on add skill confirm button
  Then the suggested skill should be added successfully in the profile page

  Scenario:To verify whether the adding existing skills functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on addSkill Button in Profile page
  And the learner enters the existing skill name in the skill text box
  And the learner clicks on add skill confirm button
  Then the existing skill warning message should be displayed


  Scenario:To verify whether the delete Skill functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on delete first skill button in Profile page 
  And the learner clicks on delete skill confirm button
  Then the skill should be deleted successfully from the profile page

  Scenario:To verify whether the view detailed Analytics Button redirects to dashBoardPage
  And the learner clicks on profile Button
  And the learner clicks on view detailed analytics Button in Profile page
  Then the learner should redirected to dashBoardPage
