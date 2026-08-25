import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from '@playwright/test';
import type { BasePage } from "../test/pages/basepage";
import type { SignInPage } from "../test/pages/siginpage";
import type { LearnerDashBoardPage } from "../test/pages/learnerPages/learnerdashboardpage";
import { AdminLogin } from "../test/pages/adminPages/adminLoginPage";
import { TrainerLogin } from "../test/pages/TrainerLoginPage";
import type { ExploreTrainingPage } from "../test/pages/learnerPages/learnerexploretrainingpage";
import {TrainingSession} from "../test/pages/adminPages/trainingPrograms"
import{LearnerCertificatePage} from "../test/pages/learnerCertificatePage";

export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    basepage!: BasePage;
    signinpage!: SignInPage;
    learnerdashboardpage!: LearnerDashBoardPage;
    adminLogin!: AdminLogin
    trainerLogin!: TrainerLogin;
    exploretrainingpage!: ExploreTrainingPage;
    trainingSession!: TrainingSession
    learnerCertificatePage!: LearnerCertificatePage
}
setWorldConstructor(BugFinder);