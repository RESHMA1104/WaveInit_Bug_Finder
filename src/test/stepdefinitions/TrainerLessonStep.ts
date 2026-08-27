import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/Bug_Finder";
import moduleData from "../../../test-data/TrainerLessonData.json";

let generatedTitle: string;

When("the trainer navigates to the Lessons tab", async function (this: BugFinder) {
    await this.courseLessonsPage.goToLessonsTab();
});

When("the trainer clicks the Add Module button", async function (this: BugFinder) {
    await this.courseLessonsPage.clickAddModule();
});

When("the trainer enters the module title", async function (this: BugFinder) {
    generatedTitle = `${moduleData.newModule.title} - ${Date.now()}`;
    await this.courseLessonsPage.enterModuleTitle(generatedTitle);
});

When("the trainer enters the module description", async function (this: BugFinder) {
    await this.courseLessonsPage.enterModuleDescription(moduleData.newModule.description);
});

When("the trainer enters the module summary", async function (this: BugFinder) {
    await this.courseLessonsPage.enterModuleSummary(moduleData.newModule.summary);
});

When("the trainer clicks the Create Module button", async function (this: BugFinder) {
    await this.courseLessonsPage.clickCreateModule();
});

Then("the new module should appear in the Learning Content list", async function (this: BugFinder) {
    await this.courseLessonsPage.verifyModuleCreated(generatedTitle);
});