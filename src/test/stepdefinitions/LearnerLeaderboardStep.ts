import { When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";
import { BugFinder } from "../../world/Bug_Finder";
When("the learner clicks on the Leaderboard option",async function (this: BugFinder) {
        logger.info("Clicking on Leaderboard option");
        await this.learnerLeaderboardPage.clickLeaderboardOption();
        logger.info("Leaderboard option clicked successfully");
    }
);
Then("the learner should be redirected to the leaderboard page",async function (this: BugFinder) {
        logger.info("Validating learner leaderboard page");
        await this.learnerLeaderboardPage.verifyLeaderboardPage();
        logger.info("Learner successfully redirected to the leaderboard page");
    }
);


When("the learner searches for the learner name {string}",async function (this: BugFinder, name: string) {
        logger.info(`Searching for learner name: ${name}`);
        await this.learnerLeaderboardPage.searchLearner(name);
        logger.info(`Learner name searched successfully: ${name}`);
    }
);
Then("the learner should be displayed with the searched result {string}",async function (this: BugFinder, name: string) {
        logger.info(`Validating searched learner result: ${name}`);
        await this.learnerLeaderboardPage.verifySearchedLearner(name);
        logger.info(`Searched learner result displayed successfully: ${name}`);
    }
);
Then("the learner should be displayed with the appropriate message {string}",async function (this: BugFinder, msg: string) {
        logger.info(`Validating no search result message: ${msg}`);
        await this.learnerLeaderboardPage.verifyInvalidSearchResult(msg);
        logger.info( `Appropriate message displayed successfully: ${msg}`);
    }
);