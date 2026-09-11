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


@MyCourse 
  Scenario:To verify whether the edit experience functionality is working as expected
  And the learner clicks on profile Button  
  And the learner clicks on first edit experience button in Profile page
  And the learner edit the Role field in the experience form
  |role|_Edited| 
  And the learner clicks on Save Changes Button in the experience form
  Then the experience should be updated successfully in experiance tab in profile page

@MyCourse 
  Scenario:To verify whether the Add New Project functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on Project Button in Profile page
  And the lerner fill the project details in the project form
  And click on add Project confirm button 
  Then the project should be displayed in project tab in profile page

@MyCourse 
Scenario:To verify the Adding Education functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on Add Education Button in Profile page
  And the lerner fill the education details in the education form
  |institute|JMHSS|
  |degree|B.Tech|
  |fieldOfStudy|Computer Science|
  |yearRange|2022-2026|
  |cgpa|8.34|
  And click on add Education confirm button 
  Then the education should be displayed in education tab in profile page

@MyCourse 
Scenario:To verify whether the edit Education functionality is working as expected
  And the learner clicks on profile Button  
  And the learner clicks on first edit education button in Profile page
  And the learner edit the Institute and Degree field in the education form
  |institute|JMHSS - Edited|
  |degree|B.Tech - Edited| 
  And the learner clicks on Save Changes Button in the education form
  Then the education should be updated successfully in education tab in profile page 

@MyCourse 
Scenario:To verify whether the delete Education functionality is working as expected
  And the learner clicks on profile Button
  And the learner clicks on delete first education button in Profile page
  And the learner clicks on delete education confirm button
  Then the education should be deleted from education tab in profile page

@MyCourse 
  Scenario:To verify whether the Adding Project without title field in the project form is displaying the warning message
  And the learner clicks on profile Button
  And the learner clicks on Project Button in Profile page
  And the lerner fill the project details in the project form without title field
  And click on add Project confirm button 
  Then the warning message should be displayed for the empty field of title in the project form


@MyCourse 
  Scenario:To verify whether the Adding Education without Institute field in the education form is displaying the warning message
  And the learner clicks on profile Button
  And the learner clicks on Add Education Button in Profile page
  And the lerner fill the education details in the education form without Institute field
  |institute||
  |degree|B.Tech|
  |fieldOfStudy|Computer Science| 
  |yearRange|2022-2026|
  |cgpa|8.34|
  And click on add Education confirm button 
  Then the warning message should be displayed for the empty field of Institute in the education form
@MyCourse 
  Scenario:To verify whether the Adding Education without Degree field in the education form is displaying the warning message
  And the learner clicks on profile Button
  And the learner clicks on Add Education Button in Profile page
  And the lerner fill the education details in the education form without Degree field
  |institute|JMHSS|
  |degree||
  |fieldOfStudy|Computer Science|
  |yearRange|2022-2026|
  |cgpa|8.34|
  And click on add Education confirm button
  Then the warning message should be displayed for the empty field of Degree in the education form

@MyCourse
  Scenario:To verify edit functionality of About Me section in the profile page
  And the learner clicks on profile Button
  And the learner clicks on edit About Me Button in Profile page
  And the learner enters the About Me details in the About Me text area
  And the learner clicks on Save Changes Button in the About Me section
  Then the About Me details should be updated successfully in the profile page

@MyCourse
  Scenario: To verify the back to dashboard button functionality in the profile page
  And the learner clicks on profile Button
  And the learner clicks on back to dashboard button in the profile page
  Then the learner should be redirected to the dashboard page

  @ProfileCertification @ProfileResume
  Scenario: To verify adding a certification with a certificate file
    And the learner clicks on profile Button
    And the learner clicks on Add Certification Button in Profile page
    And the learner fills the certification details in the certification form
      | title            | ISTQB Foundation Level                                      |
      | issuer           | International Software Testing Qualifications Board         |
      | credentialId     | ISTQB-2026-001                                              |
      | issueDate        | 2026-08-15                                                  |
      | expiryDate       | 2028-08-15                                                  |
      | verificationUrl  | https://verify.example.test/ISTQB-2026-001                  |
    And the learner uploads the dummy certificate
    And the learner clicks on Add Certificate confirm button
    Then the certification should be displayed in certifications tab in profile page

  @ProfileCertification @ProfileResume

  Scenario: To verify certification title validation
    And the learner clicks on profile Button
    And the learner clicks on Add Certification Button in Profile page
    And the learner fills the certification details without the title field
      | issuer           | International Software Testing Qualifications Board         |
      | credentialId     | ISTQB-2026-002                                              |
      | issueDate        | 2026-08-15                                                  |
      | expiryDate        | 2028-08-15                                                  |
      | verificationUrl  | https://verify.example.test/ISTQB-2026-002                  |
    And the learner clicks on Add Certificate confirm button
    Then the warning message should be displayed for the empty field of certification title

  @ProfileCertification @ProfileResume

  Scenario: To verify editing a certification
    And the learner clicks on profile Button
    And the learner clicks on Add Certification Button in Profile page
    And the learner fills the certification details in the certification form
      | title            | Certification To Edit                                         |
      | issuer           | Wave Init Testing                                             |
      | credentialId     | EDIT-2026-001                                                  |
      | issueDate        | 2026-08-15                                                     |
      | expiryDate        | 2028-08-15                                                     |
      | verificationUrl  | https://verify.example.test/EDIT-2026-001                      |
    And the learner uploads the dummy certificate
    And the learner clicks on Add Certificate confirm button
    And the learner clicks on first edit certification button in Profile page
    And the learner fills the certification details in the certification form
      | title            | Certification To Edit - Updated                               |
      | issuer           | Wave Init Updated Testing                                      |
      | credentialId     | EDIT-2026-002                                                  |
      | issueDate        | 2026-08-15                                                     |
      | expiryDate       | 2029-08-15                                                     |
      | verificationUrl  | https://verify.example.test/EDIT-2026-002                      |
    And the learner clicks on Save Changes Button in the experience form
    Then the certification should be displayed in certifications tab in profile page

  @ProfileCertification @ProfileResume @DeleteCertification
  Scenario: To verify deleting a certification
    And the learner clicks on profile Button
    And the learner clicks on Add Certification Button in Profile page
    And the learner fills the certification details in the certification form
      | title            | Certification To Delete                                      |
      | issuer           | Wave Init Testing                                             |
      | credentialId     | DELETE-2026-001                                               |
      | issueDate        | 2026-08-15                                                    |
      | expiryDate        | 2028-08-15                                                    |
      | verificationUrl  | https://verify.example.test/DELETE-2026-001                   |
    And the learner uploads the dummy certificate
    And the learner clicks on Add Certificate confirm button
    And the learner clicks on first delete certification button in Profile page
    And the learner clicks on delete certification confirm button
    Then the certification should be deleted from certifications tab in profile page

  @ProfileResume
  Scenario: To verify uploading a resume
    And the learner clicks on profile Button
    And the learner clicks on Upload Resume Button in Profile page
    And the learner uploads the dummy resume
    And the learner clicks on Upload Resume confirm button
    Then the resume should be uploaded in resume tab in profile page

  @ProfileResume
  Scenario: To verify replacing an uploaded resume
    And the learner clicks on profile Button
    And the learner clicks on Upload Resume Button in Profile page
    And the learner uploads the dummy resume
    And the learner clicks on Upload Resume confirm button
    And the learner clicks on Upload Resume Button in Profile page
    And the learner uploads the replacement dummy resume
    And the learner clicks on Upload Resume confirm button
    Then the resume should be uploaded in resume tab in profile page

  @ProfileResume
  Scenario: To verify deleting an uploaded resume
    And the learner clicks on profile Button
    And the learner clicks on Upload Resume Button in Profile page
    And the learner uploads the dummy resume
    And the learner clicks on Upload Resume confirm button
    And the learner clicks on delete resume button in Profile page
    And the learner clicks on delete resume confirm button
    Then the resume empty state should be displayed in profile page