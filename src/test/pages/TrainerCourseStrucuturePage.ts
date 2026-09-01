import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../../utils/logger";

export class CourseStructurePage extends BasePage {

    private openCourseEditorOption: Locator;
    private structureGeneratedHeading: Locator;
    private generateFromPromptTextarea: Locator;
    private generateStructureBtn: Locator;
    private structureGeneratedToast: Locator;

    constructor(page: Page) {
        super(page);

        this.openCourseEditorOption = page.getByRole("button", { name: "Open Course Editor" });

        this.structureGeneratedHeading = page.getByRole("heading", { name: "Generated Structure Preview" });

        this.generateFromPromptTextarea = page.getByPlaceholder(
            "e.g., Create a complete Python course for beginners, from basics to advanced, for 1 month with 7 hours of learning every day."
        );

        this.generateStructureBtn = page.getByRole("button", { name: "Generate Structure" });

        this.structureGeneratedToast = page.getByText("Course structure generated");
    }

    async openCourseEditorForCourse(courseTitle: string) {
        logger.info(`Opening actions menu for course: "${courseTitle}"`);

        // Make sure the course list has actually rendered before searching it
        await this.page.getByText(courseTitle, { exact: true }).first().waitFor({ state: "visible", timeout: 15000 });

        // Don't assume role="row" — scope to whichever container wraps the title text
        const courseContainer = this.page
            .locator("tr, [role='row'], div")
            .filter({ hasText: courseTitle })
            .last(); // .last() favors the most specific/innermost matching wrapper

        const courseOptionsBtn = courseContainer.getByRole("button", { name: /course options|more options|actions/i });

        await this.click(courseOptionsBtn);

        logger.info("Clicking 'Open Course Editor' button");
        await this.click(this.openCourseEditorOption);
    }

    async verifyOnGenerateStructurePage() {
        logger.info("Verifying Generate Course Structure page is displayed");
        await this.toBeVisible(this.structureGeneratedHeading);
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
    await expect(this.structureGeneratedHeading).toBeVisible({ timeout: 180000 }); // 3 min ceiling
}
}