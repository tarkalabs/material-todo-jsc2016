import 'normalize.css/normalize.css';
import './globals.css';

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

lightBaseTheme.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';

if (typeof(window) !== 'undefined') {
  window.browserHistory = browserHistory;
}

function App({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {children}
      </ReactCSSTransitionGroup>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default App;
