import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../../utils/logger";
import { Download } from "@playwright/test";

export class ParticipantsPage extends BasePage {

    private participantsTab: Locator;
    private inviteParticipantsBtn: Locator;
    private approvedParticipantsDialogHeading: Locator;
    private searchApprovedParticipantsInput: Locator;
    private selectAllBtn: Locator;
    private inviteSelectedParticipantsBtn: Locator;
    private participantAddedToast: Locator;
    private refreshParticipantsBtn: Locator;
    private participantListRefreshedToast: Locator;
    private exportParticipantsBtn: Locator;
    private exportedCsvToast: Locator;
    private lastDownload: Download | null = null;


    constructor(page: Page) {
        super(page);

        this.participantsTab = page.getByRole("button", { name: "Participants", exact: true })
            .or(page.getByRole("tab", { name: "Participants", exact: true }));

        this.inviteParticipantsBtn = page.getByRole("button", { name: "Invite Participants" });

        this.approvedParticipantsDialogHeading = page.getByRole("heading", { name: "Approved Participants" });

        this.searchApprovedParticipantsInput = page.getByPlaceholder("Search approved participants...");

        this.selectAllBtn = page.getByRole("button", { name: "Select All" });

        this.inviteSelectedParticipantsBtn = page.getByRole("button", { name: "Invite Selected Participants" });

        this.participantAddedToast = page.locator("//div[normalize-space()='Participant added successfully']");

        this.refreshParticipantsBtn = page.getByRole("button", { name: /refresh/i });

        this.participantListRefreshedToast = page.locator("//div[normalize-space()='Participant list refreshed']");

        this.exportParticipantsBtn = page.getByRole("button", { name: /export|download/i });

        this.exportedCsvToast = page.locator("//div[normalize-space()='Exported participants CSV']");
        
    }

    async navigateToParticipantsTab() {
        logger.info("Navigating to Participants tab");
        await this.click(this.participantsTab);
    }

    async openCourse(courseTitle: string) {
        logger.info(`Opening course: "${courseTitle}"`);
        const courseItem = this.page.locator("button.wl-sidebar-item, li, a")
            .filter({ hasText: courseTitle }).first();
        await this.click(courseItem);
    }

    async clickInviteParticipants() {
        logger.info("Clicking 'Invite Participants' button");
        await this.click(this.inviteParticipantsBtn);
    }

    async verifyApprovedParticipantsDialogVisible() {
        logger.info("Verifying Approved Participants dialog is displayed");
        await this.toBeVisible(this.approvedParticipantsDialogHeading);
    }

    async searchParticipant(searchTerm: string) {
        logger.info(`Searching for participant: "${searchTerm}"`);
        await this.fill(this.searchApprovedParticipantsInput, searchTerm);
    }

    async selectParticipantByEmail(email: string) {
        logger.info(`Selecting participant with email: "${email}"`);
        const participantRow = this.page.locator("div").filter({ hasText: email });
        const checkbox = participantRow.getByRole("checkbox");
        await checkbox.check();
    }

    async clickSelectAll() {
        logger.info("Clicking 'Select All' button");
        await this.click(this.selectAllBtn);
    }

    async clickInviteSelectedParticipants() {
        logger.info("Clicking 'Invite Selected Participants' button");
        await this.click(this.inviteSelectedParticipantsBtn);
    }

    async verifyParticipantAddedSuccessfully() {
        logger.info("Verifying participant(s) were added successfully");
        await expect(this.participantAddedToast).toBeVisible({ timeout: 30000 });
    }

    async clickRefreshParticipants() {
        logger.info("Clicking 'Refresh Participants' button");
        await this.click(this.refreshParticipantsBtn);
    }

    async verifyParticipantListRefreshed() {
        logger.info("Verifying participant list was refreshed successfully");
        await expect(this.participantListRefreshedToast).toBeVisible({ timeout: 30000 });
    }

    async clickExportParticipants() {
    logger.info("Clicking 'Export Participants' button and capturing the download");

    // Set up the download listener BEFORE the click, since the download
    // event can fire immediately after the click resolves.
    const [download] = await Promise.all([
        this.page.waitForEvent("download"),
        this.click(this.exportParticipantsBtn)
    ]);

    this.lastDownload = download;
    logger.info(`Download captured: ${download.suggestedFilename()}`);
}

async verifyParticipantsCsvExported() {
    logger.info("Verifying CSV export toast is displayed");
    await expect(this.exportedCsvToast).toBeVisible({ timeout: 30000 });

    logger.info("Verifying a CSV file was actually downloaded");
    expect(this.lastDownload).not.toBeNull();
    expect(this.lastDownload!.suggestedFilename()).toMatch(/\.csv$/i);
}
}