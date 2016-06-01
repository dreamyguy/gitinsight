# gitinsight

> Visualise your git log in new and exciting ways!. Free to use according to [MIT license](LICENSE).

![Gitinsight](https://raw.githubusercontent.com/dreamyguy/gitinsight/react/src/base/img/do-not-compile/gitinsight-logo-github.png "Visualise your git log in new and exciting ways")

This project is a natural sequel to [Gitlogg][6], a project that parses the `git log` of multiple repositories into `JSON`. The idea is to help organizations visualize their data in ways that help them understand what lies behind their codebase.

Note that the React implementation is under development!

## Installing

This project requires you to run `bower install` and `npm install` from the project's root. It requires [NodeJS][4] to be previously installed in your system.

If you're new to either [Bower][3] or [Gulp][2] you might want to install it globally:

```shell
$ npm install gulp-cli -g
$ npm install bower -g
```

## Running it

Once installation is complete, you will have to compile the static files and start the server before you can view anything.

Run this to compile static files:

```shell
$ gulp
```

To view the project's page you will have to start-up the server. The command below will start the server on `localhost:3000`:

```shell
$ gulp serve
```

You can change the port number on [serve.js](https://github.com/dreamyguy/gitinsight/blob/react/gulp/tasks/serve.js), but you'll have to check [browser-sync](https://github.com/Browsersync/browser-sync)'s documentation on how to do it.

## Developing

Once your server is up and running, you will want to have `gulp` run by itself whenever you make a change. That way you can enjoy the full benefit of [BrowserSync](https://www.browsersync.io/), that will refresh the page automatically for you once you've saved your change. To trigger `gulp` to run when you save changes, open a new terminal window, browse to the project's root and run:

```shell
$ gulp watch
```

You can get _BrowserSync_ to load your site on several devices. Check [their documentation](https://www.browsersync.io/docs/) out.

## Testing

There are a few browser tests designed to automatically test the integrity of the page. To run it, you'd have to have run `gulp` at least once, to compile the test files where [Nightwatchjs][5] expects to find them. Once you're set, run:

```shell
$ ./bin/nightwatch --test tests/browser/nightwatch.js
```

Smile!

## Publishing it

You only need to upload the directories `dist` and `templates` to the `public_html` folder on your server.

If you have trouble to point your domain to `templates` on your server, just take the content of the `templates` folder and move it to root. At this point `templates` contains only one file: **index.html**.

If you do use it I'd love to see it! :thumbsup:

## License

Free to use it AS IS as long as you stick to the [MIT license](LICENSE).

---

A BIG thanks to the node community and all those who taught me to be a better programmer. You know who you are.

  [1]: http://sidhree.com
  [2]: http://gulpjs.com/
  [3]: http://bower.io/
  [4]: http://nodejs.org/
  [5]: http://nightwatchjs.org/
  [6]: https://github.com/dreamyguy/gitlogg
