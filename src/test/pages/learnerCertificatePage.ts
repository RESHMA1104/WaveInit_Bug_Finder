import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";

export class LearnerCertificatePage extends BasePage {

    readonly certificatesOption: Locator;
    readonly certificatePageHeading: Locator;
    readonly certificateImage: Locator;
    readonly noCertificateMessage: Locator;

    constructor(page: Page) {
        super(page);

        // Learner sidebar
        this.certificatesOption = page.getByRole("button", {name: "Certificates"});
        // Certificate page heading
        this.certificatePageHeading = page.getByText("My Certificates", { exact: true } );

        // Certificate content
        this.certificateImage = page.getByText("Certificate of Completion",{ exact: true });
        this.noCertificateMessage = page.getByText("No certificates earned yet",{ exact: true });
    }
    async clickCertificatesOption() {
        await this.click(this.certificatesOption);
    }
    async verifyCertificatePage() {
        await this.toBeVisible(this.certificatePageHeading);
    }
    async verifyCertificateImage() {
        await this.toBeVisible(this.certificateImage);
    }

     async verifyCertificateNotAvailable() {
        await this.toBeVisible(this.noCertificateMessage);
    }
}