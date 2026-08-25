import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";

export class LearnerDashBoardPage extends BasePage {
    private learnerDashBoardAssertion: Locator;
    private signoutButton: Locator;
    private exploreCourseButton: Locator;


    constructor(page: Page) {
        super(page);
        this.learnerDashBoardAssertion = page.locator('//div[text()=" · Online"]');
        this.signoutButton = page.locator('//button[text()=" Sign Out"]');
        this.exploreCourseButton = page.locator('//button[text()=" Explore Courses"]');
    }

    async getLearnerDashboardSuccessText() {
        return await this.getText(this.learnerDashBoardAssertion);
    }

    async clickLearnersNameInLeftDrawer() {
        await this.click(this.learnerDashBoardAssertion);
    }

    async clickSignoutButton() {
        await this.click(this.signoutButton);
    }
    async clickExploreCourseButton() {
        await this.click(this.exploreCourseButton);
    }

}