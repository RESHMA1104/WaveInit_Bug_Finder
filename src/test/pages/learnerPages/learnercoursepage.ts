import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";

export class CoursePage extends BasePage {
    private courseName: Locator;

    constructor(page: Page) {
        super(page);
        this.courseName = page.locator('//h1');
    }

    async getCourseName() {
        return await this.getText(this.courseName);
    }
}