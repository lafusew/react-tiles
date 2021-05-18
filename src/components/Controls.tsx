import React from 'react';


export interface ControlsProps {
  onLeftClick: () => void;
  onRightClick: () => void; 
  onUpClick: () => void;
  onDownClick: () => void; 
}

export const Controls:React.FC<ControlsProps> = ({
  onDownClick, onLeftClick, onRightClick, onUpClick
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <button onClick={onUpClick}>
        Up
      </button>
      <div style={{ display: 'flex' }}
      >
        <button onClick={onLeftClick}>
          left
        </button>
        <button onClick={onDownClick}>
          down
        </button>
        <button onClick={onRightClick}>
          right
        </button>
      </div>
    </div>
  );
}