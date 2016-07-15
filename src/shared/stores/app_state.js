import Immutable, { Map } from 'immutable';
import immstruct from 'immstruct';

const appState = immstruct({ state: new Map() });

export default appState;

export function resetState() {
  appState.cursor('state').update(() => new Map());
}

// Only for demo
if (typeof(window) !== 'undefined') {
  window.appState = appState;
  window.Immutable = Immutable;
}
