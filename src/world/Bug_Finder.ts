import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from '@playwright/test';
import type { BasePage } from "../test/pages/basepage";
import type { SignInPage } from "../test/pages/siginpage";
import type { LearnerDashBoardPage } from "../test/pages/learnerPages/learnerdashboardpage";
import { AdminLogin } from "../test/pages/adminPages/adminLoginPage";
import { TrainerLogin } from "../test/pages/TrainerLoginPage";
import { CourseStructurePage } from "../test/pages/TrainerCourseStrucuturePage";
import { CourseLessonsPage } from "../test/pages/TrainerLessonPage";
import type { ExploreTrainingPage } from "../test/pages/learnerPages/learnerexploretrainingpage";
import type { LearnerCertificatePage } from "../test/pages/learnerCertificatePage";
import { TrainingSession } from "../test/pages/adminPages/trainingPrograms"
import type { MyCoursePage } from "../test/pages/learnerPages/learnermycoursepage";
import type { CoursePage } from "../test/pages/learnerPages/learnercoursepage";
import { CourseQuizPage } from "../test/pages/TrainerCourseQuizPage";
import {TrainerFeature} from "../test/pages/adminPages/trainerFeature"
import { Participate } from "../test/pages/adminPages/participateFeature";
import { Interview } from "../test/pages/adminPages/interview";
import type { AttendancePage } from "../test/pages/learnerPages/learnerattendancepage";
import type { ProgressAnalyticsPage } from "../test/pages/learnerPages/learnerprogressanalyticspage";
import type { ProfilePage } from "../test/pages/learnerPages/learnerprofilepage";
import { RegisterPage } from "../test/pages/adminPages/register";

export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    basepage!: BasePage;
    signinpage!: SignInPage;
    learnerdashboardpage!: LearnerDashBoardPage;
    adminLogin!: AdminLogin
    trainerLogin!: TrainerLogin;
    courseStructurePage!: CourseStructurePage;
    courseLessonsPage!: CourseLessonsPage;
    exploretrainingpage!: ExploreTrainingPage;
    certificate!: LearnerCertificatePage;
    trainingSession!: TrainingSession
    learnerCertificatePage!: LearnerCertificatePage
    mycoursepage!: MyCoursePage;
    coursepage!: CoursePage;
    courseQuizPage!: CourseQuizPage;
    trainerFeature!: TrainerFeature;
    participate!: Participate
    attendancepage!: AttendancePage;
    progressanalyticspage!: ProgressAnalyticsPage;
    interview!: Interview;
    profilepage!: ProfilePage;
    registerPage!: RegisterPage

    get rp(): RegisterPage {
        return this.registerPage;
    }

    get sp(): RegisterPage {
        return this.registerPage;
    }
}
setWorldConstructor(BugFinder);