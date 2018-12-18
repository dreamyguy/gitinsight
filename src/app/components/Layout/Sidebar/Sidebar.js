import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Import actions
import {fetchCommits} from './../../../redux/actions/actionsCommits';
import {fetchStatsGlobal} from './../../../redux/actions/actionsStats';

// Import components
import Badge from '../../Primitives/Badge/Badge';
import Icon from '../../Primitives/Icon/Icon';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const {commits, stats, dispatch} = this.props;
    // -- These checks prevent new fetches in case data has already been fetched to state. -- //
    // When accessing the page directly for the first time, 'commits' is defined,
    // but equals 'null'. In this case We should fetch the data.
    if (stats.commits === null) {
      dispatch(fetchStatsGlobal());
    }
    // When accessing the page directly for the first time, 'commits' is defined,
    // but empty. In this case We should fetch the data.
    // (Check if array is empty)
    if (typeof commits !== 'undefined' && commits !== null && commits.length === 0) {
      dispatch(fetchCommits());
    }
  }
  render() {
    const {
      classes = '', // accepts CSS classNames as string
      stats: {
        commits = '',
        contributors = '',
        repositories = ''
      } = {}
    } = this.props;
    return (
      <div className={`sidebar font-myriadpro-regular${classes ? ' ' + classes : ''}`}>
        <div className="sidebar__section">
          <ul>
            <li>
              <div className="flex-container">
                <Icon icon="calendar-alt"/>
                <span>Commits</span>
                <Badge number={commits}/>
              </div>
            </li>
            <li>
              <div className="flex-container">
                <Icon icon="calendar-alt"/>
                <span>Repos</span>
                <Badge number={repositories}/>
              </div>
            </li>
            <li>
              <div className="flex-container">
                <Icon icon="user-friends"/>
                <span>Contributors</span>
                <Badge number={contributors}/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.string,
  dispatch: PropTypes.func,
  stats: PropTypes.object,
  commits: PropTypes.array // this is 'stats.commits'
};

export default connect(store => {
  return {
    commits: store.commits.commits,
    stats: store.statsGlobal.statsGlobal
  };
})(Sidebar);
