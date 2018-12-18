import React, {Component} from 'react';
import PropTypes from 'prop-types';

// --- Font Awesome --- //
// https://fontawesome.com/how-to-use/on-the-web/using-with/react
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// Note that all the icons we want to use in the application need to be both
// imported and added to the library before they can be used
import {
  faBell,
  faCalendarAlt,
  faGraduationCap,
  faUserFriends,
  faPen,
  faTimes,
  faSearch,
  faFilter,
  faFileDownload
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faBell,
  faCalendarAlt,
  faGraduationCap,
  faUserFriends,
  faPen,
  faTimes,
  faSearch,
  faFilter,
  faFileDownload
);

class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes = '', // accepts CSS classNames as string
      icon = 'question-circle' // fallback, in case 'icon' is not passed as props
    } = this.props;
    return (
      <div className={`icon${classes ? ' ' + classes : ''}`}>
        <FontAwesomeIcon icon={icon}/>
      </div>
    );
  }
}

Icon.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.string
};

export default Icon;
