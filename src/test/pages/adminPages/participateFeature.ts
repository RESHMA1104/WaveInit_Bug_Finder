import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../../utils/logger";

export class Participate extends BasePage {

    private participateLink!: Locator
    private verifyparticipatePage!: Locator
    private addParticipatebutton!: Locator
    private verifyaddParticipate!: Locator
    private participateFullName!: Locator
    private participateEmail!: Locator
    private participatePhoneNumber!: Locator
    private participatePassword!: Locator
    private participateCreateButton!: Locator
    private searchParticipateBar!: Locator
    private verifyTable!: Locator

    private viewParticipate!: Locator
    private deleteParticipate!: Locator
    private confirmDeleteButton!: Locator

    private participateRows!: Locator
    private participateNameCells!: Locator

    // Cached across steps, same pattern as TrainerFeature
    private lastCreatedParticipantName: string = "";
    private lastSearchedKeyword: string = "";
    private lastParticipantCreationResponse: any = null;
    private lastParticipantDeletionResponse: any = null;

    // Confirmed from network tab:
    // POST https://waveinit-lms-backend-escbfyf2f7gsggdd.centralindia-01.azurewebsites.net/api/admin/participants
    // Response: { success, message, participant: { id, name, email, username, phone, role, status, created_at } }
    //
    // DELETE https://.../api/admin/participants/{id}
    // Response: { message: "Participant removed successfully" }
    private static readonly PARTICIPANT_API_PATH = "/api/admin/participants";

    private static readonly DEFAULT_TIMEOUT_MS = 10000;
    private static readonly POST_SEARCH_WAIT_MS = 15000;
    private static readonly API_TIMEOUT_MS = 60000;

    constructor(page: Page) {
        super(page)

        this.participateLink = this.page.getByRole('button', { name: 'Participants' });
        this.verifyparticipatePage = this.page.getByRole('heading', { name: 'Participants' });
        this.addParticipatebutton = this.page.getByRole('button', { name: ' Add Participant' });
        this.verifyaddParticipate = this.page.getByRole('heading', { name: 'Add New Participant' });
        this.participateFullName = this.page.getByPlaceholder('e.g. Rahul Sharma');
        this.participateEmail = this.page.getByPlaceholder('e.g. rahul@example.com');
        this.participatePhoneNumber = this.page.getByPlaceholder('e.g. 9876543210');
        this.participatePassword = this.page.getByPlaceholder('Enter password (min 6 chars)');
        this.participateCreateButton = this.page.locator('//button[@type = "submit"]//span');
        this.searchParticipateBar = this.page.locator('//input[@placeholder= "Search participants..."]');
        this.verifyTable = this.page.locator('tbody tr');

        this.participateRows = this.page.locator('tbody tr');
        this.participateNameCells = this.page.locator('.reg-admin-name');

        this.viewParticipate = this.page.locator('button.reg-admin-action--view[title="View participant profile"]');
        this.deleteParticipate = this.page.locator('button.reg-admin-action--reject[title="Delete participant"]');

        this.confirmDeleteButton = this.page.locator('button.reg-admin-btn.reg-admin-btn--danger', { hasText: 'Confirm' });
    }

    getParticipateRowByName(name: string): Locator {
        return this.participateRows.filter({ has: this.page.locator('.reg-admin-name', { hasText: name }) });
    }

    // =========================================================
    // ACTIONS — Navigation
    // =========================================================

    async clickParticipantsLink(): Promise<void> {
        logger.info("Clicking on the Participants link in the left sidebar");
        await this.participateLink.click();
    }

    async verifyParticipantsPageDisplayed(): Promise<void> {
        logger.info("Verifying the Participants page heading is visible");
        await expect(this.verifyparticipatePage).toBeVisible({ timeout: Participate.DEFAULT_TIMEOUT_MS });
    }

    // =========================================================
    // ACTIONS — Create Participant
    // =========================================================

    async clickAddParticipantButton(): Promise<void> {
        logger.info("Clicking the Add Participant button");
        await this.addParticipatebutton.click();
    }

    async verifyAddParticipantPopupDisplayed(): Promise<void> {
        logger.info("Verifying the Add New Participant popup is displayed");
        await expect(this.verifyaddParticipate).toBeVisible({ timeout: Participate.DEFAULT_TIMEOUT_MS });
    }

    /**
     * Fills in the participant creation form. Caches the fullname so later
     * steps (API name assertion) don't need it passed in again.
     */
    async enterParticipantDetails(fullname: string, email: string, phone: string, password: string): Promise<void> {
        logger.info(`Entering participant details - name: ${fullname}, email: ${email}, phone: ${phone}`);
        await this.participateFullName.fill(fullname);
        await this.participateEmail.fill(email);
        await this.participatePhoneNumber.fill(phone);
        await this.participatePassword.fill(password);

        this.lastCreatedParticipantName = fullname;
    }

    /**
     * Clicks the Save/Create button and waits for the participant-creation
     * POST API response. Starts the wait before the click to avoid a race.
     * Caches the parsed body on lastParticipantCreationResponse.
     */
    async clickSaveButton(): Promise<void> {
        logger.info("Clicking the Save button and waiting for the create-participant API response");

        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) =>
                    res.url().includes(Participate.PARTICIPANT_API_PATH) &&
                    res.request().method() === 'POST',
                { timeout: Participate.API_TIMEOUT_MS }
            ),
            this.participateCreateButton.click(),
        ]);

        expect(response.status(), "Expected participant creation API to return a success status")
            .toBeLessThan(300);

        try {
            this.lastParticipantCreationResponse = await response.json();
            logger.info(`Participant creation API response (status ${response.status()}): ${JSON.stringify(this.lastParticipantCreationResponse)}`);
        } catch (err) {
            logger.info(`Failed to parse participant creation API response as JSON: ${err}`);
            this.lastParticipantCreationResponse = null;
        }
    }

    /**
     * Verifies the participant-creation API response captured in clickSaveButton():
     * - success is true
     * - message matches the expected success message
     * - participant.name matches the entered fullname
     * - participant.role is "PARTICIPANT"
     * - participant.id is truthy
     *
     * Confirmed against actual response:
     * { success: true, message: "Participant created successfully",
     *   participant: { id, name, email, username, phone, role: "PARTICIPANT", status, created_at } }
     */
    async verifyParticipantCreationApiResponse(expectedMessage: string): Promise<void> {
        const response = this.lastParticipantCreationResponse;
        logger.info(`Verifying participant creation API response: ${JSON.stringify(response)}`);

        expect(response, "Participant creation API response was not captured - was clickSaveButton() called?")
            .toBeTruthy();

        expect(response.success, "Expected success to be true").toBe(true);
        expect(response.message, "Expected participant creation success message").toBe(expectedMessage);

        const participant = response.participant;
        expect(participant, "Expected response to include a participant object").toBeTruthy();
        expect(participant.id, "Expected participant id to be truthy").toBeTruthy();

        if (this.lastCreatedParticipantName) {
            expect(participant.name?.toLowerCase(), "Participant name in API response should match the entered fullname")
                .toBe(this.lastCreatedParticipantName.toLowerCase());
        }

        expect(participant.role, "Expected role to be PARTICIPANT").toBe('PARTICIPANT');
    }

    // =========================================================
    // ACTIONS — Search / Filter
    // =========================================================

    async searchParticipant(keyword: string): Promise<void> {
        logger.info(`Searching participants with keyword: ${keyword}`);
        await this.searchParticipateBar.click();
        await this.searchParticipateBar.fill(keyword);

        this.lastSearchedKeyword = keyword;

        await this.page.waitForTimeout(Participate.POST_SEARCH_WAIT_MS);
    }

    async verifyParticipantDetailsDisplayed(keyword?: string): Promise<void> {
        const term = keyword ?? this.lastSearchedKeyword;
        logger.info(`Verifying participant details for keyword: ${term} are displayed`);
        await expect(this.participateNameCells.filter({ hasText: term }).first())
            .toBeVisible({ timeout: Participate.DEFAULT_TIMEOUT_MS });
    }

    // =========================================================
    // ACTIONS — View Participant Details
    // =========================================================

    async clickEyeIcon(name?: string): Promise<void> {
        logger.info(`Clicking the eye (View Details) icon${name ? ` for participant: ${name}` : ""}`);
        if (name) {
            await this.getParticipateRowByName(name).locator(this.viewParticipate).click();
        } else {
            await this.viewParticipate.first().click();
        }
    }

    async verifyParticipantProfileVisible(): Promise<void> {
        logger.info("Verifying the participant profile detail view is visible");
        // NOTE: no modal markup was provided for participant profile view
        // (unlike TrainerFeature's .tpm-body). Placeholder pending real DOM;
        // update this locator once the participant profile markup is confirmed.
        await expect(this.page.getByText('Participant Details', { exact: false }))
            .toBeVisible({ timeout: Participate.DEFAULT_TIMEOUT_MS });
    }

    // =========================================================
    // ACTIONS — Delete Participant
    // =========================================================

    async clickDeleteButton(name?: string): Promise<void> {
        logger.info(`Clicking the Delete button${name ? ` for participant: ${name}` : ""}`);
        if (name) {
            await this.getParticipateRowByName(name).locator(this.deleteParticipate).click();
        } else {
            await this.deleteParticipate.first().click();
        }
    }

    /**
     * Clicks Confirm on the delete popup and waits for the DELETE
     * /api/admin/participants/{id} API response. Caches the parsed body
     * on lastParticipantDeletionResponse.
     */
    async confirmDeleteParticipant(): Promise<void> {
        logger.info("Confirming participant deletion and waiting for the delete-participant API response");

        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) =>
                    res.url().includes(Participate.PARTICIPANT_API_PATH) &&
                    res.request().method() === 'DELETE',
                { timeout: Participate.API_TIMEOUT_MS }
            ),
            this.confirmDeleteButton.click(),
        ]);

        expect(response.status(), "Expected participant deletion API to return a success status")
            .toBeLessThan(300);

        try {
            this.lastParticipantDeletionResponse = await response.json();
            logger.info(`Participant deletion API response (status ${response.status()}): ${JSON.stringify(this.lastParticipantDeletionResponse)}`);
        } catch (err) {
            logger.info(`Failed to parse participant deletion API response as JSON: ${err}`);
            this.lastParticipantDeletionResponse = null;
        }
    }

    /**
     * Verifies the participant-deletion API response captured in
     * confirmDeleteParticipant():
     * - message matches the expected success message
     *
     * Confirmed against actual response: { message: "Participant removed successfully" }
     */
    async verifyParticipantDeletionApiResponse(expectedMessage: string): Promise<void> {
        const response = this.lastParticipantDeletionResponse;
        logger.info(`Verifying participant deletion API response: ${JSON.stringify(response)}`);

        expect(response, "Participant deletion API response was not captured - was confirmDeleteParticipant() called?")
            .toBeTruthy();

        expect(response.message, "Expected participant deletion success message").toBe(expectedMessage);
    }

    getLastSearchedKeyword(): string {
        return this.lastSearchedKeyword;
    }

    getLastParticipantCreationResponse(): any {
        return this.lastParticipantCreationResponse;
    }

    getLastParticipantDeletionResponse(): any {
        return this.lastParticipantDeletionResponse;
    }
}