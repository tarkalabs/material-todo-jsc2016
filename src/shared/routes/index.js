import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import App from '../components/App';
import Home from '../components/Home';
import NewTask from '../components/NewTask';
import { init } from '../stores';

init();

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/tasks" />
    <Route path="tasks" component={Home}>
      <IndexRoute component={Home} />
      <Route path=":status" component={Home} />
    </Route>
    <Route path="new" component={NewTask} />
  </Route>
);

export default routes;
