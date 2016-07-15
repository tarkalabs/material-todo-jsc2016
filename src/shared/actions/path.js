import appState from '../stores';

const navigateTo = (path) => appState.cursor(['state', 'path']).update(() => path);

export default navigateTo;
