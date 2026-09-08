import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/Bug_Finder";

When("the trainer opens the course {string}", async function (this: BugFinder, courseTitle: string) {
    await this.codingAssessmentPage.openCourse(courseTitle);
});

When("the trainer navigates to the Coding tab", async function (this: BugFinder) {
    await this.codingAssessmentPage.navigateToCodingTab();
});

When("the trainer clicks the Generate with AI button", async function (this: BugFinder) {
    await this.codingAssessmentPage.clickGenerateWithAI();
});

Then("the trainer should see the AI Coding Wizard", async function (this: BugFinder) {
    await this.codingAssessmentPage.verifyAIWizardVisible();
});

When("the trainer enters a coding topic prompt {string}", async function (this: BugFinder, prompt: string) {
    await this.codingAssessmentPage.enterTopicPrompt(prompt);
});

When("the trainer selects {string} as the number of problems", async function (this: BugFinder, value: string) {
    await this.codingAssessmentPage.selectNumberOfProblems(value);
});

When("the trainer selects {string} as the difficulty", async function (this: BugFinder, value: string) {
    await this.codingAssessmentPage.selectDifficulty(value);
});

When("the trainer enters languages {string}", async function (this: BugFinder, languages: string) {
    await this.codingAssessmentPage.enterLanguages(languages);
});

When("the trainer clicks the Generate Assessment button", async function (this: BugFinder) {
    await this.codingAssessmentPage.clickGenerateAssessment();
});

Then("the coding assessment should be generated successfully", { timeout: 200 * 1000 }, async function (this: BugFinder) {
    await this.codingAssessmentPage.verifyAssessmentGenerated();
});