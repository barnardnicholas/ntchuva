import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleShowAbout } from '../actions/modals';

const initialState = {
  showAbout: false,
};

interface SettingsState {
  showAbout: boolean;
}

/* eslint-disable */

function handleToggleShowAbout(state: SettingsState, action: PayloadAction<boolean>) {
  state.showAbout = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleShowAbout.type]: handleToggleShowAbout,
});
