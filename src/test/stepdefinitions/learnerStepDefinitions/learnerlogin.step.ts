import { Given, Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../../world/Bug_Finder";
import loginData from "../../../../test-data/learnerData.json";
import { expect } from "@playwright/test";
import { logger } from "../../../utils/logger";

Given("the learner is in sign-in page", async function (this: BugFinder) {
    logger.info("Navigating to the sign-in page");
    await this.basepage.navigate();
    logger.info("Successfully navigated to the sign-in page");
});
When("the learner clicks on learner Button", async function (this: BugFinder) {
    logger.info("Clicking on Learner button");
    await this.signinpage.clickLearnerButton();
    logger.info("Learner button clicked successfully");
});
When("the learner enters the valid username", async function (this: BugFinder) {
    const email = loginData.loginData[0].email;
    logger.info(`Entering learner email: ${email}`);
    await this.signinpage.enterLearnerEmail(email);
    logger.info("Learner email entered successfully");
});
When("the learner enters the valid password", async function (this: BugFinder) {
    const password = loginData.loginData[0].password;
    logger.info("Entering learner password");
    await this.signinpage.enterLearnerPassword(password);
    logger.info("Learner password entered successfully");
});
When("the learner clicks on sign-in as learner Button", async function (this: BugFinder) {
    logger.info("Clicking Sign-in as Learner button");
    await this.signinpage.clickLearnerSigInbutton();
    logger.info("Sign-in as Learner button clicked successfully");
});
Then("the learner should be successfully signed-in to the dashboard", async function (this: BugFinder) {
    const expected = loginData.loginData[0].successMsg;
    logger.info(`Validating learner dashboard success message. Expected: ${expected}`);
    const actual = await this.learnerdashboardpage.getLearnerDashboardSuccessText();
    logger.info(`Actual learner dashboard text: ${actual}`);
    expect(actual).toContain(expected);
    logger.info("Learner successfully signed in and dashboard validation passed");
});
When('the learner enter the username as {string}', async function (this: BugFinder, email) {
    logger.info(`Entering learner username: ${email}`);
    await this.signinpage.enterLearnerEmail(email);
    logger.info("Learner username entered successfully");
});
When('the learner enter the password as {string}', async function (this: BugFinder, password) {
    logger.info("Entering learner password");
    await this.signinpage.enterLearnerPassword(password);
    logger.info("Learner password entered successfully");
});
Then('the learner should be displayed with an error message as {string}', async function (this: BugFinder, invalidLoginMessage) {
    logger.info(`Validating invalid login error message. Expected: ${invalidLoginMessage}`);
    const actual = await this.signinpage.getLearnersInvalidLoginMsg();
    logger.info(`Actual invalid login error message: ${actual}`);
    expect(actual).toBe(invalidLoginMessage);
    logger.info("Invalid login error message validation passed");
});
Then('the learner should see a warning message as {string}', async function (this: BugFinder, warningMessage) {
    const actual = await this.signinpage.getLearnerValidationMessage();
    logger.info(`Actual warning message: ${actual}`);
    expect(actual).toBe(warningMessage);
    logger.info("Warning message validation passed");
});