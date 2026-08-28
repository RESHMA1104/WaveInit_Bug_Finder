import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";


export class MyCoursePage extends BasePage {
    private myCoursePageText: Locator;
    private firstCourseText: Locator;
    private searchBar: Locator;
    private noCourseFoundText: Locator;

    constructor(page: Page) {
        super(page);
        this.myCoursePageText = page.locator('//h2');
        this.firstCourseText = page.locator('(//h3)[1]');
        this.searchBar = page.locator('//input[@placeholder="Search courses by title..."]');
        this.noCourseFoundText = page.locator('//td/child::div/child::p');


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
    async enterCourseNameInSearch(cname: string) {
        await this.fill(this.searchBar, cname);
    }

    async getNoCourseFoundText() {
        await this.page.waitForTimeout(10000);
        return await this.getText(this.noCourseFoundText);
    }
}