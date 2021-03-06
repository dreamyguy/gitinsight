![Gitinsight](https://github.com/dreamyguy/gitinsight/blob/master/frontend/public/img/docs/gitinsight-icon-github.png "Visualise your git log in new and exciting ways")

> 👁 Visualise your git log in new and exciting ways!

[![Node Version](https://img.shields.io/badge/node-v14.12.0-blue.svg)](https://github.com/nodejs/node/releases/tag/v14.12.0) [![MIT Licence](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dreamyguy/gitinsight/blob/master/LICENSE) [![Data generated by Gitlogg](https://img.shields.io/badge/data_generated_by-gitlogg-89336e.svg)](https://github.com/dreamyguy/gitlogg)

This project is a natural sequel to [Gitlogg][6], a project that parses the `git log` of multiple repositories into `JSON`. The idea is to help organizations visualize their data in ways that help them understand what lies behind their codebase. **Gitinsight** is therefore an extension of [Gitlogg][6], showcasing how useful the latter can be. 🔮

Having said that...

> 👉 **Gitinsight** is _nothing_ without a `gitlogg.json` file!

This is the most important aspect of **Gitinsight**, and there's no way around it. All the logic around retrieving and rendering the data is intrinsically connected to the data structure present on `gitlogg.json`, which is the output of [Gitlogg][6].

## Getting started

**0. Generate a `gitlogg.json` with [Gitlogg][6]**.

...and place it under:

```
backend/server/json/gitlogg.json
```

> 👉 For the curious, I've included a sample `gitlogg.json` so that one can try it without having generated their on `JSON` file.

At the time of this writing, I have yet to make a slight modification to the `JSON` generated by [Gitlogg][6].

`JSON Server` expects the following format:

```
{
  "commits": [
    {"repository":"gitinsight","commit_nr":1, ...},
    {"repository":"gitinsight","commit_nr":2, ...},
  ]
}
```

While [Gitlogg][6] currently outputs _(because of the no longer used [Gitlogg API][7])_:

```
[
  {"repository":"gitinsight","commit_nr":1, ...},
  {"repository":"gitinsight","commit_nr":2, ...},
]
```

Until I have made that change to [Gitlogg][6] output, add these to `gitlogg.json`:

- `{ "commits": ` to the beginning.
- `} ` to the end.

_I'll remove this notice once that's no longer necessary._

**1. Use the correct `node` version!**

For better compatibility tracking, this project requires a minimal version of `node`. The version below is specified under `package.json` > `engines` > `node` on the [package.json](https://github.com/dreamyguy/gitinsight/blob/master/package.json) file and on [.nvmrc](https://github.com/dreamyguy/gitinsight/blob/master/.nvmrc) file.

Use [`nvm`](https://github.com/nvm-sh/nvm) to set the version. Install [`nvm`](https://github.com/nvm-sh/nvm) if you don't already have it (install instructions available on their [Github page](https://github.com/nvm-sh/nvm)).

    nvm install v14.12.0

If you already have that version installed:

    nvm use v14.12.0

The `npm` version gets automatically set when setting the expected `node` version through `nvm`.

**2. Don't skip point 1**

**3. Install dependencies**

Given that you are at the project's root, run:

    npm run setup

That will install all necessary dependencies for both **_frontend_** and **_backend_**.

## Running it

**Gitinsight** requires different apps running simultaneously. You'll be running 3 separate terminal windows:

**1. JSON Server**

Navigate to the `backend/` folder and run:

    npm run server:json

That will start the `JSON Server` on `http://localhost:3000`. The endpoint we'll be using will be at `http://localhost:3000/commits`.

**2. GraphQL Server**

Navigate to the `backend/` folder and run:

    npm run server:graphql

That will start the `GraphQL Server` on `http://localhost:4000/graphql`.

**3. React Application**

Navigate to the `frontend/` folder and run:

    npm run start

That will start the `React Application` on `http://localhost:7777`.

All these tasks have their own watch, that's triggered upon relevant file changes.

All available scripts are defined on the `script` part of [package.json](./package.json).

## Development

**1. Install plugins for `eslint` and `prettier` on your IDE** (VS Code, Atom, Sublime, etc)

To ensure all developers are on the "same page" when it comes to code formatting, we reinforce certain rules. It's therefore important that plugins for `eslint` and `prettier` are installed on your IDE of choice.

These are the plugins I use on VS Code:

- Prettier: `esbenp.prettier-vscode`
- ESLint: `dbaeumer.vscode-eslint`

**2. Unit testing**

Navigate to the `frontend/` folder and run:

    npm run test

That will start the test suite ([Jest](https://jestjs.io)), which will test _utilities_.

_Utilities_ are pure functions that lift the complexity out of the files in which they are used. They require specific input, through pre-defined parameters, and provide specific output - whilst failing gracefully.

## Good to know

This project ~~relies on~~ used to rely on [Gitlogg API][7] to render data, but on version [v3.0.0](https://github.com/dreamyguy/gitinsight/tree/v3.0.0) I've moved from `MongoDB` to `JSON Server` combined with `GraphQL` on the **_backend_** and `GraphQL` combined with `Apollo Client` on the **_frontend_**.

Accessing data locally (as originally done until version [v1.0.3](https://github.com/dreamyguy/gitinsight/tree/v1.0.3)) would hit a wall as browsers only cache a limited amount of data. It was also important to outsource the _massaging_ of the data to a dedicated service, as too many operations had to be made to show even the simplest output. Now these operations are done at the `GraphQL` level, which in turn are cached by the `Apollo Client`. `JSON Server` simply serves the `gitlogg.json` output, which is generated by [Gitlogg][6].

The move to `JSON Server` was done for the sake of simplicity. For serving _ridiculously big data_ one might be better off running `MongoDB`, but be warned that data size will bring your machine to its knees, and even though one can use [Gitlogg API][7] _(a `RESTful API` based on `ExpressJS` and `MongoDB`)_, further optimization might be required. I managed to run a 2.5GB dataset.

## License

Free to use AS IS as long as you stick to the [MIT license](LICENSE).

## Release History

- 2020-12-30 [v3.0.0](https://github.com/dreamyguy/gitinsight/tree/v3.0.0) - [View Changes](https://github.com/dreamyguy/gitinsight/compare/v2.0.0...v3.0.0)

  - Another total overhaul, for science! ✨ 🎉
  - Better separation of concerns (_backend_ & _frontend_)
  - Introduction of `GraphQL`
  - Introduction of `Apollo Client`
  - Modernization of `React` implementation
  - All styling by `Tailwind`
  - All new _dashboard_ looks!
  - `ESLint` + `Prettier`
  - _So. Much. More._

- 2018-04-08 [v2.0.0](https://github.com/dreamyguy/gitinsight/tree/v2.0.0) - [View Changes](https://github.com/dreamyguy/gitinsight/compare/v1.0.3...v2.0.0)
  - Total overhaul! ✨ 🎉
  - Introduction of `React`
  - Use of an API as data source (through [gitlogg-api](https://github.com/dreamyguy/gitlogg-api)) instead of accessing local data, which was costly and not scalable.
  - Unit testing
  - Travis CI
- 2016-06-02 [v1.0.3](https://github.com/dreamyguy/gitinsight/tree/v1.0.3) - [View Changes](https://github.com/dreamyguy/gitinsight/compare/gitinsight-1.0.2...v1.0.3)
  - Significant changes in every aspect, laying the ground for the React stack
- 2015-11-30 [v1.0.2](https://github.com/dreamyguy/gitinsight/tree/gitinsight-1.0.2) - [View Changes](https://github.com/dreamyguy/gitinsight/compare/gitinsight-1.0.1...gitinsight-1.0.2)
  - The first visualisation, based on local data
- 2015-11-30 [v1.0.1](https://github.com/dreamyguy/gitinsight/tree/gitinsight-1.0.1)
  - Bare minimal Gulp setup, no functionality yet

# About

**Gitinsight** was put together by [Wallace Sidhrée][1]. 👨‍💻🇳🇴

[1]: http://sidhree.com
[2]: http://gulpjs.com/
[4]: http://nodejs.org/
[6]: https://github.com/dreamyguy/gitlogg
[7]: https://github.com/dreamyguy/gitlogg-api
