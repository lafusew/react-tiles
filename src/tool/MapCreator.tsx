import { TileComponent } from 'components/Tile';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FullMapInfo, TileKeys } from 'store/Map.context';
import { EditPannel } from './EditPannel';
export interface MapCreatorProps {
  onTileChange: (position: {row: number, column: number}, key: TileKeys, value: any) => void
}

export const MapCreator:React.FC<MapCreatorProps> = ({
  onTileChange,
}) => {
  const map = useContext(FullMapInfo);
  const [selectedTile, setSelectedTile] = useState({row: 0, column: 0})
  const [valueSelector, setValueSelector] = useState(false)
  const [mousePos, setMousePos] = useState({x:0, y:0})

  const handleTileClick = (e:React.MouseEvent, row:number, column:number) => {
    setSelectedTile({
      row: row,
      column: column
    });
    setMousePos({x:e.clientX, y:e.clientY})
    setValueSelector(true);
  }

  function handleValueSelectorClick(key: TileKeys, value: string):void {
    onTileChange(selectedTile, key, value);
  }
  function onCloseClick() {
    setValueSelector(false)
  }
  
  return (
    <>
      {
      valueSelector && 
        <div style={{
            position: 'absolute',
            left: 10,
            top: 10,
            zIndex: 100,
            background: 'darkgreen',
            color: 'white'
          }}
        >
          <EditPannel
            pos={mousePos}
            currentTileParameter={map[selectedTile.row][selectedTile.column]}
            onEditValidation={handleValueSelectorClick}
          >
            <button onClick={onCloseClick}>close</button>
          </EditPannel>
        </div>
      }
      <div style={{display: 'flex', flexDirection: 'column', overflow: 'scroll'}}>
        {map.map((row, rowIndex) => (
          <div key={rowIndex} style={{display: 'flex'}}>
            {row.map((tile, columnIndex) =>
              <div
                key={columnIndex}
                style={{width:100, height:100, fontSize: 8, display: 'flex', flexDirection:'column'}}
                onClick={(e) => handleTileClick(e, rowIndex, columnIndex)}
              >
                <div style={{display:'flex'}}>
                  isCollider: <div style={{height: 8, width: 8, background: tile.isCollider ? 'red' : 'green'}}/>
                </div>
                <div style={{display:'flex'}}>
                  type: {tile.type}
                </div>
                <div style={{display:'flex'}}>
                  rotation: {tile.rotation}
                </div>
                <div style={{height: 30, width:30}}>
                  <TileComponent {...tile} />
                </div>
                <div style={{display:'flex'}}>
                  theme: {tile.theme}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Link to='/'>
        Test the map
      </Link>
    </>
  )
}