import React, { useContext, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullMapInfo } from 'store/Map.context';
import { Controls } from './Controls';
import { TileRenderer } from './TilesRenderer';

export interface GameProps {
  spawn: [[number, number, number],[number, number, number]]
}

// This component get the map from the store, so you can test it while building it.
// currentTilset is a flat array from 2D and contains all the tile data for the 9tiles around the player
// currentRowPos and ColumnPos are udpated based on controls inputs 

export const Game:React.FC<GameProps> = ({
  spawn
}) => {

  const map = useContext(FullMapInfo);

  //spawn[0] = Rows
  const [currentRowPos, setCurrentRowPos] = useState<number[]>(spawn[0]);
  //spawn[1] = column
  const [currentCulumnPos, setCurrentCulumnPos] = useState<number[]>(spawn[1]);
  const [currentTileset, setCurrentTileset] = useState<string[]>([]);

  //tilset layout order
    // 0 1 2
    // 3 4 5
    // 6 7 8
  useLayoutEffect(() => {
    setCurrentTileset([
      map[currentRowPos[0]][currentCulumnPos[0]], map[currentRowPos[0]][currentCulumnPos[1]], map[currentRowPos[0]][currentCulumnPos[2]],
      map[currentRowPos[1]][currentCulumnPos[0]], map[currentRowPos[1]][currentCulumnPos[1]], map[currentRowPos[1]][currentCulumnPos[2]],
      map[currentRowPos[2]][currentCulumnPos[0]], map[currentRowPos[2]][currentCulumnPos[1]], map[currentRowPos[2]][currentCulumnPos[2]]
    ])
  },[currentRowPos, currentCulumnPos, map])

  function handleDown() {
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

  function handleUp() {
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

  function handleRight() {
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

  function handleLeft() {
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


  return (
    <div>
      <TileRenderer renderedTiles={currentTileset} />
      <Controls
        onLeftClick={handleLeft}
        onRightClick={handleRight}
        onUpClick={handleUp}
        onDownClick={handleDown}
      />
      <Link to='/editor'>
        Edit the map
      </Link>
    </div>
  )
}