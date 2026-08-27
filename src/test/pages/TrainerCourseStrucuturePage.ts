import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../../utils/logger";

export class CourseStructurePage extends BasePage {

    private openCourseEditorOption: Locator;
    private generateStructureHeading: Locator;
    private generateFromPromptTextarea: Locator;
    private generateStructureBtn: Locator;
    private generatedModulesList: Locator;

    constructor(page: Page) {
        super(page);

        this.openCourseEditorOption = page.getByRole("menuitem", { name: "Open Course Editor" });

        this.generateStructureHeading = page.getByRole("heading", { name: "Generate Course Structure" });

        this.generateFromPromptTextarea = page.getByPlaceholder(
            "e.g., Create a complete Python course for beginners, from basics to advanced, for 1 month with 7 hours of learning every day."
        );

        this.generateStructureBtn = page.getByRole("button", { name: "Generate Structure" });

        this.generatedModulesList = page.locator('[data-testid="generated-modules-list"]');
    }

    async openCourseEditorForCourse(courseTitle: string) {
        logger.info(`Opening actions menu for course: "${courseTitle}"`);
        const rowActionsBtn = this.page
            .locator("tr", { hasText: courseTitle })
            .getByRole("button")
            .last();

        await this.click(rowActionsBtn);

        logger.info("Clicking 'Open Course Editor' option");
        await this.click(this.openCourseEditorOption);
    }

    async verifyOnGenerateStructurePage() {
        logger.info("Verifying Generate Course Structure page is displayed");
        await this.toBeVisible(this.generateStructureHeading);
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
        logger.info("Verifying course structure was generated");
        await expect(this.generatedModulesList).toBeVisible({ timeout: 30000 });
    }
}