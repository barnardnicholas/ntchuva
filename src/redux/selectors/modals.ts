import { RootState } from '../store';

export const getShowAbout = (state: RootState) => state.modalsReducer.showAbout;
export const getShowRules = (state: RootState) => state.modalsReducer.showRules;
