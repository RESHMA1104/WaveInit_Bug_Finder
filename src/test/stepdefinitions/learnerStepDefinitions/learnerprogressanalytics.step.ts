import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { expect } from "playwright/test";
import { logger } from "../../../utils/logger";

When('the learner clicks on progress analytics Button in left drawer', async function (this: BugFinder) {
    logger.info("Clicking on Progress Analytics button in left drawer");
    await this.learnerdashboardpage.clickProgressAnalyticsButton();
    logger.info("Progress Analytics button clicked successfully");
});

Then('the learner should redirected to My Learning progress and Performance page', async function (this: BugFinder) {
    logger.info("Verifying My Learning Progress & Performance page heading");
    const actual = await this.progressanalyticspage.getPAHeading();
    logger.info("Actual page heading: " + actual);
    expect(actual).toContain("My Learning Progress & Performance");
    logger.info("My Learning Progress & Performance page heading verified successfully");
});

When('the learner clciks on refresh Button in Progress Analytics', async function (this: BugFinder) {
    logger.info("Clicking on Refresh button in Progress Analytics");
    await this.progressanalyticspage.clickPARefreshButton();
    logger.info("Progress Analytics Refresh button clicked successfully");
});

Then('the learner should see a message Progress metrices refreshed', async function (this: BugFinder) {
    logger.info("Verifying Progress metrics refreshed success message");
    const actual = await this.progressanalyticspage.getPARefreshSuccessMessage();
    logger.info("Actual refresh message: " + actual);
    expect(actual).toContain("Progress metrics refreshed");
    logger.info("Progress metrics refreshed message verified successfully");
});