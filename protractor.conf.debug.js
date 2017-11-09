'use strict';
const config = require('./protractor.shared.conf').config;

config.baseUrl = 'http://localhost:4200';
config.restartBrowserBetweenTests= false;
config.directConnect = true;
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
            args: ['incognito', '--window-size=1400,800']
        }
    }
];
config.allScriptsTimeout= 99000;
config.params= {
    env:  'localhost',
    debug: true
}

exports.config = config;
