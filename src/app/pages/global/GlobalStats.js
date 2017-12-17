/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCommits} from '../../redux/actions/actionsCommits';
import {fetchGlobalStats} from '../../redux/actions/actionsStats';
import {GlobalTotal} from '../../base/GlobalTotal';
import {GlobalDate} from '../../base/GlobalDate';
import {ChartCommitsByHour} from '../../charts/ChartCommitsByHour';
import {ChartCommitsByMinute} from '../../charts/ChartCommitsByMinute';
import {ChartCommitsBySecond} from '../../charts/ChartCommitsBySecond';
import {ChartCommitsByTimezone} from '../../charts/ChartCommitsByTimezone';
import {ChartCommitsByWeekday} from '../../charts/ChartCommitsByWeekday';
import {ChartCommitsByDayInTheMonth} from '../../charts/ChartCommitsByDayInTheMonth';
import {ChartCommitsByMonth} from '../../charts/ChartCommitsByMonth';
import {ChartCommitsByYear} from '../../charts/ChartCommitsByYear';
import {ChartCommitsByDay} from '../../charts/ChartCommitsByDay';
import {ChartCumulativeLinesOfCode} from '../../charts/ChartCumulativeLinesOfCode';
import {ChartImpact} from '../../charts/ChartImpact';
import {ChartNrFilesChanged} from '../../charts/ChartNrFilesChanged';
import {
  arrayByKey,
  arrayMaxMin
} from '../../helpers/oxo';

class GlobalStats extends Component {
  componentWillMount() {
    const {commits} = this.props;
    // When accessing the page directly for the first time, the 'commits' & 'stats'
    // arrays are defined, but empty. In those cases we should fetch the data. This
    // check also prevents a new fetch in case they already are defined and have data.
    if (typeof commits !== 'undefined' && commits !== null && commits.length === 0) {
      this.props.dispatch(fetchCommits());
    }
    // if (typeof stats.commits !== 'undefined' && stats.commits !== null && stats.commits.length === 0) {
    this.props.dispatch(fetchGlobalStats());
    // }
  }
  render() {
    const {commits} = this.props;
    // api/key/impact/max
    const impactCommitMax = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'max'
    );
    // api/key/impact/min
    const impactCommitMin = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'min'
    );
    // api/key/files_changed/min
    const filesChangedMax = arrayMaxMin(
      arrayByKey(commits, 'files_changed'), 'max'
    );
    const {
      contributors,
      repositories,
      lines,
      fileChanges,
      commitsWithoutFileChanges,
      commitsWithoutImpact,
      commitsImpactGtThousand,
      commitsOnWeekend,
      daysActive,
      commitDateFirst,
      commitDateLast,
      daysSinceFirstCommit,
      daysSinceLastCommit,
      staleness,
      // commitsPerDay,
      commitsPerContributor
    } = this.props.stats;
    return (
      <div className="wrapper light">
        <div className="flexy">
          <GlobalTotal
            total={this.props.stats.commits}
            detail="Commits"
            color="green"
          />
          <GlobalTotal
            total={contributors}
            detail="Contributors"
            color="teal"
          />
          <GlobalTotal
            total={repositories}
            detail="Repositories"
            color="purple"
          />
          <GlobalTotal
            total={lines}
            detail="Lines of Code"
            color="cyan"
          />
          <GlobalTotal
            total={fileChanges}
            detail="File Changes"
            color="orange"
          />
          <GlobalTotal
            total={commitsWithoutFileChanges}
            detail="Commits w/o File Changes"
            color="violet"
          />
          <GlobalTotal
            total={commitsWithoutImpact}
            detail="Commits w/o Impact"
            color="deepPink"
          />
          <GlobalTotal
            total={commitsImpactGtThousand}
            detail="Commits w/ Impact > 1000"
            color="red"
          />
          <GlobalTotal
            total={daysActive}
            detail="Active Days (Days between first and last commits)"
            color="orange"
          />
          <GlobalTotal
            total={daysSinceFirstCommit}
            detail="Days since first commit"
            color="gold"
          />
          <GlobalTotal
            total={daysSinceLastCommit}
            detail="Days since last commit"
            color="purple"
          />
          <GlobalDate
            date={commitDateFirst}
            detail="Date of first commit"
            color="cyan"
          />
          <GlobalDate
            date={commitDateLast}
            detail="Date of last commit"
            color="magenta"
          />
          <GlobalTotal
            total={impactCommitMax}
            detail="Commit with highest Impact"
            color="maroon"
          />
          <GlobalTotal
            total={impactCommitMin}
            detail="Commit with lowest Impact"
            color="lime"
          />
          <GlobalTotal
            // total={commitsPerDay} // <= wrong, must be corrected or removed at API's end
            total={this.props.stats.commits / daysActive}
            detail="Commits per day"
            color="lime"
          />
          <GlobalTotal
            total={lines / daysActive}
            detail="Lines of code per day"
            color="pink"
          />
          <GlobalTotal
            total={commitsPerContributor}
            detail="Commits per contributor"
            color="maroon"
          />
          <GlobalTotal
            total={lines / contributors}
            detail="Code Weight (Lines of code per contributor)"
            color="pink"
          />
          <GlobalTotal
            total={this.props.stats.commits / repositories}
            detail="Commits per repository"
            color="pink"
          />
          <GlobalTotal
            total={contributors / repositories}
            detail="Contributors per repository"
            color="pink"
          />
          <GlobalTotal
            total={lines / repositories}
            detail="Lines of code per repository"
            color="pink"
          />
          <GlobalTotal
            total={commitsOnWeekend}
            detail="Commits on weekends"
            color="gold"
          />
          <GlobalTotal
            total={filesChangedMax}
            detail="Max. number of files changed on a single commit"
            color="magenta"
          />
          <GlobalTotal
            total={staleness}
            detail="Overall staleness"
            color="teal"
          />
        </div>
        <ChartCommitsByHour commits={commits}/>
        <ChartCommitsByMinute commits={commits}/>
        <ChartCommitsBySecond commits={commits}/>
        <ChartCommitsByTimezone commits={commits}/>
        <ChartCommitsByWeekday commits={commits}/>
        <ChartCommitsByDayInTheMonth commits={commits}/>
        <ChartCommitsByMonth commits={commits}/>
        <ChartCommitsByYear commits={commits}/>
        <ChartCommitsByDay commits={commits}/>
        <ChartCumulativeLinesOfCode commits={commits}/>
        <ChartImpact commits={commits}/>
        <ChartNrFilesChanged commits={commits}/>
      </div>
    );
  }
}

GlobalStats.propTypes = {
  commits: PropTypes.array,
  dispatch: PropTypes.func,
  stats: PropTypes.object,
  contributors: PropTypes.string,
  repositories: PropTypes.string,
  lines: PropTypes.string,
  fileChanges: PropTypes.string,
  commitsWithoutFileChanges: PropTypes.string,
  commitsWithoutImpact: PropTypes.string,
  commitsImpactGtThousand: PropTypes.string,
  commitsOnWeekend: PropTypes.string,
  daysActive: PropTypes.string,
  commitDateFirst: PropTypes.string,
  commitDateLast: PropTypes.string,
  daysSinceFirstCommit: PropTypes.string,
  daysSinceLastCommit: PropTypes.string,
  staleness: PropTypes.string,
  // commitsPerDay: PropTypes.string,
  commitsPerContributor: PropTypes.string
};

export default connect(store => {
  return {
    commits: store.commits.commits,
    stats: store.stats.stats
  };
})(GlobalStats);