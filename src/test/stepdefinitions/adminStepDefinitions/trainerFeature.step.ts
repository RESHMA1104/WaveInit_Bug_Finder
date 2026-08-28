import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../../utils/logger";
import { BugFinder } from "../../../world/Bug_Finder";

// =========================================================
// Navigation
// =========================================================

When('the admin clicks the Trainers link in the left sidebar', async function (this: BugFinder) {
    logger.info("Step: admin clicks the Trainers link in the left sidebar");
    await this.trainerFeature.clickTrainersLink();
});

Then('the application should redirect to the trainer sessions page', async function (this: BugFinder) {
    logger.info("Step: verifying redirect to the trainer sessions page");
    await this.trainerFeature.verifyTrainerPageDisplayed();
});

// =========================================================
// Create Trainer
// =========================================================

When('the admin clicks the Add Trainer button', async function (this: BugFinder) {
    logger.info("Step: admin clicks the Add Trainer button");
    await this.trainerFeature.clickAddTrainerButton();
});

Then('the application should navigate to the Create Trainer page', async function (this: BugFinder) {
    logger.info("Step: verifying navigation to the Create Trainer page");
    await this.trainerFeature.verifyCreateTrainerPageDisplayed();
});

When('the admin enters the fullname {string}, email {string}, and mobile number {string}',
    async function (this: BugFinder, fullname: string, email: string, mobileNumber: string) {
        logger.info(`Step: admin enters fullname "${fullname}", email "${email}", mobile "${mobileNumber}"`);
        await this.trainerFeature.enterTrainerBasicDetails(fullname, email, mobileNumber);
    });

When('the admin selects the department and designation for the new trainer', async function (this: BugFinder) {
    logger.info("Step: admin selects department and designation for the new trainer");
    // NOTE: values hardcoded here since the feature doesn't parameterize them.
    // Swap to a Data Table / {string} args if you want these driven from the feature file.
    await this.trainerFeature.selectDepartmentAndDesignation('Technology', 'Senior Trainer');
});

When('the admin selects the experience for the new trainer', async function (this: BugFinder) {
    logger.info("Step: admin selects experience for the new trainer");
    await this.trainerFeature.selectExperience('Fresher');
});

When('the admin enters a new password {string} and retypes the same password to confirm',
    async function (this: BugFinder, password: string) {
        logger.info("Step: admin enters and confirms new trainer password");
        await this.trainerFeature.enterPasswordAndConfirm(password);
    });

When('the admin clicks the Create Trainer button', async function (this: BugFinder) {
    logger.info("Step: admin clicks the Create Trainer button");
    await this.trainerFeature.clickCreateTrainerButton();
});

// Then('the newly created trainer should be displayed', async function (this: BugFinder) {
//     logger.info("Step: verifying the newly created trainer is displayed in the list");
//     await this.trainerFeature.verifyTrainerCreated();
// });

// =========================================================
// Search / Filter
// =========================================================

When('the admin click the search bar and enters {string}', async function (this: BugFinder, keyword: string) {
    logger.info(`Step: admin searches trainers with keyword "${keyword}"`);
    await this.trainerFeature.searchTrainer(keyword);
});

When('the admin search for {string}', async function (this: BugFinder, keyword: string) {
    logger.info(`Step: admin searches for trainer "${keyword}"`);
    await this.trainerFeature.searchTrainer(keyword);
});

Then('the appropriate trainer details should be displayed', async function (this: BugFinder) {
    logger.info("Step: verifying appropriate trainer details are displayed");
    await this.trainerFeature.verifyTrainerDetailsDisplayed();
});

// =========================================================
// View Trainer Details
// =========================================================

When('the admin click the eye icon', async function (this: BugFinder) {
    logger.info("Step: admin clicks the eye (View Details) icon");
    await this.trainerFeature.clickEyeIcon();
});

Then('the detailed view of the trainer should be visible', async function (this: BugFinder) {
    logger.info("Step: verifying detailed trainer view modal is visible");
    await this.trainerFeature.verifyTrainerProfileVisible();
});

// =========================================================
// Delete Trainer
// =========================================================

When('the admin click the Delete button', async function (this: BugFinder) {
    logger.info("Step: admin clicks the Delete button on trainer row");
    await this.trainerFeature.clickDeleteButton();
});

When('the admin confirms the deletion by clicking the Delete button in the confirmation popup',
    async function (this: BugFinder) {
        logger.info("Step: admin confirms deletion via confirmation popup");
        await this.trainerFeature.confirmDeleteTrainer();
    });

Then('the message {string} should be displayed', async function (this: BugFinder, message: string) {
    logger.info(`Step: verifying popup message "${message}" is displayed`);
    await this.trainerFeature.verifySuccessMessage(message);
});