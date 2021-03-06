import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';
import routes from '../shared/routes';
import appState from '../shared/stores/app_state';

injectTapEventPlugin();

// Get the DOM Element that will host our React application.
const container = document.getElementById('app');

function renderApp() {
  // As we are using dynamic react-router routes we have to use the following
  // asynchronous routing mechanism supported by the `match` function.
  // @see https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      // TODO: Error handling.
      console.log('==> 😭  React Router match failed.'); // eslint-disable-line no-console
    }

    render(
      <AppContainer>
        {/*
        We need to explicly render the Router component here instead of have
        this embedded within a shared App type of component as we use different
        router base components for client vs server rendering.
        */}
        <Router {...renderProps} />
      </AppContainer>,
      container
    );
  });
}

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept();
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept('../shared/routes', renderApp);
}

renderApp();

appState.on('swap', () => {
  const path = appState.cursor(['state', 'path']).deref();
  if (path && path !== location.pathname) {
    browserHistory.push(path);
  } else {
    renderApp();
  }
});
