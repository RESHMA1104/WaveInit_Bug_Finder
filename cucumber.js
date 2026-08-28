module.exports = {
    default: {
      formatOptions: {
        snippetInterface: "async-await"
      },
  
      requireModule: ["ts-node/register"],
  
      require: [
        'src/test/hooks/**/*.ts', 
        'src/test/stepdefinitions/**/*.ts',
        'src/test/world/**/*.ts'
      ],
  
      paths: ['src/test/features/**/*.feature'],
  
      publishQuiet: true,
      dryRun: false,
  
        format: [
          'snippets',
          'progress',
          'json:reports/cucumber-json/cucumber-report.json',
          'html:reports/cucumber-html/cucumber-report.html',
          'allure-cucumberjs/reporter',
          'rerun:rerun/@rerun.txt'
        ],
  
      parallel: 1
    },
  
    rerun: {
      requireModule: ["ts-node/register"],
  
      require: [
        'src/test/hooks/**/*.ts', 
        'src/test/stepdefinitions/**/*.ts',
        'src/test/world/**/*.ts'
      ],
  
      paths: ['rerun/@rerun.txt'],
  
      format: [
        'progress',
        'json:reports/rerun-cucumber-json/cucumber-report.json',
        'html:reports/rerun-cucumber-html/cucumber-report.html',
        'allure-cucumberjs/reporter',
        'rerun:rerun/@rerun.txt'
      ],
  
      parallel: 1
    } 
  };
  
