
// request and parse JSON data
// define data source
var data_source = "dist/data/commits.json";
// request the data
var xhr = new XMLHttpRequest();
xhr.open("GET", data_source);
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) { return; }
    if ((this.status >= 200 && this.status < 300) || this.status === 0) {
        // get raw data
        data_JSON = this.responseText;
        // parse JSON data to JavaScript format
        data_parsed = JSON.parse(data_JSON);
        //console.log(data_parsed); // test output
        // manipulate data 'outside' the xhr request to keep things tidy
        manipulateData(data_parsed);
    } else {
        console.log('There was an error completing the XMLHttpRequest...');
    }
};
xhr.send();

var manipulateData = function(source) {
    var data = source;
    data = data.commits; // because the json file contains an object called 'commits'
    //console.log(data);

    // Sort datasource array by date
    // ------------------------------------------------------------
    data.sort(function(a, b) {
        return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
    });

    // Calculate number of days between two dates
    // ------------------------------------------------------------
    var daysBetween = function(timeStampA, timeStampB) {
        var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        var firstDate = new Date(timeStampA * 1000);
        var secondDate = new Date(timeStampB * 1000);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
    };

    // Calculate number of days since one date
    // ------------------------------------------------------------
    var daysSince = function(timeStamp) {
        var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        var sinceDate = new Date(timeStamp * 1000);
        var now = Date.now();
        var diffDays = Math.round(Math.abs((sinceDate.getTime() - now)/(oneDay)));
        return diffDays;
    };

    // Count duplicate keys within an array
    // ------------------------------------------------------------
    var groupByDuplicatesInArray = function(array) {
        if(array.length === 0) {
            return null;
        }
        var counts = {};
        array.forEach(function(x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        return counts;
    };

    // Create array based on values
    // ------------------------------------------------------------
    var arrayOfValues = function(data) {
        var arr = [];
        for (var i in data) {
            arr.push(data[i]);
        }
        return arr;
    };

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
    var arrayImpact = arrayByKey(data, 'impact');

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

    // Return number of items in an object
    // ------------------------------------------------------------
    var itemsSum = function(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += 1;
        }
        return sum;
    };
    var arrayTotal = itemsSum(data);

    // Return average value based on number of items in an object
    // ------------------------------------------------------------
    var itemsAverage = function(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += parseInt(data[i]);
        }
        var avg = sum/data.length;
        return avg;
    };

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
    var arrayYearChangesVar = arrayYearChanges(data, 'date_year');

    // Get author stats and output it on a dedicated array, with options
    // ------------------------------------------------------------
    var arrayAuthorsStats = function(data, type) {
        var obja = {};
        for (var i in data) {
            if (!obja.hasOwnProperty(data[i].author_email)) {
                obja[data[i].author_email] = [];
            }
            obja[data[i].author_email].push(data[i]);
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
                // calculate author's commits on a given week day
                var authorDays = arrayByKey(objb, 'date_day_week');
                // calculate days between first and last commits
                var commitDateFirst = objb[0].author_date_unix_timestamp;
                var commitDateLast = objb[objb.length - 1].author_date_unix_timestamp;
                var daysActive = daysBetween(commitDateFirst, commitDateLast);
                // calculate days since first and last commits
                var daysSinceFirstCommit = daysSince(commitDateFirst);
                var daysSinceLastCommit = daysSince(commitDateLast);
                // calculate commits per day
                var commitsPerDay = arrayByKey(objb, 'date_iso_8601');
                // push new data to array
                if (type == 'author') {
                    stats.push(b);
                } else if (type == 'commits') {
                    stats.push(authorNrCommits);
                } else if (type == 'impact') {
                    stats.push(authorImpactSum);
                } else if (type == 'daysActive') {
                    stats.push(daysActive);
                } else if (type == 'daysSinceFirstCommit') {
                    stats.push(daysSinceFirstCommit);
                } else if (type == 'daysSinceLastCommit') {
                    stats.push(daysSinceLastCommit);
                } else if (type == 'weekdays') {
                    stats.push({
                        author : b,
                        weekdays: groupByDuplicatesInArray(authorDays)
                    });
                } else if (type == 'commitsPerDay') {
                    stats.push({
                        author : b,
                        commitsPerDay: groupByDuplicatesInArray(commitsPerDay)
                    });
                } else if (type == 'commitsPerDayYear') {
                    stats.push(
                        arrayOfValues(Object.keys(groupByDuplicatesInArray(commitsPerDay)))
                    );
                } else if (type == 'commitsPerDayNr') {
                    stats.push(
                        arrayOfValues(groupByDuplicatesInArray(commitsPerDay))
                    );
                } else {
                    stats.push({
                        author: b,
                        commits: authorNrCommits,
                        impact: authorImpactSum,
                        weekdays : groupByDuplicatesInArray(authorDays),
                        daysActive : daysActive,
                        commitDateFirst : commitDateFirst,
                        commitDateLast : commitDateLast,
                        daysSinceFirstCommit : daysSinceFirstCommit,
                        daysSinceLastCommit : daysSinceLastCommit,
                        commitsPerDay: groupByDuplicatesInArray(commitsPerDay)
                    });
                }
            }
        }
        return stats;
    };
    // var arrayAuthorsStatsVarAll = arrayAuthorsStats(data);
    // var arrayAuthorsStatsVarAuthor = arrayAuthorsStats(data, 'author');
    // var arrayAuthorsStatsVarCommits = arrayAuthorsStats(data, 'commits');
    // var arrayAuthorsStatsVarImpact = arrayAuthorsStats(data, 'impact');
    // var arrayAuthorsStatsVarWeekdays = arrayAuthorsStats(data, 'weekdays');
    // var arrayAuthorsStatsVarDaysActive = arrayAuthorsStats(data, 'daysActive');
    // var arrayAuthorsStatsVarDaysSinceFirstCommit = arrayAuthorsStats(data, 'daysSinceFirstCommit');
    // var arrayAuthorsStatsVarDaysSinceLastCommit = arrayAuthorsStats(data, 'daysSinceLastCommit');
    // var arrayAuthorsStatsVarCommitsPerDay = arrayAuthorsStats(data, 'commitsPerDay');
    var arrayAuthorsStatsVarCommitsPerDayYear = arrayAuthorsStats(data, 'commitsPerDayYear');
    var arrayAuthorsStatsVarCommitsPerDayNr = arrayAuthorsStats(data, 'commitsPerDayNr');

    // Create array - commit nr each day
    // ------------------------------------------------------------
    var arrayOfExtractedCommitNrPerDay = function(data) {
        var arr = [];
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                for (var nr in data[i]) {
                    if (data[i].hasOwnProperty(nr)) {
                        //console.log(data[i][nr]);
                        arr.push(data[i][nr]);
                    }
                }
            }
        }
        return arr;
    };
    var arrayOfExtractedCommitNrPerDayVar = arrayOfExtractedCommitNrPerDay(arrayAuthorsStatsVarCommitsPerDayNr);
    var arrayCommitPerDaySum = sumArray(arrayOfExtractedCommitNrPerDayVar);

    // Create array - years vs commits to be used as graph labels
    // ------------------------------------------------------------
    var arrayOfExtractedYearsCommits = function(data) {
        var arr = [];
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                for (var y in data[i]) {
                    if (data[i].hasOwnProperty(y)) {
                        //console.log(data[i][y]);
                        var z = data[i][y].toString().slice(0,4);
                        var previousYear;
                        var currentYear = z;
                        if (previousYear != currentYear) {
                            arr.push(z);
                        } else {
                            arr.push('');
                        }
                        previousYear = z;
                    }
                }
            }
        }
        return arr;
    };
    var arrayOfExtractedYearsCommitsVar = arrayOfExtractedYearsCommits(arrayAuthorsStatsVarCommitsPerDayYear);

    // Some jazz
    // ------------------------------------------------------------
    // var arrayAuthorsStatsVarDaysActiveAverage = itemsAverage(arrayAuthorsStatsVarDaysActive);
    // //console.log('The average number of active days of a single committer is ' + arrayAuthorsStatsVarDaysActiveAverage + ', which is the equivalent to ' + arrayAuthorsStatsVarDaysActiveAverage / 365 + ' years');
    // var arrayAuthorsStatsVarCommitsAverage = itemsAverage(arrayAuthorsStatsVarCommits);
    // //console.log('The average number of commits by a single committer is ' + arrayAuthorsStatsVarCommitsAverage + ', which is the equivalent to ' + arrayAuthorsStatsVarCommitsAverage / arrayAuthorsStatsVarDaysActiveAverage + ' a day');
    // var arrayAuthorsStatsVarImpactAverage = itemsAverage(arrayAuthorsStatsVarImpact);
    // //console.log('The average impact by a single committer is ' + arrayAuthorsStatsVarImpactAverage + ' lines of code');

    // var arrayAuthorsStatsAuthorAndCommits = arraysMerge(arrayAuthorsStatsVarAuthor, arrayAuthorsStatsVarCommits);
    // //console.log(arrayAuthorsStatsAuthorAndCommits);
    // var arrayAuthorsStatsAuthorAndImpact = arraysMerge(arrayAuthorsStatsVarAuthor, arrayAuthorsStatsVarImpact);
    // //console.log(arrayAuthorsStatsAuthorAndImpact);

    // Render charts
    // ------------------------------------------------------------

    new Chartist.Line('.ct-chart-impact', {
        labels: arrayYearChangesVar,
        series: [
            arrayImpact
        ]
    }, {
        height: '300px',
        high: 22000,
        low: -17000,
        showArea: true,
        showLine: true,
        showPoint: false,
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 20
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
        high: 210000,
        low: 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 20
        },
        axisX: {
            showLabel: true,
            showGrid: true
        }
    });

    new Chartist.Line('.ct-chart-commits', {
        labels: arrayOfExtractedYearsCommitsVar,
        series: [
            arrayOfExtractedCommitNrPerDayVar
        ]
    }, {
        height: '300px',
        high: 45,
        low: 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 20
        },
        axisX: {
            showLabel: true,
            showGrid: true
        }
    });

    new Chartist.Line('.ct-chart-commits-cumulative', {
        labels: arrayOfExtractedYearsCommitsVar,
        series: [
            arrayCommitPerDaySum
        ]
    }, {
        height: '300px',
        high: 4500,
        low: 0,
        showArea: true,
        showLine: true,
        showPoint: false,
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 20
        },
        axisX: {
            showLabel: true,
            showGrid: true
        }
    });

};
