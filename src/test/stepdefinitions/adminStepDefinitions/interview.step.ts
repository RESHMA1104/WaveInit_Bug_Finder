import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { logger } from "../../../utils/logger";
import { BugFinder } from "../../../world/Bug_Finder";

// NOTE: `this.page` and `this.interviewPage` are assumed to be set on the
// BugFinder World (e.g. in a Before hook: this.interviewPage = new InterviewPage(this.page)).
// Adjust the getter below if your World wires the page object differently.

// ---------- Navigation ----------

When("the admin clicks the Interviews link in the left sidebar", async function (this: BugFinder) {
  await this.interview.goToInterviewsPage();
});

Then("the application should redirect to the Interviews page", async function (this: BugFinder) {
  await this.interview.verifyInterviewsPageVisible();
});

// ---------- Scenario: Schedule an interview ----------

When("the admin click the Schedule interview button", async function (this: BugFinder) {
  await this.interview.clickScheduleInterview();
});

Then("the Schedule interview page should be visible", async function (this: BugFinder) {
  await this.interview.verifyScheduleFormVisible();
});

When(
  "the admin click the interview title and enter interview title",
  async function (this: BugFinder) {
    await this.interview.fillInterviewTitle("Tamil");
  }
);

When("the admin click the interview date and interview time", async function (this: BugFinder) {
  await this.interview.setInterviewDate("2026-09-10");
  await this.interview.setInterviewTime("14:00");
});

When("the admin chooses the which candidate to Schedule interview",async function (this: BugFinder) {
    await this.interview.selectCandidate("Tamil");
});

When("the admin chooses the HR for conduct the interview", async function (this: BugFinder) {
  await this.interview.selectInterviewer("Subathra");
});

When("the admin choose the time duration for the interview", async function (this: BugFinder) {
  await this.interview.selectDuration("60");
});

When(
  "the admin adds the notes/Description about the interview",
  async function (this: BugFinder) {
    await this.interview.addNotes("Automated test - Tamil candidate interview");
  }
);

When("the admin click the Schedule interview button", async function (this: BugFinder) {
  await this.interview.submitScheduleInterview();
});

Then("the newly Schedule interview should be created", async function (this: BugFinder) {
  await this.interview.searchInterview("Tamil");
  await this.interview.assertSearchResultVisible("Tamil");
});

// ---------- Scenario Outline: Interview Search ----------

When(
  "the admin clicks the search bar and searches for {string}",
  async function (this: BugFinder, keyword: string) {
    await this.interview.searchInterview(keyword);
  }
);

Then(
  "the appropriate result for {string} should be displayed",
  async function (this: BugFinder, keyword: string) {
    await this.interview.assertSearchResultVisible(keyword);
    // Also verify against the full collection of candidate names in the current table
    await this.interview.assertCandidateInList(keyword);
  }
);

// ---------- Scenario: Edit the interview ----------

When("the admin click the edit button", async function (this: BugFinder) {
  await this.interview.clickEditForRow("Tamil");
});

Then("the edit interview popup should be visible", async function (this: BugFinder) {
  await this.interview.assertEditPopupVisible();
});

When(
  "the admin changes the interview title {string}",
  async function (this: BugFinder, newTitle: string) {
    await this.interview.changeInterviewTitle(newTitle);
  }
);

When("the admin click the save changes button", async function (this: BugFinder) {
  await this.interview.saveChanges();
});

Then("the edit should be done successfully", async function (this: BugFinder) {
  await this.interview.searchInterview("Manual Testing");
  await this.interview.assertSearchResultVisible("Manual Testing");
});

// ---------- Scenario: View the interview ----------

When("the admin click the view button", async function (this: BugFinder) {
  await this.interview.clickViewForRow("Tamil");
});

Then("the interview details should be visible", async function (this: BugFinder) {
  await this.interview.assertViewDetailsVisible();
});

// ---------- Scenario: Delete the interview ----------

When(
  "the admin click the delete button in the appropriate Schedule interview",
  async function (this: BugFinder) {
    await this.interview.clickDeleteForRow("Tamil");
  }
);

When("the admin click the delete interview button", async function (this: BugFinder) {
  await this.interview.confirmDeleteInterview();
});

Then("the interview should be deleted successfully", async function (this: BugFinder) {
  await this.interview.assertRowRemoved("Tamil");
});