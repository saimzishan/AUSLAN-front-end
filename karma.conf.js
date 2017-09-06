// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'es6-shim', 'intl-shim', '@angular/cli'],
        plugins: [
            require('karma-es6-shim'),
            require('karma-jasmine'),
            require('karma-requirejs'),
            require('karma-phantomjs-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-junit-reporter'),
            require('@angular/cli/plugins/karma'),
            require('pact-consumer-js-dsl'),
            require('karma-intl-shim'),
            require('karma-chrome-launcher')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        files: [
            {
                pattern: './node_modules/hammerjs/hammer.js',
                watched: false
            },
            {
                pattern: './node_modules/intl/locale-data/jsonp/en-US.js',
                watched: false
            },
            {
                pattern: './node_modules/Intl/locale-data/jsonp/en-US.js',
                watched: false
            },
            {
                pattern: './node_modules/jquery/dist/jquery.min.js',
                watched: false
            },
            {
                pattern: 'node_modules/pact-consumer-js-dsl/dist/pact-consumer-js-dsl.js',
                watched: false
            },
            {
                pattern: './node_modules/foundation-sites/dist/js/foundation.js',
                watched: false
            },
            {
                pattern: './src/test.ts',
                watched: false
            }
        ],
        preprocessors: {
            './src/test.ts': ['@angular/cli']
        },
        exclude: [
            'node_modules/**/*spec.js'
        ],
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        coverageIstanbulReporter: {
            reports: ['lcovonly'],
            dir: path.join(__dirname, 'test-results'),
            fixWebpackSourcePaths: true,

        },
        junitReporter: {
            outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'unit-test-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            useBrowserName: false // add browser name to report and classes names
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['progress', 'coverage-istanbul', 'junit'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS_without_security',/*'Chrome_without_security'*/ ], //Removing Chrome because of CI error
        customLaunchers: {
            PhantomJS_without_security: {
                base: 'PhantomJS',
                flags: ['--web-security=false']
            },
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security', '--headless','--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox']

            }
        },
        browserNoActivityTimeout: 30000,

        singleRun: true
    });
};
