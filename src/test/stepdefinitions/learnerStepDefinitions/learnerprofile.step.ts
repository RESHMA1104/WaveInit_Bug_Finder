import { LearnerDashBoardPage } from "./../../pages/learnerPages/learnerdashboardpage";
import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { expect } from "playwright/test";
import { logger } from "../../../utils/logger";
import searchData from "../../../../test-data/learnerData.json";

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