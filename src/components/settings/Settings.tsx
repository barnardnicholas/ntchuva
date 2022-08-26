import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../hooks/usePrevious';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import { toggleShowAbout, toggleShowRules } from '../../redux/actions/modals';
import { toggleAutoMove, toggleSettings } from '../../redux/actions/settings';
import { getDarkMode } from '../../redux/selectors/darkMode';
import { getShowAbout, getShowRules } from '../../redux/selectors/modals';
import { getAutoMove, getShowSettings } from '../../redux/selectors/settings';
import { dummyKeyDown } from '../../utils/utils';
import Divider from '../Divider';
import ToggleSwitch from '../form/ToggleSwitch';

function Settings() {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  const darkMode = useSelector(getDarkMode);
  const autoMove = useSelector(getAutoMove);
  const showAboutModal = useSelector(getShowAbout);
  const showRulesModal = useSelector(getShowRules);
  const prevProps = usePrevious({ showAboutModal, showRulesModal });

  useEffect(() => {
    if (
      (showAboutModal && !prevProps.showAboutModal) ||
      (showRulesModal && !prevProps.showRulesModal)
    ) {
      dispatch(toggleSettings(false));
    }
  }, [
    dispatch,
    showAboutModal,
    showRulesModal,
    prevProps.showAboutModal,
    prevProps.showRulesModal,
  ]);

  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Info</h3>
        <Divider />
        <div
          className="link-button"
          role="button"
          tabIndex={0}
          onClick={() => dispatch(toggleShowAbout(true))}
          onKeyDown={dummyKeyDown}
        >
          About Ntchuva
        </div>
        <Divider />
        <div
          className="link-button"
          role="button"
          tabIndex={0}
          onClick={() => dispatch(toggleShowRules(true))}
          onKeyDown={dummyKeyDown}
        >
          Rules
        </div>
        <Divider />
        <div style={{ minHeight: '2rem' }} />
        <h3>Settings</h3>
        <Divider />
        <ToggleSwitch
          label="Dark theme"
          value={darkMode}
          name="darkMode"
          onChange={(_: string, value) => dispatch(toggleDarkMode(value))}
        />
        <Divider />
        <ToggleSwitch
          label="Auto-move"
          value={autoMove}
          name="darkMode"
          onChange={(_: string, value) => {
            dispatch(toggleAutoMove(value));
          }}
        />
        <Divider />
      </div>
    </div>
  );
}

export default Settings;
