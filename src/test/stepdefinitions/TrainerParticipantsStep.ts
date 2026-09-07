import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/Bug_Finder";
import testData from "../../../test-data/participantInviteData.json";

type InviteTestDataKey = keyof typeof testData;

When("the trainer opens the course for the {string} test data", async function (this: BugFinder, dataKey: InviteTestDataKey) {
    const data = testData[dataKey];
    await this.participantsPage.openCourse(data.courseTitle);
});

When("the trainer navigates to the Participants tab", async function (this: BugFinder) {
    await this.participantsPage.navigateToParticipantsTab();
});

When("the trainer clicks the Invite Participants button", async function (this: BugFinder) {
    await this.participantsPage.clickInviteParticipants();
});

Then("the trainer should see the Approved Participants dialog", async function (this: BugFinder) {
    await this.participantsPage.verifyApprovedParticipantsDialogVisible();
});

When("the trainer searches for the participant from the {string} test data", async function (this: BugFinder, dataKey: InviteTestDataKey) {
    const data = testData[dataKey] as { participantSearchTerm: string };
    await this.participantsPage.searchParticipant(data.participantSearchTerm);
});

When("the trainer selects the participant from the {string} test data", async function (this: BugFinder, dataKey: InviteTestDataKey) {
    const data = testData[dataKey] as { participantEmail: string };
    await this.participantsPage.selectParticipantByEmail(data.participantEmail);
});

When("the trainer clicks the Select All button", async function (this: BugFinder) {
    await this.participantsPage.clickSelectAll();
});

When("the trainer clicks the Invite Selected Participants button", async function (this: BugFinder) {
    await this.participantsPage.clickInviteSelectedParticipants();
});

Then("the participant should be added successfully", async function (this: BugFinder) {
    await this.participantsPage.verifyParticipantAddedSuccessfully();
});