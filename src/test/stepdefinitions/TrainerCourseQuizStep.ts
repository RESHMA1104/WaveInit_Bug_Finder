import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/Bug_Finder";
import quizData from "../../../test-data/CourseQuizData.json";

let generatedQuizTitle: string;

// Timestamp suffix keeps the quiz title unique across repeated runs,
// since there's no visible way to delete a draft quiz from this UI yet.
When("the trainer navigates to the AI Quiz tab", async function (this: BugFinder) {
    await this.courseQuizPage.goToAiQuizTab();
});

When("the trainer clicks the Create Manually button", async function (this: BugFinder) {
    await this.courseQuizPage.clickCreateManually();
});

When("the trainer enters the quiz title", async function (this: BugFinder) {
    generatedQuizTitle = `${quizData.newQuiz.title} - ${Date.now()}`;
    await this.courseQuizPage.enterQuizTitle(generatedQuizTitle);
});

When("the trainer fills in all quiz questions", async function (this: BugFinder) {
    await this.courseQuizPage.addAndFillQuestions(quizData.newQuiz.questions);
});

When("the trainer clicks the Save as Draft button", async function (this: BugFinder) {
    await this.courseQuizPage.clickSaveAsDraft();
});

Then("the quiz should be saved as a draft", async function (this: BugFinder) {
    await this.courseQuizPage.verifyQuizSavedAsDraft(generatedQuizTitle);
});