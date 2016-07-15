import React from 'react';
import AppBar from 'material-ui/AppBar';
import navigateTo from '../../actions/path';
import { Tabs, Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AppShell extends React.Component {
  render() {
    const [ALL_INDEX, PENDING_INDEX, COMPLETED_INDEX] = [0, 1, 2];
    let selectedIndex = ALL_INDEX;
    if (this.props.filter) {
      selectedIndex = this.props.filter === 'pending' ? PENDING_INDEX : COMPLETED_INDEX;
    }
    let fabStyle = {
      position: 'fixed',
      right: 20,
      bottom: 20,
    };
    return (
      <div>
        <AppBar
          title="JSChannel Tasks"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Tabs value={selectedIndex}>
          <Tab value={0} label="all" onActive={() => navigateTo('/tasks')} />
          <Tab value={1} label="pending" onActive={() => navigateTo('/tasks/pending')} />
          <Tab value={2} label="completed" onActive={() => navigateTo('/tasks/completed')} />
        </Tabs>
        {this.props.children}
        <FloatingActionButton style={fabStyle} onClick={() => navigateTo('/new')}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
AppShell.propTypes = {
  filter: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default AppShell;
