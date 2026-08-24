import { setDefaultTimeout } from "@cucumber/cucumber";
/*/*
    Reusable action methods all over the project....
*/

import { expect, Locator, Page, Download } from "@playwright/test";
import { ENV } from "../../utils/envReader";

export class BasePage {
    protected page: Page;
    private readonly timeout = 10000;

    // constructor to add Pages inside child class
    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(ENV.BASE_URL, { timeout: 60000 });
    }

    // Fill inside the input field
    async fill(locator: Locator, value: string) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        await locator.fill(value, { timeout: this.timeout });
    }

    // Click the locator
    async click(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        await locator.click({ timeout: this.timeout });
    }

    // GetText from the locator
    async getText(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await locator.textContent({ timeout: this.timeout });
    }

    // get the current URL
    async getUrl(page: Page) {
        return await page.url();
    }

    // Element to be Visible return boolean
    async elementVisible(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await locator.isVisible();
    }

    // Assertion to HaveText
    async toHaveText(locator: Locator, value: string) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await expect(locator).toHaveText(value, { timeout: this.timeout });
    }

    // Assertion to toBe
    async toBe(locator: Locator, value: string) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await expect(locator).toBe(value);
    }

    // To ContainText
    async toContainText(locator: Locator, value: string) {
        await locator.isVisible({ timeout: 60000 });
        return await expect(locator).toContainText(value);
    }

    // toContainValue
    async toContain(locator: Locator, value: string) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await expect(await locator.textContent({ timeout: this.timeout })).toContain(value);
    }


    // Return AlltextContent inside the text 
    async allTextContent(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await locator.allTextContents();
    }

    // return the count of the value
    async count(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await locator.count();
    }

    // click the checkBox
    async checkTheBox(locator: Locator) {
        await locator.scrollIntoViewIfNeeded({ timeout: this.timeout });
        await expect(locator).toBeVisible({ timeout: this.timeout });
        await locator.check({ timeout: this.timeout });
    }

    // Clear the input field
    async clear(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        await locator.clear({ timeout: this.timeout });
    }

    // Return the innerText
    async getInnerText(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await locator.innerText({ timeout: this.timeout });
    }

    // Return allInnerText
    async allInnerText(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        return await locator.allInnerTexts();
    }

    // DOM Click 
    async domClick(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        await locator.evaluate((element: HTMLElement) => element.click(), { timeout: this.timeout });
    }


    async selectDDOptionByValue(locator: Locator, option: string) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        await locator.selectOption({ value: option }, { timeout: this.timeout });
    }

    async pressEnter(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: this.timeout });
        await locator.press("Enter", { timeout: this.timeout });
    }

    async selectDropdownValues(dropdown: Locator, option: string) {
        await expect(dropdown).toBeVisible({ timeout: this.timeout });
        await dropdown.click({ timeout: this.timeout });
        await expect(this.page.getByText(option, { exact: true })).toBeVisible({ timeout: this.timeout });
        await this.page.getByText(option, { exact: true }).click({ timeout: this.timeout });
    }

    // Return True  when the locator is toBeVisible
    async toBeVisible(locator: Locator) {
        return await expect(locator).toBeVisible({ timeout: this.timeout });
    }

    async waitForDownload(page: Page, clickLocator: Locator): Promise<Download> {
        const downloadPromise = page.waitForEvent("download", { timeout: this.timeout });
        await this.click(clickLocator);
        return await downloadPromise;
    }
    //browser validation tetxt
    async getValidationMessage(locator: Locator) {
        return await locator.evaluate((element: HTMLInputElement) => element.validationMessage);
    }

    async clickStatusOption(locator: Locator) {
        await locator.click();
    }

}