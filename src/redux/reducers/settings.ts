import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  toggleSettings,
  toggleAutoMove,
  toggleResetFlag,
  toggleShowAbout,
} from '../actions/settings';

const initialState = {
  showSettings: false,
  autoMove: false,
  resetFlag: false,
  showAbout: false,
};

interface SettingsState {
  showSettings: boolean;
  autoMove: boolean;
  resetFlag: boolean;
  showAbout: boolean;
}

/* eslint-disable */

function handleToggleShowSettings(state: SettingsState, action: PayloadAction<boolean>) {
  state.showSettings = action.payload;
}

function handleToggleAutoMove(state: SettingsState, action: PayloadAction<boolean>) {
  state.autoMove = action.payload;
}

function handleToggleResetFlag(state: SettingsState, action: PayloadAction<boolean>) {
  state.resetFlag = action.payload;
}

function handleToggleShowAbout(state: SettingsState, action: PayloadAction<boolean>) {
  state.showAbout = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleSettings.type]: handleToggleShowSettings,
  [toggleAutoMove.type]: handleToggleAutoMove,
  [toggleResetFlag.type]: handleToggleResetFlag,
  [toggleShowAbout.type]: handleToggleShowAbout,
});
