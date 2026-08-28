import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";

export class CoursePage extends BasePage {
    private courseName: Locator;
    private lessonTab: Locator;
    private aiQuizTab: Locator;
    private discussionTab: Locator;
    private lessonSubTab: Locator;
    private aiQuizSubTab: Locator;
    private discussionSubTab: Locator;

    constructor(page: Page) {
        super(page);
        this.courseName = page.locator('//h1');
        this.lessonTab = page.locator('//button/child::span[text()="Lessons"]');
        this.aiQuizTab = page.locator('//button/child::span[text()="AI Quiz"]');
        this.discussionTab = page.locator('(//button/child::span[text()="Discussions"])[1]  ');
        this.lessonSubTab = page.locator('//h2');
        this.aiQuizSubTab = page.locator('//h2[text()="Quizzes"]');
        this.discussionSubTab = page.locator('//h4');
    }

    async getCourseName() {
        return await this.getText(this.courseName);
    }

    async clickLessonTab() {
        await this.click(this.lessonTab);
    }

    async clickAiQuizTab() {
        await this.click(this.aiQuizTab);
    }

    async clickDiscussionTab() {
        await this.click(this.discussionTab);
    }

    async getLessonSTText() {
        await this.page.waitForTimeout(5000);
        return await this.getText(this.lessonSubTab);
    }
    async getAiQuizSTText() {
        await this.page.waitForTimeout(5000);
        return await this.getText(this.aiQuizSubTab);
    }
    async getDiscussionSTText() {
        await this.page.waitForTimeout(5000);
        return await this.getText(this.discussionSubTab);
    }
}