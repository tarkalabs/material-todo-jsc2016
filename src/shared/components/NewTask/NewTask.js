import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import component from '../component';
import { setDraftDueDate, setDraftLabel, saveDraft } from '../../actions/DraftActions';
import { browserHistory } from 'react-router';

function saveEntry() {
  saveDraft();
  browserHistory.push('/');
}

function NewTask(props) {
  let contentStyle = { padding: 8 };
  return (
    <div>
      <AppBar
        title="New Task"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <div style={contentStyle}>
        <TextField
          hintText="What do you want to do?"
          fullWidth
          value = {props.label.deref()}
          onChange={(_, newVal) => setDraftLabel(newVal)}
          floatingLabelText="Task Description"
        />
        <DatePicker
          hintText="Due on"
          fullWidth
          value = {props.due.deref()}
          onChange={(_, dt) => setDraftDueDate(dt)}
        />
        <RaisedButton primary label="Save" onClick={saveEntry} />
      </div>
    </div>
  );
}

export default component(NewTask, {
  label: ['state', 'draft', 'label'],
  due: ['state', 'draft', 'due'],
});
