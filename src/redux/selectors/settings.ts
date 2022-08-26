import { RootState } from '../store';

export const getShowSettings = (state: RootState) => state.settingsReducer.showSettings;
export const getAutoMove = (state: RootState) => state.settingsReducer.autoMove;
export const getResetFlag = (state: RootState) => state.settingsReducer.resetFlag;
export const getShowAbout = (state: RootState) => state.settingsReducer.showAbout;
