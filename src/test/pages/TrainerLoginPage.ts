import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class TrainerLogin extends BasePage {

    private trainerLoginOption: Locator;
    private trainerLoginUsername: Locator;
    private trainerLoginPassword: Locator;
    private trainerLoginBtn: Locator;
    private invalidErrorMessage: Locator;
    private trainerLoginDashboard: Locator;

    constructor(page: Page) {
        super(page);

        this.trainerLoginOption = page.getByRole("tab", { name: "Trainer" });

        this.trainerLoginUsername = page.getByPlaceholder("Enter your email");

        this.trainerLoginPassword = page.getByPlaceholder("Enter your password");

        this.trainerLoginBtn = page.getByRole("button", { name: "Sign in as Trainer" });

        this.invalidErrorMessage = page.getByText("Invalid email or password");

        this.trainerLoginDashboard = page.locator("//span[normalize-space()='Dashboard']");
    }

    async selectTrainerLogin() {
        await this.click(this.trainerLoginOption);
    }

    async enterUsername(username: string) {
        await this.fill(this.trainerLoginUsername, username);
    }

    async enterPassword(password: string) {
        await this.fill(this.trainerLoginPassword, password);
    }

    async clickLogin() {
        await this.click(this.trainerLoginBtn);
    }

    async verifySuccessfulLogin() {
        await this.toBeVisible(this.trainerLoginDashboard);
    }

    async verifyTrainerDashboard() {
        await expect(this.trainerLoginDashboard).toBeVisible();
    }

    async verifyLoginPage() {
        await this.toBeVisible(this.trainerLoginBtn);
    }

    async verifyErrorMessage(expectedMessage: string) {
        await this.toBeVisible(this.page.getByText(expectedMessage));
    }

    async verifyRequiredFieldMessage(field: Locator) {
        const message = await field.evaluate(
            (el: HTMLInputElement) => el.validationMessage
        );
        expect(message).toBe("Please fill out this field.");
    }

    async getEmptyRequiredField(): Promise<Locator> {

        const usernameValue = await this.trainerLoginUsername.inputValue();
        if (usernameValue.trim() === "") {
            return this.trainerLoginUsername;
        }

        const passwordValue = await this.trainerLoginPassword.inputValue();
        if (passwordValue.trim() === "") {
            return this.trainerLoginPassword;
        }

        throw new Error("No empty required field found, but 'Please fill out this field.' was expected");

    }
}