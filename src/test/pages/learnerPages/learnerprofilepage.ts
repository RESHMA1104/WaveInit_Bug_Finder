import type { Locator, Page } from "playwright";
import { BasePage } from "../basepage";

export class ProfilePage extends BasePage {
    private learnerNameInProfile: Locator;
    private addSkillButton: Locator;
    private skillNameInputBox: Locator;
    private addSkillConfirmButton: Locator;
    private allCreatedSkill: Locator;
    private deleteFirstSkill: Locator;

    constructor(page: Page) {
        super(page);
        this.learnerNameInProfile = page.locator('//h3');
        this.addSkillButton = page.locator('//button[text()=" Add Skill"]');
        this.skillNameInputBox = page.locator('//input[@placeholder="e.g. React, JavaScript, SQL, Docker"]');
        this.addSkillConfirmButton = page.locator('//button[text()="Add Skill"]');
        this.allCreatedSkill = page.locator('//button[contains(title,Remove)]/parent::span');
        this.deleteFirstSkill = page.locator('(//button[contains(@title,"Remove")])[1]');

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
        return await this.allCreatedSkill.allTextContents();
    }

    async clickFirstSkillDeleteButton() {
        await this.click(this.deleteFirstSkill);
    }

}