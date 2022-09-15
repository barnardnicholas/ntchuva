import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Settings from './components/settings/Settings';
import Header from './components/header/Header';
import Game from './components/Game';
import './_styles/App.scss';
import BackgroundBlocker from './components/BackgroundBlocker';
import { getDarkMode } from './redux/selectors/darkMode';
import { getShowAbout, getShowRoadmap, getShowRules } from './redux/selectors/modals';
import AboutModal from './components/modals/AboutModal';
import { toggleShowAbout, toggleShowRoadmap, toggleShowRules } from './redux/actions/modals';
import RulesModal from './components/modals/RulesModal';
import RoadmapModal from './components/modals/RoadmapModal';
import GameContextProvider from './components/context/GameContext';
import Home from './components/Home';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(getDarkMode);
  const showAboutModal = useSelector(getShowAbout);
  const showRulesModal = useSelector(getShowRules);
  const showRoadmapModal = useSelector(getShowRoadmap);

  return (
    <div className={`App ${darkMode ? '' : 'theme-light'}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/:uid/:player" element={<Game />} />
      </Routes>
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
      <GameContextProvider>
        <Router>
          <App />
        </Router>
      </GameContextProvider>
    </Provider>
  );
}

export default AppContext;
