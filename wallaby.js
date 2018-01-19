const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');

/*
Also found https://github.com/wallabyjs/public/issues/469 which had the same window issue
but now I have a cache issue appearing.
 */

module.exports = function (wallaby) {

    // Adding this allows replace to find the relative path - but still not the alias
    process.env.NODE_ENV = 'testing';
    process.env.NODE_PATH += require('path').delimiter
        + require('path').join(wallaby.projectCacheDir);

    // Just using 'mocked' webpack config to mimic the alias
    const webpackPostprocessor = wallabyWebpack({
        resolve: {
            alias: {
                sheep : path.join(__dirname, './client/components/core/utils.js')
            }
        },
        entry: './client/index.js'
    });


    process.env.BABEL_ENV = 'test';

    return {
        files: [
          'client/**/*.js*',
          '!client/**/*.spec.js*'
        ],

        tests: [
          'client/**/*.spec.js*'
        ],

        compilers: {
            '**/*.js?(*)': wallaby.compilers.babel()
        },

        postprocessor: webpackPostprocessor,

        bootstrap: function () {
          function setupWindow() {
            const jsdom = require('jsdom')
            const {JSDOM} = jsdom

            const dom = new JSDOM('<!doctype html><html><body></body></html>', {
              url: 'https://example.com'
            })

            global.document = dom.window.document
            global.window = document.defaultView
            global.navigator = global.window.navigator
            global.window.localStorage = {
              getItem: () => {},
              setItem: () => {}
            }
          }

          // adding this allows the window issue to go away
          // but creates a cannot read property of cache
          setupWindow()
        },

        testFramework: 'mocha',

        env: {
            type: 'node',
            runner: 'node'
        },

        debug:true
    };
};