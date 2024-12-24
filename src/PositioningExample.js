import React from 'react';
import './index.css'; // This should already be there


const PositioningExample = () => {
  return (
    <div>
      <div className="static">Static</div>
      <div className="relative">Relative</div>
      <div className="absolute">Absolute</div>
      <div className="fixed">Fixed</div>
      <div className="sticky">Sticky</div>
    </div>
  );
}

export default PositioningExample;
