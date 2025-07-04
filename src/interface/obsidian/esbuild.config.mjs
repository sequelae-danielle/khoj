import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules'

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const isProduction = process.argv.includes('production');

const buildOptions = {
    banner: {
        js: banner,
    },
    entryPoints: ['src/main.ts'],
    bundle: true,
    external: [
        'obsidian',
        'electron',
        '@codemirror/autocomplete',
        '@codemirror/collab',
        '@codemirror/commands',
        '@codemirror/language',
        '@codemirror/lint',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/view',
        '@lezer/common',
        '@lezer/highlight',
        '@lezer/lr',
        'node:fs',
        'node:path',
        'node:util',
        'node:url',
        'node:http',
        'node:https',
        'node:stream',
        'node:zlib',
        'node:buffer',
        'node:net',
        ...builtins],
    format: 'cjs',
    minify: isProduction,
    sourcemap: !isProduction,
    treeShaking: true,
    outfile: 'main.js',
    platform: 'browser',
    target: ['es2020'],
};

if (!isProduction) {
    buildOptions.watch = {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error);
            else console.log('watch build succeeded');
        },
    };
}

esbuild.build(buildOptions).catch(() => process.exit(1));
