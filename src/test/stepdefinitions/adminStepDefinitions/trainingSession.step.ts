import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../../utils/logger";
import { BugFinder } from "../../../world/Bug_Finder";


When('the admin clicks the Training Programs link in the left sidebar', async function (this: BugFinder) {
    await this.trainingSession.clickTrainingProgramsLink();
});

Then('the application should redirect to the training sessions page', async function (this: BugFinder) {
    await this.trainingSession.verifyRedirectedToTrainingSessions();
});


// ===================== Scenario: Create a new training session =====================

When('the admin clicks the Add Training button', async function (this: BugFinder) {
    await this.trainingSession.clickAddTrainingBtn();
});

Then('the application should navigate to the Create Training page', async function (this: BugFinder) {
    await this.trainingSession.verifyCreateTrainingPageVisible();
});

When('the admin enters the training title {string} and description {string}', async function (this: BugFinder, title: string, description: string) {
    await this.trainingSession.enterTrainingTitleAndDescription(title, description);
});

When('the admin enters the training title and description', async function (this: BugFinder) {
    await this.trainingSession.enterTrainingTitleAndDescription('Python', 'Python programming training');
});

When('the admin selects the assigned trainer', async function (this: BugFinder) {
    await this.trainingSession.selectAssignedTrainer('prasanna@gmail.com');
});

When('the admin selects the start date & time and end date & time', async function (this: BugFinder) {
    await this.trainingSession.selectStartAndEndDateTime('2026-08-25T19:27', '2026-08-27T21:28');
});

When('the admin enters the capacity', async function (this: BugFinder) {
    await this.trainingSession.enterCapacity('10');
});

When('the admin clicks the Create Training Session button', async function (this: BugFinder) {
    const response = await this.trainingSession.clickCreateTrainingSessionBtn();
    logger.info(`Training created: ${response.message}`);
});

Then('the newly created training session should be displayed', async function (this: BugFinder) {
    await this.trainingSession.verifyNewTrainingSessionDisplayed('Python');
});

// ===================== Scenario Outline: Search and filter training sessions =====================

When('the admin clicks the search bar and enters {string}', async function (this: BugFinder, keyword: string) {
    await this.trainingSession.searchTraining(keyword);
});

Then('the appropriate training sessions should be displayed', async function (this: BugFinder) {
    await this.trainingSession.verifySearchResultsDisplayed('');
});

// ===================== Scenario Outline: View detailed training session =====================

When('the admin searches for {string}', async function (this: BugFinder, keyword: string) {
    await this.trainingSession.searchTraining(keyword);
});

When('the admin clicks the eye icon', async function (this: BugFinder) {
    await this.trainingSession.clickViewDetailsIcon();
});

Then('the detailed view of the training session should be visible', async function (this: BugFinder) {
    await this.trainingSession.verifyDetailedViewVisible();
});

// ===================== Scenario Outline: Admin edits a training session =====================

When('the admin clicks the Edit button', async function (this: BugFinder) {
    await this.trainingSession.clickEditBtn();
});

Then('the Edit Training Session page should be visible', async function (this: BugFinder) {
    await this.trainingSession.verifyEditPageVisible();
});

When('the admin edits the {string} to {string}', async function (this: BugFinder, field: string, newValue: string) {
    if (field === 'title') {
        await this.trainingSession.editTrainingTitle(newValue);
    }
});

When('the admin clicks the Save Changes button', async function (this: BugFinder) {
    const response = await this.trainingSession.clickSaveChangesBtn();
    logger.info(`Training updated: ${response.message}`);
});

Then('the popup message {string} should be displayed', async function (this: BugFinder, message: string) {
    await this.trainingSession.verifyPopupMessage(message);
});

// ===================== Scenario Outline: Admin deletes a training session =====================

When('the admin clicks the Delete button', async function (this: BugFinder) {
    await this.trainingSession.clickDeleteBtn();
});

When('the admin clicks the Delete Confirm button', async function (this: BugFinder) {
    await this.trainingSession.clickDeleteConfirmBtn();
});