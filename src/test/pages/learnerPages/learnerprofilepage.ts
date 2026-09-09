import { expect, type Locator, type Page } from "@playwright/test";
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
    private editFirstExperienceButton: Locator;
    private saveChangesButton: Locator;
    private allExperienceDetails: Locator;
    private projectButton: Locator;
    private projectTitleInputBox: Locator;
    private technologiesInputBox: Locator;
    private githubUrlInputBox: Locator;
    private liveDemoUrlInputBox: Locator;
    private projectDescriptionInputBox: Locator;
    private addProjectConfirmButton: Locator;
    private projectTitleWarningMessage: Locator;
    private addEducationButton: Locator;
    private instituteInputBox: Locator;
    private degreeInputBox: Locator;
    private fieldOfStudyInputBox: Locator;
    private yearRangeInputBox: Locator;
    private cgpaInputBox: Locator;
    private addEducationConfirmButton: Locator;
    private deleteFirstEducationButton: Locator;
    private deleteEducationConfirmButton: Locator;
    private editFirstEducationButton: Locator;
    private instituteInputWarningMsg: Locator;
    private degreeInputWarningMsg: Locator;
    private editAboutMeButton: Locator;
    private aboutMeTextArea: Locator;
    private aboutMeDetails: Locator;
    private backToDashboardButton: Locator;

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
        this.editFirstExperienceButton = page.locator('(//button[@title="Edit Experience"])[1]');
        this.saveChangesButton = page.locator('//button[text()="Save Changes"]');
        this.allExperienceDetails = page.locator('//div[contains(@style,"font-weight: 600") and contains(normalize-space(.),"•")]/ancestor::div[.//button[@title="Edit Experience"]][1]');
        this.projectButton = page.locator('//button[text()=" Project"]');
        this.projectTitleInputBox = page.locator('//input[@placeholder="e.g. E-Commerce Microservices Platform"]');
        this.technologiesInputBox = page.locator('//input[@placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind"]');
        this.githubUrlInputBox = page.locator('//input[@placeholder="https://github.com/..."]');
        this.liveDemoUrlInputBox = page.locator('//input[@placeholder="https://myproject.dev"]');
        this.projectDescriptionInputBox = page.locator('//textarea[@placeholder="Brief overview of features, architecture, and responsibilities..."]');
        this.addProjectConfirmButton = page.locator('//button[text()="Add Project"]');
        this.projectTitleWarningMessage = page.locator('//div[text()="Project title is required."]');
        this.addEducationButton = page.locator('(//button[text()=" Add"])[1]');
        this.instituteInputBox = page.locator('//input[@placeholder="e.g. Anna University, IIT Madras"]');
        this.degreeInputBox = page.locator('//input[@placeholder="e.g. Bachelor of Technology (B.Tech)"]');
        this.fieldOfStudyInputBox = page.locator('//input[@placeholder="e.g. Computer Science & Engineering"]');
        this.yearRangeInputBox = page.locator('//input[@placeholder="e.g. 2018 - 2022"]');
        this.cgpaInputBox = page.locator('//span[text()="CGPA / Percentage"]/parent::label/following-sibling::input');
        this.addEducationConfirmButton = page.locator('//button[text()="Add Education"]');
        this.deleteFirstEducationButton = page.locator('(//button[@title="Delete Education"])[1]');
        this.deleteEducationConfirmButton = page.locator('//button[text()=" Delete"]');
        this.editFirstEducationButton = page.locator('(//button[@title="Edit Education"])[1]');
        this.instituteInputWarningMsg = page.locator('//div[text()="Institution is required."]');
        this.degreeInputWarningMsg = page.locator('//div[text()="Degree is required."]');
        this.editAboutMeButton = page.locator('//div[text()="About Me"]/parent::div/following-sibling::button');
        this.aboutMeTextArea = page.locator('//textarea[@placeholder="Brief bio or professional summary..."]');
        this.aboutMeDetails = page.locator('//div[text()="About Me"]/parent::div/parent::div/following-sibling::div');
        this.backToDashboardButton = page.locator('//button[text()=" Back to Dashboard"]');
    }

    async getLearnerName() {
        return await this.getText(this.learnerNameInProfile);
    }

    async clickBackToDashboardButton() {
        await this.click(this.backToDashboardButton);
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

    async clickFirstEditExperienceButton() {
        await this.click(this.editFirstExperienceButton);
    }

    async editExperienceRole(roleSuffix: string) {
        const currentRole = await this.roleInputBox.inputValue();
        await this.fill(this.roleInputBox, `${currentRole}${roleSuffix}`);
    }

    async clickSaveChangesButton() {
        await this.click(this.saveChangesButton);
    }

    async clickEditAboutMeButton() {
        await this.click(this.editAboutMeButton);
    }

    async fillAboutMeDetails(details: string) {
        await this.fill(this.aboutMeTextArea, details);
    }

    async getAboutMeDetails() {
        return await this.getText(this.aboutMeDetails);
    }

    async waitForAboutMeDetails(details: string) {
        await expect(this.aboutMeDetails).toContainText(details, { timeout: 30000 });
        return await this.getText(this.aboutMeDetails);
    }

    async getAllExperienceDetails() {
        return await this.allExperienceDetails.allTextContents();
    }

    async clickProjectButton() {
        await expect(this.learnerNameInProfile).toBeVisible({ timeout: 30000 });
        await expect(this.projectButton).toBeVisible({ timeout: 30000 });
        await this.click(this.projectButton);
    }

    async fillProjectDetails(projectTitle: string, technologies: string, githubUrl: string, liveDemoUrl: string, description: string) {
        await this.fill(this.projectTitleInputBox, projectTitle);
        await this.fill(this.technologiesInputBox, technologies);
        await this.fill(this.githubUrlInputBox, githubUrl);
        await this.fill(this.liveDemoUrlInputBox, liveDemoUrl);
        await this.fill(this.projectDescriptionInputBox, description);
    }

    async clickAddProjectConfirmButton() {
        await this.click(this.addProjectConfirmButton);
    }

    async getProjectTitle(projectTitle: string) {
        const projectTitleLocator = this.page.getByText(projectTitle, { exact: true }).first();
        await expect(projectTitleLocator).toBeVisible({ timeout: 30000 });
        return await this.getText(projectTitleLocator);
    }

    async getProjectTitleWarningMessage() {
        return await this.getInnerText(this.projectTitleWarningMessage);
    }

    async clickAddEducationButton() {
        await expect(this.learnerNameInProfile).toBeVisible({ timeout: 30000 });
        await expect(this.addEducationButton).toBeVisible({ timeout: 30000 });
        await this.click(this.addEducationButton);
    }

    async fillEducationDetails(institute: string, degree: string, fieldOfStudy: string, yearRange: string, cgpa: string) {
        await this.fill(this.instituteInputBox, institute);
        await this.fill(this.degreeInputBox, degree);
        await this.fill(this.fieldOfStudyInputBox, fieldOfStudy);
        await this.fill(this.yearRangeInputBox, yearRange);
        await this.fill(this.cgpaInputBox, cgpa);
    }

    async getInstituteInputWarningMsg() {
        return await this.getInnerText(this.instituteInputWarningMsg);
    }

    async getDegreeInputWarningMsg() {
        return await this.getInnerText(this.degreeInputWarningMsg);
    }

    async clickAddEducationConfirmButton() {
        await this.click(this.addEducationConfirmButton);
    }

    async getEducationDetails(institute: string) {
        const instituteLocator = this.page.getByText(institute, { exact: false }).first();
        await expect(instituteLocator).toBeVisible({ timeout: 30000 });
        return await this.getText(instituteLocator);
    }

    async clickDeleteFirstEducationButton() {
        await expect(this.learnerNameInProfile).toBeVisible({ timeout: 30000 });
        await expect(this.deleteFirstEducationButton).toBeVisible({ timeout: 30000 });
        await this.click(this.deleteFirstEducationButton);
    }

    async clickDeleteEducationConfirmButton() {
        await this.click(this.deleteEducationConfirmButton);
    }

    async clickFirstEditEducationButton() {
        await expect(this.learnerNameInProfile).toBeVisible({ timeout: 30000 });
        await expect(this.editFirstEducationButton).toBeVisible({ timeout: 30000 });
        await this.click(this.editFirstEducationButton);
    }

    async editEducationInstituteAndDegree(institute: string, degree: string) {
        await this.fill(this.instituteInputBox, institute);
        await this.fill(this.degreeInputBox, degree);
    }

    async isEducationDisplayed(institute: string) {
        return await this.page.getByText(institute, { exact: true }).count() > 0;
    }

    async getEducationCount() {
        return await this.page.locator('//button[@title="Delete Education"]').count();
    }

    async waitForEducationCards() {
        await expect(this.deleteFirstEducationButton).toBeVisible({ timeout: 10000 });
    }

    async waitForEducationCount(expectedCount: number) {
        const educationDeleteButtons = this.page.locator('//button[@title="Delete Education"]');
        await expect(educationDeleteButtons).toHaveCount(expectedCount, { timeout: 10000 });
    }
}