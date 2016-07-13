import { Map } from 'immutable';
import immstruct from 'immstruct';

const appState = immstruct({ state: new Map() });

export default appState;

export function resetState() {
  appState.cursor('state').update(() => new Map());
}

if (typeof(window) !== 'undefined') {
  window.appState = appState;
}
