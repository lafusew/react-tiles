import React from 'react';

export type Row = string[];
export type Map = Row[];

export const FullMapInfo = React.createContext<Map>([]);
