import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class SignInPage extends BasePage {
    private learnerButton: Locator;
    private learnerEmailField: Locator;
    private learnerPasswordField: Locator;
    private learnerSignInButton: Locator;

    constructor(page: Page) {
        super(page);
        this.learnerButton = page.locator('//button/child::span[text()="Learner"]').first();
        this.learnerEmailField = page.locator('#login-email');
        this.learnerPasswordField = page.locator('#login-password');
        this.learnerSignInButton = page.locator('//button/child::span[text()="Sign in as "]');

    }
    async clickLearnerButton() {
        await this.click(this.learnerButton);
    }
    async enterLearnerEmail(email: string) {
        await this.fill(this.learnerEmailField, email);
    }
    async enterLearnerPassword(password: string) {
        await this.fill(this.learnerPasswordField, password);
    }
    async clickLearnerSigInbutton() {
        await this.click(this.learnerSignInButton);
    }



}
