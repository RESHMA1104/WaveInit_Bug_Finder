import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../../utils/logger";

export class CourseStructurePage extends BasePage {

    private myTrainingsNavLink: Locator;
    private openCourseEditorOption: Locator;
    private generateFromPromptTextarea: Locator;
    private generateStructureBtn: Locator;
    private structureGeneratedToast: Locator;

    constructor(page: Page) {
        super(page);

        this.myTrainingsNavLink = page.locator("button.wl-sidebar-item", { hasText: "My Trainings" });

        this.openCourseEditorOption = page.getByRole("menuitem", { name: "Open Course Editor" })
            .or(page.getByText("Open Course Editor"));

        this.generateFromPromptTextarea = page.getByPlaceholder(
            "e.g., Create a complete Python course for beginners, from basics to advanced, for 1 month with 7 hours of learning every day."
        );

        this.generateStructureBtn = page.getByRole("button", { name: "Generate Structure" });

        this.structureGeneratedToast = page.locator("//div[normalize-space()='Course structure generated and saved successfully']");
    }

    async navigateToMyTrainings() {
        logger.info("Navigating to My Trainings page");
        await this.click(this.myTrainingsNavLink);
    }

    async openCourseEditorForCourse(courseTitle: string) {
        logger.info(`Opening actions menu for course: "${courseTitle}"`);
        const courseRow = this.page.locator("tr, [role='row']").filter({ hasText: courseTitle });
        const actionsBtn = courseRow.getByRole("button", { name: /actions|more options|course options|\.\.\./i });
        await this.click(actionsBtn);

        logger.info("Clicking 'Open Course Editor' option");
        await this.click(this.openCourseEditorOption);
    }

    async verifyOnGenerateStructurePage() {
        logger.info("Verifying Generate Course Structure page is displayed");
        await this.toBeVisible(this.generateFromPromptTextarea);
    }

    async enterStructurePrompt(prompt: string) {
        logger.info(`Entering structure generation prompt: "${prompt}"`);
        await this.fill(this.generateFromPromptTextarea, prompt);
    }

    async clickGenerateStructure() {
        logger.info("Clicking Generate Structure button");
        await this.click(this.generateStructureBtn);
    }

    async verifyStructureGenerated() {
        logger.info("Waiting for course structure generation to complete (can take up to 2.5 minutes)");
        await expect(this.structureGeneratedToast).toBeVisible({ timeout: 180000 });
    }
}