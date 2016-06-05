import React from 'react'
import ReactDOM from 'react-dom'
import GlobalTotal from '../src/components/global-total'
import json from 'json!../src/modules/stats/data/commits.json'
import oxo from '../src/modules/stats/js/oxo'

// data source - set and forget
let data = json;
data = data.commits; // because the json file contains an object called 'commits'

// sort datasource array by date
data.sort(function(a, b) {
    return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
});

// calculate some global stats and assign them to vars
let totalNrCommits = oxo.itemsSum(data)
let totalNrContributors = oxo.itemsSum(
    Object.keys(
        oxo.groupByDuplicatesInArray(
            oxo.arrayByKey(data, 'author_email')
        )
    )
)
let totalNrRepositories = oxo.itemsSum(
    Object.keys(
        oxo.groupByDuplicatesInArray(
            oxo.arrayByKey(data, 'repository')
        )
    )
)
let totalLinesOfCode = oxo.totalSum(
  oxo.arrayByKey(data, 'impact')
)
let totalFileChanges = oxo.totalSum(
  oxo.arrayByKey(data, 'files_changed')
)
let totalCommitsWithoutFileChanges = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'files_changed', '0')
)
let totalCommitsWithoutImpact = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'impact', '0')
)
let totalCommitsImpactGreaterThan = oxo.itemsSum(
  oxo.arrayByKeyFilteredGreaterThan(data, 'impact', '1000')
)
let totalCommitsOnSaturday = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'date_day_week', 'Sat')
)
let totalCommitsOnSunday = oxo.itemsSum(
  oxo.arrayByKeyFiltered(data, 'date_day_week', 'Sun')
)
let totalCommitsOnWeekends = totalCommitsOnSaturday + totalCommitsOnSunday

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
                </div>
            </div>
        )
    }
}
ReactDOM.render(<ReactExample />, document.getElementById('react'))
