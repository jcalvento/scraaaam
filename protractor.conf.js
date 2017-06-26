exports.config = {
  framework: 'mocha',
  mochaOpts: {
    timeout: 30000,
  },
  seleniumAddress: process.env.WEBDRIVER_HOST,
  baseUrl: process.env.APP_SERVER,
  onPrepare: function () {
    require("babel-register");
  },
  specs: ['test/e2e/*.test.js']
};