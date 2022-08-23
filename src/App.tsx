import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import Game from './components/Game';
import Settings from './components/settings/Settings';
import Header from './components/header/Header';
import './_styles/App.scss';
import BackgroundBlocker from './components/BackgroundBlocker';
import { getDarkMode } from './redux/selectors/darkMode';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const darkMode = useSelector(getDarkMode);

  return (
    <div className={`App ${darkMode ? '' : 'theme-light'}`}>
      <Game />
      <BackgroundBlocker />
      <Settings />
      <Header />
    </div>
  );
}

function AppContext() {
  return (
    <Provider store={store().store}>
      <PersistGate loading={<LoadingScreen />} persistor={store().persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default AppContext;
