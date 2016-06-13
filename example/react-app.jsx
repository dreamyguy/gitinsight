import React from 'react'
import ReactDOM from 'react-dom'
import GlobalTotal from '../src/components/global-total'
import GlobalChart from '../src/components/global-chart'
import json from 'json!../src/modules/stats/data/commits.json'
import oxo from '../src/modules/stats/js/oxo'

// data source - set and forget
let data = json;
data = data.commits; // because the json file contains an object called 'commits'

// sort datasource array by date
data.sort(function(a, b) {
    return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
});

// --- calculate some global stats and assign them to vars ---/

// total nr commits
let totalNrCommits = oxo.itemsSum(data)
// total nr contributors
let totalNrContributors = oxo.itemsSum(
    Object.keys(
        oxo.groupByDuplicatesInArray(
            oxo.arrayByKey(data, 'author_email')
        )
    )
)
// total nr repositories
let totalNrRepositories = oxo.itemsSum(
    Object.keys(
        oxo.groupByDuplicatesInArray(
            oxo.arrayByKey(data, 'repository')
        )
    )
)
// total lines of code
let totalLinesOfCode = oxo.totalSum(
  oxo.arrayByKey(data, 'impact')
)
// total file changes
let totalFileChanges = oxo.totalSum(
  oxo.arrayByKey(data, 'files_changed')
)
// total commits without file changes
let totalCommitsWithoutFileChanges = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'files_changed', '0')
)
// total commits with no impact
let totalCommitsWithoutImpact = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'impact', '0')
)
// total commits impact greater than 1000
let totalCommitsImpactGreaterThan = oxo.itemsSum(
  oxo.arrayByKeyFilteredGreaterThan(data, 'impact', '1000')
)
// total commits on weekends
let totalCommitsOnSaturday = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'date_day_week', 'Sat')
)
let totalCommitsOnSunday = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'date_day_week', 'Sun')
)
let totalCommitsOnWeekends = totalCommitsOnSaturday + totalCommitsOnSunday
// get first and last commit dates
let commitTheFirst = oxo.getValueOfFirstOrLastKey(data, 'date_iso_8601', 'first')
let commitTheLast = oxo.getValueOfFirstOrLastKey(data, 'date_iso_8601', 'last')

// let objTimePeriodDay = oxo.groupByTimePeriod(data, 'day')
// let objTimePeriodWeek = oxo.groupByTimePeriod(data, 'week')
// let objTimePeriodMonth = oxo.groupByTimePeriod(data, 'month')
// let objTimePeriodYear = oxo.groupByTimePeriod(data, 'year')
// console.log(objTimePeriodDay);
// console.log(objTimePeriodWeek);
// console.log(objTimePeriodMonth);
// console.log(objTimePeriodYear);

let objTimeHour = oxo.sortObjByKey(
  oxo.groupByTime(data, 'hour')
)
let objTimeMinutes = oxo.sortObjByKey(
  oxo.groupByTime(data, 'minutes')
)
let objTimeSeconds = oxo.sortObjByKey(
  oxo.groupByTime(data, 'seconds')
)
let objTimeGmt = oxo.sortObjByKey(
  oxo.groupByTime(data, 'gmt')
)
let objTimeDayWeek = oxo.sortObjByKeyWithSorter(
  oxo.groupByTime(data, 'day-week'), oxo.sorterWeekday
)
let objTimeMonthDay = oxo.sortObjByKey(
  oxo.groupByTime(data, 'month-day')
)
let objTimeMonthName = oxo.sortObjByKeyWithSorter(
  oxo.groupByTime(data, 'month-name'), oxo.sorterMonthName
)
let objTimeMonthNumber = oxo.sortObjByKey(
  oxo.groupByTime(data, 'month-number')
)
let objTimeYear = oxo.sortObjByKey(
  oxo.groupByTime(data, 'year')
)
let objTimeIso8601 = oxo.sortObjByKey(
  oxo.groupByTime(data, 'iso-8601')
)

// console.log(objTimeHour);
// console.log(objTimeMinutes);
// console.log(objTimeSeconds);
// console.log(objTimeGmt);
// console.log(objTimeDayWeek);
// console.log(objTimeMonthDay);
// console.log(objTimeMonthName);
// console.log(objTimeMonthNumber);
// console.log(objTimeYear);
// console.log(objTimeIso8601);

// array for yearly labels - this one will work well as long as the range is full
let yearsGoneBy = oxo.arrayYearChanges(data, 'date_year')

// --- chart - impact --- /
// the data
let chartImpact = oxo.arrayByKey(data, 'impact')
// high
let impactCommitMax = oxo.arrayMaxMin(
  oxo.arrayByKey(data, 'impact'), 'max'
)
// low
let impactCommitMin = oxo.arrayMaxMin(
  oxo.arrayByKey(data, 'impact'), 'min'
)

// --- chart - impact --- /
// the data
let chartImpactCumulative = oxo.sumArray(
  oxo.arrayByKey(data, 'impact')
)
// high
let impactCumulativeMax = oxo.totalSum(
  oxo.arrayByKey(data, 'impact')
)

// --- chart - files changed --- /
// the data
let chartFilesChanged = oxo.arrayByKey(data, 'files_changed')
// high
let filesChangedMax = oxo.arrayMaxMin(
  oxo.arrayByKey(data, 'files_changed'), 'max'
)
// low
let filesChangedMin = oxo.arrayMaxMin(
  oxo.arrayByKey(data, 'files_changed'), 'min'
)

// --- chart - commits by hours --- /
// the data
let chartCommitsByHourKeys = oxo.arrayOfValues(
  Object.keys(objTimeHour)
)
let chartCommitsByHourValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeHour)
)
// high
let chartCommitsByHourMax = oxo.arrayMaxMin(
  chartCommitsByHourValues, 'max'
)
// low
let chartCommitsByHourMin = oxo.arrayMaxMin(
  chartCommitsByHourValues, 'min'
)

// --- chart - commits by minutes --- /
// the data
let chartCommitsByMinutesKeys = oxo.arrayOfValues(
  Object.keys(objTimeMinutes)
)
let chartCommitsByMinutesValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeMinutes)
)
// high
let chartCommitsByMinutesMax = oxo.arrayMaxMin(
  chartCommitsByMinutesValues, 'max'
)
// low
let chartCommitsByMinutesMin = oxo.arrayMaxMin(
  chartCommitsByMinutesValues, 'min'
)

// --- chart - commits by seconds --- /
// the data
let chartCommitsBySecondsKeys = oxo.arrayOfValues(
  Object.keys(objTimeSeconds)
)
let chartCommitsBySecondsValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeSeconds)
)
// high
let chartCommitsBySecondsMax = oxo.arrayMaxMin(
  chartCommitsBySecondsValues, 'max'
)
// low
let chartCommitsBySecondsMin = oxo.arrayMaxMin(
  chartCommitsBySecondsValues, 'min'
)

// --- chart - commits by timezone --- /
// the data
let chartCommitsByGmtKeys = oxo.arrayOfValues(
  Object.keys(objTimeGmt)
)
let chartCommitsByGmtValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeGmt)
)
// high
let chartCommitsByGmtMax = oxo.arrayMaxMin(
  chartCommitsByGmtValues, 'max'
)
// low
let chartCommitsByGmtMin = oxo.arrayMaxMin(
  chartCommitsByGmtValues, 'min'
)

// --- chart - commits by weekdays --- /
// the data
let chartCommitsByDayWeekKeys = oxo.arrayOfValues(
  Object.keys(objTimeDayWeek)
)
let chartCommitsByDayWeekValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeDayWeek)
)
// high
let chartCommitsByDayWeekMax = oxo.arrayMaxMin(
  chartCommitsByDayWeekValues, 'max'
)
// low
let chartCommitsByDayWeekMin = oxo.arrayMaxMin(
  chartCommitsByDayWeekValues, 'min'
)

// --- chart - commits by day in the month --- /
// the data
let chartCommitsByMonthDayKeys = oxo.arrayOfValues(
  Object.keys(objTimeMonthDay)
)
let chartCommitsByMonthDayValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeMonthDay)
)
// high
let chartCommitsByMonthDayMax = oxo.arrayMaxMin(
  chartCommitsByMonthDayValues, 'max'
)
// low
let chartCommitsByMonthDayMin = oxo.arrayMaxMin(
  chartCommitsByMonthDayValues, 'min'
)

// --- chart - commits by month --- /
// the data
let chartCommitsByMonthNameKeys = oxo.arrayOfValues(
  Object.keys(objTimeMonthName)
)
let chartCommitsByMonthNameValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeMonthName)
)
// high
let chartCommitsByMonthNameMax = oxo.arrayMaxMin(
  chartCommitsByMonthNameValues, 'max'
)
// low
let chartCommitsByMonthNameMin = oxo.arrayMaxMin(
  chartCommitsByMonthNameValues, 'min'
)

// --- chart - commits by year --- /
// the data
let chartCommitsByYearKeys = oxo.arrayOfValues(
  Object.keys(objTimeYear)
)
let chartCommitsByYearValues = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeYear)
)
// high
let chartCommitsByYearMax = oxo.arrayMaxMin(
  chartCommitsByYearValues, 'max'
)
// low
let chartCommitsByYearMin = oxo.arrayMaxMin(
  chartCommitsByYearValues, 'min'
)

// --- chart - commits on a given day --- /
// the data
let chartCommitsByIso8601Keys = oxo.arrayOfValues(
  Object.keys(objTimeIso8601)
)
let chartCommitsByIso8601Values = oxo.arrayOfValues(
  oxo.itemsValuesSum(objTimeIso8601)
)
// high
let chartCommitsByIso8601Max = oxo.arrayMaxMin(
  chartCommitsByIso8601Values, 'max'
)
// low
let chartCommitsByIso8601Min = oxo.arrayMaxMin(
  chartCommitsByIso8601Values, 'min'
)

// our main react component
class ReactExample extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            foo: 'bar'
        }
    }
    render() {
        return (
            <div className='wrapper light'>
                <div className='flexy'>
                    <GlobalTotal
                        total={totalNrCommits}
                        detail='Commits'
                        color='green'
                    />
                    <GlobalTotal
                        total={totalNrContributors}
                        detail='Contributors'
                        color='teal'
                    />
                    <GlobalTotal
                        total={totalNrRepositories}
                        detail='Repositories'
                        color='purple'
                    />
                    <GlobalTotal
                        total={totalLinesOfCode}
                        detail='Lines of Code'
                        color='cyan'
                    />
                    <GlobalTotal
                        total={totalFileChanges}
                        detail='File Changes'
                        color='orange'
                    />
                    <GlobalTotal
                        total={totalCommitsWithoutFileChanges}
                        detail='Commits w/o File Changes'
                        color='violet'
                    />
                    <GlobalTotal
                        total={totalCommitsWithoutImpact}
                        detail='Commits w/o Impact'
                        color='deepPink'
                    />
                    <GlobalTotal
                        total={totalCommitsImpactGreaterThan}
                        detail='Commits w/ Impact > 1000'
                        color='red'
                    />
                    <GlobalTotal
                        total={totalCommitsOnWeekends}
                        detail='Commits on weekends'
                        color='gold'
                    />
                    <GlobalTotal
                        total={filesChangedMax}
                        detail='Max. number of files changed on a single commit'
                        color='magenta'
                    />
                    <GlobalTotal
                        total={impactCommitMax}
                        detail='Commit with highest Impact'
                        color='maroon'
                    />
                    <GlobalTotal
                        total={impactCommitMin}
                        detail='Commit with lowest Impact'
                        color='lime'
                    />
                </div>
                <GlobalChart
                    title = 'Commits by Hour'
                    detail = 'Commits done at certain hours'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByHourKeys}
                    arraySeries = {chartCommitsByHourValues}
                    height = '300px'
                    high = {chartCommitsByHourMax}
                    low = {chartCommitsByHourMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Minute'
                    detail = 'Commits done at a certain minute'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByMinutesKeys}
                    arraySeries = {chartCommitsByMinutesValues}
                    height = '300px'
                    high = {chartCommitsByMinutesMax}
                    low = {chartCommitsByMinutesMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Second'
                    detail = 'Commits done at a certain second'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsBySecondsKeys}
                    arraySeries = {chartCommitsBySecondsValues}
                    height = '300px'
                    high = {chartCommitsBySecondsMax}
                    low = {chartCommitsBySecondsMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Timezone'
                    detail = 'Commits done at a certain timezone'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByGmtKeys}
                    arraySeries = {chartCommitsByGmtValues}
                    height = '300px'
                    high = {chartCommitsByGmtMax}
                    low = {chartCommitsByGmtMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Weekdays'
                    detail = 'Commits done at a certain weekday'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByDayWeekKeys}
                    arraySeries = {chartCommitsByDayWeekValues}
                    height = '300px'
                    high = {chartCommitsByDayWeekMax}
                    low = {chartCommitsByDayWeekMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Day in the Month'
                    detail = 'Commits done at a certain calendar day'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByMonthDayKeys}
                    arraySeries = {chartCommitsByMonthDayValues}
                    height = '300px'
                    high = {chartCommitsByMonthDayMax}
                    low = {chartCommitsByMonthDayMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Month'
                    detail = 'Commits done at a certain month'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByMonthNameKeys}
                    arraySeries = {chartCommitsByMonthNameValues}
                    height = '300px'
                    high = {chartCommitsByMonthNameMax}
                    low = {chartCommitsByMonthNameMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Year'
                    detail = 'Commits done during a year'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByYearKeys}
                    arraySeries = {chartCommitsByYearValues}
                    height = '300px'
                    high = {chartCommitsByYearMax}
                    low = {chartCommitsByYearMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {true}
                />
                <GlobalChart
                    title = 'Commits by Day'
                    detail = 'Commits done on a single day'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {chartCommitsByIso8601Keys}
                    arraySeries = {chartCommitsByIso8601Values}
                    height = '300px'
                    high = {chartCommitsByIso8601Max}
                    low = {chartCommitsByIso8601Min}
                    axisXShowLabel = {false}
                    axisXShowGrid = {false}
                />
                <GlobalChart
                    title = 'Lines of Code'
                    detail = 'Cummulative graph on Lines of Code'
                    color = 'orangeYellow'
                    chartColor = 'deepPink'
                    arrayLabels = {yearsGoneBy}
                    arraySeries = {chartImpactCumulative}
                    height = '300px'
                    high = {impactCumulativeMax}
                    axisXShowLabel = {true}
                    axisXShowGrid = {false}
                />
                <GlobalChart
                    title = 'Impact'
                    detail = 'Additions minus Deletions on a given commit'
                    color = 'red'
                    chartColor = 'deepPink'
                    arrayLabels = {yearsGoneBy}
                    arraySeries = {chartImpact}
                    height = '300px'
                    high = {impactCommitMax}
                    low = {impactCommitMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {false}
                />
                <GlobalChart
                    title = 'Files Changed'
                    detail = 'Files changed on a given commit'
                    color = 'deepPink'
                    chartColor = 'deepPink'
                    arrayLabels = {yearsGoneBy}
                    arraySeries = {chartFilesChanged}
                    height = '300px'
                    high = {filesChangedMax}
                    low = {filesChangedMin}
                    axisXShowLabel = {true}
                    axisXShowGrid = {false}
                />
            </div>
        )
    }
}
ReactDOM.render(<ReactExample />, document.getElementById('react'))
