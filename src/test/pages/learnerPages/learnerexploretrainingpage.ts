import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";

export class ExploreTrainingPage extends BasePage {
    private openFilterButton: Locator;
    private joinTrainingButton: Locator;
    private courseEnrollmentSuccessMessage: Locator;
    private searchBar: Locator;
    private allCourseName: Locator;

    constructor(page: Page) {
        super(page);
        this.openFilterButton = page.locator('//button[text()="Open"]');
        this.joinTrainingButton = page.locator('(//button/child::span[text()="Join Training"])[1]');
        this.courseEnrollmentSuccessMessage = page.locator('//div[text()="Enrolled successfully!"]');
        this.searchBar = page.locator('//input[@placeholder="Search trainings..."]');
        this.allCourseName = page.locator('//h3');

    }

    async clickOpenFilter() {
        await this.click(this.openFilterButton);
    }

    async clickJoinTrainingButton() {
        await this.click(this.joinTrainingButton);
    }

    async getCourseEnrollmentSuccessMessage() {
        return await this.getText(this.courseEnrollmentSuccessMessage);
    }

    async enterSearchValue(coursename: string) {
        await this.fill(this.searchBar, coursename);
    }

    async getAllSearchResultCourseName(courseName: string) {
        await expect(
            this.allCourseName.filter({ hasText: courseName }).first()
        ).toBeVisible({ timeout: 10000 });

        return await this.allTextContent(this.allCourseName);
    }
}