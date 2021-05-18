import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridTemplateColumns:'1fr 1fr 1fr',
    gridTemplateRows:'1fr 1fr 1fr',
  },
  
  });

export interface TileRenderProps {
  renderedTiles: string[];
}

export const TileRenderer:React.FC<TileRenderProps> = ({
  renderedTiles
}) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        width: 300,
        height: 300,
      }}
    >
      {renderedTiles.map((tile, i) => <div key={i} style={{background: tile}}>{i}</div>)}
    </div>
  )
}