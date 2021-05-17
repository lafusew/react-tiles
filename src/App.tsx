import { MapVisualizer } from 'components/MapVisualizer';
import { TileRenderer } from 'components/TilesRenderer';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'column',
    width:'100vw',
    height:'100vh'
  }
})

const testRow1 = [
  'orange',
  'blue',
  'blue',
  'orange',
  'orange',
];

const testRow2 = [
  'green',
  'blue',
  'red',
  'blue',
  'blue',
];

const testRow3 = [
  'red',
  'red',
  'red',
  'red',
  'red',
];

const testRow4 = [
  'green',
  'red',
  'green',
  'green',
  'green',
];

const testRow5 = [
  'green',
  'yellow',
  'red',
  'yellow',
  'black',
];

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TileRenderer map={[testRow1, testRow2, testRow3, testRow4, testRow5]} position={{x: 0, y: 0}} />
      <MapVisualizer map={[testRow1, testRow2, testRow3, testRow4, testRow5]} />
    </div>
  );
}

export default App;
