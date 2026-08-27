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
    private trainerListbox: Locator;
    private chooseTrainerOption: (trainerIdentifier: string) => Locator;
    private startDateTime: Locator;
    private endDateTime: Locator;
    private capacity: Locator;
    private createTrainingSessionsBtn: Locator;

    // Search / List
    private searchBar: Locator;
    private searchResultRow: Locator;

    // Row Actions (View / Edit / Leaderboard / Delete) — row-scoped by title
    private trainingRowByTitle: (title: string) => Locator;

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

    // ===== Timing constants (centralised so they're easy to tune later) =====
    private static readonly POST_SEARCH_WAIT_MS = 15000;
    private static readonly DEFAULT_TIMEOUT_MS = 10000;
    private static readonly LIST_LOAD_TIMEOUT_MS = 30000;
    private static readonly CREATE_POLL_TIMEOUT_MS = 600000; // 10 min

    constructor(page: Page) {
        super(page);

        this.trainingProgramsLink = this.page.getByRole('button', { name: 'Training Programs' });
        this.verifyTrainingSessions = this.page.getByText('Training Sessions', { exact: true });

        this.addTrainingBtn = this.page.getByRole('button', { name: 'Add Training' });
        this.verifyCreateTraining = this.page.getByText('Create Training', { exact: true });
        this.trainingTitle = this.page.getByPlaceholder('e.g. React Fundamentals');
        this.trainingDescription = this.page.getByPlaceholder('Training objectives and content overview...');
        this.assignTrainerInput = this.page.getByPlaceholder('Search trainers by name or email...');

        this.trainerListbox = this.page.getByRole('listbox', { name: 'Assign trainers' });
        this.chooseTrainerOption = (trainerIdentifier: string) =>
            this.trainerListbox.getByRole('option', { name: trainerIdentifier, exact: false });

        this.startDateTime = this.page.locator("input[type='datetime-local']").nth(0);
        this.endDateTime = this.page.locator("input[type='datetime-local']").nth(1);

        this.capacity = this.page.getByPlaceholder('e.g. 30');
        this.createTrainingSessionsBtn = this.page.getByRole('button', { name: 'Create Training Session' });

        this.searchBar = this.page.getByPlaceholder('Search by title or trainer...');
        this.searchResultRow = this.page.locator('tbody tr');

        // FIX: row-scoped locator. Matches the <tr> whose .reg-admin-name text
        // contains the given title, then action buttons are queried WITHIN
        // that row — so Edit/View/Delete always act on the correct row even
        // when multiple rows are visible after a search.
        this.trainingRowByTitle = (title: string) =>
            this.page.locator('tbody tr').filter({
                has: this.page.locator('.reg-admin-name', { hasText: title })
            });

        // NOTE: modal locators are still the original brittle pattern —
        // send the View Details modal HTML and I'll tighten these too.
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

    async clickTrainingProgramsLink() {
        await this.trainingProgramsLink.click();
        logger.info('Clicked Training Programs link in the sidebar');
    }

    async verifyRedirectedToTrainingSessions() {
        await expect(this.verifyTrainingSessions).toBeVisible();
        logger.info('Verified redirection to Training Sessions page');
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

    async selectAssignedTrainer(trainerIdentifier: string) {
        await this.assignTrainerInput.click();
        await this.assignTrainerInput.fill(trainerIdentifier);
        await expect(this.trainerListbox).toBeVisible();
        await this.chooseTrainerOption(trainerIdentifier).click();
        logger.info(`Selected trainer: ${trainerIdentifier}`);
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

    async getAllTrainingTitles(): Promise<string[]> {
        const titles = await this.page.locator('.reg-admin-name').allTextContents();
        return titles.map(t => t.trim());
    }

    async verifyNewTrainingSessionDisplayed(title: string) {
        if (await this.trainingProgramsLink.isVisible().catch(() => false)) {
            await this.trainingProgramsLink.click();
        }
        await expect(this.verifyTrainingSessions).toBeVisible({ timeout: TrainingSession.LIST_LOAD_TIMEOUT_MS });

        await expect(async () => {
            const titles = await this.getAllTrainingTitles();
            expect(titles).toContain(title);
        }).toPass({ timeout: TrainingSession.CREATE_POLL_TIMEOUT_MS, intervals: [2000, 5000, 10000, 15000, 30000] });

        logger.info(`Verified new training session "${title}" is displayed in the list`);
    }

    // ===================== Search / Filter =====================

    async searchTraining(keyword: string) {
        await this.searchBar.fill(keyword);
        logger.info(`Searched for keyword: ${keyword}`);
        // Explicit settle time after typing into search before trusting the table.
        logger.info(`Waiting ${TrainingSession.POST_SEARCH_WAIT_MS / 1000}s for table to settle after search`);
        await this.page.waitForTimeout(TrainingSession.POST_SEARCH_WAIT_MS);
    }

    async verifySearchResultsDisplayed(keyword?: string) {
        if (keyword && keyword.trim()) {
            const row = this.trainingRowByTitle(keyword).first();
            await expect(row).toBeVisible({ timeout: TrainingSession.DEFAULT_TIMEOUT_MS });
            logger.info(`Verified a row matching "${keyword}" is visible in the table`);
            return;
        }

        await expect(this.searchResultRow.first()).toBeVisible({ timeout: TrainingSession.DEFAULT_TIMEOUT_MS });
        logger.info('Verified at least one training row is visible in the table');
    }

    // ===================== View Details (row-scoped) =====================

    async clickViewDetailsIcon(title?: string) {
        const row = title && title.trim()
            ? this.trainingRowByTitle(title).first()
            : this.searchResultRow.first();
        await row.locator('button.reg-admin-action[title="View Details"]').click();
        const label = title && title.trim() ? `matching "${title}"` : 'in the first visible row';
        logger.info(`Clicked View Details ${label}`);
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

    // ===================== Edit Training (row-scoped) =====================

    async clickEditBtn(title?: string) {
        const row = title && title.trim()
            ? this.trainingRowByTitle(title).first()
            : this.searchResultRow.first();
        await row.locator('button.reg-admin-action[title="Edit Training"]').click();
        const label = title && title.trim() ? `matching "${title}"` : 'in the first visible row';
        logger.info(`Clicked Edit Training ${label}`);
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

    // ===================== Delete Training (row-scoped) =====================

    async clickDeleteBtn(title?: string) {
        const row = title && title.trim()
            ? this.trainingRowByTitle(title).first()
            : this.searchResultRow.first();
        await row.locator('button.reg-admin-action--reject[title="Delete Training"]').click();
        const label = title && title.trim() ? `matching "${title}"` : 'in the first visible row';
        logger.info(`Clicked Delete Training ${label}`);
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
        await this.page.waitForTimeout(1000);
        const messageLocator = this.page.getByText(expectedMessage, { exact: false }).first();
        await expect(messageLocator).toBeVisible({ timeout: TrainingSession.DEFAULT_TIMEOUT_MS });
        logger.info(`Verified popup message: ${expectedMessage}`);
    }
}