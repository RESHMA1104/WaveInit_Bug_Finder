import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { expect } from "playwright/test";
import loginData from "../../../../test-data/learnerLoginData.json";
import { logger } from "../../../utils/logger";

When('the learner clicks on explore Course Button', async function (this: BugFinder) {
    logger.info("Clicking on Explore Course button");
    await this.learnerdashboardpage.clickExploreCourseButton();
    logger.info("Explore Course button clicked successfully");
});
When('te learner choose open course in filter', async function (this: BugFinder) {
    logger.info("Selecting Open course filter");
    await this.exploretrainingpage.clickOpenFilter();
    logger.info("Open course filter selected successfully");
});
When('the learner clicks on join training on listed courses', async function (this: BugFinder) {
    logger.info("Clicking on Join Training button for the listed course");
    await this.exploretrainingpage.clickJoinTrainingButton();
    logger.info("Join Training button clicked successfully");
});
Then('the learner should displayed with Success message', async function (this: BugFinder) {
    logger.info("Verifying course enrollment success message");
    const actual = await this.exploretrainingpage.getCourseEnrollmentSuccessMessage();
    logger.info(`Actual enrollment message: ${actual}`);
    expect(actual).toBe("Enrolled successfully!");
    logger.info("Course enrollment success message verified successfully");
});
When('the learner enter the Course name in Search input field', async function (this: BugFinder) {
    const searchCourseName = loginData.searchData[0].valid;
    logger.info(`Entering course name in Search input field: ${searchCourseName}`);
    await this.exploretrainingpage.enterSearchValue(searchCourseName);
    logger.info(`Course name entered successfully: ${searchCourseName}`);
});
Then('the learner should be dispalyed with search results matches to searched course name', async function (this: BugFinder) {
    const searchCourseName = loginData.searchData[0].valid;
    logger.info(`Verifying search results for course name: ${searchCourseName}`);
    const actualCourseNames = await this.exploretrainingpage.getAllSearchResultCourseName(searchCourseName);
    logger.info(`Total search results found: ${actualCourseNames.length}`);
    let found = false;
    for (const text of actualCourseNames) {
        logger.info(`Search result course name: ${text}`);
        if (text.includes(searchCourseName)) {
            found = true;
            logger.info(`Matching course found: ${text}`);
            break;
        }
    }
    expect(found).toBe(true);
    logger.info(`Search result verification completed for course: ${searchCourseName}`);
});