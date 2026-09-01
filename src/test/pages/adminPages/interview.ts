import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../../utils/logger";

export interface ScheduleInterviewData {
  title: string;
  candidateName: string;
  interviewerName: string;
  date: string;        // format: YYYY-MM-DD (native <input type="date">)
  time: string;         // format: HH:mm  (native <input type="time">)
  interviewType?: "TECHNICAL" | "HR" | "MANAGERIAL" | "CUSTOM";
  duration?: "30" | "45" | "60" | "90" | "120";
  meetingType?: "IN_PLATFORM" | "ONLINE";
  notes?: string;
}

export class Interview extends BasePage {

  // ---------- Sidebar / navigation ----------
  private interviewsSidebarLink: Locator;

  // ---------- Interviews list page ----------
  private interviewsPageTitle: Locator;
  private scheduleInterviewListButton: Locator; // "Schedule Interview" btn on the list page header
  private searchInput: Locator;
  private tableRows: Locator;                   // all <tr> in the interviews table

  // ---------- Schedule Interview form ----------
  private scheduleFormTitle: Locator;            // h2 "Schedule Interview" (confirms navigation)
  private interviewTitleInput: Locator;
  private candidateDropdownButton: Locator;
  private interviewerDropdownButton: Locator;
  private interviewTypeSelect: Locator;
  private durationSelect: Locator;
  private interviewDateInput: Locator;
  private interviewTimeInput: Locator;
  private meetingTypeSelect: Locator;
  private notesTextarea: Locator;
  private cameraMonitoringToggle: Locator;
  private recordInterviewToggle: Locator;
  private cancelFormButton: Locator;
  private saveDraftButton: Locator;
  private scheduleSubmitButton: Locator;         // type="submit" inside the form – disambiguates from list button

  // ---------- Edit popup ----------
  private editPopup: Locator;
  private editTitleInput: Locator;
  private saveChangesButton: Locator;

  // ---------- View popup ----------
  private viewDetailsPanel: Locator;

  // ---------- Delete confirmation ----------
  private deleteConfirmDialog: Locator;
  private deleteConfirmButton: Locator;

  constructor(page: Page) {
    super(page);

    // Sidebar
    this.interviewsSidebarLink = page.getByRole("link", { name: "Interviews", exact: true });

    // Interviews list page
    this.interviewsPageTitle = page.locator("h2.reg-admin-title", { hasText: "Interviews" });
    this.scheduleInterviewListButton = page.locator("button.reg-admin-btn--primary", { hasText: "Schedule Interview" });
    this.searchInput = page.getByPlaceholder("Search by name, email, interviewer, title...");
    this.tableRows = page.locator("table.reg-admin-table tbody tr");

    // Schedule Interview form
    this.scheduleFormTitle = page.locator("h2.reg-admin-title", { hasText: "Schedule Interview" });
    this.interviewTitleInput = page.getByPlaceholder("e.g., Senior Developer Technical Interview");
    this.candidateDropdownButton = page
      .locator(".searchable-select-container", { has: page.locator("label", { hasText: "Candidate" }) })
      .locator("button");
    this.interviewerDropdownButton = page
      .locator(".searchable-select-container", { has: page.locator("label", { hasText: "HR / Interviewer" }) })
      .locator("button");
    // Selects have no id — use xpath axis from the preceding <label> text
    this.interviewTypeSelect = page.locator(
      "xpath=//label[normalize-space(text())='Interview Type']/following-sibling::select[1]"
    );
    this.durationSelect = page.locator(
      "xpath=//label[normalize-space(text())='Duration']/following-sibling::select[1]"
    );
    this.interviewDateInput = page.locator('input[type="date"]');
    this.interviewTimeInput = page.locator('input[type="time"]');
    this.meetingTypeSelect = page.locator(
      "xpath=//label[normalize-space(text())='Meeting Type']/following-sibling::select[1]"
    );
    this.notesTextarea = page.getByPlaceholder("Optional notes about this interview...");
    this.cameraMonitoringToggle = page
      .locator("div", { hasText: "Mobile Camera Monitoring" })
      .locator("button.interview-toggle")
      .first();
    this.recordInterviewToggle = page
      .locator("div", { hasText: "Record Interview" })
      .locator("button.interview-toggle")
      .first();
    this.cancelFormButton = page.locator("form button", { hasText: "Cancel" });
    this.saveDraftButton = page.locator("form button", { hasText: "Save Draft" });
    this.scheduleSubmitButton = page.locator('form button[type="submit"]', { hasText: "Schedule Interview" });

    // Edit popup (modal is not in the provided DOM snapshot — selectors kept generic/robust)
    this.editPopup = page.locator(".reg-admin-modal, [role='dialog']", { hasText: "Edit Interview" });
    this.editTitleInput = this.editPopup.getByPlaceholder("e.g., Senior Developer Technical Interview");
    this.saveChangesButton = this.editPopup.locator("button", { hasText: "Save Changes" });

    // View popup
    this.viewDetailsPanel = page.locator(".reg-admin-modal, [role='dialog']", { hasText: "Interview Details" });

    // Delete confirmation
    this.deleteConfirmDialog = page.locator(".reg-admin-modal, [role='dialog']", { hasText: "Delete Interview" });
    this.deleteConfirmButton = this.deleteConfirmDialog.locator("button", { hasText: "Delete Interview" });
  }

  // ================= Navigation =================

  async goToInterviewsPage(): Promise<void> {
    logger.info("Navigating to Interviews page via sidebar");
    await this.click(this.interviewsSidebarLink);
    await expect(this.interviewsPageTitle).toBeVisible();
  }

  async clickScheduleInterview(): Promise<void> {
    logger.info("Clicking Schedule Interview button on list page");
    await this.click(this.scheduleInterviewListButton);
    await expect(this.scheduleFormTitle).toBeVisible();
  }

  async verifyInterviewsPageVisible(): Promise<void> {
    logger.info("Verifying Interviews page is visible");
    await expect(this.interviewsPageTitle).toBeVisible();
  }

  async verifyScheduleFormVisible(): Promise<void> {
    logger.info("Verifying Schedule Interview form is visible");
    await expect(this.scheduleFormTitle).toBeVisible();
  }

  // ================= Schedule Interview form =================

  async fillInterviewTitle(title: string): Promise<void> {
    logger.info(`Filling interview title with: "${title}"`);
    await this.fill(this.interviewTitleInput, title);
  }

  /**
   * The candidate/interviewer control is a custom "searchable select":
   * click to open -> type to filter -> click the matching option.
   */
  private async selectFromSearchableSelect(trigger: Locator, query: string): Promise<void> {
    await this.click(trigger);
    const searchBox = this.page.locator(
      "[role='listbox'] input, .searchable-select-container input"
    ).last();
    if (await searchBox.isVisible().catch(() => false)) {
      await this.fill(searchBox, query);
    }
    const option = this.page.getByRole("option", { name: new RegExp(query, "i") }).first();
    await this.click(option);
  }

  async selectCandidate(candidateName: string): Promise<void> {
    logger.info(`Selecting candidate: ${candidateName}`);
    await this.selectFromSearchableSelect(this.candidateDropdownButton, candidateName);
  }

  async selectInterviewer(interviewerName: string): Promise<void> {
    logger.info(`Selecting interviewer/HR: ${interviewerName}`);
    await this.selectFromSearchableSelect(this.interviewerDropdownButton, interviewerName);
  }

  async setInterviewDate(date: string): Promise<void> {
    logger.info(`Setting interview date: ${date}`);
    await this.fill(this.interviewDateInput, date);
  }

  async setInterviewTime(time: string): Promise<void> {
    logger.info(`Setting interview time: ${time}`);
    await this.fill(this.interviewTimeInput, time);
  }

  async selectInterviewType(type: string): Promise<void> {
    logger.info(`Selecting interview type: ${type}`);
    await this.interviewTypeSelect.selectOption(type);
  }

  async selectDuration(duration: string): Promise<void> {
    logger.info(`Selecting interview duration: ${duration}`);
    await this.durationSelect.selectOption(duration);
  }

  async selectMeetingType(meetingType: string): Promise<void> {
    logger.info(`Selecting meeting type: ${meetingType}`);
    await this.meetingTypeSelect.selectOption(meetingType);
  }

  async addNotes(notes: string): Promise<void> {
    logger.info("Filling interview notes");
    await this.fill(this.notesTextarea, notes);
  }

  async submitScheduleInterview(): Promise<void> {
    logger.info("Submitting Schedule Interview form");
    await this.click(this.scheduleSubmitButton);
  }

  /**
   * End-to-end helper covering the whole "Schedule Interview" scenario.
   */
  async scheduleInterview(data: ScheduleInterviewData): Promise<void> {
    await this.fillInterviewTitle(data.title);
    await this.selectCandidate(data.candidateName);
    await this.selectInterviewer(data.interviewerName);
    await this.setInterviewDate(data.date);
    await this.setInterviewTime(data.time);
    if (data.interviewType) await this.selectInterviewType(data.interviewType);
    if (data.duration) await this.selectDuration(data.duration);
    if (data.meetingType) await this.selectMeetingType(data.meetingType);
    if (data.notes) await this.addNotes(data.notes);
    await this.submitScheduleInterview();
  }

  // ================= Search =================

  async searchInterview(keyword: string): Promise<void> {
    logger.info(`Searching interviews for keyword: ${keyword}`);
    await this.click(this.searchInput);
    await this.fill(this.searchInput, keyword);
    await this.searchInput.press("Enter");
  }

  /** Returns the row(s) in the table whose visible text contains the keyword. */
  getResultRow(keyword: string): Locator {
    return this.tableRows.filter({ hasText: keyword });
  }

  async assertSearchResultVisible(keyword: string): Promise<void> {
    logger.info(`Verifying search result is visible for: "${keyword}"`);
    const row = this.getResultRow(keyword);
    await expect(row.first()).toBeVisible();
  }

  /** Collects every candidate name currently rendered in the table (the "collection"). */
  async getAllCandidateNames(): Promise<string[]> {
    const names = await this.tableRows.locator(".reg-admin-participant .reg-admin-name").allTextContents();
    return names.map((n) => n.trim());
  }

  /** Asserts a candidate name is present among all rows currently loaded in the table. */
  async assertCandidateInList(candidateName: string): Promise<void> {
    logger.info(`Verifying candidate "${candidateName}" is present in the table`);
    const names = await this.getAllCandidateNames();
    expect(names.some((n) => n.includes(candidateName))).toBeTruthy();
  }

  // ================= Row actions =================

  async clickViewForRow(keyword: string): Promise<void> {
    logger.info(`Clicking View Details for row matching: "${keyword}"`);
    await this.click(this.getResultRow(keyword).locator('button[title="View Details"]'));
  }

  async clickEditForRow(keyword: string): Promise<void> {
    logger.info(`Clicking Edit Interview for row matching: "${keyword}"`);
    await this.click(this.getResultRow(keyword).locator('button[title="Edit Interview"]'));
  }

  async clickDeleteForRow(keyword: string): Promise<void> {
    logger.info(`Clicking Delete Interview for row matching: "${keyword}"`);
    await this.click(this.getResultRow(keyword).locator('button[title="Delete Interview"]'));
  }

  async clickCancelInterviewForRow(keyword: string): Promise<void> {
    logger.info(`Clicking Cancel Interview for row matching: "${keyword}"`);
    await this.click(this.getResultRow(keyword).locator('button[title="Cancel Interview"]'));
  }

  async clickChangeStatusForRow(keyword: string): Promise<void> {
    logger.info(`Clicking Change Status for row matching: "${keyword}"`);
    await this.click(this.getResultRow(keyword).locator('button[title="Change Status"]'));
  }

  // ================= Edit popup =================

  async assertEditPopupVisible(): Promise<void> {
    logger.info("Verifying Edit Interview popup is visible");
    await expect(this.editPopup).toBeVisible();
  }

  async changeInterviewTitle(newTitle: string): Promise<void> {
    logger.info(`Changing interview title to: "${newTitle}"`);
    await this.fill(this.editTitleInput, newTitle);
  }

  async saveChanges(): Promise<void> {
    logger.info("Clicking Save Changes button");
    await this.click(this.saveChangesButton);
  }

  // ================= View popup =================

  async assertViewDetailsVisible(): Promise<void> {
    logger.info("Verifying Interview Details popup is visible");
    await expect(this.viewDetailsPanel).toBeVisible();
  }

  // ================= Delete flow =================

  async confirmDeleteInterview(): Promise<void> {
    logger.info("Confirming interview deletion");
    await expect(this.deleteConfirmDialog).toBeVisible();
    await this.click(this.deleteConfirmButton);
  }

  async assertRowRemoved(keyword: string): Promise<void> {
    logger.info(`Verifying row for "${keyword}" was removed`);
    await expect(this.getResultRow(keyword)).toHaveCount(0);
  }
}