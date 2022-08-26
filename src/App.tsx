import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
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
import { getShowAbout, getShowRoadmap, getShowRules } from './redux/selectors/modals';
import AboutModal from './components/modals/AboutModal';
import { toggleShowAbout, toggleShowRoadmap, toggleShowRules } from './redux/actions/modals';
import RulesModal from './components/modals/RulesModal';
import RoadmapModal from './components/modals/RoadmapModal';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(getDarkMode);
  const showAboutModal = useSelector(getShowAbout);
  const showRulesModal = useSelector(getShowRules);
  const showRoadmapModal = useSelector(getShowRoadmap);

  return (
    <div className={`App ${darkMode ? '' : 'theme-light'}`}>
      <Game />
      {showAboutModal && <AboutModal closeModal={() => dispatch(toggleShowAbout(false))} />}
      {showRulesModal && <RulesModal closeModal={() => dispatch(toggleShowRules(false))} />}
      {showRoadmapModal && <RoadmapModal closeModal={() => dispatch(toggleShowRoadmap(false))} />}
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
