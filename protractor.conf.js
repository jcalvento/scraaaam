exports.config = {
  framework: 'mocha',
  mochaOpts: {
    timeout: 30000,
  },
  seleniumAddress: `http://${process.env.WEBDRIVER_HOST}:4444/wd/hub`,
  onPrepare: function () {
    require("babel-register");
  },
  specs: ['test/e2e/*.test.js']
};