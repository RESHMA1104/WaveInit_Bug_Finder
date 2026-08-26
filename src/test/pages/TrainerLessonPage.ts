import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../../utils/logger";

export class CourseLessonsPage extends BasePage {

    private lessonsTab: Locator;
    private addModuleBtn: Locator;
    private createModuleModalHeading: Locator;
    private moduleTitleInput: Locator;
    private moduleDescriptionInput: Locator;
    private moduleSummaryInput: Locator;
    private createModuleBtn: Locator;
    private cancelBtn: Locator;
    private learningContentHeading: Locator;

    constructor(page: Page) {
        super(page);

        this.lessonsTab = page.getByRole("tab", { name: "Lessons" });

        this.addModuleBtn = page.getByRole("button", { name: "Add Module" });

        this.createModuleModalHeading = page.getByRole("heading", { name: "Create New Module" });

        this.moduleTitleInput = page.getByPlaceholder("e.g. Module 1: Introduction to Machine Learning");

        this.moduleDescriptionInput = page.getByPlaceholder("Brief summary of the module content");

        this.moduleSummaryInput = page.getByPlaceholder("Optional text details shown when viewing lesson content");

        this.createModuleBtn = page.getByRole("button", { name: "Create Module" });

        this.cancelBtn = page.getByRole("button", { name: "Cancel" });

        this.learningContentHeading = page.getByRole("heading", { name: "Learning Content" });
    }

    async goToLessonsTab() {
        logger.info("Navigating to the Lessons tab");
        await this.click(this.lessonsTab);
        await this.toBeVisible(this.learningContentHeading);
    }

    async clickAddModule() {
        logger.info("Clicking Add Module button");
        await this.click(this.addModuleBtn);
        await this.toBeVisible(this.createModuleModalHeading);
    }

    async enterModuleTitle(title: string) {
        logger.info(`Entering module title: "${title}"`);
        await this.fill(this.moduleTitleInput, title);
    }

    async enterModuleDescription(description: string) {
        logger.info(`Entering module description: "${description}"`);
        await this.fill(this.moduleDescriptionInput, description);
    }

    async enterModuleSummary(summary: string) {
        logger.info(`Entering module summary/content: "${summary}"`);
        await this.fill(this.moduleSummaryInput, summary);
    }

    async clickCreateModule() {
        logger.info("Clicking Create Module button");
        await this.click(this.createModuleBtn);
    }

    async clickCancel() {
        logger.info("Clicking Cancel button on Create New Module modal");
        await this.click(this.cancelBtn);
    }

    async verifyModuleCreated(title: string) {
        logger.info(`Verifying new module "${title}" appears in the Learning Content list`);
        await expect(this.page.getByText(title)).toBeVisible({ timeout: 15000 });
    }
}