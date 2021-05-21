import arrow from 'assets/arrow.png';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  btnContainer: {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 3px #fff',
    margin: '0px 8px'
  },
  arrow: {
    imageRendering: 'pixelated',
    width: 30,
    height: 30,
    paddingBottom: 4,
  }
})

export interface ControlsProps {
  onLeftClick: () => void;
  onRightClick: () => void; 
  onUpClick: () => void;
  onDownClick: () => void; 
}

export const Controls:React.FC<ControlsProps> = ({
  onDownClick, onLeftClick, onRightClick, onUpClick
}) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
      }}
    >
      <div className={classes.btnContainer} onClick={onUpClick}>
        <img src={arrow} className={classes.arrow} alt='Up btn' />
      </div>
      <div style={{ display: 'flex', marginTop: 16 }}
      >
        <div className={classes.btnContainer} onClick={onLeftClick} style={{transform: 'rotate(-90deg)'}}>
          <img src={arrow} className={classes.arrow} alt='Up btn' />
        </div>
        <div className={classes.btnContainer} onClick={onDownClick} style={{transform: 'rotate(180deg)'}}>
          <img src={arrow} className={classes.arrow} alt='Up btn' />
        </div>
        <div className={classes.btnContainer} onClick={onRightClick} style={{transform: 'rotate(90deg)'}}>
          <img src={arrow} className={classes.arrow} alt='Up btn' />
        </div>
      </div>
    </div>
  );
}