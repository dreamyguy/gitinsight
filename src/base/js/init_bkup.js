//  // docready for modern browsers
//  document.addEventListener("DOMContentLoaded", function(event) {
//  
//      var datasrc = dataRepoAbcAdloader;
//      var datasrcSfl = dataRepoStartsidenFrontpageLayout;
//      var datasrcAll = dataReposAllOfThem;
//      //var datasrcAll = dataReposAll;
//      //var datasrcAll = dataReposSome;
//      //console.log(datasrcAll);
//  
//      // Sort datasource array by date
//      // ------------------------------------------------------------
//      datasrc.sort(function(a, b) {
//          return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
//      });
//      //console.log(datasrc);
//  
//      datasrcSfl.sort(function(a, b) {
//          return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
//      });
//      //console.log(datasrcAll);
//  
//      datasrcAll.sort(function(a, b) {
//          return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
//      });
//      //console.log(datasrcAll);
//  
//      // Round up the date so that we can sort commits from different repost by date
//      // ------------------------------------------------------------
//      var roundDate = function(timeStamp) {
//          var d = new Date(timeStamp);
//          return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
//      };
//  
//      // Create object array based on key and its value
//      // ------------------------------------------------------------
//      var groupByKeyAndValue = function(data, key, val) {
//          var arr = [];
//          for (var i in data) {
//              if (data[i][key] == val) {
//                  arr.push(data[i]);
//              }
//          }
//          return arr;
//      };
//      var weekMondayAll = groupByKeyAndValue(datasrcAll, 'date_day_week', 'Mon');
//      //console.log(weekMondayAll);
//  
//      // Create array based on key value
//      // ------------------------------------------------------------
//      var arrayByKey = function(data, key) {
//          var arr = [];
//          for (var i in data) {
//              if (data[i][key] === undefined) {
//                  data[i][key] = '0';
//              }
//              arr.push(data[i][key]);
//          }
//          return arr;
//      };
//      var arrayCommitNr = arrayByKey(datasrc, 'commit_nr');
//      //console.log(arrayCommitNr);
//      var arrayCommitNrSfl = arrayByKey(datasrcSfl, 'commit_nr');
//      //console.log(arrayCommitNrSfl);
//      var arrayCommitNrAll = arrayByKey(datasrcAll, 'commit_nr');
//      //console.log(arrayCommitNrAll);
//      var arrayImpact = arrayByKey(datasrc, 'impact');
//      //console.log(arrayImpact);
//      var arrayImpactSfl = arrayByKey(datasrcSfl, 'impact');
//      //console.log(arrayImpactSfl);
//      var arrayImpactAll = arrayByKey(datasrcAll, 'impact');
//      //console.log(arrayImpactAll);
//      var arrayTimestamp = arrayByKey(datasrc, 'author_date_unix_timestamp');
//      //console.log(arrayTimestamp);
//      var arrayTimestampAll = arrayByKey(datasrcAll, 'author_date_unix_timestamp');
//      //console.log(arrayTimestampAll);
//  
//      // Create array based on key value, sorted
//      // ------------------------------------------------------------
//      var arrayByKeySorted = function(data, key) {
//          var arr = [];
//          for (var i in data) {
//              arr.push(data[i][key]);
//          }
//          arr.sort(function(a, b) {
//              return a - b;
//          });
//          return arr;
//      };
//      var arrayByKeySortedVar = arrayByKeySorted(datasrc, 'author_date_unix_timestamp');
//      //console.log(arrayByKeySortedVar);
//      var arrayByKeySortedVarAll = arrayByKeySorted(datasrcAll, 'author_date_unix_timestamp');
//      //console.log(arrayByKeySortedVarAll);
//  
//      // Return number that results from adding a key to itself
//      // ------------------------------------------------------------
//      var totalSum = function(data) {
//          var sum = 0;
//          for (var i = 0; i < data.length; i++) {
//              sum += parseInt(data[i]);
//            //console.log(sum);
//          }
//          return sum;
//      };
//      var arrayImpactTotal = totalSum(arrayImpact);
//      //console.log(arrayImpactTotal);
//      var arrayImpactTotalAll = totalSum(arrayImpactAll);
//      //console.log(arrayImpactTotalAll);
//  
//      // Return number of items in an object
//      // ------------------------------------------------------------
//      var itemsSum = function(data) {
//          var sum = 0;
//          for (var i = 0; i < data.length; i++) {
//              sum += 1;
//          }
//          return sum;
//      };
//      var arrayTotal = itemsSum(datasrc);
//      //console.log(arrayTotal);
//      var arrayTotalAll = itemsSum(datasrcAll);
//      //console.log(arrayTotalAll);
//  
//      // Create array based on key values added to themselves
//      // ------------------------------------------------------------
//      var sumArray = function(data) {
//          var sum = 0;
//          var arr = [];
//          for (var i in data) {
//              sum += parseInt(data[i]);
//              arr.push(sum);
//            //console.log(sum);
//          }
//          return arr;
//      };
//      var arrayImpactSum = sumArray(arrayImpact);
//      //console.log(arrayImpactSum);
//      var arrayImpactSumSfl = sumArray(arrayImpactSfl);
//      //console.log(arrayImpactSumSfl);
//      var arrayImpactSumAll = sumArray(arrayImpactAll);
//      //console.log(arrayImpactSumAll);
//  
//      // Create object array based on key
//      // ------------------------------------------------------------
//      var groupByAuto = function(data, key) {
//          var groups = {};
//          for (var i in data) {
//              if (!groups.hasOwnProperty(data[i][key])) {
//                  groups[data[i][key]] = [];
//              }
//              groups[data[i][key]].push(data[i]);
//          }
//          return groups;
//      };
//      var objDateDayWeek = groupByAuto(datasrc, 'date_day_week');
//      //console.log(objDateDayWeek);
//      var objDateDayWeekAll = groupByAuto(datasrcAll, 'date_day_week');
//      //console.log(objDateDayWeekAll);
//      var objRepositoryAll = groupByAuto(datasrcAll, 'repository');
//      //console.log(objRepositoryAll);
//  
//      // Create object array based on key
//      // ------------------------------------------------------------
//      var groupByAuthors = function(data, author) {
//          var groups = {};
//          for (var i in data) {
//              var a = data[i][author].match(/[^@]*/);
//              if (!groups.hasOwnProperty(data[i][author])) {
//                  groups[data[i][author]] = [];
//              }
//              groups[data[i][author]].push(data[i]);
//          }
//          return groups;
//      };
//      var groupByAuthorsVar = groupByAuthors(datasrc, 'author_email');
//      //console.log(groupByAuthorsVar);
//      var groupByAuthorsVarAll = groupByAuthors(datasrcAll, 'author_email');
//      //console.log(groupByAuthorsVarAll);
//  
//      // Create array based on key value
//      // ------------------------------------------------------------
//      var arrayAllRepos = function(data) {
//          var arr = [];
//          for (var i in data) {
//              arr.push(data[i]);
//          }
//          return arr;
//      };
//      var arrayAllReposLength = function(data) {
//          var arr = [];
//          for (var i in data) {
//              arr.push(data[i].length);
//          }
//          return arr;
//      };
//      var arrayAllReposVar = arrayAllRepos(Object.keys(objRepositoryAll));
//      //console.log(arrayAllReposVar);
//      var arrayAllReposValueArrayLength = arrayAllReposLength(Object.keys(objRepositoryAll));
//      //console.log(arrayAllReposValueArrayLength);
//  
//      // Merge two arrays of identical length
//      // ------------------------------------------------------------
//      var arraysMerge = function(keys, values) {
//          var obj = {};
//          for (var i = 0; i < keys.length; i++) {
//              obj[keys[i]] = values[i];
//          }
//          return obj;
//      };
//  
//      // Create array with year changes
//      // ------------------------------------------------------------
//      var arrayYearChanges = function(data, year) {
//          var arr = [];
//          for (var i in data) {
//              var currentYear = data[i][year];
//              var previousYear;
//              if (previousYear != currentYear) {
//                  arr.push(data[i][year]);
//              } else {
//                  arr.push('');
//              }
//              previousYear = data[i][year];
//          }
//          return arr;
//      };
//      var arrayYearChangesVar = arrayYearChanges(datasrc, 'date_year');
//      //console.log(arrayYearChangesVar);
//      var arrayYearChangesVarSfl = arrayYearChanges(datasrcSfl, 'date_year');
//      //console.log(arrayYearChangesVarSfl);
//      var arrayYearChangesVarAll = arrayYearChanges(datasrcAll, 'date_year');
//      //console.log(arrayYearChangesVarAll);
//  
//      // Create array of objects with authors and their impact
//      // ------------------------------------------------------------
//      var arrayAuthorImpact = function(data, author, impact) {
//          var arr = [];
//          for (var i in data) {
//              var a = data[i][author].match(/[^@]*/);
//              arr.push('{ "author":"' + a + '", "impact":"' + data[i][impact] + '"},');
//          }
//          return arr;
//      };
//      var arrayAuthorImpactVar = arrayAuthorImpact(datasrc, 'author_email', 'impact');
//      //console.log(arrayAuthorImpactVar);
//      var arrayAuthorImpactVarAll = arrayAuthorImpact(datasrcAll, 'author_email', 'impact');
//      //console.log(arrayAuthorImpactVarAll);
//  
//      new Chartist.Line('.ct-chart-impact', {
//          labels: arrayYearChangesVar,
//          series: [
//            arrayImpact
//          ]
//      }, {
//          height: '400px',
//          high: 3000,
//          low: -10000,
//          showArea: true,
//          showLine: true,
//          showPoint: false,
//          fullWidth: true,
//          axisX: {
//              showLabel: true,
//              showGrid: true
//          }
//      });
//  
//      new Chartist.Line('.ct-chart-impact-cumulative', {
//          labels: arrayYearChangesVar,
//          series: [
//            arrayImpactSum
//          ]
//      }, {
//          height: '400px',
//          high: 18000,
//          showArea: true,
//          showLine: true,
//          showPoint: false,
//          fullWidth: true,
//          axisX: {
//              showLabel: true,
//              showGrid: true
//          }
//      });
//  
//      new Chartist.Line('.ct-chart-impact-sfl', {
//          labels: arrayYearChangesVarSfl,
//          series: [
//            arrayImpactSfl
//          ]
//      }, {
//          height: '400px',
//          high: 62000,
//          low: -48000,
//          showArea: true,
//          showLine: true,
//          showPoint: false,
//          fullWidth: true,
//          axisX: {
//              showLabel: true,
//              showGrid: true
//          }
//      });
//  
//      new Chartist.Line('.ct-chart-impact-cumulative-sfl', {
//          labels: arrayYearChangesVarSfl,
//          series: [
//            arrayImpactSumSfl
//          ]
//      }, {
//          height: '400px',
//          high: 450000,
//          showArea: true,
//          showLine: true,
//          showPoint: false,
//          fullWidth: true,
//          axisX: {
//              showLabel: true,
//              showGrid: true
//          }
//      });
//  
//      new Chartist.Line('.ct-chart-impact-all', {
//          labels: arrayYearChangesVarAll,
//          series: [
//            arrayImpactAll
//          ]
//      }, {
//          height: '300px',
//          high: 900000,
//          low: -300000,
//          showArea: true,
//          showLine: true,
//          showPoint: false,
//          fullWidth: true,
//          chartPadding: {
//              top: 0,
//              right: 0,
//              bottom: 0,
//              left: 40
//          },
//          axisX: {
//              showLabel: true,
//              showGrid: true
//          }
//      });
//  
//      new Chartist.Line('.ct-chart-impact-cumulative-all', {
//          labels: arrayYearChangesVarAll,
//          series: [
//            arrayImpactSumAll
//          ]
//      }, {
//          height: '300px',
//        //high: 1400000, // with 'dataReposSome'
//        //high: 3700000, // with 'dataReposAll'
//          hight: 8000000000, // with 'dataReposAll' based on 'dataReposAllOfThemClean'
//          low: 1000,
//          showArea: true,
//          showLine: true,
//          showPoint: false,
//          fullWidth: true,
//          chartPadding: {
//              top: 0,
//              right: 0,
//              bottom: 0,
//              left: 40
//          },
//          axisX: {
//              showLabel: true,
//              showGrid: true
//          }
//      });
//  
//      new Chartist.Pie('.ct-chart-all-repos-commits-compare', {
//          labels: ['gonzo-web', 'startsiden-frontpage-layout', 'beta-katalog', 'training', 'video-sedenne', 'abcnyheter-modules', 'vipr', 'meetv-ios', 'startsiden-app', 'search-templates-common', 'vipr-admin-web', 'build-debian', 'meetv-backend', 'startsiden-build-database', 'meetv-web5', 'abcnyheter-theme-abcnyheter', 'startsiden-frontpage-web', 'giza2-templates-startsiden-front-bokmaal', 'strapr-guide', 'search-multi', 'startsiden-frontpage-admin', 'vipr-player', 'novus-frontend-simple', 'startsiden-brukere', 'giza2-templates-startsiden-nynorsk', 'novus-schema', 'abcnyheter-lib', 'giza', 'abcnyheter-api-newsarticles', 'meetv-android', 'mediahouse-automated-tests', 'abcnyheter-app', 'startsiden-frontpage-schema', 'marvin', 'startsiden-multijob', 'meetv-seo', 'novus-supervisum', 'novus-utils', 'startsiden-playpen', 'strapgap', 'meetv-chat-server', 'net-search-soap', 'net-search-test', 'auto-builder', 'search-world', 'navigation-batmin', 'abc-adloader', 'framtida', 'video-hvordan-web', 'giza-schema', 'startsiden-phonegap', 'Kaffeleveranse', 'urban-maid', 'startsiden-video-web', 'search-pictures', 'startsiden-job-grautjob', 'skatt-search', 'vipr-xapian', 'novus-admin', 'meetv-admin', 'abcnyheter-prototyping', 'search-news', 'novus-frontend-advanced', 'meetv-chat-mobile', 'googoal', 'meetv-ws', 'novus-conan', 'giza2-templates-startsiden-front-nynorsk', 'abcnyheter-automated-tests', 'web-style-guide', 'abcnyheter-core', 'startsiden-bookmarks', 'weather', 'giza-catalyst', 'meetv-common', 'starpointers', 'giza2-templates-startsiden-admin-multilang', 'startsiden-frontpage-config', 'xstream-client', 'meetv-tvguiden-android', 'meetv-firefoxos', 'novus-feedpusher-http', 'screen9-client', 'cellbazaar-puppet', 'net-search-json', 'net-search', 'levende-bilder', 'vipr-ws-client', 'giza2-templates-startsiden-bokmaal', 'novus-feedpusher', 'data-collectors', 'meetv-ws-client', 'meetv-local-lib', 'pipr-ws', 'meetv-misc', 'novus-xapian', 'novus-dev-tools', 'startsiden-campaign', 'meetv-seo-server', 'navigation-selenium-testsuite', 'search-sandbox', 'novus-puppet-server-pack', 'abcnyheter-api-video', 'startsiden-nettguide-api', 'abcnyheter-theme-mobilewebkit', 'startsiden-analytics-web', 'niche-app-backend', 'meetv-tools', 'meetv-help-site', 'katalog-search', 'novus-collector', 'startsiden-build-tools', 'novus-categorizer-service', 'novus-text', 'titanium-widgets', 'css-lint', 'search-cavalcade', 'selskapsweb', 'abcnyheter-utils', 'video-vagrant', 'search-controller-root', 'frontpage-vagrant', 'startsiden-catalyst', 'startsiden-job-renderdata', 'startsiden-job', 'hackatron', 'mobile-backend', 'bmenu-templates-mstartsiden-bokmaal', 'github-jira-plugin', 'abcnyheter-api-newsdesk', 'startsiden-job-newsfeed', 'meetv-corporate-website', 'novus-feedpusher-client', 'novus-testsuite', 'niche-app-widgets', 'vagrant-build-server', 'giza-rdf', 'meetv-help-schema', 'fotball-developer-setup', 'startsiden-build-svn', 'search-controller-smartsearch', 'net-search-google', 'sedenne-prototyping', 'startsiden-nagios-plugins', 'startsiden-yr-parser', 'giza2-templates-startsiden-admin-nynorsk', 'auto-releaser', 'giza2-templates-startsiden-admin-nynorsk', 'novus-tim', 'startsiden-build-tests', 'giza2-templates-startsiden-base', 'saltem-client', 'startsiden-static-common', 'startsiden-xapian', 'emediate-loader', 'meetv-static', 'net-search-xapian', 'startsiden-job-feed', 'meetv-data', 'search-tax', 'competency-map', 'startsiden-sokm', 'net-search-fast', 'startsiden-bigscreen-gulltaggen', 'startsiden-frontpage-xapian', 'fotball-local-lib', 'Nimi', 'giza2-templates-startsiden-nettspill', 'trinkadee-invites-app', 'php5-yaf', 'cmdb', 'search-genus', 'abcnyheter-api-mydesk', 'startsiden-frontpage-api', 'startsiden-webcache', 'net-search-bing', 'hackathon-20141028-mobile', 'search-redirect', 'startsiden-hyphenator', 'operations', 'startsiden-jobrunner', 'bolav-templates', 'nrk-client', 'net-search-1881', 'niche-app-ski', 'testdata', 'niche-app-food', 'net-search-xml', 'abcnyheter-theme-dumbphone', 'startsiden-frontpage-playpen', 'Startsiden-Silo-Parser', 'net-search-picsearch', 'startsiden-analytics-process', 'dockerfiles', 'startsiden-job-navigation', 'startsiden-nettguide-search-data', 'vipr-admin', 'novus-elasticsearch', 'git-testcase', 'giza-template-function-startsiden-admin', 'search-api', 'startsiden-analytics-collector', 'startsiden-job-abcnyheterbox', 'startsiden-video-templates', 'catalyst-controller-javascript-test', 'catalyst-model-net-search', 'sticky-ad', 'copyright', 'net-search-metadata-catalogcategory', 'poncho', 'startsiden-analytics', 'startsiden-brukere-example', 'xml-atom-ext-novus', 'avspark-front', 'catalystx-oauth2-provider', 'novus-feedpusher-model', 'net-search-overture', 'startsiden-automated-tests', 'startsiden-fcgi-tools', 'hackathon-blackmail', 'startsiden-test-seleneese', 'startsiden-useragent', 'novus-tim-model', 'abcnyheter-api-mocks', 'builder-smoker', 'php-testlib', 'release-metrics', 'startsiden-job-saltem', 'startsiden-pulldocker', 'giza-template-function', 'puppet-modules', 'module-install-debian', 'net-search-loadbalancer', 'startsiden-job-stormweather', 'startsiden-navigation', 'builder-vagrant', 'liftoff', 'lokalaviser', 'startsiden-nodejs', 'trinkadee-mvp', 'net-search-kelkoo', 'sandbox', 'startsiden-crowd-ldap-connector', 'xml-atom-ext-xstream', 'selenium-provisioning', 'device-detect', 'module-install-novus', 'net-search-rss', 'startsiden-build-jira', 'net-search-yahoo-idp', 'data-server', 'robohydra-plugins', 'startsiden-phantomjs', 'startsiden-varnish-tools', 'giza2-templates-tools', 'navigation-puppet', 'novus-categorizer-eval', 'sedenne-embedhandler', 'startsiden-geoip', 'touchswipe', 'catalyst-controller-bookmarks-api', 'datetime-format-startsiden', 'startsiden-job-calendar', 'abc-ga-client', 'abc-rum', 'avspark', 'mediamaker-client', 'meetv-banner', 'net-search-dinpris', 'net-sms-vianett', 'novus-bundle', 'perl-critic-startsiden', 'salg.startsiden.no', 'startsiden-job-norgesbank', 'startsiden-nodejs-0.12', 'abc-click-tagging-debugger', 'net-sms-mobiletech', 'novus-vagrant', 'startsiden-viggo-mailbot', 'catalystx-cli', 'startsiden-javascript', 'startsiden-job-webscraper', 'cmdb-tools', 'data-store', 'diem', 'football-selenium-testsuite', 'nettguide-vagrant', 'nuggad', 'skatt-search-dev-tools', 'startsiden-job-snltrivia', 'startsiden-logger', 'startsiden-nettguide-admin', 'startsiden-templates-attic', 'vipr-admin-client-rest', 'xml-feed-abcnyheter', 'bit-compare', 'nagios-notify-rabbitmq', 'net-search-genus', 'net-search-katalog', 'search-admin', 'search-mobile', 'search-utils', 'startsiden-campaigntracker', 'startsiden-job-gizabox', 'symfony', 'tap-parser-sourcehandler-javascript', 'vagrant-gonzo', 'xml-feed-xstream', 'abcnyheter-overblikk', 'emediate-gtm', 'responsive', 'search-csw', 'smartbanner', 'startsiden-module-crowd', 'criteo', 'getstartsiden', 'github-download-repo', 'module-install-minifier', 'nettguide-distribution-module', 'starpointers-initscripts', 'startsiden-bigscreen', 'startsiden-test', 'titanium-social-share', 'clicktale-templates', 'filemanager', 'geoip-map', 'konsepthuset', 'startsiden-bash-completion', 'startsiden-frontend-developer-testsuite', 'startsiden-job-html', 'vipr-backend', 'avspark-db', 'osx-alfred', 'selenium-testing-perl-poc', 'startsiden-build-jabber', 'startsiden-javascript-qunit', 'template-toolkit-macros', 'titanium-googleappconversiontracking', 'emediate-health-check', 'nettguide-api', 'qbrick-client', 'search-schema', 'startsiden-prototyping', 'test-tt', 'tap-parser-sourcehandler-teamcity', 'teamcity-parser'],
//          series: [9066, 5673, 5022, 2987, 2688, 2538, 2296, 2240, 2224, 2107, 2105, 1720, 1289, 1275, 1252, 1188, 1183, 1173, 1148, 1073, 1047, 1030, 996, 977, 805, 789, 767, 726, 709, 679, 677, 663, 648, 595, 593, 585, 574, 568, 563, 551, 530, 529, 529, 517, 504, 501, 493, 491, 490, 484, 476, 475, 471, 463, 457, 457, 449, 422, 419, 413, 398, 396, 393, 382, 374, 370, 329, 327, 324, 312, 306, 303, 298, 296, 287, 277, 264, 263, 258, 256, 246, 243, 242, 227, 215, 212, 210, 210, 209, 202, 198, 198, 184, 184, 181, 174, 171, 168, 166, 163, 158, 155, 151, 151, 150, 140, 136, 129, 128, 127, 127, 126, 122, 120, 119, 115, 115, 114, 107, 106, 105, 104, 104, 103, 101, 99, 97, 96, 88, 87, 87, 86, 86, 86, 85, 85, 84, 83, 81, 80, 77, 76, 75, 74, 74, 73, 73, 73, 70, 69, 67, 66, 65, 65, 63, 61, 61, 61, 60, 59, 57, 57, 56, 56, 56, 55, 54, 54, 54, 53, 52, 51, 50, 50, 50, 49, 48, 48, 48, 47, 46, 45, 45, 44, 44, 43, 42, 41, 40, 40, 37, 37, 37, 36, 36, 36, 36, 35, 34, 34, 33, 33, 32, 31, 30, 30, 30, 29, 29, 29, 29, 29, 29, 28, 28, 28, 27, 26, 26, 25, 25, 25, 24, 23, 23, 23, 23, 23, 23, 22, 22, 21, 21, 21, 21, 20, 20, 20, 20, 20, 19, 19, 19, 19, 18, 17, 17, 17, 17, 16, 15, 14, 14, 14, 13, 13, 13, 13, 13, 13, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1]
//      }, {
//          donut: true,
//          donutWidth: 140,
//          width: 800,
//          height: 600,
//          chartPadding: 10,
//          labelOffset: 5,
//          labelDirection: 'explode',
//          showLabel: true
//      });
//  
//  });
