/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCommitsToRepo} from '../../redux/actions/actionsCommits';
// import {fetchStatsForRepo} from '../../redux/actions/actionsStats';
import {GlobalTotal} from '../../base/GlobalTotal';
import {GlobalDate} from '../../base/GlobalDate';
import {
  arrayByKey,
  arrayMaxMin
} from '../../helpers/lib';
import './Home.scss';

class StatsRepo extends Component {
  componentWillMount() {
    // const {stats, dispatch, repoCommits, match} = this.props;
    const {dispatch, repoCommits, match} = this.props;
    const {repoName} = match.params;
    // // -- These checks prevent new fetches in case data has already been fetched to state. -- //
    // // When accessing the page directly for the first time, 'commits' is defined,
    // // but equals 'null'. In this case We should fetch the data.
    // if (stats === null) {
    //   dispatch(fetchStatsForRepo(repoName));
    // }
    // When accessing the page directly for the first time, 'commits' is defined,
    // but empty. In this case We should fetch the data.
    // (Check if array is empty)
    if (typeof repoCommits !== 'undefined' && repoCommits !== null && repoCommits.length === 0) {
      dispatch(fetchCommitsToRepo(repoName));
    }
  }
  render() {
    const {repoCommits} = this.props;
    // @todo: api/key/impact/max
    const impactCommitMax = arrayMaxMin(
      arrayByKey(repoCommits, 'impact'), 'max'
    );
    // @todo: api/key/impact/min
    const impactCommitMin = arrayMaxMin(
      arrayByKey(repoCommits, 'impact'), 'min'
    );
    // @todo: api/key/files_changed/min
    const filesChangedMax = arrayMaxMin(
      arrayByKey(repoCommits, 'files_changed'), 'max'
    );
    const {
      // 'commits' here  is accesseded direcly since the name crashes with another prop
      repository,
      commits,
      impact,
      impactRatio,
      daysActive,
      commitDateFirst,
      commitDateLast,
      daysSinceFirstCommit,
      daysSinceLastCommit,
      staleness,
      totalNrContributors
      // commitsPerDay
    } = this.props.stats;
    return (
      <div className="wrapper">
        <div className="flexy">
          <GlobalTotal
            total={commits}
            detail="Commits"
            color="green"
          />
          <GlobalTotal
            total={repository}
            detail="Repository"
            color="purple"
          />
          <GlobalTotal
            total={impact}
            detail="Lines of Code"
            color="cyan"
          />
          <GlobalTotal
            total={impactRatio}
            detail="File Changes"
            color="orange"
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
            total={commits / daysActive}
            detail="Commits per day"
            color="lime"
            decimals
          />
          <GlobalTotal
            total={impact / daysActive}
            detail="Lines of code per day"
            color="pink"
            decimals
          />
          <GlobalTotal
            total={impact / totalNrContributors}
            detail="Code Weight (Lines of code per contributor)"
            color="pink"
            decimals
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
      </div>
    );
  }
}

StatsRepo.propTypes = {
  dispatch: PropTypes.func,
  stats: PropTypes.object,
  // repoName: PropTypes.string,
  match: PropTypes.object,
  repoCommits: PropTypes.object,
  repository: PropTypes.string,
  commits: PropTypes.number,
  impact: PropTypes.number,
  impactRatio: PropTypes.number,
  daysActive: PropTypes.number,
  // weekdays: PropTypes.object,
  commitDateFirst: PropTypes.string,
  commitDateLast: PropTypes.string,
  daysSinceFirstCommit: PropTypes.number,
  daysSinceLastCommit: PropTypes.number,
  staleness: PropTypes.number,
  totalNrContributors: PropTypes.number
  // commitsPerDay: PropTypes.object
};

export default connect(store => {
  return {
    commits: store.commits.commits,
    stats: store.statsGlobal.statsGlobal
  };
})(StatsRepo);
