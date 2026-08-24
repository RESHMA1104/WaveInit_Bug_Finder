import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class LearnerDashBoardPage extends BasePage {
    private learnerDashBoardAssertion: Locator;

    constructor(page: Page) {
        super(page);
        this.learnerDashBoardAssertion = page.locator('//div[text()=" · Online"]')
    }

    async getLearnerDashboardSuccessText() {
        return await this.getText(this.learnerDashBoardAssertion);
    }

}