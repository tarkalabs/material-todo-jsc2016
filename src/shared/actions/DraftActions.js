import appState from '../stores/app_state';
import { List, Map } from 'immutable';

const draftCursor = () => appState.cursor(['state', 'draft']);
const tasksCursor = () => appState.cursor(['state', 'tasks']);

export function setDraftDueDate(newVal) {
  draftCursor().cursor('due').update(() => newVal);
}

export function setDraftLabel(newVal) {
  draftCursor().cursor('label').update(() => newVal);
}

export function saveDraft() {
  const draftObj = draftCursor().deref();
  if (tasksCursor().deref()) {
    tasksCursor().update((curr) => curr.push(draftObj));
    draftCursor().update(() => Map());
  } else {
    tasksCursor().update(() => List().push(draftObj))
  }
}
