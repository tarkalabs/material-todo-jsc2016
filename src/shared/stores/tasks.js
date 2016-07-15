import Immutable from 'immutable';
import appState from './app_state';

export function initTasksStore() {
  const defaultValue = Immutable.fromJS({ tasks: {}, draft: {} });
  appState.cursor('state').update((st) => st.merge(defaultValue));
}
