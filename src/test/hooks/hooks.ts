import { BugFinder } from "../../world/Bug_Finder";
import { Browser, chromium, firefox } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { BasePage } from "../pages/basepage";
import { SignInPage } from "../pages/siginpage";
import { LearnerDashBoardPage } from "../pages/learnerPages/learnerdashboardpage";
import { AdminLogin } from "../pages/adminPages/adminLoginPage";
import { TrainerLogin } from "../pages/TrainerLoginPage";
import { CourseStructurePage } from "../pages/TrainerCourseStrucuturePage";
import { CourseLessonsPage } from "../pages/TrainerLessonPage";
import { ExploreTrainingPage } from "../pages/learnerPages/learnerexploretrainingpage";
import { TrainingSession } from "../pages/adminPages/trainingPrograms";
import { LearnerCertificatePage } from "../pages/learnerCertificatePage";
import { MyCoursePage } from "../pages/learnerPages/learnermycoursepage";
import { CoursePage } from "../pages/learnerPages/learnercoursepage";
import { CourseQuizPage } from "../pages/TrainerCourseQuizPage";
import { TrainerFeature } from "../pages/adminPages/trainerFeature";
import { Participate } from "../pages/adminPages/participateFeature";
import { AttendancePage } from "../pages/learnerPages/learnerattendancepage";
import { ProgressAnalyticsPage } from "../pages/learnerPages/learnerprogressanalyticspage";
import { Interview } from "../pages/adminPages/interview";
import { ProfilePage } from "../pages/learnerPages/learnerprofilepage";


let browser: Browser;
setDefaultTimeout(30 * 1000);

BeforeAll(async () => {
    browser = await chromium.launch({ headless: true })
});

Before(async function (this: BugFinder) {
    this.browser = browser;
    this.browserContext = await this.browser.newContext();
    this.page = await this.browserContext.newPage();
    this.basepage = new BasePage(this.page);
    this.signinpage = new SignInPage(this.page);
    this.learnerdashboardpage = new LearnerDashBoardPage(this.page);
    this.adminLogin = new AdminLogin(this.page);
    this.trainerLogin = new TrainerLogin(this.page);
    this.courseStructurePage = new CourseStructurePage(this.page);
    this.courseLessonsPage = new CourseLessonsPage(this.page);
    this.exploretrainingpage = new ExploreTrainingPage(this.page);
    this.certificate = new LearnerCertificatePage(this.page);
    this.trainingSession = new TrainingSession(this.page);
    this.learnerCertificatePage = new LearnerCertificatePage(this.page);
    this.mycoursepage = new MyCoursePage(this.page);
    this.coursepage = new CoursePage(this.page);
    this.courseQuizPage = new CourseQuizPage(this.page);
    this.trainerFeature = new TrainerFeature(this.page);
    this.participate = new Participate(this.page);
    this.attendancepage = new AttendancePage(this.page);
    this.progressanalyticspage = new ProgressAnalyticsPage(this.page);
    this.interview = new Interview(this.page);
    this.profilepage = new ProfilePage(this.page);
});

After(async function (this: BugFinder, { pickle, result }) {
    if (result?.status == Status.FAILED && this.page) {
        const screenshotPath = `reports/screenshots/${pickle.name}.png`;
        await this.page.screenshot({ path: screenshotPath });
    }

    await this.page.close();
    await this.browserContext.close();

});
AfterAll(async () => {
    await browser?.close();
});
