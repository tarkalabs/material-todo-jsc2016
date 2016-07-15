import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import App from '../components/App';
import Tasks from '../components/Tasks';
import NewTask from '../components/NewTask';
import { init } from '../stores';

init();

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/tasks" />
    <Route path="tasks" component={Tasks}>
      <Route path=":status" component={Tasks} />
    </Route>
    <Route path="new" component={NewTask} />
  </Route>
);

export default routes;
