import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../../types/board';

import {
  createOnlineGameRequest,
  createOnlineGameFailure,
  createOnlineGameSuccess,
} from '../actions/games';

const initialState = {
  currentGame: null,
};

interface GamesState {
  currentGame: GameState | null;
}

/* eslint-disable */

function handleCreateOnlineGameSuccess(state: GamesState, action: PayloadAction<GameState>) {
  state.currentGame = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [createOnlineGameSuccess.type]: handleCreateOnlineGameSuccess,
});
