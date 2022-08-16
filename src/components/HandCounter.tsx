import React from 'react';

interface HandCounterProps {
  top: string;
}

function HandCounter({ top }: HandCounterProps) {
  return <div className="hand-counter" style={{ top }} />;
}

export default HandCounter;
