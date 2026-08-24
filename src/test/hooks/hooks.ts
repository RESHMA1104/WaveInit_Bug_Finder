import { BugFinder } from "../../world/Bug_Finder";
import { Browser, chromium, firefox } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { BasePage } from "../pages/basepage";
import { SignInPage } from "../pages/siginpage";
import { LearnerDashBoardPage } from "../pages/learnerdashboardpage";

let browser: Browser;

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
});

After(async function (this: BugFinder, { pickle, result }) {
    if (result?.status == Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({ path: `reports/screenshots/${pickle.name}.png` });
        await this.attach(screenshot, "image/png");
    }

    await this.page.close();
    await this.browserContext.close();

});
AfterAll(async () => {
    await browser?.close();
})