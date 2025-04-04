# Oregan Coding Test #

<!-- omit in toc -->
## Table of Contents ##

* [Oregan Coding Test](#oregan-coding-test)
    * [Quick Start](#quick-start)
    * [Notes](#notes)
    * [Features](#features)
    * [Project Structure](#project-structure)
    * [Setup](#setup)
    * [Building](#building)
    * [Running Locally](#running-locally)
    * [Unit Tests](#unit-tests)
    * [Linting](#linting)
    * [License](#license)

## Quick Start ##

To quickly get started, simply visit the live demo over on [GitHub Pages](https://mdmulligan.github.io/coding-test-oreg/).

## Notes ##

* The recommended package manager is `pnpm`.

## Features ##

* Custom DOM ID attribute for easier custom styling.
* Focus handling.
* Optionally hidden text input.
* Delayed hiding of last inputted character.
* Customizable delay before hiding last character.
* Customizable text masking character.
* On value change callback.
* `ref` property support.
* Four types of input indicators (cursors):
    * None
    * Bar
    * Box
    * Underline
* Optional cursor blinking.
* Customizable cursor blinking interval.
* Multiple supported input methods:
    * Raw keyboard input via `onKeyPress` handling.
    * Support for a virtual keyboard (specifically https://github.com/hodgef/react-simple-keyboard)

## Project Structure ##

* `src` - Source code
    * `pages` - Page code
        * `index` - Main index page
            * `index.js` - Main module
            * `style.scss` - Common styling for page
            * `component.jsx` - Page business logic
    * `components` - Reusable components
        * `input` - Main reusable component for this coding test
            * `index.js` - Main module
            * `style.scss` - Common styling for component
            * `component.jsx` - Component business logic
    * `index.js` - Main application bootstrap logic
* `public` - Static assets
* `tests` - Unit tests
* `index.html` - Main HTML template
* `...` - Other configs, files, and directories as required

## Setup ##

To prepare for further steps:

```shell
# If using pnpm
pnpm install
# If using Yarn
yarn install
# If using npm
npm install
```

## Building ##

To build for a development environment:

```shell
# If using pnpm
pnpm run build:dev
# If using Yarn
yarn run build:dev
# If using npm
npm run build:dev
```

To clean the outputs for a development environment:

```shell
# If using pnpm
pnpm run clean:dev
# If using Yarn
yarn run clean:dev
# If using npm
npm run clean:dev
```

To rebuild for a development environment:

```shell
# If using pnpm
pnpm run rebuild:dev
# If using Yarn
yarn run rebuild:dev
# If using npm
npm run rebuild:dev
```

To build for a production environment:

```shell
# If using pnpm
pnpm run build:prod
# If using Yarn
yarn run build:prod
# If using npm
npm run build:prod
```

To clean the outputs for a production environment:

```shell
# If using pnpm
pnpm run clean:prod
# If using Yarn
yarn run clean:prod
# If using npm
npm run clean:prod
```

To rebuild for a production environment:

```shell
# If using pnpm
pnpm run rebuild:prod
# If using Yarn
yarn run rebuild:prod
# If using npm
npm run rebuild:prod
```

To build for all environments:

```shell
# If using pnpm
pnpm run build:all
# If using Yarn
yarn run build:all
# If using npm
npm run build:all
```

To clean the outputs for all environments:

```shell
# If using pnpm
pnpm run clean:all
# If using Yarn
yarn run clean:all
# If using npm
npm run clean:all
```

To rebuild for all environments:

```shell
# If using pnpm
pnpm run rebuild:all
# If using Yarn
yarn run rebuild:all
# If using npm
npm run rebuild:all
```

## Running Locally ##

To run the project locally

```shell
# If using pnpm
pnpm run dev
# If using Yarn
yarn run dev
# If using npm
npm run dev
```

## Unit Tests ##

To run the project unit tests (with code coverage):

```shell
# If using pnpm
pnpm run test
# If using Yarn
yarn run test
# If using npm
npm run test
```

Code coverage is output to the `coverage` directory.

To run the project unit tests in watch mode (to be re-run when code changes):

```shell
# If using pnpm
pnpm run test:watch
# If using Yarn
yarn run test:watch
# If using npm
npm run test:watch
```

To run the project unit tests in web UI mode using Vitest:

```shell
# If using pnpm
pnpm run test:ui
# If using Yarn
yarn run test:ui
# If using npm
npm run test:ui
```

## Linting ##

To lint the project:

```shell
# If using pnpm
pnpm run lint
# If using Yarn
yarn run lint
# If using npm
npm run lint
```

To lint the project and fix any issues found:

```shell
# If using pnpm
pnpm run lint:fix
# If using Yarn
yarn run lint:fix
# If using npm
npm run lint:fix
```

## License ##

Copyright (c) 2025 M. Damian Mulligan

All rights reserved.

See [LICENSE.md](LICENSE.md) for the full license.
