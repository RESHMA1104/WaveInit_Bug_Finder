const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "./reports/cucumber-json",
    reportPath: "./reports/multiple-cucumber-html/html-report",

    reportName: "Wave Init LMS Automation Report",
    pageTitle: "Wave Init LMS",

    displayDuration: true,
    displayReportTime: true,

    metadata: {
        browser: {
            name: "Chromium",
            version: "Latest"
        },
        device: "Windows Desktop",
        platform: {
            name: "Windows",
            version: "11"
        }
    },

    customData: {
        title: "Execution Information",
        data: [
            { label: "Project", value: "Wave Init LMS" },
            { label: "Application URL", value: "https://www.waveinitlms.online/" },
            { label: "Framework", value: "Playwright + Cucumber BDD + TypeScript + POM" },
            { label: "Environment", value: "QA" },
            { label: "Execution Type", value: "Regression" },
            { label: "Cycle", value: "Sprint-1" }
        ]
    }
});