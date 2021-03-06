import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import component from '../component';
import { setDraftDueDate, setDraftLabel, saveDraft } from '../../actions/DraftActions';
import navigateTo from '../../actions/path';

// can be refactored to presenters based on cursors
function saveEntry(draft) {
  if (saveDraft(draft)) {
    navigateTo('/tasks');
  }
}

const NewTask = ({ draft }) => {
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
          value={draft.get('desc') || ''}
          errorText={draft.getIn(['errors', 'desc'])}
          onChange={(_, newVal) => setDraftLabel(newVal)}
          floatingLabelText="Task Description"
        />
        <DatePicker
          hintText="Due on"
          fullWidth
          value={draft.get('due')}
          onChange={(_, dt) => setDraftDueDate(dt)}
        />
        <RaisedButton primary label="Save" onClick={() => saveEntry(draft)} />
      </div>
    </div>
  );
};

NewTask.propTypes = {
  draft: React.PropTypes.object.isRequired,
};

export default component(NewTask, {
  draft: ['state', 'draft'],
});
