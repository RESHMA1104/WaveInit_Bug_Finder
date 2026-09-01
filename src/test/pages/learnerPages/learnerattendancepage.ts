import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";

export class AttendancePage extends BasePage {

    private attendancePageHeading: Locator;
    private refreshButton: Locator;
    private reffreshSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.attendancePageHeading = page.locator('//h2[text()="My Attendance & Sessions"]');
        this.refreshButton = page.locator('//button[text()=" Refresh"]');
        this.reffreshSuccessMessage = page.locator('//div[text()="Attendance records refreshed"]');
    }

    async getAttendancePageHeading() {
        return await this.getText(this.attendancePageHeading);
    }

    async clickRefreshButton() {
        await this.click(this.refreshButton);
    }
    async getRefreshSuccessMessage() {
        return await this.getText(this.reffreshSuccessMessage);
    }
}