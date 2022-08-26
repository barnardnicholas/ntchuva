import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleShowAbout, toggleShowRules } from '../actions/modals';

const initialState = {
  showAbout: false,
  showRules: false,
};

interface SettingsState {
  showAbout: boolean;
  showRules: boolean;
}

/* eslint-disable */

function handleToggleShowAbout(state: SettingsState, action: PayloadAction<boolean>) {
  state.showAbout = action.payload;
}
function handleToggleShowRules(state: SettingsState, action: PayloadAction<boolean>) {
  state.showRules = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleShowAbout.type]: handleToggleShowAbout,
  [toggleShowRules.type]: handleToggleShowRules,
});
