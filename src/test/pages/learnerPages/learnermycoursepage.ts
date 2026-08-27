import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";


export class MyCoursePage extends BasePage {
    private myCoursePageText: Locator;
    private firstCourseText: Locator;

    constructor(page: Page) {
        super(page);
        this.myCoursePageText = page.locator('//h2');
        this.firstCourseText = page.locator('(//h3)[1]');

    }

    async getMyCourseText() {
        return await this.getText(this.myCoursePageText);
    }
    async getFirstCourseText() {
        return await this.getText(this.firstCourseText);
    }
    async clickFirsteCourseText() {
        await this.click(this.firstCourseText);
    }
}