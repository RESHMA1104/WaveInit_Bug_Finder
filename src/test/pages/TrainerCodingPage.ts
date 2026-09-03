import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../../utils/logger";

export class CodingAssessmentPage extends BasePage {

    private codingTab: Locator;
    private generateWithAIBtn: Locator;
    private aiWizardHeading: Locator;
    private topicPromptTextarea: Locator;
    private numberOfProblemsDropdown: Locator;
    private difficultyDropdown: Locator;
    private languagesInput: Locator;
    private generateAssessmentBtn: Locator;
    private assessmentGeneratedToast: Locator;

    constructor(page: Page) {
        super(page);

        // NOTE: verify exact role/aria-label in DevTools before running
        this.codingTab = page.getByRole("button", { name: "Coding", exact: true })
            .or(page.getByRole("tab", { name: "Coding", exact: true }))
            .or(page.getByText("Coding", { exact: true }));

        this.generateWithAIBtn = page.getByRole("button", { name: "Generate with AI" });

        this.aiWizardHeading = page.getByRole("heading", { name: "Generate Coding Assessment with AI" });

        this.topicPromptTextarea = page.getByPlaceholder("e.g. JavaScript array methods, Python data structures, etc.");

        // ⚠️ Confirm these two selects expose an accessible name (label/aria-label).
        // If they don't, replace with a positional/container-based locator once you inspect the DOM.
        this.numberOfProblemsDropdown = page.getByLabel("Number of Problems")
            .or(page.locator("label", { hasText: "Number of Problems" }).locator("xpath=following-sibling::select"));

        this.difficultyDropdown = page.getByLabel("Difficulty")
            .or(page.locator("label", { hasText: "Difficulty" }).locator("xpath=following-sibling::select"));

        this.languagesInput = page.getByLabel("Languages (comma-separated)")
            .or(page.locator("label", { hasText: "Languages (comma-separated)" }).locator("xpath=following-sibling::input"));

        this.generateAssessmentBtn = page.getByRole("button", { name: "Generate Assessment", exact: true });

        this.assessmentGeneratedToast = page.getByText(/assessment generated/i);
    }

    async openCourse(courseTitle: string) {
        logger.info(`Opening course: "${courseTitle}"`);
        const courseItem = this.page.locator("text=" + courseTitle).first();
        await this.click(courseItem);
    }

    async navigateToCodingTab() {
        logger.info("Navigating to Coding tab");
        await this.click(this.codingTab);
    }

    async clickGenerateWithAI() {
        logger.info("Clicking 'Generate with AI' button");
        await this.click(this.generateWithAIBtn);
    }

    async verifyAIWizardVisible() {
        logger.info("Verifying AI Coding Wizard modal is displayed");
        await this.toBeVisible(this.aiWizardHeading);
    }

    async enterTopicPrompt(prompt: string) {
        logger.info(`Entering coding topic prompt: "${prompt}"`);
        await this.fill(this.topicPromptTextarea, prompt);
    }

    async selectNumberOfProblems(value: string) {
        logger.info(`Selecting number of problems: "${value}"`);
        await this.numberOfProblemsDropdown.selectOption({ label: value });
    }

    async selectDifficulty(value: string) {
        logger.info(`Selecting difficulty: "${value}"`);
        await this.difficultyDropdown.selectOption({ label: value });
    }

    async enterLanguages(languages: string) {
        logger.info(`Entering languages: "${languages}"`);
        await this.fill(this.languagesInput, languages);
    }

    async clickGenerateAssessment() {
        logger.info("Clicking 'Generate Assessment' button");
        await this.click(this.generateAssessmentBtn);
    }

    async verifyAssessmentGenerated() {
        logger.info("Waiting for coding assessment generation to complete (can take up to 2.5 minutes)");
        await expect(this.assessmentGeneratedToast).toBeVisible({ timeout: 180000 }); // 3 min ceiling
    }
}