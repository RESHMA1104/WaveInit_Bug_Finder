import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../../utils/logger";

export class TrainingSession extends BasePage {

    // Sidebar / Navigation
    private trainingProgramsLink: Locator;
    private verifyTrainingSessions: Locator;

    // Create Training
    private addTrainingBtn: Locator;
    private verifyCreateTraining: Locator;
    private trainingTitle: Locator;
    private trainingDescription: Locator;
    private assignTrainerInput: Locator;
    private chooseTrainerOption: Locator;
    private startDateTime: Locator;
    private endDateTime: Locator;
    private capacity: Locator;
    private createTrainingSessionsBtn: Locator;

    // Search / List
    private searchBar: Locator;
    private searchResultRow: Locator;

    // Row Actions (View / Edit / Leaderboard / Delete)
    private viewDetailsBtn: Locator;
    private editTrainingBtn: Locator;
    private leaderboardBtn: Locator;
    private deleteTrainingBtn: Locator;

    // View Details Modal
    private modalTitle: Locator;
    private modalStatus: Locator;
    private modalTrainer: Locator;
    private modalStartDate: Locator;
    private modalEndDate: Locator;
    private modalCapacity: Locator;
    private modalEnrolled: Locator;
    private modalDescription: Locator;

    // Edit Training
    private editTitleInput: Locator;
    private saveChangesBtn: Locator;

    // Delete Confirmation
    private deleteConfirmBtn: Locator;

    // Toast / Popup messages
    private toastMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.trainingProgramsLink = this.page.getByRole('button', { name: 'Training Programs' });
        this.verifyTrainingSessions = this.page.getByText('Training Sessions', { exact: true });

        this.addTrainingBtn = this.page.getByRole('button', { name: 'Add Training' });
        this.verifyCreateTraining = this.page.getByText('Create Training', { exact: true });
        this.trainingTitle = this.page.getByPlaceholder('e.g. React Fundamentals');
        this.trainingDescription = this.page.getByPlaceholder('Training objectives and content overview...');
        this.assignTrainerInput = this.page.getByPlaceholder('Search trainers by name or email...');
        this.chooseTrainerOption = this.page.getByRole('button', { name: 'prasanna@gmail.com' });

        this.startDateTime = this.page.locator("input[type='datetime-local']").nth(0);
        this.endDateTime = this.page.locator("input[type='datetime-local']").nth(1);

        this.capacity = this.page.getByPlaceholder('e.g. 30');
        this.createTrainingSessionsBtn = this.page.getByRole('button', { name: 'Create Training Session' });

        this.searchBar = this.page.getByPlaceholder('Search by title or trainer...');
        this.searchResultRow = this.page.locator('tbody tr');

        this.viewDetailsBtn = this.page.locator('button.reg-admin-action[title="View Details"]');
        this.editTrainingBtn = this.page.locator('button.reg-admin-action[title="Edit Training"]');
        this.leaderboardBtn = this.page.locator('button.reg-admin-action[title="Leaderboard"]');
        this.deleteTrainingBtn = this.page.locator('button.reg-admin-action--reject[title="Delete Training"]');

        this.modalTitle = this.page.locator('.reg-modal-grid div', { hasText: 'Title' }).locator('div');
        this.modalStatus = this.page.locator('.reg-modal-grid div', { hasText: 'Status' }).locator('.reg-admin-status');
        this.modalTrainer = this.page.locator('.reg-modal-grid div', { hasText: 'Trainer' }).locator('div');
        this.modalStartDate = this.page.locator('.reg-modal-grid div', { hasText: 'Start Date' }).locator('div');
        this.modalEndDate = this.page.locator('.reg-modal-grid div', { hasText: 'End Date' }).locator('div');
        this.modalCapacity = this.page.locator('.reg-modal-grid div', { hasText: 'Capacity' }).locator('div');
        this.modalEnrolled = this.page.locator('.reg-modal-grid div', { hasText: 'Enrolled' }).locator('div');
        this.modalDescription = this.page.locator('.reg-modal-grid div', { hasText: 'Description' }).locator('div');

        this.editTitleInput = this.page.locator('input.reg-input[type="text"]');
        this.saveChangesBtn = this.page.getByRole('button', { name: 'Save Changes' });

        this.deleteConfirmBtn = this.page.getByRole('button', { name: 'Confirm' });

        this.toastMessage = this.page.locator('.toast, .reg-toast, [role="alert"]');
    }

    // ===================== Create Training =====================

    async clickAddTrainingBtn() {
        await this.addTrainingBtn.click();
        logger.info('Clicked Add Training button');
    }

    async verifyCreateTrainingPageVisible() {
        await expect(this.verifyCreateTraining).toBeVisible();
    }

    async enterTrainingTitleAndDescription(title: string, description: string) {
        await this.trainingTitle.fill(title);
        await this.trainingDescription.fill(description);
        logger.info(`Entered title: ${title}, description: ${description}`);
    }

    async selectAssignedTrainer(trainerEmail: string) {
        await this.assignTrainerInput.fill(trainerEmail);
        await this.chooseTrainerOption.click();
        logger.info(`Selected trainer: ${trainerEmail}`);
    }

    async selectStartAndEndDateTime(startDateTime: string, endDateTime: string) {
        await this.startDateTime.fill(startDateTime);
        await this.endDateTime.fill(endDateTime);
        logger.info(`Selected start: ${startDateTime}, end: ${endDateTime}`);
    }

    async enterCapacity(capacityValue: string) {
        await this.capacity.fill(capacityValue);
        logger.info(`Entered capacity: ${capacityValue}`);
    }

    async clickCreateTrainingSessionBtn() {
        const [response] = await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('/training') && res.request().method() === 'POST'
            ),
            this.createTrainingSessionsBtn.click(),
        ]);
        const body = await response.json();
        logger.info(`Create Training API response: ${JSON.stringify(body)}`);
        return body;
    }

    async verifyNewTrainingSessionDisplayed(title: string) {
        await expect(this.searchResultRow.filter({ hasText: title })).toBeVisible();
    }

    // ===================== Search / Filter =====================

    async searchTraining(keyword: string) {
        await this.searchBar.fill(keyword);
        logger.info(`Searched for keyword: ${keyword}`);
    }

    async verifySearchResultsDisplayed(keyword: string) {
        await expect(this.searchResultRow.filter({ hasText: keyword }).first()).toBeVisible();
    }

    // ===================== View Details =====================

    async clickViewDetailsIcon() {
        await this.viewDetailsBtn.first().click();
        logger.info('Clicked View Details (eye) icon');
    }

    async verifyDetailedViewVisible() {
        await expect(this.modalTitle).toBeVisible();
        await expect(this.modalStatus).toBeVisible();
        await expect(this.modalTrainer).toBeVisible();
        await expect(this.modalStartDate).toBeVisible();
        await expect(this.modalEndDate).toBeVisible();
        await expect(this.modalCapacity).toBeVisible();
        await expect(this.modalEnrolled).toBeVisible();
        await expect(this.modalDescription).toBeVisible();
    }

    // ===================== Edit Training =====================

    async clickEditBtn() {
        await this.editTrainingBtn.first().click();
        logger.info('Clicked Edit Training button');
    }

    async verifyEditPageVisible() {
        await expect(this.editTitleInput).toBeVisible();
        await expect(this.saveChangesBtn).toBeVisible();
    }

    async editTrainingTitle(newTitle: string) {
        await this.editTitleInput.fill(newTitle);
        logger.info(`Edited training title to: ${newTitle}`);
    }

    async clickSaveChangesBtn() {
        const [response] = await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('/training') && res.request().method() === 'PUT'
            ),
            this.saveChangesBtn.click(),
        ]);
        const body = await response.json();
        logger.info(`Update Training API response: ${JSON.stringify(body)}`);
        return body;
    }

    // ===================== Delete Training =====================

    async clickDeleteBtn() {
        await this.deleteTrainingBtn.first().click();
        logger.info('Clicked Delete Training button');
    }

    async clickDeleteConfirmBtn() {
        const [response] = await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('/training') && res.request().method() === 'DELETE'
            ),
            this.deleteConfirmBtn.click(),
        ]);
        logger.info(`Delete Training API status: ${response.status()}`);
        return response;
    }

    // ===================== Popup / Toast =====================

    async verifyPopupMessage(expectedMessage: string) {
        await expect(this.toastMessage).toHaveText(expectedMessage);
        logger.info(`Verified popup message: ${expectedMessage}`);
    }
}