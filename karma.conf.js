// Karma configuration

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'src/main/webapp/wise5',

        autoWatch: true,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jspm', 'jasmine'],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // list of files / patterns to load in the browser
        files: [
        ],

        jspm: {
            // Edit this to your needs
            config: 'config.js',
            loadFiles: [
                'test-unit/curriculum/SelfPropelledVehiclesChallenge/project.json',
                'test-unit/curriculum/DemoProject/project.json',
                {
                    pattern: 'test-unit/**/*.spec.js',
                    watched: false
                }
            ],
            serveFiles: [
                '**/**'
            ]
        },

        proxies: {
            //'/wise5': 'http://localhost:8080/wise/wise5',  // Use this when running WISE locally
            '/wise5': '/base',
            '/base/app': '/base/dist/app',
            '/base/common': '/base/dist/common',
            '/jspm_packages': '/base/jspm_packages'
        },

        // list of files to exclude
        exclude: [
            '**/*.es6',
            '**/*.js.map'
        ],

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test-unit/**/*.js': ['babel'],
            'test-unit/curriculum/**/*.json': ['json_fixtures']
        },

        'babelPreprocessor': {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
                //modules: 'system'
            }
        },

        jsonFixturesPreprocessor: {
            // strip this from the file path \ fixture name
            //stripPrefix: 'test/fixtures',
            // strip this to the file path \ fixture name
            //prependPrefix: 'mock/',
            // change the global fixtures variable name
            variableName: 'mocks',
            // camelize fixture filenames (e.g 'fixtures/aa-bb_cc.json' becames __fixtures__['fixtures/aaBbCc'])
            //camelizeFilenames: false,
            // transform the filename
            transformPath: function(path) {
                return path + '.js';
            }
        }
    });
};
