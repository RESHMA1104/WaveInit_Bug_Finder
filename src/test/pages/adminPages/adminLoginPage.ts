import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../basepage";
import { logger } from "../../../utils/logger";

export class AdminLogin extends BasePage {

    private adminLoginOption: Locator;
    private adminLoginUsername: Locator;
    private adminLoginPassword: Locator;
    private adminLoginBtn: Locator;
    private invalidErrorMessage: Locator;
    private adminLoginDashboard: Locator;

    constructor(page: Page) {
        super(page);

        // Note: this element uses role="tab" (custom ARIA role on a <button>),
        // NOT the native "button" role. getByRole must match the actual
        // accessible role, not the HTML tag name.
        this.adminLoginOption = page.getByRole("tab", { name: "Admin" });

        this.adminLoginUsername = page.getByPlaceholder("Enter your email");

        this.adminLoginPassword = page.getByPlaceholder("Enter your password");

        this.adminLoginBtn = page.getByRole("button", { name: "Sign in as Admin" });

        this.invalidErrorMessage = page.getByText("Invalid email or password");

        this.adminLoginDashboard = page.getByRole("button", { name: "Dashboard" });
    }

    async selectAdminLogin() {
        logger.info("Clicking on Admin Login tab");
        await this.click(this.adminLoginOption);
    }

    async enterUsername(username: string) {
        logger.info(`Filling username field with: "${username}"`);
        await this.fill(this.adminLoginUsername, username);
    }

    async enterPassword(password: string) {
        logger.info("Filling password field");
        await this.fill(this.adminLoginPassword, password);
    }

    async clickLogin() {
        logger.info("Clicking Sign in as Admin button");
        await this.click(this.adminLoginBtn);
    }

    async verifySuccessfulLogin() {
        logger.info("Checking that Admin Dashboard button is visible (successful login)");
        await expect(this.adminLoginDashboard).toBeVisible();
    }

    async verifyAdminDashboard() {
        logger.info("Checking Admin Dashboard is displayed");
        await expect(this.adminLoginDashboard).toBeVisible();
    }

    async verifyLoginPage() {
        logger.info("Checking that admin is still on the login page (Sign in as Admin button visible)");
        await expect(this.adminLoginBtn).toBeVisible();
    }

    async verifyErrorMessage(expectedMessage: string) {
        logger.info(`Checking DOM for custom error message: "${expectedMessage}"`);
        await expect(this.page.getByText(expectedMessage)).toBeVisible();
    }

    /**
     * Reads the native browser validation message (e.g. "Please fill out
     * this field.") directly from the given input element via the
     * HTMLInputElement.validationMessage property, since this text is
     * rendered by the browser itself and is not part of the DOM.
     */
    async verifyRequiredFieldMessage(field: Locator) {
        const message = await field.evaluate(
            (el: HTMLInputElement) => el.validationMessage
        );
        logger.info(`Native validation message received: "${message}"`);
        expect(message).toBe("Please fill out this field.");
    }

    /**
     * Determines which required field (username or password) was left
     * empty, so the correct field can be passed to verifyRequiredFieldMessage.
     * This avoids relying on a generic ":invalid" CSS selector, which can
     * incorrectly match the <form> element itself instead of the actual
     * empty <input>.
     */
    async getEmptyRequiredField(): Promise<Locator> {

        const usernameValue = await this.adminLoginUsername.inputValue();
        if (usernameValue.trim() === "") {
            logger.info("Empty required field detected: username");
            return this.adminLoginUsername;
        }

        const passwordValue = await this.adminLoginPassword.inputValue();
        if (passwordValue.trim() === "") {
            logger.info("Empty required field detected: password");
            return this.adminLoginPassword;
        }

        // If neither field is empty but this method was still called,
        // the test data/expectation combination is inconsistent - fail loudly.
        logger.error("No empty required field found, but 'Please fill out this field.' was expected");
        throw new Error("No empty required field found, but 'Please fill out this field.' was expected");

    }
}