// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

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
        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov'
            }
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            dir: './coverage', // base output directory
            'report-config': {
                html: { // any options here are valid: https://github.com/istanbuljs/istanbul-reports/blob/master/lib/html/index.js#L134-L139
                },
                lcovonly: {
                    // options from here are valid: https://github.com/istanbuljs/istanbul-reports/blob/master/lib/lcovonly/index.js#L7-L10
                    file: 'coverage.lcov'
                }
            },
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: config.angularCli && config.angularCli.codeCoverage ? ['progress', 'coverage-istanbul'] : ['progress', 'kjhtml'],

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
                flags: ['--headless','--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox']

            }
        },
        browserNoActivityTimeout: 30000,

        singleRun: true
    });
};
