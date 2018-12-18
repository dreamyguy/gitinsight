import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Import components
import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Error from './components/Primitives/Error/Error';

export class App extends Component {
  render() {
    return (
      <div className="site h-100pc">
        <Header/>
        <div>
          <div className="sidebar__wrapper h-100pc">
            <Sidebar/>
          </div>
          <div className="page">
            <div className="row">
              <div className="col-12">
                <div className="container p-t-20 p-b-20">
                  <Error/>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};
