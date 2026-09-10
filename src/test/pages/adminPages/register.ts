import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basepage";

export class RegisterPage extends BasePage {
    readonly NameInput: Locator;
    readonly EmailInput: Locator;
    readonly MobileInput: Locator;
    readonly PasswordInput: Locator;
    readonly ConfirmPasswordInput: Locator;
    readonly acceptTermsCheckbox: Locator;
    readonly CreateAccountButton: Locator;
    readonly RegistrationSuccessMessage: Locator;
    readonly passwordMismatchMessage:Locator;
    readonly alreadyExistEmail:Locator;
    readonly pendingApproval:Locator;
    constructor(public page: Page) {
        super(page);
        this.NameInput = this.page.locator("//input[@id='reg-name']");
        this.EmailInput = this.page.locator("//input[@id='reg-email']");
        this.MobileInput = this.page.locator("//input[@id='reg-phone']");
        this.PasswordInput = this.page.locator("//input[@id='reg-pw']");
        this.ConfirmPasswordInput = this.page.locator("//input[@id='reg-confirm']");
        this.acceptTermsCheckbox = this.page.locator("//input[@type='checkbox']");
        this.CreateAccountButton = this.page.locator("//button[@type='submit']");
        this.RegistrationSuccessMessage = this.page.locator("//span[contains(text(),'Registration submitted successfully! Your account ')]");
        this.passwordMismatchMessage=this.page.locator("//p[normalize-space()='Passwords do not match']");
        this.alreadyExistEmail=this.page.locator("//span[@class='auth-error-text']");
        this.pendingApproval=this.page.locator("//span[@class='auth-error-text']");
    }
    async clickSignUpButton() {
        await this.page.getByRole("button", { name: /sign up|create account/i }).first().click();
    }
    async setName(name: string) {
        await this.NameInput.fill(name);
    }
    async setEmail(email: string) {
        await this.EmailInput.fill(email+Date.now().toString()+"@gmail.com");
    }
    async setAlreadyExistEmail(email:string){
        await this.EmailInput.fill(email);
    }
    async setMobile(mobile: string) {
        await this.MobileInput.fill(mobile);
    }
    async setPassword(password: string) {
        await this.PasswordInput.fill(password);
    }
    async setConfirmPassword(confirmPassword: string) {
        await this.ConfirmPasswordInput.fill(confirmPassword);
    }
    async checkAcceptTerms() {
        await this.acceptTermsCheckbox.check();
    }
    async clickCreateAccount() {
        await this.CreateAccountButton.click();
    }
}