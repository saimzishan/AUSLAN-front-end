// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma'),
      require('pact-consumer-js-dsl'),
      require('karma-chrome-launcher'),
      require('karma-safari-launcher'),
      require('karma-safaritechpreview-launcher'),
      require('karma-firefox-launcher')

    ],
    files: [
	//node_modules/pact-consumer-js-dsl/dist/web/pact-consumer-js-dsl.js,
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'karma-remap-istanbul']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
browsers: ['PhantomJS_without_security'/*,'Chrome', 'Chrome_without_security'*/], //Removing Chrome because of CI error
   customLaunchers: {
      PhantomJS_without_security: {
        base: 'PhantomJS',
        flags: ['--web-security=false']
      },
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
   }
    ,

    singleRun: false
  });
};
