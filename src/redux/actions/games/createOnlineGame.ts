import { createAction, Dispatch } from '@reduxjs/toolkit';
import { FirestoreError } from 'firebase/firestore';
import initialGameState from '../../../constants/game';
import { GameState } from '../../../types/board';

export const createOnlineGameRequest = createAction('createOnlineGameRequest');
export const createOnlineGameSuccess = createAction<GameState>('createOnlineGameSuccess');
export const createOnlineGameFailure = createAction<FirestoreError>('createOnlineGameFailure');

export const createOnlineGame =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(createOnlineGameRequest());
    try {
      const res = await createOnlineGame();
      console.log({ res });

      dispatch(createOnlineGameSuccess(initialGameState));
    } catch (e) {
      dispatch(createOnlineGameFailure(e as FirestoreError));
    }
  };
