import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <div className="site">
          <main>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
};
