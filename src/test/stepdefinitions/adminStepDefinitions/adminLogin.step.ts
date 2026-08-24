import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../../utils/logger";
import { BugFinder } from "../../../world/Bug_Finder";
import loginData from "../../../../test-data/adminLoginData.json";

// ---------------------------------------------------------------------------
// GIVEN
// ---------------------------------------------------------------------------

Given("the admin is on the WaveInit login page", async function (this: BugFinder) {

    logger.info("Navigating to WaveInit login page");
    await this.basepage.navigate();
    logger.info("Admin is on the Signin-Page");

});

// ---------------------------------------------------------------------------
// WHEN
// ---------------------------------------------------------------------------

When("the admin selects the Admin Login option", async function (this: BugFinder) {

    logger.info("Selecting the Admin Login option");
    await this.adminLogin.selectAdminLogin();
    logger.info("Admin Login option selected successfully");

});

When("the admin enters valid admin credentials", async function (this: BugFinder) {

    logger.info(`Entering valid admin credentials for username: ${loginData.validAdmin.username}`);
    await this.adminLogin.enterUsername(loginData.validAdmin.username);
    await this.adminLogin.enterPassword(loginData.validAdmin.password);
    logger.info("Valid admin credentials entered successfully");

});

When("the admin enters {string} as username", async function (this: BugFinder, username: string) {

    logger.info(`Entering username: "${username}"`);
    await this.adminLogin.enterUsername(username);
    logger.info("Username entered successfully");

});

When("the admin enters {string} as password", async function (this: BugFinder, password: string) {

    // Mask password value in logs for security, even in test logs/CI artifacts
    logger.info(`Entering password: "${password ? "*".repeat(password.length) : "(empty)"}"`);
    await this.adminLogin.enterPassword(password);
    logger.info("Password entered successfully");

});

When("the admin clicks the Login button", async function (this: BugFinder) {

    logger.info("Clicking the Login button");
    await this.adminLogin.clickLogin();
    logger.info("Login button clicked successfully");

});

// ---------------------------------------------------------------------------
// THEN
// ---------------------------------------------------------------------------

Then("the admin should be logged in successfully", async function (this: BugFinder) {

    logger.info("Verifying admin logged in successfully");
    await this.adminLogin.verifySuccessfulLogin();
    logger.info("Admin logged in successfully - verification passed");

});

Then("the admin should be redirected to the Admin Dashboard", async function (this: BugFinder) {

    logger.info("Verifying admin redirected to the Admin Dashboard");
    await this.adminLogin.verifyAdminDashboard();
    logger.info("Admin successfully redirected to the Admin Dashboard");

});

Then("the admin should not be logged in", async function (this: BugFinder) {

    logger.info("Verifying admin remains on the login page");
    await this.adminLogin.verifyLoginPage();
    logger.info("Confirmed admin is not logged in");

});

Then("the admin should see {string}", async function (this: BugFinder, expectedMessage: string) {

    logger.info(`Verifying expected message: "${expectedMessage}"`);

    // Native browser "required" validation messages (e.g. Chrome's
    // "Please fill out this field.") are NOT part of the DOM/accessibility
    // tree, so they can't be found via getByText(). They must be read from
    // the input element's validationMessage property instead.
    if (expectedMessage === "Please fill out this field.") {

        logger.info("Detected native HTML required-field validation message, resolving empty field");
        const emptyField = await this.adminLogin.getEmptyRequiredField();

        logger.info("Verifying native validation message on the empty field");
        await this.adminLogin.verifyRequiredFieldMessage(emptyField);

    } else {

        logger.info("Verifying custom error message in DOM");
        await this.adminLogin.verifyErrorMessage(expectedMessage);

    }

    logger.info(`Expected message "${expectedMessage}" verified successfully`);

});