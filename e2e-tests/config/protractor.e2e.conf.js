'use strict';
const config = require('./protractor.shared.conf').config;

config.baseUrl = 'http://localhost:4200';
config.seleniumAddress = 'http://localhost:4444/wd/hub/';

config.multiCapabilities = [
    {
      browserName: 'chrome',
      chromeOptions: {
          args: [
              '--start-maximized'
          ]
      }
    }
];

exports.config = config;
