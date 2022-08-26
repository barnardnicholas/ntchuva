import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleShowAbout, toggleShowRules, toggleShowRoadmap } from '../actions/modals';

const initialState = {
  showAbout: false,
  showRules: false,
  showRoadmap: false,
};

interface SettingsState {
  showAbout: boolean;
  showRules: boolean;
  showRoadmap: boolean;
}

/* eslint-disable */

function handleToggleShowAbout(state: SettingsState, action: PayloadAction<boolean>) {
  state.showAbout = action.payload;
}
function handleToggleShowRules(state: SettingsState, action: PayloadAction<boolean>) {
  state.showRules = action.payload;
}
function handleToggleShowRoadmap(state: SettingsState, action: PayloadAction<boolean>) {
  state.showRoadmap = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleShowAbout.type]: handleToggleShowAbout,
  [toggleShowRules.type]: handleToggleShowRules,
  [toggleShowRoadmap.type]: handleToggleShowRoadmap,
});
