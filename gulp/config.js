var _ = require('lodash'),
    fs = require('fs'),
    gulp = require('gulp'),
    util = require('gulp-util');

// use fs instead of require for pkg to prevent caching in watches
var config = {
    rootPath: require('./paths.json'),
    pkg: JSON.parse(fs.readFileSync('./package.json', 'utf8')),
    template: './gulp/config-template.json'
}

// log config generation to console
util.log(
    'Generating config from',
    util.colors.cyan("'" + config.template + "'"),
    'for',
    util.colors.magenta(config.pkg.name)
);

// generate the template for paths
config.path = JSON.parse(
    _.template(
        fs.readFileSync(
            config.template,
            'utf8'
        )
    )({
        'pkg': config.pkg,
        'path': config.rootPath
    })
);

// export it
module.exports = config;
