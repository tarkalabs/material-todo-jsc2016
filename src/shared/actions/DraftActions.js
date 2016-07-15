import appState from '../stores';
import Immutable, { Map } from 'immutable';
import uuid from 'node-uuid';
import moment from 'moment';
import _ from 'lodash';

const draftCursor = () => appState.cursor(['state', 'draft']);
const tasksCursor = () => appState.cursor(['state', 'tasks']);

export function setDraftDueDate(newVal) {
  draftCursor().cursor('due').update(() => newVal);
}

export function setDraftLabel(newVal) {
  draftCursor().cursor('desc').update(() => newVal);
}

export function validateDraft(draft) {
  if (_.isEmpty(draft.get('desc'))) {
    const descError = Immutable.fromJS({ errors: { desc: 'Label should not be empty' } });
    draft.update((d) => d.merge(descError));
    return false;
  }
  return true;
}

export function saveDraft(draft) {
  const draftObj = draft.deref()
  .set('id', uuid.v4())
  .set('created_at', moment().unix())
  .set('done', false);
  if (!validateDraft(draft)) return false;
  if (tasksCursor().deref()) {
    tasksCursor().update((curr) => curr.set(draftObj.get('id'), draftObj));
  } else {
    tasksCursor().update(() => new Map().set(draftObj.get('id'), draftObj));
  }
  draft.update(() => new Map());
  return true;
}
