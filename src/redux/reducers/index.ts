import { combineReducers } from 'redux';

import darkModeReducer from './darkMode';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  darkModeReducer,
  settingsReducer,
});

export default rootReducer;
