import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/Bug_Finder";


When("the trainer opens the course editor for {string}", async function (this: BugFinder, courseTitle: string) {
    await this.courseStructurePage.openCourseEditorForCourse(courseTitle);
});

Then("the trainer should see the Generate Course Structure page", async function (this: BugFinder) {
    await this.courseStructurePage.verifyOnGenerateStructurePage();
});

When("the trainer enters a structure prompt {string}", async function (this: BugFinder, prompt: string) {
    await this.courseStructurePage.enterStructurePrompt(prompt);
});

When("the trainer clicks the Generate Structure button", async function (this: BugFinder) {
    await this.courseStructurePage.clickGenerateStructure();
});

Then("the course structure should be generated successfully", { timeout: 200 * 1000 }, async function (this: BugFinder) {
    await this.courseStructurePage.verifyStructureGenerated();
});