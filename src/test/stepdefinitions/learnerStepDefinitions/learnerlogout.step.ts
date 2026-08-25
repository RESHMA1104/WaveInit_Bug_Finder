import { Then, When } from "@cucumber/cucumber";
import type { BugFinder } from "../../../world/Bug_Finder";
import { logger } from "../../../utils/logger";

When('the learner clicks on learner name in left drawer', async function (this: BugFinder) {
    logger.info("Clicking on learner name in the left drawer");
    await this.learnerdashboardpage.clickLearnersNameInLeftDrawer();
    logger.info("Learner name clicked successfully");
});
When('the learner clicks on Sign-out Button', async function (this: BugFinder) {
    logger.info("Clicking on Sign-out button");
    await this.learnerdashboardpage.clickSignoutButton();
    logger.info("Sign-out button clicked successfully");
});
Then('the learner should be redirected to Sign-in page', async function (this: BugFinder) {
    logger.info("Verifying learner is redirected to the Sign-in page");
    await this.signinpage.getSignInpageTxt();
    logger.info("Learner is successfully redirected to the Sign-in page");
});