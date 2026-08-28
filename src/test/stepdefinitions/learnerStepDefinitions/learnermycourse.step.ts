import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { expect } from "playwright/test";
import myCourseData from "../../../../test-data/learnerData.json";
import specificCourse from "../../../../test-data/learnerData.json";
import { logger } from "../../../utils/logger";

let courseNameInMyCourse: string | null;

When('the learner clicks on myCourse in left drawer', async function (this: BugFinder) {
    logger.info("Clicking on My Course in left drawer");
    await this.learnerdashboardpage.clickMyCourseButton();
    logger.info("Clicked on My Course in left drawer");
});

Then('the learner should redirected to My course page', async function (this: BugFinder) {
    logger.info("Validating My Course page");
    const actual = await this.mycoursepage.getMyCourseText();
    logger.info("Actual My Course page text: " + actual);
    logger.info("Expected My Course page text: " + myCourseData.myCourseData[0].mycourseSuccess);
    expect(actual).toBe(myCourseData.myCourseData[0].mycourseSuccess);
    logger.info("My Course page validation passed");
});

When('the learner clicks on first course in my Course', async function (this: BugFinder) {
    logger.info("Getting the first course name from My Course");
    courseNameInMyCourse = await this.mycoursepage.getFirstCourseText();
    logger.info("First course name: " + courseNameInMyCourse);
    logger.info("Clicking on the first course in My Course");
    await this.mycoursepage.clickFirsteCourseText();
    logger.info("Clicked on the first course in My Course");
});

Then('the learner should be redirected to specific course', async function (this: BugFinder) {
    logger.info("Validating redirection to the specific course");
    const actual = await this.coursepage.getCourseName();
    logger.info("Expected course name: " + courseNameInMyCourse);
    logger.info("Actual course name: " + actual);
    expect(actual).toBe(courseNameInMyCourse);
    logger.info("Specific course redirection validation passed");
});
When('the learner enter the valid course in search Bar', async function (this: BugFinder) {
    logger.info("Entering valid course in search bar: " + myCourseData.myCourseData[0].validSearch);
    await this.mycoursepage.enterCourseNameInSearch(myCourseData.myCourseData[0].validSearch);
    logger.info("Valid course entered successfully");
});
Then('the learner should see results based on searched Course', async function (this: BugFinder) {
    logger.info("Validating search results based on searched course");
    const actual = await this.mycoursepage.getFirstCourseText();
    logger.info("Actual course text: " + actual);
    logger.info("Expected course text: " + myCourseData.myCourseData[0].validSearch);
    expect(actual).toContain(myCourseData.myCourseData[0].validSearch);
    logger.info("Search result validation passed successfully");
});
When('the learner enter the invalid course in search Bar', async function (this: BugFinder) {
    logger.info("Entering invalid course in search bar: " + myCourseData.myCourseData[0].invalidSearch);
    await this.mycoursepage.enterCourseNameInSearch(myCourseData.myCourseData[0].invalidSearch);
    logger.info("Invalid course entered successfully");
});
Then('the learner should displayed with No course found text', async function (this: BugFinder) {
    logger.info("Validating No course found message");
    const actual = await this.mycoursepage.getNoCourseFoundText();
    logger.info("Actual No course found text: " + actual);
    logger.info("Expected No course found text: " + myCourseData.myCourseData[0].inavlidSearchMsg);
    expect(actual).toContain(myCourseData.myCourseData[0].inavlidSearchMsg);
    logger.info("No course found message validation passed successfully");
});
When('the learner clicks on lessons tab', async function (this: BugFinder) {
    logger.info("Clicking on Lessons tab");
    await this.coursepage.clickLessonTab();
    logger.info("Lessons tab clicked successfully");
});
Then('the learner should redirected to learning content sub tab', async function (this: BugFinder) {
    logger.info("Validating Learning Content sub tab");
    const actual = await this.coursepage.getLessonSTText();
    logger.info("Actual Learning Content text: " + actual);
    logger.info("Expected Learning Content text: " + specificCourse.specificCourse[0].lessons);
    expect(actual).toContain(specificCourse.specificCourse[0].lessons);
    logger.info("Learning Content sub tab validation passed successfully");
});
When('the learner clicks on quiz tab', async function (this: BugFinder) {
    logger.info("Clicking on Quiz tab");
    await this.coursepage.clickAiQuizTab();
    logger.info("Quiz tab clicked successfully");
});
Then('the learner should redirected to Quizzes  sub tab', async function (this: BugFinder) {
    logger.info("Validating Quizzes sub tab");
    const actual = await this.coursepage.getAiQuizSTText();
    logger.info("Actual Quizzes text: " + actual);
    logger.info("Expected Quizzes text: " + specificCourse.specificCourse[0].aiQuiz);
    expect(actual).toContain(specificCourse.specificCourse[0].aiQuiz);
    logger.info("Quizzes sub tab validation passed successfully");
});
When('the learner clicks on discussion tab', async function (this: BugFinder) {
    logger.info("Clicking on Discussion tab");
    await this.coursepage.clickDiscussionTab();
    logger.info("Discussion tab clicked successfully");
});
Then('the learner should redirected to join discussion sub tab', async function (this: BugFinder) {
    logger.info("Validating Join Discussion sub tab");
    const actual = await this.coursepage.getDiscussionSTText();
    logger.info("Actual Join Discussion text: " + actual);
    logger.info("Expected Join Discussion text: " + specificCourse.specificCourse[0].discussions);
    expect(actual).toContain(specificCourse.specificCourse[0].discussions);
    logger.info("Join Discussion sub tab validation passed successfully");
});