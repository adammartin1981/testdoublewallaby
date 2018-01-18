const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');

module.exports = function (wallaby) {
    // const webpackPostprocessor = wallabyWebpack(webpackConfig);
    const webpackPostprocessor = wallabyWebpack({
        resolve: {
            alias: {
                sheep : path.join(__dirname, './client/components/core/utils.js')
            }
        },
        entry: './client/index.js'
    });

    // Try here
    // https://github.com/wallabyjs/public/issues/469
    process.env.BABEL_ENV = 'test';

    return {
        files: [
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
            {pattern: 'client/**/*.js*', load: false},
            {pattern: 'client/**/*.spec.js*', ignore: true}
        ],

        tests: [
            {pattern: 'client/**/*.spec.js*', load: false}
        ],

        compilers: {
            '**/*.js?(*)': wallaby.compilers.babel()
        },

        postprocessor: webpackPostprocessor,

        setup: function () {

            // See if window will work
            // const { JSDOM } = require('jsdom');
            // const jsdom = new JSDOM('<!doctype html><html><body></body></html>');

            // const { window } = jsdom;
            //
            // function copyProps(src, target) {
            //     const props = Object.getOwnPropertyNames(src)
            //         .filter(prop => typeof target[prop] === 'undefined')
            //         .reduce((result, prop) => ({
            //             ...result,
            //             [prop]: Object.getOwnPropertyDescriptor(src, prop),
            //         }), {});
            //     Object.defineProperties(target, props);
            // }
            //
            // global.window = window;
            // global.document = window.document;
            // global.navigator = {
            //     userAgent: 'node.js',
            // };
            // copyProps(window, global);
            // // console.log('LOADING TESTS');
            window.__moduleBundler.loadTests();
        },

        testFramework: 'mocha',

        // env: {
        //     type: 'node'
        // }
    };
};