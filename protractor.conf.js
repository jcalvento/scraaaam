exports.config = {
  framework: 'mocha',
  mochaOpts: {
    timeout: 30000,
  },
  onPrepare: function () {
    require("babel-register");
  },
  specs: ['test/e2e/*.test.js'],
  seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar',
};