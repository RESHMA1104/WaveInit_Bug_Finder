@Rishwanth 
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


Scenario:To verify whether add experience functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on Experience Button in Profile page
  And the lerner fill the experience details in the experience form
  |companyName|Rishwa|
  |role|Tester|
  |employeeType|SELF_EMPLOYED|
  |location|Bangalore|
  |startDate|2026-09-07|
  |endDate|2026-10-07|
  |description|Tester at Rishwa|
  And click on add Experience confirm button 
  Then the experiance should be displayed in experiance tab in profile page


  Scenario:To verify whether delete experience functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on delete experience button in profile page
  And the learner clicks on delete experience confirm button
  Then the experience should be deleted from experience tab in profile page

  Scenario:To verify whether the experience form accept on leaveing the Company Name fields empty and display the warning message
  And the learner clicks on profile Button
  And the learner clicks on Experience Button in Profile page
  And the lerner fill the experience details in the experience form without the Company Name field
  |companyName||
  |role|Developer|
  |employeeType|SELF_EMPLOYED|
  |location|Mumbai|
  |startDate|2026-09-07|
  |endDate|2026-10-07|
  |description|Developer at Adhi|
  And click on add Experience confirm button 
  Then the warning message should be displayed for the empty field of company name in the experience form

  Scenario:To verify whether the experience form accept on leaveing the Role / Title fields empty and display the warning message
  And the learner clicks on profile Button
  And the learner clicks on Experience Button in Profile page
  And the lerner fill the experience details in the experience form without the Role / Title field
  |companyName|Adhi|
  |role||
  |employeeType|SELF_EMPLOYED|
  |location|Mumbai|
  |startDate|2026-09-07|
  |endDate|2026-10-07|
  |description|Developer at Adhi|
  And click on add Experience confirm button 
  Then the warning message should be displayed for the empty field of role in the experience form

   @MyCourse 
  Scenario:To verify whether the add experience functionality for currently working learner
  And the learner clicks on profile Button
  And the learner clicks on Experience Button in Profile page
  And the lerner fill the experience details in the experience form for currently working learner 
  |companyName|Adhi|
  |role|Developer|
  |employeeType|SELF_EMPLOYED|
  |location|Mumbai|
  |startDate|2026-09-07|
  |description|Developer at Adhi|
  And the learner clicks on currently working checkbox in the experience form
  And click on add Experience confirm button 
  Then the experience should be displayed in experiance tab in profile page

