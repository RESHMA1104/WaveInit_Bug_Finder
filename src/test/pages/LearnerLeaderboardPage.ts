import { Locator, Page,expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class LearnerLeaderboardPage extends BasePage {

    readonly leaderboardOption: Locator;
    readonly leaderboardPageHeading: Locator;
    readonly searchLearnerInput: Locator;
    readonly searchedLearnerResult: Locator;
    readonly searchnoavailabelmsg:Locator;

    constructor(page: Page) {
        super(page);

        // Learner sidebar - Leaderboard option
        this.leaderboardOption = page.getByText("Leaderboard", {
            exact: true
        });

        // Leaderboard page heading
        this.leaderboardPageHeading = page.getByText(
            "Learner Leaderboard & Hall of Fame",
            { exact: true }
        );

        // Search learner input
        this.searchLearnerInput = page.getByPlaceholder("Search learner...");

        // Leaderboard table
        this.searchedLearnerResult = page.locator("tbody");

        this.searchnoavailabelmsg=page.getByText('No ranking data available', { exact: true });
    }

    async clickLeaderboardOption() {
        await this.click(this.leaderboardOption);
    }

    async verifyLeaderboardPage() {
        await this.toBeVisible(this.leaderboardPageHeading);
    }

    async searchLearner(name: string) {
        await this.fill(this.searchLearnerInput, name);
    }

    async verifySearchedLearner(name: string) {
        await this.toBeVisible(
            this.page.getByText(name, { exact: false }).first()
        );
    }

     async verifyInvalidSearchResult(msg: string) {
        await expect(this.searchnoavailabelmsg).toBeVisible();
        await expect(this.searchnoavailabelmsg).toHaveText(msg);
    }
}