import React from 'react';

export type Row = string[];
export type Map = Row[];

//this context store the map and allow from map editing to testing.
export const FullMapInfo = React.createContext<Map>([]);
