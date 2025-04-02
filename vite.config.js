/// <reference types="vitest" />
/// <reference types="@vitest/browser/providers/playwright" />

//-- NodeJS
import os from 'node:os';
import path from 'node:path';

//-- NPM Packages
import replacePlugin from 'rollup-plugin-replace-regex';
import cp from 'vite-plugin-cp';
import {defineConfig} from 'vitest/config';

/**
 * The ViteJS configuration.
 */
const config = defineConfig(({mode}) => {
    const conf = {
        mode,
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        base: mode !== 'development' ? '/oregan-coding-test/' : '/',
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    quietDeps: true
                }
            }
        },
        build: {
            outDir: path.resolve(import.meta.dirname, './dist/'),
            minify: mode !== 'development',
            sourcemap: mode !== 'development' ? 'hidden' : true,
            emptyOutDir: true
        },
        test: {
            alias: {
                '@src': path.resolve(import.meta.dirname, './src/ts/')
            },
            browser: {
                enabled: true,
                provider: 'playwright',
                instances: [
                    {
                        browser: 'edge',
                        headless: true
                    }
                ]
            },
            coverage: {
                all: true,
                provider: 'istanbul',
                reporter: ['text', 'html']
            },
            passWithNoTests: true,
            reporters: 'default',
            mockReset: true,
            clearMocks: true,
            unstubGlobals: true,
            unstubEnvs: true,
            dir: './tests/',
            name: 'Oregan Code Test',
            maxConcurrency: Math.max(Math.floor(os.cpus().length / 2), 1)
        },
        server: {
            fs: {
                strict: process.env['VITEST_VSCODE'] === undefined
            }
        },
        plugins: [
            replacePlugin({
                preventAssignment: true,
                sourceMap: mode !== 'development' ? false : true,
                values: {
                    FAKER_SEED: JSON.stringify(process.env['FAKER_SEED'])
                },
                regexValues: {
                    '[^"]*bootstrap-icons\\.woff2\\?[^"]*': `${mode !== 'development' ? '/oregan-coding-test/' : '/'}assets/bootstrap-icons.woff2`,
                    '[^"]*bootstrap-icons\\.woff\\?[^"]*': `${mode !== 'development' ? '/oregan-coding-test/' : '/'}assets/bootstrap-icons.woff`
                }
            }),
            cp({
                targets: [
                    {
                        src: './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.*',
                        dest: './public/assets/'
                    }
                ]
            })
        ]
    };
    return conf;
});

export default config;
