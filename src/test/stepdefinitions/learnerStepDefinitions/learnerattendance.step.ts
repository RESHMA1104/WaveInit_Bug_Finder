import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { expect } from "playwright/test";
import { logger } from "../../../utils/logger";

When('the learner clicks on Attendence Button in left drawer', async function (this: BugFinder) {
    logger.info("Clicking on Attendance button in left drawer");
    await this.learnerdashboardpage.clickAttendenceButton();
    logger.info("Attendance button clicked successfully");
});

Then('the learner should redirected to MyAttendence and session page', async function (this: BugFinder) {
    logger.info("Verifying My Attendance & Sessions page heading");
    const actual = await this.attendancepage.getAttendancePageHeading();
    logger.info("Actual page heading: " + actual);
    expect(actual).toContain("My Attendance & Sessions");
    logger.info("My Attendance & Sessions page heading verified successfully");
});

When('the learner clciks on refresh Button', async function (this: BugFinder) {
    logger.info("Clicking on Refresh button");
    await this.attendancepage.clickRefreshButton();
    logger.info("Refresh button clicked successfully");
});

Then('the learner should see a message refreshed successfully', async function (this: BugFinder) {
    logger.info("Verifying attendance refresh success message");
    const actual = await this.attendancepage.getRefreshSuccessMessage();
    logger.info("Actual refresh message: " + actual);
    expect(actual).toContain("Attendance records refreshed");
    logger.info("Attendance records refreshed message verified successfully");
});
