import { Then, When } from "@cucumber/cucumber";

import type { BugFinder } from "../../../world/Bug_Finder";

import { expect } from "playwright/test";

import myCourseData from "../../../../test-data/learnerData.json";

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