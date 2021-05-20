
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Tile } from 'store/Map.context';
import { TileComponent } from './Tile';


const useStyles = createUseStyles({
  root: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns:'1fr 1fr 1fr',
    gridTemplateRows:'1fr 1fr 1fr',
  },
  playerContainer: {
    position:'absolute',
    zIndex: 1000,
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const GAME_SIZE = 300;

export interface TileRenderProps {
  renderedTiles: Tile[];
  sprite: string;
}

export const TileRenderer:React.FC<TileRenderProps> = ({
  renderedTiles, sprite
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ width: GAME_SIZE, height: GAME_SIZE }}>
      {renderedTiles.map((tile, i) => <TileComponent {...tile} i={i} />)}
      <div className={classes.playerContainer}>
          <img style={{width:(GAME_SIZE/3)/2, height: 'auto', imageRendering:'pixelated'}} src={sprite} alt='elon' />
      </div>
    </div>
  )
}