import partySound from 'assets/sounds/partySound1.ogg';
import phoneSound from 'assets/sounds/phone.mp3';
import { Game } from 'components/Game';
import { map } from 'data/map.data.json';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Route, Switch } from 'react-router-dom';
import { FullMapInfo, Map, TileKeys } from 'store/Map.context';
import { MapCreator } from 'tool/MapCreator';
import useSound from 'use-sound';


const useStyles = createUseStyles({
  root: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'column',
    width:'100vw',
    height:'100vh',
    background: 'black',
    color: 'white'
  }
})


function App() {
  const classes = useStyles();

  const [ currentMap, setCurrentMap ] = useState<Map>(map);
  const [dataStr, setDataStr] = useState('');
  const [currentPhrase, setCurrentPhrase]= useState({author:'', content:''});
  
  function handleMapModification(tilePos: {row: number, column: number}, key: TileKeys, value: any) {
    console.log(tilePos,key, value);
    setCurrentMap((map) => {
      let ancienMap = map;
      ancienMap[tilePos.row][tilePos.column][key] = value as never;
      setDataStr("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ancienMap)));

      return ancienMap;
    })
  }
  const [playParty, {stop: stopParty}] = useSound(partySound, {volume: 0.5})
  const [playPhone] = useSound(phoneSound, {volume: 0.5})


  function handleGameEvent(type: string, content: Record<string,any>){
    console.log(type, content)
    if (type === 'script') {
      setCurrentPhrase({author: content.author, content: content.script})
    }
    if (type === 'themeChange') {
      if (content.theme === 'PARTY') {
        playParty();
      } else if (content.theme === 'PHONE') {
        playPhone();
      } else {
        stopParty();
      }
    }
  }
  
  return (
    <div className={classes.root}>
      <FullMapInfo.Provider value={currentMap}>
        <Switch>
          <Route path='/' exact>
            <Game onEvent={handleGameEvent} spawn={[[0,1,2], [0,1,2]]}/>
            <p>
              {currentPhrase.author}:{currentPhrase.content}
            </p>
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
