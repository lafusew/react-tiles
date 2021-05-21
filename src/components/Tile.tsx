import corner from 'assets/tiles/corner.png'
import empty from 'assets/tiles/empty.png'
import wall from 'assets/tiles/wall.png'
import React from 'react'
import { Tile } from 'store/Map.context'


export interface TileComponentProps extends Tile {
  i?: number
}

export const TileComponent:React.FC<TileComponentProps> = ({
  isCollider, type, rotation, 
}) => {
  
  return (
    <div style={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <img src={renderImage(type)} style={{width:'100%', height:'100%', imageRendering:'pixelated', transform:`rotate(${rotation}deg)`}} alt='tile'/>
    </div>
  )
}

function renderImage(type: string): string{
  switch (type) {
    case 'champain':
      return empty;
    case 'wall':
      return wall
    case 'corner':
      return corner
    default:
      return empty
  }
}