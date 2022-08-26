import { Dispatch } from 'react';
import { Action } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers';

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modalsReducer'], // Don't persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
const store = configureStore({ reducer: persistedReducer, middleware });

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): Dispatch<Action<any>> => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default () => {
  const persistor = persistStore(store);
  return { store, persistor };
};
// export default store;
