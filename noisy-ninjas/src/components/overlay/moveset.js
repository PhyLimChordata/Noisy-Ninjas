import React from 'react'
import '../../style/overlay.css'

export function Moveset(props) {

  return <div className="moveset">
    <div id= "move1" className="move"></div>
    <div id="move2" className="move"></div>
    <div id="move3" className="move"></div>
    <div id="move4" className="move"></div>
    <div id="timer" className="move"></div>
    <div id="turns" className="move"></div>
    <div id="hearts" className="move"></div>
    <div id="movesRemaining" className="move"></div>
  </div>
}