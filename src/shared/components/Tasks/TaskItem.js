import React from 'react';
import { ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

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

export default TaskItem;
