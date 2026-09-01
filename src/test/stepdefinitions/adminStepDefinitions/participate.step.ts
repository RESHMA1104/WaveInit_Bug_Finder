import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../../utils/logger";
import { BugFinder } from "../../../world/Bug_Finder";

// =========================================================
// Navigation
// =========================================================

When('the admin clicks the Participants link in the left sidebar', async function (this: BugFinder) {
    logger.info("Step: admin clicks the Participants link in the left sidebar");
    await this.participate.clickParticipantsLink();
});

Then('the application should redirect to the Participants page', async function (this: BugFinder) {
    logger.info("Step: verifying redirect to the Participants page");
    await this.participate.verifyParticipantsPageDisplayed();
});

// =========================================================
// Create Participant
// =========================================================

When('the admin clicks the Add Participant button', async function (this: BugFinder) {
    logger.info("Step: admin clicks the Add Participant button");
    await this.participate.clickAddParticipantButton();
});

Then('a popup window {string} should be displayed', async function (this: BugFinder, popupTitle: string) {
    logger.info(`Step: verifying popup window "${popupTitle}" is displayed`);
    await this.participate.verifyAddParticipantPopupDisplayed();
});

When('the admin enters the participant details {string}, {string}, {string} and {string}',
    async function (this: BugFinder, fullname: string, email: string, phone: string, password: string) {
        logger.info(`Step: admin enters participant details - ${fullname}, ${email}, ${phone}`);
        await this.participate.enterParticipantDetails(fullname, email, phone, password);
    });

When('the admin clicks the Save button', async function (this: BugFinder) {
    logger.info("Step: admin clicks the Save button");
    await this.participate.clickSaveButton();
});

Then('the newly created participant should be displayed {string}', async function (this: BugFinder, message: string) {
    logger.info(`Step: verifying newly created participant API response with message "${message}"`);
    await this.participate.verifyParticipantCreationApiResponse(message);
});

// =========================================================
// Search / Filter
// =========================================================

When('the admin clicks the search bar and searches for {string}', async function (this: BugFinder, keyword: string) {
    logger.info(`Step: admin searches participants with keyword "${keyword}"`);
    await this.participate.searchParticipant(keyword);
});

Then('the appropriate result for {string} should be displayed', async function (this: BugFinder, keyword: string) {
    logger.info(`Step: verifying appropriate result for "${keyword}" is displayed`);
    await this.participate.verifyParticipantDetailsDisplayed(keyword);
});

// =========================================================
// View Participant Details
// =========================================================

When('the admin clicks the eye icon in the displayed participant table row', async function (this: BugFinder) {
    logger.info("Step: admin clicks the eye icon in the displayed participant table row");
    await this.participate.clickEyeIcon();
});

Then('the application should display the appropriate participant details', async function (this: BugFinder) {
    logger.info("Step: verifying appropriate participant details are displayed");
    await this.participate.verifyParticipantProfileVisible();
});

// =========================================================
// Delete Participant
// =========================================================

When('the admin clicks the delete icon in the displayed participant table row', async function (this: BugFinder) {
    logger.info("Step: admin clicks the delete icon in the displayed participant table row");
    await this.participate.clickDeleteButton();
});

When('the admin clicks the Confirm button in the delete confirmation popup', async function (this: BugFinder) {
    logger.info("Step: admin clicks Confirm button in the delete confirmation popup");
    await this.participate.confirmDeleteParticipant();
});

Then('the participant should be deleted successfully and the message {string} should be displayed',
    async function (this: BugFinder, message: string) {
        logger.info(`Step: verifying participant deletion API response with message "${message}"`);
        await this.participate.verifyParticipantDeletionApiResponse(message);
    });