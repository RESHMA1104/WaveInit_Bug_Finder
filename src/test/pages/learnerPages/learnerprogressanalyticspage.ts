import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";


export class ProgressAnalyticsPage extends BasePage {
    private progressAnalyticsHeading: Locator;
    private progressAnalyticsRefreshButton: Locator;
    private progressAnalayticsRefreshSuccessMessage: Locator;


    constructor(page: Page) {
        super(page);
        this.progressAnalyticsHeading = page.locator('//h2');
        this.progressAnalyticsRefreshButton = page.locator('//button[text()=" Refresh"]');
        this.progressAnalayticsRefreshSuccessMessage = page.locator('//div[text()="Progress metrics refreshed"]');
    }

    async getPAHeading() {
        return await this.getText(this.progressAnalyticsHeading);
    }
    async clickPARefreshButton() {
        await this.click(this.progressAnalyticsRefreshButton);
    }
    async getPARefreshSuccessMessage() {
        return await this.getText(this.progressAnalayticsRefreshSuccessMessage);

    }
}