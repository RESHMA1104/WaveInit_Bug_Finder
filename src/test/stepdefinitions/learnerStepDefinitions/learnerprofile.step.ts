import { LearnerDashBoardPage } from "./../../pages/learnerPages/learnerdashboardpage";
import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { expect } from "playwright/test";
import { logger } from "../../../utils/logger";
import skills from "../../../../test-data/learnerData.json";
import searchData from "../../../../test-data/learnerData.json";

let uniqueSkillName: string;
let firstSuggestSkill: string;
let firstSkillName: string | null;

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
