import React from 'react'
import useTicTacToe from '../hooks/UseTicTacToe'
import Grid from './Grid'

export default function TicTacToe() {
    const {board,result,player,setPlayer} = useTicTacToe();
    console.log({board});   
    console.log({player});
  return (
    <div>
        <Grid board = {board} addMove = {result} player = {player}/>
        {!player && (<div >
            <button className='playerButton' onClick={() => setPlayer("X")}>Play as X</button>
            <button className='playerButton' onClick={() => setPlayer("O")}>Play as O</button>
        </div>)}
    </div>
  )
}
