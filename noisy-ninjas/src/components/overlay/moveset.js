import React from 'react'
import '../../style/overlay.css'

// import { Hearts } from './Heart'

export function Moveset(props) {

  return <div className="moveset">
    <div id= "move1" className="move"><p>Shuriken</p></div>
    <div id="move2" className="move"><p>Decoy</p></div>
    <div id="move3" className="move"><p>Item</p></div>
    <div id="move4" className="move"><p>Etc</p></div>
    <div id="timer">1:00</div>
    {/* <Hearts id="hearts" amount={3}></Hearts> */}
    <div id="hearts"></div>
  </div>
}