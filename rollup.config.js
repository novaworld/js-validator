// https://github.com/wbkd/leaflet-swoopy/blob/master/rollup.config.js
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import visualizer from 'rollup-plugin-visualizer'
import progress from 'rollup-plugin-progress'
import url from 'rollup-plugin-url'
import html from 'rollup-plugin-html';
// import del from 'rollup-plugin-delete'
// import scss from 'rollup-plugin-scss'
// import vue from 'rollup-plugin-vue'
// import typescript from 'rollup-plugin-typescript'
// import alias from 'rollup-plugin-alias'

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json';

const env = process.env.NODE_ENV
const isProd = (env === 'production')
let external = Object.keys(pkg.dependencies);
let plugins = [];

let input = 'src/index.js'

let outputBrowser =  {
    file: pkg.browser,
    format: 'umd',
    name: 'validator',
    sourceMap: true,
    globals: {
        'lodash-es': '_'
    }
}

let output = [
    {
        file: pkg.main,
        format: 'cjs',
        sourceMap: true
    },
    {
        file: pkg.module,
        format: 'es',
        sourceMap: true
    },
    outputBrowser
]

plugins = plugins.concat([
    progress(),
    visualizer(),
    resolve({
        browser: true,
    }), // tells Rollup how to find date-fns in node_modules
    babel({
        exclude: 'node_modules/**', // only transpile our source code
        runtimeHelpers: true,
    }), //Place babel before commonjs plugin.
    commonjs(), // converts date-fns to ES modules
    json(),
    filesize(),
    url(),
    replace({
        'process.env.NODE_ENV': JSON.stringify(env),
    }),
    // scss(),
])

if (env === 'hot') {
    plugins = plugins.concat([
        serve({
            port: 5000,
            contentBase: ['public', 'dist']
        }),
        livereload({
            watch: ['public', 'dist']
        }),
        html({
            include: 'public/index.html'
        })
    ]);
}

const module = {
    input,
    output,
    plugins,
    external
}

export default [
    module,
    {
        ...module,
        output: [
            {
                ...outputBrowser,
                file: 'dist/validator.umd.min.js'
            }
        ],
        plugins: plugins.concat([terser()]),
    }
];