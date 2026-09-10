import { LearnerDashBoardPage } from "./../../pages/learnerPages/learnerdashboardpage";
import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { expect } from "playwright/test";
import { logger } from "../../../utils/logger";
import skills from "../../../../test-data/learnerData.json";
import searchData from "../../../../test-data/learnerData.json";
import learnerData from "../../../../test-data/learnerData.json";
import { time } from "console";
import { readLearnerProjectData, LearnerProjectData } from "../../../utils/csvReader";
import path from "node:path";

let uniqueSkillName: string;
let firstSuggestSkill: string;
let firstSkillName: string | null;
let data: { companyName: string; role: string; employeeType: string; location: string; startDate: string; endDate: string; description: string };
let companyNamesLength: number;
let projectData: LearnerProjectData;
let educationData: { institute: string; degree: string; fieldOfStudy: string; yearRange: string; cgpa: string };
let educationCountBeforeDelete: number;
let editedEducationData: { institute: string; degree: string };
let aboutMeDetails: string;
let certificationTitle: string;
let certificationCountBeforeDelete: number;
let resumeFixture = "dummy-resume.pdf";

const profileTestDataPath = (fileName: string) => path.resolve(process.cwd(), "test-data", fileName);
When('the learner clicks on profile Button', async function (this: BugFinder) {
    logger.info("Clicking on profile button");
    await this.learnerdashboardpage.clickProfileButton();
    logger.info("Profile button clicked successfully");
});

Then('the learner should redirected to his Profile page', async function (this: BugFinder) {
    logger.info("Verifying learner is redirected to Profile page");
    const actual = await this.profilepage.getLearnerName();
    logger.info("Learner name displayed on Profile page: " + actual);
    expect(actual).toContain(searchData.searchData[0].valid);
    logger.info("Profile page validation successful");
});

When('the learner clicks on addSkill Button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on addSkill button in Profile page");
    await this.profilepage.clickAddSkillButton();
    logger.info("AddSkill button clicked successfully");
});

When('the learner enters the skill name in the skill text box', async function (this: BugFinder) {
    const skillName = skills.skills[0].skillName;
    logger.info("Entering skill name in skill text box: " + skillName);

    const timestamp = new Date().getTime().toString();
    uniqueSkillName = `${skillName}-${timestamp}`;

    await this.profilepage.enterSkillName(uniqueSkillName);
    logger.info("Skill name entered successfully: " + uniqueSkillName);
});

When('the learner clicks on add skill confirm button', async function (this: BugFinder) {
    logger.info("Clicking on add skill confirm button");
    await this.profilepage.clickAddSkillConfirmButton();
    logger.info("Add skill confirm button clicked successfully");
});

Then('the skill should be added successfully in the profile page', async function (this: BugFinder) {
    logger.info("Verifying skill is added successfully in profile page");

    const allSkills = await this.profilepage.getAllSkills();
    logger.info("Skills added in profile page: " + allSkills.join(', '));

    expect(allSkills).toContain(uniqueSkillName);

    logger.info("Skill addition verification successful");
});
When('the learner clicks on suggested skills addskill popup', async function (this: BugFinder) {
    firstSuggestSkill = await this.profilepage.getFirstSuggestSkillName();
    firstSuggestSkill = firstSuggestSkill.replace('+ ', '');
    logger.info("First suggested skill name: " + firstSuggestSkill);
    logger.info("Clicking on suggested skills addskill popup");
    await this.profilepage.clickFirstSuggestedSkillAddButton();
    logger.info("Suggested skills addskill popup clicked successfully");
});
Then('the suggested skill should be added successfully in the profile page', async function (this: BugFinder) {
    logger.info("Verifying suggested skill is added successfully in profile page");
    const allSkills = await this.profilepage.getAllSkills();
    logger.info("Skills added in profile page: " + allSkills.join(', '));
    expect(allSkills).toContain(firstSuggestSkill);
    logger.info("Suggested skill addition verification successful");
});
When('the learner enters the existing skill name in the skill text box', async function (this: BugFinder) {
    const existingSkillName = skills.skills[0].skillName;
    logger.info("Entering existing skill name in skill text box: " + existingSkillName);
    await this.profilepage.enterSkillName(existingSkillName);
    logger.info("Existing skill name entered successfully: " + existingSkillName);
});
Then('the existing skill warning message should be displayed', async function (this: BugFinder) {
    logger.info("Verifying existing skill warning message is displayed");
    const warningMessage = await this.profilepage.getExistingSkillWarningMsg();
    logger.info("Displayed warning message: " + warningMessage);
    expect(warningMessage).toContain(skills.skills[0].existSkillWarningMsg);
    logger.info("Existing skill warning message verification successful");
});
When('the learner clicks on delete first skill button in Profile page', async function (this: BugFinder) {
    firstSkillName = await this.profilepage.getFirstSkillName();
    logger.info("First skill name to be deleted: " + firstSkillName);
    logger.info("Clicking on delete first skill button in Profile page");
    await this.profilepage.clickFirstSkillDeleteButton();
    logger.info("Delete first skill button clicked successfully");
});
When('the learner clicks on delete skill confirm button', async function (this: BugFinder) {
    logger.info("Clicking on delete skill confirm button");
    await this.profilepage.clickDeleteSkillConfirmButton();
    logger.info("Delete skill confirm button clicked successfully");
});

Then('the skill should be deleted successfully from the profile page', async function (this: BugFinder) {
    logger.info("Verifying skill is deleted successfully from profile page");
    const allSkills = await this.profilepage.getAllSkills();
    logger.info("Skills remaining in profile page after deletion: " + allSkills.join(', '));
    expect(allSkills).not.toContain(firstSkillName);
    logger.info("Skill deletion verification successful");
});
When('the learner clicks on view detailed analytics Button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on view detailed analytics button in Profile page");
    await this.profilepage.clickViewDetailedAnalyticsButton();
    logger.info("View detailed analytics button clicked successfully");
});
Then('the learner should redirected to dashBoardPage', async function (this: BugFinder) {
    logger.info("Verifying learner is redirected to dashboard page");
    const dashboardTitle = await this.learnerdashboardpage.getDashBoardTitlePara();
    logger.info("Displayed dashboard title: " + dashboardTitle);
    expect(dashboardTitle).toContain("Here's an overview of your training activities.");
    logger.info("Learner redirection verification successful");
});
When('the learner clicks on Experience Button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on Experience button in Profile page");
    await this.profilepage.clickExperienceButton();
    logger.info("Experience button clicked successfully");
});
When('the lerner fill the experience details in the experience form', async function (this: BugFinder, dataTable: any) {
    data = dataTable.rowsHash();
    logger.info("Filling experience details in the experience form");
    await this.profilepage.fillExperienceDetails(data.companyName, data.role, data.employeeType, data.location, data.startDate, data.endDate, data.description);
    logger.info("Experience details filled successfully");
});
When('click on add Experience confirm button', async function (this: BugFinder) {
    logger.info("Clicking on add Experience confirm button");
    await this.profilepage.clickAddExperienceConfirmButton();
    logger.info("Add Experience confirm button clicked successfully");
});
Then('the experiance should be displayed in experiance tab in profile page', async function (this: BugFinder) {
    logger.info("Verifying experience is displayed in experience tab in profile page");
    const allCompanyNames = await this.profilepage.getAllCompanyNames();
    logger.info("Experiences displayed in profile page: " + allCompanyNames.join(', '));
    expect(allCompanyNames).toContain(`${data.companyName} • ${data.location}`);
    logger.info("Experience display verification successful");
});
When('the learner clicks on delete experience button in profile page', async function (this: BugFinder) {
    companyNamesLength = (await this.profilepage.getAllCompanyNames()).length;
    logger.info("Clicking on delete experience button in profile page");
    await this.profilepage.clickDeleteExperienceButton();
    logger.info("Delete experience button clicked successfully");
});
When('the learner clicks on delete experience confirm button', async function (this: BugFinder) {
    logger.info("Clicking on delete experience confirm button");
    await this.profilepage.clickDeleteConfirmButton();
    logger.info("Delete experience confirm button clicked successfully");
});
Then('the experience should be deleted from experience tab in profile page', async function (this: BugFinder) {
    logger.info("Verifying experience is deleted from experience tab in profile page");
    const currenCompaniesCount = (await this.profilepage.getAllCompanyNames()).length;
    expect(currenCompaniesCount).toBe(companyNamesLength - 1);
    logger.info("Experience deletion verification successful");
});
When('the lerner fill the experience details in the experience form without the Company Name field', async function (this: BugFinder, dataTable) {
    data = dataTable.rowsHash();
    logger.info("Filling experience details in the experience form without the Company Name field");
    await this.profilepage.fillExperienceDetails("", data.role, data.employeeType, data.location, data.startDate, data.endDate, data.description);
    logger.info("Experience details filled successfully without the Company Name field");
});
Then('the warning message should be displayed for the empty field of company name in the experience form', async function (this: BugFinder) {
    logger.info("Verifying warning message is displayed for the empty field of company name in the experience form");
    const warningMessage = await this.profilepage.getCompanyInputWarningMsg();
    logger.info("Displayed warning message: " + warningMessage);
    expect(warningMessage).toContain(skills.experience[0].companyInputWarningMsg);
    logger.info("Warning message verification for empty company name field successful");
});
When('the lerner fill the experience details in the experience form without the Role \\/ Title field', async function (this: BugFinder, dataTable) {
    data = dataTable.rowsHash();
    logger.info("Filling experience details in the experience form without the Role / Title field");
    await this.profilepage.fillExperienceDetails(data.companyName, "", data.employeeType, data.location, data.startDate, data.endDate, data.description);
    logger.info("Experience details filled successfully without the Role / Title field");
});
Then('the warning message should be displayed for the empty field of role in the experience form', async function (this: BugFinder) {
    const warningMessage = await this.profilepage.getRoleInputWarningMsg();
    logger.info("Displayed warning message: " + warningMessage);
    expect(warningMessage).toContain(skills.experience[0].roleInputWarningMsg);
    logger.info("Warning message verification for empty Role / Title field successful");
});
When('the lerner fill the experience details in the experience form for currently working learner', async function (this: BugFinder, dataTable) {
    data = dataTable.rowsHash();
    logger.info("Filling experience details in the experience form for currently working learner");
    await this.profilepage.fillExperienceDetailsCW(data.companyName, data.role, data.employeeType, data.location, data.startDate, data.endDate, data.description);
    logger.info("Experience details filled successfully for currently working learner");
});
When('the learner clicks on currently working checkbox in the experience form', async function (this: BugFinder) {
    await this.profilepage.clickCurrentlyWorkingCheckbox();
});

Then('the experience should be displayed in experiance tab in profile page', async function (this: BugFinder) {
    const allCompanyNames = await this.profilepage.getAllCompanyNames();
    logger.info("Experiences displayed in profile page: " + allCompanyNames.join(', '));
    expect(allCompanyNames).toContain(`${data.companyName} • ${data.location}`);
    logger.info("Experience display verification successful");
});

When('the learner clicks on first edit experience button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on the first edit experience button in Profile page");
    await this.profilepage.clickFirstEditExperienceButton();
    logger.info("First edit experience button clicked successfully");
});

When('the learner edit the Role field in the experience form', async function (this: BugFinder, dataTable) {
    const roleData = dataTable.rowsHash();
    logger.info(`Appending "${roleData.role}" to the Role field in the experience form`);
    await this.profilepage.editExperienceRole(roleData.role);
    logger.info("Role field edited successfully");
});

When('the learner clicks on Save Changes Button in the experience form', async function (this: BugFinder) {
    logger.info("Clicking on Save Changes button in the experience form");
    await this.profilepage.clickSaveChangesButton();
    logger.info("Save Changes button clicked successfully");
});

Then('the experience should be updated successfully in experiance tab in profile page', async function (this: BugFinder) {
    logger.info("Verifying the updated experience is displayed in the profile page");
    const allExperienceDetails = await this.profilepage.getAllExperienceDetails();
    logger.info("Experience details displayed in profile page: " + allExperienceDetails.join(', '));
    expect(allExperienceDetails.join(' ')).toContain("_Edited");
    logger.info("Updated experience validation successful");
});

When('the learner clicks on Project Button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on Project button in Profile page");
    await this.profilepage.clickProjectButton();
    logger.info("Project button clicked successfully");
});

When('the lerner fill the project details in the project form', async function (this: BugFinder) {
    projectData = readLearnerProjectData();
    logger.info(`Filling project form for project: ${projectData.projectTitle}`);
    await this.profilepage.fillProjectDetails(
        projectData.projectTitle,
        projectData.technologies,
        projectData.githubUrl,
        projectData.liveDemoUrl,
        projectData.description,
    );
    logger.info("Project details filled successfully");
});

When('the lerner fill the project details in the project form without title field', async function (this: BugFinder) {
    projectData = readLearnerProjectData();
    logger.info("Filling project form without the project title");
    await this.profilepage.fillProjectDetails(
        "",
        projectData.technologies,
        projectData.githubUrl,
        projectData.liveDemoUrl,
        projectData.description,
    );
    logger.info("Project details filled successfully without the project title");
});

When('click on add Project confirm button', async function (this: BugFinder) {
    logger.info("Clicking on Add Project confirm button");
    await this.profilepage.clickAddProjectConfirmButton();
    logger.info("Add Project confirm button clicked successfully");
});

Then('the project should be displayed in project tab in profile page', async function (this: BugFinder) {
    logger.info("Verifying the project is displayed in the project tab");
    const displayedProjectTitle = await this.profilepage.getProjectTitle(projectData.projectTitle);
    logger.info("Project title displayed in profile page: " + displayedProjectTitle);
    expect(displayedProjectTitle).toContain(projectData.projectTitle);
    logger.info("Project display validation successful");
});

Then('the warning message should be displayed for the empty field of title in the project form', async function (this: BugFinder) {
    logger.info("Verifying the warning message for the empty project title");
    const warningMessage = await this.profilepage.getProjectTitleWarningMessage();
    logger.info("Displayed project title warning message: " + warningMessage);
    expect(warningMessage).toContain(projectData.projectTitleWarningMessage);
    logger.info("Project title warning validation successful");
});

When('the learner clicks on Add Education Button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on Add Education button in Profile page");
    await this.profilepage.clickAddEducationButton();
    logger.info("Add Education button clicked successfully");
});

When('the lerner fill the education details in the education form', async function (this: BugFinder, dataTable) {
    educationData = dataTable.rowsHash();
    logger.info(`Filling education form for institute: ${educationData.institute}`);
    await this.profilepage.fillEducationDetails(
        educationData.institute,
        educationData.degree,
        educationData.fieldOfStudy,
        educationData.yearRange,
        educationData.cgpa,
    );
    logger.info("Education details filled successfully");
});

When('the lerner fill the education details in the education form without Institute field', async function (this: BugFinder, dataTable) {
    const formData = dataTable.rowsHash();
    logger.info("Filling education form without the institute field");
    await this.profilepage.fillEducationDetails(
        "",
        formData.degree,
        formData.fieldOfStudy,
        formData.yearRange,
        formData.cgpa,
    );
    logger.info("Education details filled successfully without the institute field");
});

When('the lerner fill the education details in the education form without Degree field', async function (this: BugFinder, dataTable) {
    const formData = dataTable.rowsHash();
    logger.info("Filling education form without the degree field");
    await this.profilepage.fillEducationDetails(
        formData.institute,
        "",
        formData.fieldOfStudy,
        formData.yearRange,
        formData.cgpa,
    );
    logger.info("Education details filled successfully without the degree field");
});

When('click on add Education confirm button', async function (this: BugFinder) {
    logger.info("Clicking on Add Education confirm button");
    await this.profilepage.clickAddEducationConfirmButton();
    logger.info("Add Education confirm button clicked successfully");
});

Then('the education should be displayed in education tab in profile page', async function (this: BugFinder) {
    logger.info("Verifying the education is displayed in the education tab");
    const displayedInstitute = await this.profilepage.getEducationDetails(educationData.institute);
    logger.info("Institute displayed in profile page: " + displayedInstitute);
    expect(displayedInstitute).toContain(educationData.institute);
    logger.info("Education display validation successful");
});

Then('the warning message should be displayed for the empty field of Institute in the education form', async function (this: BugFinder) {
    logger.info("Verifying the warning message for the empty institute field");
    const warningMessage = await this.profilepage.getInstituteInputWarningMsg();
    logger.info("Displayed institute warning message: " + warningMessage);
    expect(warningMessage).toContain(learnerData.education[0].instituteInputWarningMsg);
    logger.info("Institute warning validation successful");
});

Then('the warning message should be displayed for the empty field of Degree in the education form', async function (this: BugFinder) {
    logger.info("Verifying the warning message for the empty degree field");
    const warningMessage = await this.profilepage.getDegreeInputWarningMsg();
    logger.info("Displayed degree warning message: " + warningMessage);
    expect(warningMessage).toContain(learnerData.education[0].degreeInputWarningMsg);
    logger.info("Degree warning validation successful");
});

When("the learner clicks on Add Certification Button in Profile page", async function (this: BugFinder) {
    logger.info("Clicking on Add Certification button in Profile page");
    await this.profilepage.clickAddCertificationButton();
    logger.info("Add Certification form opened successfully");
});

When("the learner fills the certification details in the certification form", async function (this: BugFinder, dataTable: any) {
    const certificationData = dataTable.rowsHash();
    certificationTitle = certificationData.title;
    logger.info(`Filling certification form for title: ${certificationData.title}`);
    await this.profilepage.fillCertificationDetails(
        certificationData.title,
        certificationData.issuer,
        certificationData.credentialId,
        certificationData.issueDate,
        certificationData.expiryDate,
        certificationData.verificationUrl,
    );
    logger.info("Certification details entered successfully");
});

When("the learner fills the certification details without the title field", async function (this: BugFinder, dataTable: any) {
    const certificationData = dataTable.rowsHash();
    certificationTitle = "";
    logger.info("Filling certification form without the certificate title");
    await this.profilepage.fillCertificationDetails(
        "",
        certificationData.issuer,
        certificationData.credentialId,
        certificationData.issueDate,
        certificationData.expiryDate,
        certificationData.verificationUrl,
    );
    logger.info("Certification details entered without the certificate title");
});

When("the learner uploads the dummy certificate", async function (this: BugFinder) {
    const certificatePath = profileTestDataPath("dummy-certificate.pdf");
    logger.info(`Uploading dummy certificate from: ${certificatePath}`);
    await this.profilepage.uploadCertificate(certificatePath);
    logger.info("Dummy certificate selected successfully");
});

When("the learner clicks on Add Certificate confirm button", async function (this: BugFinder) {
    logger.info("Clicking on Add Certificate confirm button");
    await this.profilepage.clickAddCertificateConfirmButton();
    logger.info("Add Certificate confirm button clicked successfully");
});

Then("the certification should be displayed in certifications tab in profile page", async function (this: BugFinder) {
    logger.info(`Verifying certification is displayed: ${certificationTitle}`);
    await expect.poll(() => this.profilepage.isCertificationDisplayed(certificationTitle)).toBe(true);
    logger.info("Certification display validation successful");
});

Then("the warning message should be displayed for the empty field of certification title", async function (this: BugFinder) {
    logger.info("Verifying certification title required warning message");
    const warningMessage = await this.profilepage.getCertificateTitleWarningMessage();
    logger.info(`Displayed certification warning message: ${warningMessage}`);
    expect(warningMessage).toContain("Certificate title is required.");
    logger.info("Certification title warning validation successful");
});

When("the learner clicks on first edit certification button in Profile page", async function (this: BugFinder) {
    logger.info("Clicking on the first Edit Certification button");
    await this.profilepage.clickFirstEditCertificationButton();
    logger.info("Edit Certification form opened successfully");
});

When("the learner clicks on first delete certification button in Profile page", async function (this: BugFinder) {
    certificationCountBeforeDelete = await this.profilepage.getCertificationCount();
    logger.info(`Certification count before deletion: ${certificationCountBeforeDelete}`);
    logger.info("Clicking on the first Delete Certification button");
    await this.profilepage.clickFirstDeleteCertificationButton();
    logger.info("Certification delete confirmation opened successfully");
});

When("the learner clicks on delete certification confirm button", async function (this: BugFinder) {
    logger.info("Clicking on Delete Certification confirm button");
    await this.profilepage.clickDeleteConfirmButton();
    logger.info("Certification deletion confirmed successfully");
});

Then("the certification should be deleted from certifications tab in profile page", async function (this: BugFinder) {
    logger.info("Verifying the certification is deleted from the certifications tab");
    const certificationCountAfterDelete = await this.profilepage.getCertificationCount();
    logger.info(`Certification count after deletion: ${certificationCountAfterDelete}`);
    expect(certificationCountAfterDelete).toBe(certificationCountBeforeDelete - 1);
    logger.info("Certification deletion validation successful");
});

When("the learner clicks on Upload Resume Button in Profile page", async function (this: BugFinder) {

    logger.info("Clicking on Upload Resume button in Profile page");

    try {
        await this.profilepage.clickAddResumeButton();
        logger.info("Resume upload form opened successfully");



    } catch (error) {
        await this.profilepage.clickUpdateResumeButton();
        logger.info("Update Resume button clicked successfully");
    }

});

When("the learner uploads the dummy resume", async function (this: BugFinder) {
    resumeFixture = "dummy-resume.pdf";
    const resumePath = profileTestDataPath(resumeFixture);
    logger.info(`Uploading dummy resume from: ${resumePath}`);
    await this.profilepage.uploadResume(resumePath);
    logger.info("Dummy resume selected successfully");
});

When("the learner uploads the replacement dummy resume", async function (this: BugFinder) {
    resumeFixture = "dummy-resume-v2.pdf";
    const resumePath = profileTestDataPath(resumeFixture);
    logger.info(`Uploading replacement resume from: ${resumePath}`);
    await this.profilepage.uploadResume(resumePath);
    logger.info("Replacement resume selected successfully");
});

When("the learner clicks on Upload Resume confirm button", async function (this: BugFinder) {
    logger.info("Clicking on Upload Resume confirm button");
    await this.profilepage.clickUploadResumeConfirmButton();
    logger.info("Resume upload confirmed successfully");
});

When("the learner clicks on delete resume button in Profile page", async function (this: BugFinder) {
    logger.info("Clicking on Delete Resume button in Profile page");
    await this.profilepage.clickDeleteResumeButton();
    logger.info("Resume delete confirmation opened successfully");
});

When("the learner clicks on delete resume confirm button", async function (this: BugFinder) {
    logger.info("Clicking on Delete Resume confirm button");
    await this.profilepage.clickDeleteConfirmButton();
    logger.info("Resume deletion confirmed successfully");
});

Then("the resume should be uploaded in resume tab in profile page", async function (this: BugFinder) {
    logger.info(`Verifying resume is displayed: ${resumeFixture}`);
    await expect.poll(() => this.profilepage.isResumeDisplayed(resumeFixture)).toBe(true);
    logger.info("Resume upload validation successful");
});

Then("the resume empty state should be displayed in profile page", async function (this: BugFinder) {
    logger.info("Verifying resume empty state");
    expect(await this.profilepage.isResumeEmpty()).toBe(true);
    logger.info("Resume empty-state validation successful");
});

When('the learner clicks on delete first education button in Profile page', async function (this: BugFinder) {
    await this.profilepage.waitForEducationCards();
    educationCountBeforeDelete = await this.profilepage.getEducationCount();
    logger.info(`Education count before deletion: ${educationCountBeforeDelete}`);
    logger.info("Clicking on the first delete education button in Profile page");
    await this.profilepage.clickDeleteFirstEducationButton();
    logger.info("First delete education button clicked successfully");
});

When('the learner clicks on delete education confirm button', async function (this: BugFinder) {
    logger.info("Clicking on delete education confirm button");
    await this.profilepage.clickDeleteEducationConfirmButton();
    logger.info("Delete education confirm button clicked successfully");
});

Then('the education should be deleted from education tab in profile page', async function (this: BugFinder) {
    logger.info("Verifying the education is deleted from the education tab");
    const expectedEducationCount = educationCountBeforeDelete - 1;
    await this.profilepage.waitForEducationCount(expectedEducationCount);
    const educationCountAfterDelete = await this.profilepage.getEducationCount();
    logger.info(`Education count after deletion: ${educationCountAfterDelete}`);
    expect(educationCountAfterDelete).toBe(expectedEducationCount);
    logger.info("Education deletion validation successful");
});

When('the learner clicks on first edit education button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on the first edit education button in Profile page");
    await this.profilepage.clickFirstEditEducationButton();
    logger.info("First edit education button clicked successfully");
});

When('the learner edit the Institute and Degree field in the education form', async function (this: BugFinder, dataTable) {
    editedEducationData = dataTable.rowsHash();
    logger.info(`Editing institute to "${editedEducationData.institute}" and degree to "${editedEducationData.degree}"`);
    await this.profilepage.editEducationInstituteAndDegree(
        editedEducationData.institute,
        editedEducationData.degree,
    );
    logger.info("Institute and degree fields edited successfully");
});

When('the learner clicks on Save Changes Button in the education form', async function (this: BugFinder) {
    logger.info("Clicking on Save Changes button in the education form");
    await this.profilepage.clickSaveChangesButton();
    logger.info("Save Changes button clicked successfully");
});

Then('the education should be updated successfully in education tab in profile page', async function (this: BugFinder) {
    logger.info("Verifying the updated education is displayed in the education tab");
    const displayedInstitute = await this.profilepage.getEducationDetails(editedEducationData.institute);
    const displayedDegree = await this.profilepage.getEducationDetails(editedEducationData.degree);
    logger.info(`Updated education displayed: ${displayedInstitute}, ${displayedDegree}`);
    expect(displayedInstitute).toContain(editedEducationData.institute);
    expect(displayedDegree).toContain(editedEducationData.degree);
    logger.info("Updated education validation successful");
});

When('the learner clicks on edit About Me Button in Profile page', async function (this: BugFinder) {
    logger.info("Clicking on edit About Me button in Profile page");
    await this.profilepage.clickEditAboutMeButton();
    logger.info("Edit About Me button clicked successfully");
});

When('the learner enters the About Me details in the About Me text area', async function (this: BugFinder) {
    aboutMeDetails = "I am a dedicated learner passionate about continuous professional growth.";
    logger.info("Entering About Me details in the text area");
    await this.profilepage.fillAboutMeDetails(aboutMeDetails);
    logger.info("About Me details entered successfully");
});

When('the learner clicks on Save Changes Button in the About Me section', async function (this: BugFinder) {
    logger.info("Clicking on Save Changes button in the About Me section");
    await this.profilepage.clickSaveChangesButton();
    logger.info("Save Changes button clicked successfully");
});

Then('the About Me details should be updated successfully in the profile page', async function (this: BugFinder) {
    logger.info("Verifying the updated About Me details in the profile page");
    const displayedAboutMeDetails = await this.profilepage.waitForAboutMeDetails(aboutMeDetails);
    logger.info("Displayed About Me details: " + displayedAboutMeDetails);
    expect(displayedAboutMeDetails).toContain(aboutMeDetails);
    logger.info("About Me details validation successful");
});

When('the learner clicks on back to dashboard button in the profile page', async function (this: BugFinder) {
    logger.info("Clicking on Back to Dashboard button in the Profile page");
    await this.profilepage.clickBackToDashboardButton();
    logger.info("Back to Dashboard button clicked successfully");
});

Then('the learner should be redirected to the dashboard page', async function (this: BugFinder) {
    logger.info("Verifying learner is redirected to the dashboard page");
    const dashboardStatus = await this.learnerdashboardpage.getLearnerDashboardSuccessText();
    logger.info("Dashboard status displayed: " + dashboardStatus);
    expect(dashboardStatus).toContain("· Online");
    logger.info("Dashboard redirection validation successful");
});