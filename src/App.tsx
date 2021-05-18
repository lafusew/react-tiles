import { Game } from 'components/Game';
import { map } from 'data/map.data.json';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Route, Switch } from 'react-router-dom';
import { FullMapInfo, Map } from 'store/Map.context';
import { MapCreator } from 'tool/MapCreator';

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


function App() {
  const classes = useStyles();

  const [ currentMap, setCurrentMap ] = useState<Map>(map);
  const [dataStr, setDataStr] = useState('');
  
  const handleMapModification = (tilePos: {row: number, column: number}, value: string) => {
    setCurrentMap((map) => {
      let ancienMap = map;
      ancienMap[tilePos.row][tilePos.column] = value;
      setDataStr("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ancienMap)));

      return ancienMap;
    })
  }

  return (
    <div className={classes.root}>
      <FullMapInfo.Provider value={currentMap}>
        <Switch>
          <Route path='/' exact>
            <Game spawn={[[0,1,2], [0,1,2]]}/>
          </Route>
          <Route path='/editor'>
            <MapCreator
              onTileChange={handleMapModification}
            />
            <a style={{position: 'absolute', bottom: 10, right: 10, background: 'red'}} type='button' href={dataStr} download={'map.json'}>
              Export
            </a>
          </Route>
        </Switch>
      </FullMapInfo.Provider>
    </div> 
  );
}

export default App;
