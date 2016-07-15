import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import component from '../component';
import { setDraftDueDate, setDraftLabel, saveDraft } from '../../actions/DraftActions';
import { browserHistory } from 'react-router';

// can be refactored to presenters based on cursors
function saveEntry(draft) {
  if (saveDraft(draft)) {
    browserHistory.push('/');
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
          value={draft.get('label') || ''}
          errorText={draft.getIn(['errors', 'label'])}
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
