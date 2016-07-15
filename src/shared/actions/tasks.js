import appState from '../stores';

const tasksCursor = () => appState.cursor(['state', 'tasks']);

const taskCursor = (taskId) => tasksCursor().cursor(taskId);

export const toggleTask = (tId) => taskCursor(tId).update((t) => t.set('done', !t.get('done')));
