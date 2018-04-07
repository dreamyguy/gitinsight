import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Layout extends Component {
  render() {
    return (
      <div className="layout h-100pc">
        <div className="site h-100pc">
          <main className="h-100pc">
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
