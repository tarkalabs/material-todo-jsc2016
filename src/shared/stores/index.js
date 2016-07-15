import { initTasksStore } from './tasks';
import appState from './app_state';

export default appState;

export function init() {
  initTasksStore();
}
