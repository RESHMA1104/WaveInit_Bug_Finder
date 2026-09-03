import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";

export class LearnerDashBoardPage extends BasePage {
    private learnerDashBoardAssertion: Locator;
    private signoutButton: Locator;
    private exploreCourseButton: Locator;
    private myCourseButtonLeftDrawer: Locator;
    private attendenceButtonLeftDrawer: Locator;
    private progressAndAnalyticsLeftDrawerButton: Locator;
    private profileButtonLeftDrawer: Locator;
    private dashBoardTitlePara: Locator;


    constructor(page: Page) {
        super(page);
        this.learnerDashBoardAssertion = page.locator('//div[text()=" · Online"]');
        this.signoutButton = page.locator('//button[text()=" Sign Out"]');
        this.exploreCourseButton = page.locator('//button[text()=" Explore Courses"]');
        this.myCourseButtonLeftDrawer = page.locator('//button/child::span[text()="My Courses"]');
        this.attendenceButtonLeftDrawer = page.locator('//button/child::span[text()="Attendance"]');
        this.progressAndAnalyticsLeftDrawerButton = page.locator('//button/child::span[text()="Progress & Analytics"]');
        this.profileButtonLeftDrawer = page.locator('//span[text()="Profile"]');
        this.dashBoardTitlePara = page.locator('//h1/following-sibling::p');
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
    async clickMyCourseButton() {
        await this.click(this.myCourseButtonLeftDrawer);
    }

    async clickAttendenceButton() {
        await this.click(this.attendenceButtonLeftDrawer);
    }

    async clickProgressAnalyticsButton() {
        await this.click(this.progressAndAnalyticsLeftDrawerButton);
    }

    async clickProfileButton() {
        await this.click(this.profileButtonLeftDrawer);
    }

    async getDashBoardTitlePara() {
        return await this.getText(this.dashBoardTitlePara);
    }

}