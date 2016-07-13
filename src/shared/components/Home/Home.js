import React from 'react';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import component from '../component';


let styles = {
  position: 'fixed',
  right: 20,
  bottom: 20,
};

function Home({ tasks }) {
  return (
    <div>
      <AppBar
        title="JSChannel Tasks"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Tabs>
        <Tab label="all" onActive={() => browserHistory.push('/')} />

        <Tab label="some" onActive={() => browserHistory.push('/about')} />
      </Tabs>
      <div>
        <List>
          { tasks.map((t) => <ListItem primaryText={t.get('label')} rightToggle={<Toggle />} />) }
        </List>
        <FloatingActionButton style={styles} onClick={() => browserHistory.push('/new')}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </div>
  );
}

export default component(Home, {tasks: ['state','tasks']});
