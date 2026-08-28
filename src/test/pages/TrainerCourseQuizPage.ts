import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";
import { logger } from "../../utils/logger";

export interface QuizQuestionData {
    questionText: string;
    options: string[];
    correctOptionIndex: number;
}

export class CourseQuizPage extends BasePage {

    private aiQuizTab: Locator;
    private createManuallyBtn: Locator;
    private newQuizModalHeading: Locator;
    private quizTitleInput: Locator;
    private mandatoryCheckbox: Locator;
    private addQuestionBtn: Locator;
    private saveAsDraftBtn: Locator;
    private cancelBtn: Locator;
    private noQuizzesText: Locator;

    constructor(page: Page) {
        super(page);

        this.aiQuizTab = page.getByRole("tab", { name: "AI Quiz" });

        this.createManuallyBtn = page.getByRole("button", { name: "Create Manually" });

        this.newQuizModalHeading = page.getByRole("heading", { name: "New quiz" });

        this.quizTitleInput = page.getByPlaceholder("e.g. Module 2 Knowledge Check");

        this.mandatoryCheckbox = page.getByRole("checkbox", { name: "Mandatory to complete" });

        this.addQuestionBtn = page.getByRole("button", { name: "Add question" });

        this.saveAsDraftBtn = page.getByRole("button", { name: "Save as Draft" });

        this.cancelBtn = page.getByRole("button", { name: "Cancel" });

        this.noQuizzesText = page.getByText("No quizzes yet");
    }

    async goToAiQuizTab() {
        logger.info("Navigating to the AI Quiz tab");
        await this.click(this.aiQuizTab);
    }

    async clickCreateManually() {
        logger.info("Clicking Create Manually button");
        await this.click(this.createManuallyBtn);
        await this.toBeVisible(this.newQuizModalHeading);
    }

    async enterQuizTitle(title: string) {
        logger.info(`Entering quiz title: "${title}"`);
        await this.fill(this.quizTitleInput, title);
    }

    async setMandatory(mandatory: boolean) {
        logger.info(`Setting "Mandatory to complete" checkbox to: ${mandatory}`);
        const isChecked = await this.mandatoryCheckbox.isChecked();
        if (isChecked !== mandatory) {
            await this.click(this.mandatoryCheckbox);
        }
    }

    async clickAddQuestion() {
        logger.info("Clicking Add question button");
        await this.click(this.addQuestionBtn);
    }

    async fillQuestion(questionNumber: number, data: QuizQuestionData) {
    if (data.options.length !== 4) {
        throw new Error(
            `Question ${questionNumber} must have exactly 4 options, but got ${data.options.length}`
        );
    }

    const questionIndex = questionNumber - 1;

    logger.info(`Filling question ${questionNumber}: "${data.questionText}"`);
    const questionTextarea = this.page.getByPlaceholder("Type the question...").nth(questionIndex);
    await this.fill(questionTextarea, data.questionText);

    const optionInputs = this.page.getByRole("textbox", { name: /^Option [A-D]$/ });
    const optionRadios = this.page.getByRole("radio");

    for (let i = 0; i < 4; i++) {
        const globalOptionIndex = questionIndex * 4 + i;

        logger.info(`Filling Option ${String.fromCharCode(65 + i)}: "${data.options[i]}"`);
        await this.fill(optionInputs.nth(globalOptionIndex), data.options[i]);

        if (i === data.correctOptionIndex) {
            logger.info(`Marking Option ${String.fromCharCode(65 + i)} as the correct answer`);
            await this.click(optionRadios.nth(globalOptionIndex));
        }
    }
}

    async addAndFillQuestions(questions: QuizQuestionData[]) {
        for (let i = 0; i < questions.length; i++) {
            const questionNumber = i + 1;

            if (questionNumber > 1) {
                await this.clickAddQuestion();
            }

            await this.fillQuestion(questionNumber, questions[i]);
        }
    }

    async clickSaveAsDraft() {
        logger.info("Clicking Save as Draft button");
        await this.click(this.saveAsDraftBtn);
    }

    async clickCancel() {
        logger.info("Clicking Cancel button on New quiz modal");
        await this.click(this.cancelBtn);
    }

    async verifyQuizSavedAsDraft(quizTitle: string) {
        logger.info(`Verifying quiz "${quizTitle}" was saved as a draft`);
        await expect(this.page.getByText(quizTitle)).toBeVisible({ timeout: 15000 });
    }

    async verifyNoQuizzesState() {
        logger.info("Verifying 'No quizzes yet' empty state is displayed");
        await this.toBeVisible(this.noQuizzesText);
    }
}