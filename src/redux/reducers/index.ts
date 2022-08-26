import { combineReducers } from 'redux';

import darkModeReducer from './darkMode';
import settingsReducer from './settings';
import modalsReducer from './modals';

const rootReducer = combineReducers({
  darkModeReducer,
  settingsReducer,
  modalsReducer,
});

export default rootReducer;
