import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../../utils/logger";

export class TrainerFeature extends BasePage {

    private trainerlink: Locator
    private VerifytrainerPageCheck: Locator
    private CreateTrainer: Locator
    private verifyCreateTrainerPage: Locator
    private fullNameTrainer: Locator
    private emailTrainer: Locator
    private MobileTrainer: Locator
    private departmentTrainer: Locator
    private designationTrainer: Locator
    private experienceTrainer: Locator
    private passwordTrainer: Locator
    private confirmPasswordTrainer: Locator
    private createTrainerButton: Locator;
    private searchBar: Locator;
    private trainerRows: Locator;
    private trainerNameCells: Locator;
    private ViewEye: Locator;
    private trainerProfileModal: Locator;
    private trainerProfileName: Locator;
    private deleteBtn: Locator;
    private confirmBtn: Locator;

    // Stores the fullname entered during "Create Trainer" so the later
    // "newly created trainer should be displayed" step can verify it
    // without needing the name passed in again.
    private lastCreatedTrainerName: string = "";

    // Stores the last keyword typed into the search bar so later
    // verification steps don't need it passed in again.
    private lastSearchedKeyword: string = "";

    // Stores the parsed JSON body of the trainer-creation API response
    // (captured in clickCreateTrainerButton()) so a later step can assert
    // on it.
    private lastTrainerCreationResponse: any = null;

    // Confirmed from network tab:
    // POST https://waveinit-lms-backend-escbfyf2f7gsggdd.centralindia-01.azurewebsites.net/api/admin/create-trainer
    // Request payload shape:
    // {
    //   name, email, password, phone, department, designation,
    //   experience, employeeId, status: "APPROVED"
    // }
    private static readonly CREATE_TRAINER_API_PATH = "/api/admin/create-trainer";

    // ===== Timing constants (centralised so they're easy to tune later) =====
    private static readonly POST_SEARCH_WAIT_MS = 15000;
    private static readonly DEFAULT_TIMEOUT_MS = 10000;
    private static readonly LIST_LOAD_TIMEOUT_MS = 30000;
    private static readonly CREATE_API_TIMEOUT_MS = 60000; // give the backend a reasonable window

    constructor(page: Page) {
        super(page)

        // --- Sidebar / navigation (no markup provided for these — placeholders, verify against actual DOM) ---
        this.trainerlink = this.page.getByRole('button', { name: 'Trainers' });
        this.VerifytrainerPageCheck = this.page.getByRole('heading', { name: 'Trainers' });
        this.CreateTrainer = this.page.getByRole('button', { name: ' Add Trainer' });

        // --- Create Trainer form ---
        this.verifyCreateTrainerPage = this.page.getByRole('heading', { name: 'Create Trainer', exact: true });
        this.fullNameTrainer = this.page.getByPlaceholder('e.g. Sarah Johnson');
        this.emailTrainer = this.page.getByPlaceholder('trainer@company.com');
        this.MobileTrainer = this.page.getByPlaceholder('e.g. +91 98765 43210');

        // The 3 dropdowns all share class "reg-select" (see screenshots), so distinguish
        // them by an option that's unique to each, instead of a bare //select xpath.
        this.departmentTrainer = this.page.locator('select.reg-select')
            .filter({ has: this.page.locator('option[value="Technology"]') });

        this.designationTrainer = this.page.locator('select.reg-select')
            .filter({ has: this.page.locator('option[value="Senior Trainer"]') });

        this.experienceTrainer = this.page.locator('select.reg-select')
            .filter({ has: this.page.locator('option[value="Fresher"]') });

        this.passwordTrainer = this.page.getByPlaceholder('Min. 8 characters');
        this.confirmPasswordTrainer = this.page.getByPlaceholder('Re-enter password');
        this.createTrainerButton = this.page.getByRole('button', { name: 'Create Trainer' });

        // --- Search / listing table (from reg-admin-* markup) ---
        this.searchBar = this.page.getByPlaceholder('Search trainers...');
        this.trainerRows = this.page.locator('tbody tr');
        this.trainerNameCells = this.page.locator('.reg-admin-name');

        // --- Row actions (View / Delete icon buttons, identified by their title attr) ---
        this.ViewEye = this.page.locator('button.reg-admin-action[title="View Details"]');
        this.deleteBtn = this.page.locator('button.reg-admin-action--reject[title="Delete Trainer"]');

        // --- Trainer detail modal (tpm-* classes) ---
        this.trainerProfileModal = this.page.locator('.tpm-body');
        this.trainerProfileName = this.page.locator('.tpm-hero-name');

        // --- Delete confirmation popup button ---
        this.confirmBtn = this.page.locator('button.reg-admin-btn.reg-admin-btn--danger', { hasText: 'Delete' });
    }

    // Example helper for scenario-driven row lookup, since names like
    // "Sarah Johnson" / "Adhiswar ..." repeat across rows in your table:
    getTrainerRowByName(name: string): Locator {
        return this.trainerRows.filter({ has: this.page.locator('.reg-admin-name', { hasText: name }) });
    }

    // =========================================================
    // ACTIONS — Navigation
    // =========================================================

    /**
     * Clicks the "Trainers" link in the left sidebar to navigate
     * to the trainer listing page.
     */
    async clickTrainersLink(): Promise<void> {
        logger.info("Clicking on the Trainers link in the left sidebar");
        await this.trainerlink.click();
    }

    /**
     * Verifies the app has redirected to the Trainers / trainer
     * sessions page by checking the page heading.
     */
    async verifyTrainerPageDisplayed(): Promise<void> {
        logger.info("Verifying the Trainers page heading is visible");
        await expect(this.VerifytrainerPageCheck).toBeVisible({ timeout: TrainerFeature.DEFAULT_TIMEOUT_MS });
    }

    // =========================================================
    // ACTIONS — Create Trainer
    // =========================================================

    /**
     * Clicks the "Add Trainer" button to open the Create Trainer form.
     */
    async clickAddTrainerButton(): Promise<void> {
        logger.info("Clicking the Add Trainer button");
        await this.CreateTrainer.click();
    }

    /**
     * Verifies the Create Trainer page/form has loaded.
     */
    async verifyCreateTrainerPageDisplayed(): Promise<void> {
        logger.info("Verifying the Create Trainer page is displayed");
        await expect(this.verifyCreateTrainerPage).toBeVisible({ timeout: TrainerFeature.DEFAULT_TIMEOUT_MS });
    }

    /**
     * Fills in the fullname, email and mobile number fields on the
     * Create Trainer form. Also caches the fullname so we can verify
     * the trainer shows up in the list later.
     */
    async enterTrainerBasicDetails(fullname: string, email: string, mobileNumber: string): Promise<void> {
        logger.info(`Entering trainer basic details - name: ${fullname}, email: ${email}, mobile: ${mobileNumber}`);
        await this.fullNameTrainer.fill(fullname);
        await this.emailTrainer.fill(email);
        await this.MobileTrainer.fill(mobileNumber);

        // Cache for later verification (e.g. "newly created trainer should be displayed")
        this.lastCreatedTrainerName = fullname;
    }

    /**
     * Selects the department and designation dropdown values.
     */
    async selectDepartmentAndDesignation(department: string, designation: string): Promise<void> {
        logger.info(`Selecting department: ${department}, designation: ${designation}`);
        await this.departmentTrainer.selectOption(department);
        await this.designationTrainer.selectOption(designation);
    }

    /**
     * Selects the experience level dropdown value.
     */
    async selectExperience(experience: string): Promise<void> {
        logger.info(`Selecting experience level: ${experience}`);
        await this.experienceTrainer.selectOption(experience);
    }

    /**
     * Enters and confirms the new trainer's password.
     */
    async enterPasswordAndConfirm(password: string): Promise<void> {
        logger.info("Entering password and confirming it");
        await this.passwordTrainer.fill(password);
        await this.confirmPasswordTrainer.fill(password);
    }

    // /**
    //  * Clicks the "Create Trainer" submit button and waits for the trainer-creation
    //  * POST API response from /api/admin/create-trainer.
    //  *
    //  * FIX: previously this waited on a guessed endpoint ('/trainer'), which never
    //  * matched the real request and caused a 30s timeout. It now matches on the
    //  * confirmed path (CREATE_TRAINER_API_PATH) and the POST method, and starts
    //  * the wait *before* clicking so there's no race between the click and the
    //  * response arriving.
    //  *
    //  * The parsed body is logged and cached on `lastTrainerCreationResponse`
    //  * so a later step (verifyTrainerCreationApiResponse) can assert on it
    //  * without needing the response passed around manually.
    //  */
    // async clickCreateTrainerButton(): Promise<void> {
    //     logger.info("Clicking the Create Trainer button and waiting for the create-trainer API response");

    //     const [response] = await Promise.all([
    //         this.page.waitForResponse(
    //             (res) =>
    //                 res.url().includes(TrainerFeature.CREATE_TRAINER_API_PATH) &&
    //                 res.request().method() === 'POST',
    //             { timeout: TrainerFeature.CREATE_API_TIMEOUT_MS }
    //         ),
    //         this.createTrainerButton.click(),
    //     ]);

    //     try {
    //         this.lastTrainerCreationResponse = await response.json();
    //         logger.info(`Trainer creation API response (status ${response.status()}): ${JSON.stringify(this.lastTrainerCreationResponse)}`);
    //     } catch (err) {
    //         logger.info(`Failed to parse trainer creation API response as JSON: ${err}`);
    //         this.lastTrainerCreationResponse = null;
    //     }
    // }

    // /**
    //  * Verifies the newly created trainer appears in the trainer list (UI check).
    //  * Uses the cached name from enterTrainerBasicDetails() if none is passed.
    //  */
    // async verifyTrainerCreated(name?: string): Promise<void> {
    //     const trainerName = name ?? this.lastCreatedTrainerName;
    //     logger.info(`Verifying newly created trainer "${trainerName}" is displayed in the list`);
    //     await expect(this.getTrainerRowByName(trainerName)).toBeVisible({
    //         timeout: TrainerFeature.LIST_LOAD_TIMEOUT_MS
    //     });
    // }


    async clickCreateTrainerButton(){
        await this.click(this.createTrainerButton);
    }



    /**
     * Verifies the trainer-creation API response captured in clickCreateTrainerButton():
     * - response has a truthy "id"
     * - "name" matches the fullname entered on the form (lastCreatedTrainerName)
     * - "role" is "TRAINER"
     * - "message" is "Trainer created successfully"
     *
     * NOTE: the exact response field names (id/name/role/message) were inferred
     * from an earlier example and not yet confirmed against this endpoint's
     * actual response body. If this assertion fails, log
     * `getLastTrainerCreationResponse()` to see the real shape and adjust the
     * field names below accordingly.
     *
     * Throws (via expect) if clickCreateTrainerButton() was never called first,
     * since there'd be no response to check.
     */
    async verifyTrainerCreationApiResponse(): Promise<void> {
        const response = this.lastTrainerCreationResponse;
        logger.info(`Verifying trainer creation API response: ${JSON.stringify(response)}`);

        expect(response, "Trainer creation API response was not captured - was clickCreateTrainerButton() called?")
            .toBeTruthy();

        expect(response.id, "Expected trainer creation response to include an id").toBeTruthy();

        if (this.lastCreatedTrainerName) {
            expect(response.name, "Trainer name in API response should match the entered fullname")
                .toBe(this.lastCreatedTrainerName);
        }

        expect(response.role, "Expected role to be TRAINER").toBe('TRAINER');
        expect(response.message, "Expected trainer creation success message")
            .toBe('Trainer created successfully');
    }

    // =========================================================
    // ACTIONS — Search / Filter
    // =========================================================

    /**
     * Clicks the search bar and types the given keyword to filter trainers.
     */
    async searchTrainer(keyword: string): Promise<void> {
        logger.info(`Searching trainers with keyword: ${keyword}`);
        await this.searchBar.click();
        await this.searchBar.fill(keyword);

        // Cache for later verification (e.g. "appropriate trainer details should be displayed")
        this.lastSearchedKeyword = keyword;

        // Allow the list to re-render/filter after typing
        await this.page.waitForTimeout(TrainerFeature.POST_SEARCH_WAIT_MS);
    }

    /**
     * Verifies that the trainer list shows results matching the given keyword.
     * Falls back to the last searched keyword (set in searchTrainer()) if none is passed.
     */
    async verifyTrainerDetailsDisplayed(keyword?: string): Promise<void> {
        const term = keyword ?? this.lastSearchedKeyword;
        logger.info(`Verifying trainer details for keyword: ${term} are displayed`);
        await expect(this.trainerNameCells.filter({ hasText: term }).first())
            .toBeVisible({ timeout: TrainerFeature.DEFAULT_TIMEOUT_MS });
    }

    // =========================================================
    // ACTIONS — View Trainer Details
    // =========================================================

    /**
     * Clicks the "View Details" eye icon for a specific trainer row.
     * Falls back to the first visible eye icon if no name is given
     * (useful right after a search that narrows the list to one row).
     */
    async clickEyeIcon(name?: string): Promise<void> {
        logger.info(`Clicking the View Details (eye) icon${name ? ` for trainer: ${name}` : ""}`);
        if (name) {
            await this.getTrainerRowByName(name).locator(this.ViewEye).click();
        } else {
            await this.ViewEye.first().click();
        }
    }

    /**
     * Verifies the trainer profile modal opens and shows the expected name.
     */
    async verifyTrainerProfileVisible(name?: string): Promise<void> {
        logger.info("Verifying the trainer profile detail modal is visible");
        await expect(this.trainerProfileModal).toBeVisible({ timeout: TrainerFeature.DEFAULT_TIMEOUT_MS });
        if (name) {
            await expect(this.trainerProfileName).toHaveText(name);
        }
    }

    // =========================================================
    // ACTIONS — Delete Trainer
    // =========================================================

    /**
     * Clicks the Delete icon on a specific trainer row.
     * Falls back to the first visible delete icon if no name is given.
     */
    async clickDeleteButton(name?: string): Promise<void> {
        logger.info(`Clicking the Delete button${name ? ` for trainer: ${name}` : ""}`);
        if (name) {
            await this.getTrainerRowByName(name).locator(this.deleteBtn).click();
        } else {
            await this.deleteBtn.first().click();
        }
    }

    /**
     * Confirms the deletion by clicking "Delete" in the confirmation popup.
     */
    async confirmDeleteTrainer(): Promise<void> {
        logger.info("Confirming trainer deletion via the confirmation popup");
        await this.confirmBtn.click();
    }

    /**
     * Verifies the success message/toast is shown after deleting a trainer.
     *
     * FIX: the previous locator ('.reg-admin-toast, .toast-message') was a
     * guessed placeholder that doesn't exist in the real DOM, which is why it
     * failed with "element(s) not found". Since we don't yet have the actual
     * toast markup, this locates the popup by the message text itself
     * (case-insensitive substring match), which is far more resilient to an
     * unknown wrapper class/structure. Once you confirm the real toast markup,
     * you can tighten this back to a class-based locator if you prefer.
     */
    async verifySuccessMessage(message: string): Promise<void> {
        logger.info(`Verifying success popup message: "${message}"`);
        const toastLocator = this.page.getByText(message, { exact: false }).first();
        await expect(toastLocator).toBeVisible({ timeout: TrainerFeature.DEFAULT_TIMEOUT_MS });
    }

    /**
     * Returns the last keyword used in searchTrainer(), for steps that
     * verify search results without re-supplying the keyword.
     */
    getLastSearchedKeyword(): string {
        return this.lastSearchedKeyword;
    }

    /**
     * Returns the last captured trainer-creation API response body,
     * for steps/assertions that want to inspect it directly.
     */
    getLastTrainerCreationResponse(): any {
        return this.lastTrainerCreationResponse;
    }
}