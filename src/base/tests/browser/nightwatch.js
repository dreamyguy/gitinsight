// join files in one file, so we can use a single session for all tests
var extend = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
};

// load before/after functions
var io = require("./io");
module.exports = extend(module.exports, io);

// tests
var about = require("./about");
module.exports = extend(module.exports, about);
