import React from 'react';

interface BackgroundBlockerProps {
  showSettings: boolean;
  handleClick: () => void;
}

/* eslint-disable */
function BackgroundBlocker({ showSettings, handleClick }: BackgroundBlockerProps) {
  return (
    <div
      className={`background-blocker ${showSettings ? 'semi-hidden' : 'hidden'}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    />
  );
}
/* eslint-enable */

export default BackgroundBlocker;
