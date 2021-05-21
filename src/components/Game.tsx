import back from 'assets/player/back.png';
import front from 'assets/player/front.png';
import left from 'assets/player/left.png';
import right from 'assets/player/right.png';
import { themeFinder } from 'assets/theme/theme.type';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FullMapInfo, Tile } from 'store/Map.context';
import { Controls } from './Controls';
import { TileRenderer } from './TilesRenderer';

export interface GameProps {
  spawn: [[number, number, number],[number, number, number]]
  onEvent: (type:string, content: Record<string, any>) => void
}

// This component get the map from the store, so you can test it while building it.
// currentTilset is a flat array from 2D and contains all the tile data for the 9tiles around the player
// currentRowPos and ColumnPos are udpated based on controls inputs 


export const Game:React.FC<GameProps> = ({
  spawn, onEvent
}) => {

  const map = useContext(FullMapInfo);

  //PLAYER SPRITE (CONTROLED BY MOVEMENT)
  const [playerSprite, setPlayerSprite] = useState(front);

  //theme state
  const [currentTheme, setCurrentTheme] = useState(themeFinder(''));
  const [currentThemeCounter, setCurrentThemeCounter] = useState(0);
  const [themeVisited, setThemeVisited] = useState<Record<string, any>>({
    'PARTY': 0,
    'default': 0
  });

  useEffect(() => {
    if (currentThemeCounter < currentTheme.length && currentTheme.script) {
      onEvent('script', {author:"elon", script: currentTheme.script[currentThemeCounter]})
      setCurrentThemeCounter(ct => ct + 1);
    } 
  }, [currentTheme, currentThemeCounter, onEvent])

  //spawn[0] = Rows
  const [currentRowPos, setCurrentRowPos] = useState<number[]>(spawn[0]);
  //spawn[1] = column
  const [currentCulumnPos, setCurrentCulumnPos] = useState<number[]>(spawn[1]);

  const [currentTileset, setCurrentTileset] = useState<Tile[]>([]);
  useLayoutEffect(() => {
    const tempTileset= [
      map[currentRowPos[0]][currentCulumnPos[0]], map[currentRowPos[0]][currentCulumnPos[1]], map[currentRowPos[0]][currentCulumnPos[2]],     // 0 1 2
      map[currentRowPos[1]][currentCulumnPos[0]], map[currentRowPos[1]][currentCulumnPos[1]], map[currentRowPos[1]][currentCulumnPos[2]],     // 3 4 5
      map[currentRowPos[2]][currentCulumnPos[0]], map[currentRowPos[2]][currentCulumnPos[1]], map[currentRowPos[2]][currentCulumnPos[2]]      // 6 7 8
    ]

    if (tempTileset[4].theme === 'PHONE') {
      onEvent('party_invinte', {})
    }
    
    setCurrentTileset(tempTileset)
    setCurrentTheme((theme) => {
      const newThemeName = themeFinder(tempTileset[4].theme).name;
      if (theme.name !== newThemeName ){
        onEvent('themeChange', {
          theme: newThemeName
        })
        setThemeVisited((themes) => { return {
          ...themes,
          [theme.name]: currentThemeCounter,
        }})
        setCurrentThemeCounter(themeVisited[theme.name]);
      }
      return themeFinder(tempTileset[4].theme)
    })
  },[currentRowPos, currentCulumnPos, map])
  
  function handleDown() {
    setPlayerSprite(front);
    if (!currentTileset[7].isCollider){
      setCurrentRowPos(ancienPos => {
        let nextPost:number[] = [];
        //map[i] == Row; donc ici on check si map[i + 1] existe avant de faire row + 1
        // ancienPos[2] reprensente la derniere ligne affiché donc ancienPos[2] + 1 est la prochaine. (c'est elle qui doit exister)
        if (map[ancienPos[2] + 1]) {
          ancienPos.forEach((row) => nextPost.push(row + 1))
        } else {
          nextPost = ancienPos;
        }
        return nextPost;
      })
    }
  }

  function handleUp() {
    setPlayerSprite(back)
    //currenTileset[1] is the tile above you
    if (!currentTileset[1].isCollider){
      //moove
      setCurrentRowPos(ancienPos => {
        let nextPost:number[] = [];
        if (map[ancienPos[0] - 1]) {
          ancienPos.forEach((row) => nextPost.push(row - 1))
        } else {
          nextPost = ancienPos;
        }
        return nextPost;
      })
    }
  }

  function handleRight() {
    setPlayerSprite(right)
    if (!currentTileset[5].isCollider){
      setCurrentCulumnPos(ancienPos => {
        let nextPost:number[] = [];
        //map[i] == Row; donc ici on check si map[i + 1] existe avant de faire row + 1
        // ancienPos[2] reprensente la derniere ligne affiché donc ancienPos[2] + 1 est la prochaine. (c'est elle qui doit exister)
        if (map[ancienPos[2] + 1]) {
          ancienPos.forEach((row) => nextPost.push(row + 1))
        } else {
          nextPost = ancienPos;
        }
        return nextPost;
      })
    }
  }

  function handleLeft() {
    setPlayerSprite(left)
    if (!currentTileset[3].isCollider){
      setCurrentCulumnPos(ancienPos => {
        let nextPost:number[] = [];
        if (map[ancienPos[0] - 1]) {
          ancienPos.forEach((row) => nextPost.push(row - 1))
        } else {
          nextPost = ancienPos;
        }
        return nextPost;
      })
    }
  }


  return (
    <div>
      <TileRenderer
        renderedTiles={currentTileset}
        sprite={playerSprite}
      />
      <Controls
        onLeftClick={handleLeft}
        onRightClick={handleRight}
        onUpClick={handleUp}
        onDownClick={handleDown}
      />
    </div>
  )
}
