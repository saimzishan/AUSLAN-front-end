'use strict';
const config = require('./protractor.shared.conf').config;

config.baseUrl = 'http://localhost:4200';
config.seleniumAddress = 'http://localhost:4444/wd/hub/';
config.restartBrowserBetweenTests= false;
    config.multiCapabilities = [
    {
      browserName: 'chrome',
        chromeOptions: {
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            },
            args: ['--start-maximized', '--web-security=false'/*'--headless','--disable-gpu'*/]
        }
    }
];
config.allScriptsTimeout= 99000;
// config.framework= 'jasmine';

//config.jasmineNodeOpts= {
//    defaultTimeoutInterval: 30000
//}

config.params= {
    env: 'test'
}

exports.config = config;
