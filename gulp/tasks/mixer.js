// generates a file with `@import`-references to sass files to accomodate
// our folder structure with compass compilation without the need for
// manually specify each file with import.

var through = require('through2'),
    util = require('gulp-util');

// generates import file

module.exports = function(outname) {
    // where we will push the path names with the @import
    var paths = '';
    var write = function(file, enc, cb) {
        if (file.path != "undefined") {
            paths = paths + '@import "' + file.path + '";\n';
        }
        cb();
    };
    // flush occurs at the end of the concating from write()
    var flush = function(cb) {
        // create a new file
        var newFile = new util.File({
            base: __dirname,
            cwd: __dirname,
            path: __dirname + '/' + outname,
            contents: new Buffer(paths) // set contents to the paths created
        });
        // push the new file to gulp's stream
        this.push(newFile);
        cb();
    };
    return through.obj(write, flush);
};
