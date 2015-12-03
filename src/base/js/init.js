// docready for modern browsers
document.addEventListener("DOMContentLoaded", function(event) {

    var datasrc = dataReposAllOfThem;
    //var datasrc = dataReposAll;
    //var datasrc = dataReposSome;
    //console.log(datasrc);

    // Sort datasource array by date
    // ------------------------------------------------------------
    datasrc.sort(function(a, b) {
        return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
    });
    //console.log(datasrc);

    // Round up the date so that we can sort commits from different repos by date
    // ------------------------------------------------------------
    var roundDate = function(timeStamp) {
        var d = new Date(timeStamp);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
    };

    // Create object array based on key and its value
    // ------------------------------------------------------------
    var groupByKeyAndValue = function(data, key, val) {
        var arr = [];
        for (var i in data) {
            if (data[i][key] == val) {
                arr.push(data[i]);
            }
        }
        return arr;
    };
    var weekMonday = groupByKeyAndValue(datasrc, 'date_day_week', 'Mon');
    //console.log(weekMonday);

    // Create array based on key value
    // ------------------------------------------------------------
    var arrayByKey = function(data, key) {
        var arr = [];
        for (var i in data) {
            if (data[i][key] === undefined) {
                data[i][key] = '0';
            }
            arr.push(data[i][key]);
        }
        return arr;
    };
    var arrayCommitNr = arrayByKey(datasrc, 'commit_nr');
    //console.log(arrayCommitNr);
    var arrayImpact = arrayByKey(datasrc, 'impact');
    //console.log(arrayImpact);
    var arrayTimestamp = arrayByKey(datasrc, 'author_date_unix_timestamp');
    //console.log(arrayTimestamp);

    // Create array based on key value, sorted
    // ------------------------------------------------------------
    var arrayByKeySorted = function(data, key) {
        var arr = [];
        for (var i in data) {
            arr.push(data[i][key]);
        }
        arr.sort(function(a, b) {
            return a - b;
        });
        return arr;
    };
    var arrayByKeySortedVar = arrayByKeySorted(datasrc, 'author_date_unix_timestamp');
    //console.log(arrayByKeySortedVar);

    // Return number that results from adding a key to itself
    // ------------------------------------------------------------
    var totalSum = function(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += parseInt(data[i]);
          //console.log(sum);
        }
        return sum;
    };
    var arrayImpactTotal = totalSum(arrayImpact);
    //console.log(arrayImpactTotal);

    // Return number of items in an object
    // ------------------------------------------------------------
    var itemsSum = function(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += 1;
        }
        return sum;
    };
    var arrayTotal = itemsSum(datasrc);
    //console.log(arrayTotal);

    // Create array based on key values added to themselves
    // ------------------------------------------------------------
    var sumArray = function(data) {
        var sum = 0;
        var arr = [];
        for (var i in data) {
            sum += parseInt(data[i]);
            arr.push(sum);
          //console.log(sum);
        }
        return arr;
    };
    var arrayImpactSum = sumArray(arrayImpact);
    //console.log(arrayImpactSum);

    // Create object array based on key
    // ------------------------------------------------------------
    var groupByAuto = function(data, key) {
        var groups = {};
        for (var i in data) {
            if (!groups.hasOwnProperty(data[i][key])) {
                groups[data[i][key]] = [];
            }
            groups[data[i][key]].push(data[i]);
        }
        return groups;
    };
    var objDateDayWeek = groupByAuto(datasrc, 'date_day_week');
    //console.log(objDateDayWeek);
    var objRepository = groupByAuto(datasrc, 'repository');
    //console.log(objRepository);

    // Create object array based on key
    // ------------------------------------------------------------
    var groupByAuthors = function(data, author) {
        var groups = {};
        for (var i in data) {
            var a = data[i][author].match(/[^@]*/);
            if (!groups.hasOwnProperty(data[i][author])) {
                groups[data[i][author]] = [];
            }
            groups[data[i][author]].push(data[i]);
        }
        return groups;
    };
    var groupByAuthorsVar = groupByAuthors(datasrc, 'author_email');
    //console.log(groupByAuthorsVar);

    // Create array based on key value
    // ------------------------------------------------------------
    var arrayAllRepos = function(data) {
        var arr = [];
        for (var i in data) {
            arr.push(data[i]);
        }
        return arr;
    };
    var arrayAllReposLength = function(data) {
        var arr = [];
        for (var i in data) {
            arr.push(data[i].length);
        }
        return arr;
    };
    var arrayAllReposVar = arrayAllRepos(Object.keys(objRepository));
    //console.log(arrayAllReposVar);
    var arrayAllReposValueArrayLength = arrayAllReposLength(Object.keys(objRepository));
    //console.log(arrayAllReposValueArrayLength);

    // Merge two arrays of identical length
    // ------------------------------------------------------------
    var arraysMerge = function(keys, values) {
        var obj = {};
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = values[i];
        }
        return obj;
    };

    // Create array with year changes
    // ------------------------------------------------------------
    var arrayYearChanges = function(data, year) {
        var arr = [];
        for (var i in data) {
            var currentYear = data[i][year];
            var previousYear;
            if (previousYear != currentYear) {
                arr.push(data[i][year]);
            } else {
                arr.push('');
            }
            previousYear = data[i][year];
        }
        return arr;
    };
    var arrayYearChangesVar = arrayYearChanges(datasrc, 'date_year');
    //console.log(arrayYearChangesVar);

    // Get author stats and output it on a dedicated object
    // ------------------------------------------------------------
    var groupByAuthorsStats = function(data, author) {
        var obja = {};
        for (var i in data) {
            if (!obja.hasOwnProperty(data[i][author])) {
                obja[data[i][author]] = [];
            }
            obja[data[i][author]].push(data[i]);
        }
        // create an object to receive customised author stats
        var stats = {};
        // iterate through 'obja' object
        for (var b in obja) {
           if (obja.hasOwnProperty(b)) {
                var objb = obja[b];
                // calculate total impact
                var authorImpact = arrayByKey(objb, 'impact');
                var authorImpactSum = totalSum(authorImpact);
                // calculate total number of commits
                var authorNrCommits = itemsSum(objb);
                // push new data to array
                if (!stats.hasOwnProperty(b)) {
                    stats[b] = [];
                }
                stats[b].push({
                    commits: authorNrCommits,
                    impact: authorImpactSum
                });
            }
        }
        return stats;
    };
    var groupByAuthorsStatsVar = groupByAuthorsStats(datasrc, 'author_email');
    //console.log(groupByAuthorsStatsVar);

    // Get author stats and output it on a dedicated array
    // ------------------------------------------------------------
    var arrayAuthorsStats = function(data, author) {
        var obja = {};
        for (var i in data) {
            if (!obja.hasOwnProperty(data[i][author])) {
                obja[data[i][author]] = [];
            }
            obja[data[i][author]].push(data[i]);
        }
        // create an object to receive customised author stats
        var stats = [];
        // iterate through 'obja' object
        for (var b in obja) {
           if (obja.hasOwnProperty(b)) {
                var objb = obja[b];
                // calculate total impact
                var authorImpact = arrayByKey(objb, 'impact');
                var authorImpactSum = totalSum(authorImpact);
                // calculate total number of commits
                var authorNrCommits = itemsSum(objb);
                // push new data to array
                stats.push({
                    author: b,
                    commits: authorNrCommits,
                    impact: authorImpactSum
                });
            }
        }
        return stats;
    };
    var arrayAuthorsStatsVar = arrayAuthorsStats(datasrc, 'author_email');
    //console.log(arrayAuthorsStatsVar);

    // Create array of objects with authors and their impact
    // ------------------------------------------------------------
    var arrayAuthorImpact = function(data, author, impact) {
        var arr = [];
        for (var i in data) {
            var a = data[i][author].match(/[^@]*/);
            arr.push('{ "author":"' + a + '", "impact":"' + data[i][impact] + '"},');
        }
        return arr;
    };
    var arrayAuthorImpactVar = arrayAuthorImpact(datasrc, 'author_email', 'impact');
    //console.log(arrayAuthorImpactVar);

    new Chartist.Line('.ct-chart-impact', {
        labels: arrayYearChangesVar,
        series: [
          arrayImpact
        ]
    }, {
        height: '300px',
        high: 900000,
        low: -300000,
        showArea: true,
        showLine: true,
        showPoint: false,
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 40
        },
        axisX: {
            showLabel: true,
            showGrid: true
        }
    });

    new Chartist.Line('.ct-chart-impact-cumulative', {
        labels: arrayYearChangesVar,
        series: [
          arrayImpactSum
        ]
    }, {
        height: '300px',
      //high: 1400000, // with 'dataReposSome'
      //high: 3700000, // with 'dataReposAll'
        high: 8000000000, // with 'dataReposAll' based on 'dataReposAllOfThemClean'
        low: 1000,
        showArea: true,
        showLine: true,
        showPoint: false,
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 40
        },
        axisX: {
            showLabel: true,
            showGrid: true
        }
    });

});
