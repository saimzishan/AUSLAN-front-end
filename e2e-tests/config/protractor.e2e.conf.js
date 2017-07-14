'use strict';
const config = require('./protractor.shared.conf').config;

config.baseUrl = 'http://localhost:4200';
config.seleniumAddress = 'http://localhost:4444/wd/hub/';
config.restartBrowserBetweenTests= false;
    config.multiCapabilities = [
    {
      browserName: 'chrome',
      chromeOptions: {
          args: ['--start-maximized', '--web-security=false'/*'--headless','--disable-gpu'*/]
      }
    }
];
config.allScriptsTimeout= 30000;
// config.framework= 'jasmine';

//config.jasmineNodeOpts= {
//    defaultTimeoutInterval: 30000
//}

exports.config = config;
