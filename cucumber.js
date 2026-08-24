const path = require("node:path");

module.exports={
    default:{
        formatoptions:{snippetInterface:"async-wait"},
        requireModule:[ts-node/register],
        require:['src/test/hooks/**/*.ts',
            'src/test/stepdefinitions/**/*.ts',
            'src/test/world/**/*.ts'
        ],
        path:['src/test/features/**/*.feature'],
        publishQuiet:true,
        dryRun:false,
        format:['snippets','progress','json:reports/cucumber-json/cucumber-report.json',
        'html:reports/cucumber-html/cucumber-report.html',
        'rerun:rerun/@rerun.txt'],
        parallel:1
    },

    rerun:{
        requireModule:[ts-node/register],
        require:['src/test/hooks/**/*.ts',
            'src/test/stepdefinitions/**/*.ts',
            'src/test/world/**/*.ts'
        ],
        path:['rerun/@rerun.txt'],
        format:['snippets','progress','json:reports/cucumber-json/cucumber-report.json',
            'html:reports/cucumber-html/cucumber-report.html',
            'rerun:rerun/@rerun.txt'],
         parallel:1
    }
}