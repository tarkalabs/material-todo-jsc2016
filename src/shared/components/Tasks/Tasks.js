import React from 'react';
import { List } from 'material-ui/List';

import component from '../component';

import AppShell from './AppShell';
import TaskItem from './TaskItem';

class Tasks extends React.Component {
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


Tasks.propTypes = {
  tasks: React.PropTypes.object.isRequired,
  params: React.PropTypes.object,
};

export default component(Tasks, { tasks: ['state', 'tasks'] });
