import React from 'react';
import AppBar from 'material-ui/AppBar';
// import { browserHistory } from 'react-router';
import navigateTo from '../../actions/path';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import component from '../component';
import { toggleTask } from '../../actions/tasks';

class TaskItem extends React.Component {
  render() {
    return (
      <ListItem
        primaryText={this.props.task.get('desc')}
        rightToggle={
          <Toggle
            toggled={this.props.task.get('done')}
            onToggle={() => toggleTask(this.props.task.get('id'))}
          />
          }
      />
    );
  }
}

TaskItem.propTypes = {
    task: React.PropTypes.object.isRequired,
};

class AppShell extends React.Component {
  render() {
    const [ALL_INDEX, PENDING_INDEX, COMPLETED_INDEX] = [0, 1, 2];
    let selectedIndex = ALL_INDEX;
    console.log(this.props.filter);
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
};

class Home extends React.Component {
  render() {
    const { params, tasks } = this.props;
    const filter = params.status;
    let taskList = tasks.valueSeq();

    if (filter) {
      const condition = filter === 'pending' ? (t) => !t.get('done') : (t) => t.get('done');
      taskList = taskList.filter(condition);
    }

    return (
      <AppShell filter={filter}>
        <List>
          {taskList.map((t) => <TaskItem task={t} key={t.get('id')} />)}
        </List>
      </AppShell>
    );
  }
}


Home.propTypes = {
  tasks: React.PropTypes.object.isRequired,
  params: React.PropTypes.object,
};

export default component(Home, { tasks: ['state', 'tasks'] });
