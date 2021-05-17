import { Row } from 'components/TilesRenderer';
import React from 'react';

export const MapVisualizer:React.FC<{map: Row[]}> = ({
  map
}) => {
  return (
    <>
    <p>Minimap</p>
    <div style={{maxWidth: 300, maxHeight: 300, display: 'flex', flexDirection: 'column'}}>
      {map.map((row) => <div style={{display: 'flex'}}>{row.map((tile) => <div style={{background: tile, width:20, height:20}}/>)}</div> )}
    </div>
    </>
  )
}