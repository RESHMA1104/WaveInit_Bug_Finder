const path = require("node:path");

module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },

        requireModule: [
            "ts-node/register"
        ],

        require: [
            "src/test/hooks/**/*.ts",
            "src/test/stepdefinitions/**/*.ts",
            "src/test/world/**/*.ts"
        ],

        paths: [
            "src/test/features/**/*.feature"
        ],

        publishQuiet: true,
        dryRun: false,

        format: [
            "snippets",
            "progress",

            "json:reports/cucumber-json/cucumber-report.json",

            "html:reports/cucumber-html/cucumber-report.html",

            "rerun:rerun/@rerun.txt",

            "allure-cucumberjs/reporter:allure-results"
        ],

        parallel: 1
    },

    rerun: {
        requireModule: [
            "ts-node/register"
        ],

        require: [
            "src/test/hooks/**/*.ts",
            "src/test/stepdefinitions/**/*.ts",
            "src/test/world/**/*.ts"
        ],

        paths: [
            "rerun/@rerun.txt"
        ],

        format: [
            "snippets",

            "json:reports/cucumber-json/cucumber-report.json",

            "html:reports/cucumber-html/cucumber-report.html",

            "rerun:rerun/@rerun.txt",

            "allure-cucumberjs/reporter:allure-results"
        ],

        parallel: 1
    }
};