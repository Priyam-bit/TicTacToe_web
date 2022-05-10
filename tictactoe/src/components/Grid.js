import React from 'react'
import Row from './Row'

export default function Grid({ board,addMove,player }) {
  return (
      <div>
          {board.map((r,i) => {
              return <Row key = {i} rowNum = {i} row = {r} addMove = {addMove}/>
          })}
      </div>
  )
}
