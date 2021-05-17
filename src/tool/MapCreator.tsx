import React, { useContext, useState } from 'react';
import { FullMapInfo } from 'store/Map.context';
export interface MapCreatorProps {
  onTileChange: (position: {row: number, column: number}, value: string) => void
}

export const MapCreator:React.FC<MapCreatorProps> = ({
  onTileChange,
}) => {
  const map = useContext(FullMapInfo);
  const [selectedTile, setSelectedTile] = useState({row: 0, column: 0})
  const [valueSelector, setValueSelector] = useState(false)

  const handleTileClick = (row:number, column:number) => {
    setSelectedTile({
      row: row,
      column: column
    });
    setValueSelector(true);
  }

  function handleValueSelectorClick(value: string):void {
    onTileChange(selectedTile, value);
    setValueSelector(false)
  }
  const possibleValues= ['orange','blue', 'red', 'green', 'yellow', 'black']
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
          {possibleValues.map((value) => <button onClick={()=>handleValueSelectorClick(value)}>{value}</button>)}
        </div>
      }
      <div style={{display: 'flex', flexDirection: 'column', overflow: 'scroll'}}>
        {map.map((row, rowIndex) => (
          <div style={{display: 'flex'}}>
            {row.map((tile, columnIndex) =>
              <div
                style={{background: tile, width:100, height:100}}
                onClick={() => handleTileClick(rowIndex, columnIndex)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  )
}