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
} from '../../helpers/lib';

class GlobalStats extends Component {
  componentWillMount() {
    const {commits, stats, dispatch} = this.props;
    // -- These checks prevent new fetches in case data has already been fetched to state. -- //
    // When accessing the page directly for the first time, 'commits' is defined,
    // but equals 'null'. In this case We should fetch the data.
    if (stats.commits === null) {
      dispatch(fetchGlobalStats());
    }
    // When accessing the page directly for the first time, 'commits' is defined,
    // but empty. In this case We should fetch the data.
    // (Check if array is empty)
    if (typeof commits !== 'undefined' && commits !== null && commits.length === 0) {
      dispatch(fetchCommits());
    }
  }
  render() {
    const {commits, stats} = this.props;
    // @todo: api/key/impact/max
    const impactCommitMax = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'max'
    );
    // @todo: api/key/impact/min
    const impactCommitMin = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'min'
    );
    // @todo: api/key/files_changed/min
    const filesChangedMax = arrayMaxMin(
      arrayByKey(commits, 'files_changed'), 'max'
    );
    const {
      // 'commits' here  is accesseded direcly since the name crashes with another prop
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
      commitsPerContributor
    } = this.props.stats;
    return (
      <div className="wrapper">
        <div className="flexy">
          <GlobalTotal
            total={stats.commits}
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
            total={stats.commits / daysActive}
            detail="Commits per day"
            color="lime"
            decimals
          />
          <GlobalTotal
            total={lines / daysActive}
            detail="Lines of code per day"
            color="pink"
            decimals
          />
          <GlobalTotal
            total={commitsPerContributor}
            detail="Commits per contributor"
            color="maroon"
            decimals
          />
          <GlobalTotal
            total={lines / contributors}
            detail="Code Weight (Lines of code per contributor)"
            color="pink"
            decimals
          />
          <GlobalTotal
            total={stats.commits / repositories}
            detail="Commits per repository"
            color="pink"
            decimals
          />
          <GlobalTotal
            total={contributors / repositories}
            detail="Contributors per repository"
            color="pink"
            decimals
          />
          <GlobalTotal
            total={lines / repositories}
            detail="Lines of code per repository"
            color="pink"
            decimals
          />
          <GlobalTotal
            total={commitsOnWeekend}
            detail="Commits on weekends"
            color="gold"
          />
          <GlobalTotal
            total={staleness}
            detail="Overall staleness"
            color="teal"
            decimals
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
            total={filesChangedMax}
            detail="Max. number of files changed on a single commit"
            color="magenta"
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
  dispatch: PropTypes.func,
  stats: PropTypes.object,
  commits: PropTypes.array,
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
  commitsPerContributor: PropTypes.string
};

export default connect(store => {
  return {
    commits: store.commits.commits,
    stats: store.stats.stats
  };
})(GlobalStats);
