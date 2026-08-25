import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from '@playwright/test';
import type { BasePage } from "../test/pages/basepage";
import type { SignInPage } from "../test/pages/siginpage";
import type { LearnerDashBoardPage } from "../test/pages/learnerdashboardpage";
import { AdminLogin } from "../test/pages/adminPages/adminLoginPage";
import { TrainerLogin } from "../test/pages/TrainerLoginPage";
import { LearnerCertificatePage } from "../test/pages/learnerCertificatePage";

export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    basepage!: BasePage;
    signinpage!: SignInPage;
    learnerdashboardpage!: LearnerDashBoardPage;
    adminLogin!: AdminLogin
    trainerLogin!: TrainerLogin;
    certificate!:LearnerCertificatePage;
}
setWorldConstructor(BugFinder);