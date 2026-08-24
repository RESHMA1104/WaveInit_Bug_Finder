import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";
import { BugFinder } from "../../world/Bug_Finder"; 
import TrainerLoginData from "../../../test-data/TrainerLoginData.json";

Given("the trainer is on the WaveInit login page", async function (this: BugFinder) {

    logger.info("Navigating to WaveInit login page");
    await this.basepage.navigate();
    logger.info("Trainer is on the Signin-Page");

});

When("the trainer selects the Trainer Login option", async function (this: BugFinder) {

    logger.info("Selecting the Trainer Login option");
    await this.trainerLogin.selectTrainerLogin();
    logger.info("Trainer Login option selected successfully");

});

When("the trainer enters valid trainer credentials", async function (this: BugFinder) {

    logger.info(`Entering valid trainer credentials for username: ${TrainerLoginData.validTrainer.username}`);
    await this.trainerLogin.enterUsername(TrainerLoginData.validTrainer.username);
    await this.trainerLogin.enterPassword(TrainerLoginData.validTrainer.password);
    logger.info("Valid trainer credentials entered successfully");

});

When("the trainer enters {string} as username", async function (this: BugFinder, username: string) {

    logger.info(`Entering username: "${username}"`);
    await this.trainerLogin.enterUsername(username);
    logger.info("Username entered successfully");

});

When("the trainer enters {string} as password", async function (this: BugFinder, password: string) {

    // Mask password value in logs for security, even in test logs/CI artifacts
    logger.info(`Entering password: "${password ? "*".repeat(password.length) : "(empty)"}"`);
    await this.trainerLogin.enterPassword(password);
    logger.info("Password entered successfully");

});

When("the trainer clicks the Login button", async function (this: BugFinder) {

    logger.info("Clicking the Login button");
    await this.trainerLogin.clickLogin();
    logger.info("Login button clicked successfully");

});

Then("the trainer should be logged in successfully", async function (this: BugFinder) {

    logger.info("Verifying trainer logged in successfully");
    await this.trainerLogin.verifySuccessfulLogin();
    logger.info("Trainer logged in successfully - verification passed");

});

Then("the trainer should be redirected to the Trainer Dashboard", async function (this: BugFinder) {

    logger.info("Verifying trainer redirected to the Trainer Dashboard");
    await this.trainerLogin.verifyTrainerDashboard();
    logger.info("Trainer successfully redirected to the Trainer Dashboard");

});

Then("the trainer should not be logged in", async function (this: BugFinder) {

    logger.info("Verifying trainer remains on the login page");
    await this.trainerLogin.verifyLoginPage();
    logger.info("Confirmed trainer is not logged in");

});

Then("the trainer should see {string}", async function (this: BugFinder, expectedMessage: string) {

    logger.info(`Verifying expected message: "${expectedMessage}"`);

    if (expectedMessage === "Please fill out this field.") {

        logger.info("Detected native HTML required-field validation message, resolving empty field");
        const emptyField = await this.trainerLogin.getEmptyRequiredField();

        logger.info("Verifying native validation message on the empty field");
        await this.trainerLogin.verifyRequiredFieldMessage(emptyField);

    } else {

        logger.info("Verifying custom error message in DOM");
        await this.trainerLogin.verifyErrorMessage(expectedMessage);

    }

    logger.info(`Expected message "${expectedMessage}" verified successfully`);

});