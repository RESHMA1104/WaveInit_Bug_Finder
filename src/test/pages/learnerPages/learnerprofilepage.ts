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
    private experienceButton: Locator;
    private companyNameInputBox: Locator;
    private roleInputBox: Locator;
    private employeeTypeDropdown: Locator;
    private locationInputBox: Locator;
    private startDateInputBox: Locator;
    private endDateInputBox: Locator;
    private descriptionInputBox: Locator;
    private addExperienceConfirmButton: Locator;
    private allCompanyNames: Locator;
    private deleteExperienceButton: Locator;
    private deleteConfirmButton: Locator;
    private companyInputWarningMsg: Locator;
    private roleInputWarningMsg: Locator;
    private currentlyWorkingCheckbox: Locator;

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
        this.experienceButton = page.locator('//button[text()=" Experience"]');
        this.companyNameInputBox = page.locator('//input[@placeholder="e.g. Wave Init Solutions"]');
        this.roleInputBox = page.locator('//input[@placeholder="e.g. Trainee Software Engineer"]');
        this.employeeTypeDropdown = page.locator('(//select)[2]');
        this.locationInputBox = page.locator('//input[@placeholder="e.g. Chennai, India / Remote"]');
        this.startDateInputBox = page.locator('(//input[@type="date"])[1]');
        this.endDateInputBox = page.locator('(//input[@type="date"])[2]');
        this.descriptionInputBox = page.locator('//textarea[@placeholder="Tell us about your role, projects, and technologies used..."]');
        this.addExperienceConfirmButton = page.locator('//button[text()="Add Experience"]');
        this.allCompanyNames = page.locator('//div[contains(@style,"font-weight: 600") and contains(normalize-space(.),"•")]');
        this.deleteExperienceButton = page.locator('(//button[@title="Delete Experience"])[1]');
        this.deleteConfirmButton = page.locator('//button[text()=" Delete"]');
        this.companyInputWarningMsg = page.locator('//div[text()="Company name is required."]');
        this.roleInputWarningMsg = page.locator('//div[text()="Role / Title is required."]');
        this.currentlyWorkingCheckbox = page.locator('//input[@type="checkbox"]');
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
    async clickExperienceButton() {
        await this.click(this.experienceButton);
    }
    async fillExperienceDetails(companyName: string, role: string, employeeType: string, location: string, startDate: string, endDate: string, description: string) {
        await this.fill(this.companyNameInputBox, companyName);
        await this.fill(this.roleInputBox, role);
        await this.selectDDOptionByValue(this.employeeTypeDropdown, employeeType);
        await this.fill(this.locationInputBox, location);
        await this.fill(this.startDateInputBox, startDate);
        await this.fill(this.endDateInputBox, endDate);
        await this.fill(this.descriptionInputBox, description);
    }

    async fillExperienceDetailsCW(companyName: string, role: string, employeeType: string, location: string, startDate: string, endDate: string, description: string) {
        await this.fill(this.companyNameInputBox, companyName);
        await this.fill(this.roleInputBox, role);
        await this.selectDDOptionByValue(this.employeeTypeDropdown, employeeType);
        await this.fill(this.locationInputBox, location);
        await this.fill(this.startDateInputBox, startDate);
        await this.fill(this.descriptionInputBox, description);
    }

    async clickAddExperienceConfirmButton() {
        await this.click(this.addExperienceConfirmButton);
    }

    async getAllCompanyNames() {
        await this.page.waitForTimeout(5000);
        return await this.allCompanyNames.allTextContents();
    }

    async clickDeleteExperienceButton() {
        await this.click(this.deleteExperienceButton);
    }

    async clickDeleteConfirmButton() {
        await this.click(this.deleteConfirmButton);
    }
    async getCompanyInputWarningMsg() {
        return await this.getInnerText(this.companyInputWarningMsg);
    }
    async getRoleInputWarningMsg() {
        return await this.getInnerText(this.roleInputWarningMsg);
    }
    async clickCurrentlyWorkingCheckbox() {
        await this.click(this.currentlyWorkingCheckbox);
    }
}