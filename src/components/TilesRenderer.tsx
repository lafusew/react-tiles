import React, { useLayoutEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridTemplateColumns:'1fr 1fr 1fr',
    gridTemplateRows:'1fr 1fr 1fr',
  },
  
  });

interface Tile {
  color: string;
}


type Row = string[];
type Map = Row[];

interface GameData {
  position: {
    x: number,
    y: number,
  },
  map: Map;
}

export const TileRenderer:React.FC<GameData> = ({
  position, map
}) => {
    const [currentRowPos, setCurrentRowPos] = useState<number[]>([
      0, 1, 2
    ]);
    const [currentCulumnPos, setCurrentCulumnPos] = useState<number[]>([
      0, 1, 2
    ]);
  const [currentTileset, setCurrentTileset] = useState<string[]>([]);
  const classes = useStyles();

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

  console.log(currentTileset);

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
    <>
      <div
        className={classes.root}
        style={{
          width: 300,
          height: 300,
        }}
      >
        {currentTileset.map((tile, i) => <div key={i} style={{background: tile}}>{i}</div>)}
      </div>
      <button onClick={handleDown}>
        down
      </button>
      <button onClick={handleUp}>
        up
      </button>
      <button onClick={handleLeft}>
        left
      </button>
      <button onClick={handleRight}>
        right
      </button>
    </>
  )
}