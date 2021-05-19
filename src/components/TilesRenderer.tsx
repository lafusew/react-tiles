import React from 'react';
import { createUseStyles } from 'react-jss';
import { Tile } from 'store/Map.context';
import { TileComponent } from './Tile';

const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridTemplateColumns:'1fr 1fr 1fr',
    gridTemplateRows:'1fr 1fr 1fr',
  },
  
  });

export interface TileRenderProps {
  renderedTiles: Tile[];
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
      {renderedTiles.map((tile, i) => <TileComponent {...tile} i={i} />)}
    </div>
  )
}