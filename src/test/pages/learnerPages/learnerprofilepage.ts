import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";

export class ProfilePage extends BasePage {
    private learnerNameInProfile: Locator;
    private addSkillButton: Locator;
    private skillNameInputBox: Locator;
    private addSkillConfirmButton: Locator;
    private allCreatedSkill: Locator;
    private deleteFirstSkill: Locator;
    private firstSuggestedSkillAddButton: Locator;
    private existingSkillWarningMsg: Locator;
    private firstSkillName: Locator;
    private confirmDeleteSkillButton: Locator;
    private viewDetailedAnalyticsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.learnerNameInProfile = page.locator('//h3');
        this.addSkillButton = page.locator('//button[text()=" Add Skill"]');
        this.skillNameInputBox = page.locator('//input[@placeholder="e.g. React, JavaScript, SQL, Docker"]');
        this.addSkillConfirmButton = page.locator('//button[text()="Add Skill"]');
        this.allCreatedSkill = page.locator('//button[contains(title,Remove)]/parent::span');
        this.deleteFirstSkill = page.locator('(//button[contains(@title,"Remove")])[1]');
        this.firstSuggestedSkillAddButton = page.locator('(//span[text()="Suggested Skills:"]/following-sibling::div/child::button)[1]');
        this.existingSkillWarningMsg = page.locator('//div[contains(text(),"is already in your skills list")]');
        this.firstSkillName = page.locator('(//button[contains(@title,"Remove")]/parent::span)[1]');
        this.confirmDeleteSkillButton = page.locator('//button[text()=" Delete"]');
        this.viewDetailedAnalyticsButton = page.locator('//button[text()="View Detailed Analytics "]');

    }

    async getLearnerName() {
        return await this.getText(this.learnerNameInProfile);
    }

    async clickAddSkillButton() {
        await this.click(this.addSkillButton);
    }

    async enterSkillName(skillname: string) {
        await this.fill(this.skillNameInputBox, skillname);
    }

    async clickAddSkillConfirmButton() {
        await this.click(this.addSkillConfirmButton);
    }

    async getAllSkills() {
        await this.page.waitForTimeout(5000);
        return await this.allCreatedSkill.allTextContents();
    }

    async clickFirstSkillDeleteButton() {
        await this.click(this.deleteFirstSkill);
    }

    async getFirstSuggestSkillName() {
        return await this.getInnerText(this.firstSuggestedSkillAddButton);
    }
    async clickFirstSuggestedSkillAddButton() {
        await this.click(this.firstSuggestedSkillAddButton);
    }

    async getExistingSkillWarningMsg() {
        return await this.getInnerText(this.existingSkillWarningMsg);
    }

    async getFirstSkillName() {
        return await this.getText(this.firstSkillName);
    }

    async clickDeleteSkillConfirmButton() {
        await this.click(this.confirmDeleteSkillButton);
    }
    async clickViewDetailedAnalyticsButton() {
        await this.click(this.viewDetailedAnalyticsButton);
    }
}