import React from 'react';
import { createUseStyles } from 'react-jss';
import { Tile, TileKeys } from 'store/Map.context';

const useStyles = createUseStyles({
  superroot:{
    position: 'absolute',
    zIndex: 100,
  },
  root:{
    display: 'flex',
    flexDirection:'column',
    width: 300,
    height: 300,
    background: 'lightgray',
    opacity: 0.7,
    color: 'black'
  }
})

export interface EditPannelProps {
  currentTileParameter: Tile;
  onEditValidation: (key: TileKeys, value: any) => void;
  pos: {x: number, y:number}
}
export const EditPannel:React.FC<EditPannelProps> = ({
  currentTileParameter, onEditValidation, pos
}) => {
  const classes = useStyles();
  function handleParametersInput(keyname: string, value: any){
    onEditValidation(keyname as TileKeys, value)
  }
  const TileParameter:React.FC<{keyname: string, value: any}> = ({
    keyname, value
  }) => {

    //hard coded bc of lack of time
    function ParameterInput():JSX.Element{
      if (typeof(value)== 'boolean'){
        return (
          <>
            <button
              onClick={() => handleParametersInput(keyname, true)}
            >
              true
            </button>
            <button
              onClick={() => handleParametersInput(keyname, false)}
            >
              false
            </button>
          </>
        )
      } else if(keyname === 'type') {
        const possibleValues= ['empty','wall', 'corner']
        return (
          <div>
            {possibleValues.map((value) => <button onClick={() => handleParametersInput(keyname, value) }>{value}</button>)}
          </div>
        )
      }  else if(keyname === 'rotation') {
        const possibleValues= [0, 90, 180, -90]
        return (
          <div>
            {possibleValues.map((value) => <button onClick={() => handleParametersInput(keyname, value) }>{value}</button>)}
          </div>
        )
      } else if(keyname === 'theme') {
        const possibleValues= ['default', 'PARTY']
        return (
          <div>
            {possibleValues.map((value) => <button onClick={() => handleParametersInput(keyname, value) }>{value}</button>)}
          </div>
        )
      } else {
        return (
          <div></div>
        )
      }
    }

    return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <p>{keyname}</p>
        <div style={{display: 'flex'}}>
          {ParameterInput()}
        </div>
      </div>
    )
  }

  return (
    <div className={classes.superroot} style={{left: pos.x, top: pos.y}}>
      <div className={classes.root}>
        {Object.entries(currentTileParameter).map((keyValuePair) => {
          return(
          <TileParameter key={keyValuePair[0]} keyname={keyValuePair[0]} value={keyValuePair[1]}/>
        )}
        )}
      </div>
    </div>
  )
}