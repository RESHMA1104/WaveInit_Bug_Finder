import {When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";
import { BugFinder } from "../../world/Bug_Finder";

When("the learner clicks on the Certificate option",async function (this: BugFinder) {
        logger.info("Clicking on Certificates option");
        await this.learnerCertificatePage.clickCertificatesOption();
        logger.info("Certificates option clicked successfully");
    }
);

Then("the learner should be navigated to the certificate page",async function (this: BugFinder) {
        logger.info("Validating learner certificate page");
        await this.learnerCertificatePage.verifyCertificatePage();
        logger.info("Learner successfully navigated to the certificate page");
    }
);

Then("the learner should see the certificare image",async function (this: BugFinder) {
        logger.info("Validating certificate image");
        await this.learnerCertificatePage.verifyCertificateImage();
        logger.info("Certificate image is displayed successfully");
    }
);
