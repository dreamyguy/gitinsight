![Gitinsight](https://github.com/dreamyguy/gitinsight/blob/react/src/base/img/do-not-compile/gitinsight-icon-github.png "Visualise your git log in new and exciting ways")

> Visualise your git log in new and exciting ways!. Free to use according to [MIT license](LICENSE).

[![Build Status](https://travis-ci.org/dreamyguy/gitinsight.svg?branch=react2017)](https://travis-ci.org/dreamyguy/gitinsight) [![MIT Licence](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dreamyguy/gitinsight/blob/master/LICENSE)

This project is a natural sequel to [Gitlogg][6], a project that parses the `git log` of multiple repositories into `JSON`. The idea is to help organizations visualize their data in ways that help them understand what lies behind their codebase.

**Note**: The React implementation is under development!

## Installing

This project requires you to run `npm install` from the project's root. It requires [NodeJS][4] to be previously installed in your system.

If you're new to [Gulp][2] you might want to install it globally:

```shell
$ npm install gulp-cli -g
```

## Running it

Once installation is complete, you can start the server with hot-reloading (refresh upon file save) with:

```shell
$ npm run serve
```

The server will be available on `localhost:3000`

## License

Free to use it AS IS as long as you stick to the [MIT license](LICENSE).

#### Release History

* 2016-06-02   [v1.0.3](https://github.com/dreamyguy/gitinsight/tree/v1.0.3)   Significant changes in every aspect, laying the ground for the React stack
* 2015-11-30   [v1.0.2](https://github.com/dreamyguy/gitinsight/tree/gitinsight-1.0.2)   The first visualisation, based on local data
* 2015-11-30   [v1.0.1](https://github.com/dreamyguy/gitinsight/tree/gitinsight-1.0.1)   Bare minimal Gulp setup, no functionality yet

-------------

> _Brought to you by [Wallace Sidhrée][1]._

A BIG thanks to the node community and all those who taught me to be a better programmer. You know who you are.

  [1]: http://sidhree.com
  [2]: http://gulpjs.com/
  [4]: http://nodejs.org/
  [6]: https://github.com/dreamyguy/gitlogg
