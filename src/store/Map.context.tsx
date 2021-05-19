import React from 'react';

export interface Tile {
  isCollider: boolean;
  type: string;
  rotation: number;
}

export type TileKeys = 'isCollider' | 'type' | 'rotation'

export type Row = Tile[];
export type Map = Row[];

//this context store the map and allow from map editing to testing.
export const FullMapInfo = React.createContext<Map>([]);
